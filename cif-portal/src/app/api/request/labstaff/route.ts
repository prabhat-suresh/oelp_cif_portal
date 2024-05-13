import { connect } from "@/dbConfig/dbConfig";
import Request from "@/models/RequestModel";
import User from "@/models/userModel";
import Equipment from "@/models/equipmentModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const req_body = await req.json();
        const { email }: any = req_body;
        // just check if the email can view the requests

        const user_row = await User.findOne({ email });
        if (!user_row) {
            return NextResponse.json({ "status": 400, "message": "User not found" });
        }
        const user_role = user_row.role;
        if (user_role != "faculty") {
            return NextResponse.json({ "status": 400, "message": "User does not have authorization." });
        }
        const equipments = await Equipment.find({ labStaff: email })
        const requests = await Request.find({ staffApproval: null, paApproval: true, equipmentID: { $in: equipments.map(equipment => equipment.equipmentName) } })

        const ret: any = {}
        for (let req of requests) {
            ret[req.equipmentName] = []
        }
        for (let req of requests) {
            ret[req.equipmentName].push(req)
        }

        return NextResponse.json({ "status": 200, "message": "Filtered requests successfully", pendingRequests: ret })

    } catch (error: any) {
        return NextResponse.json({ "status": 500, "error": error.message })
    }
}