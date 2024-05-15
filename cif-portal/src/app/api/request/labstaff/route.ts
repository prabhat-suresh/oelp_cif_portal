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
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }
        const user_role = user_row.role;
        if (user_role != "labStaff") {
            return NextResponse.json({ message: "User does not have authorization." }, { status: 400 });
        }
        const equipments = await Equipment.find({ labStaff: email })
        console.log(equipments)
        //TODO: Add student email and project name too.
        const requests = await Request.find({ staffApproval: null, paApproval: true, equipmentID: { $in: equipments.map(equipment => equipment._id) } })
        console.log(requests)
        const ret: any = {}
        for (let req of requests) {
            ret[req._id] = []
        }
        for (let req of requests) {
            ret[req._id].push(req)
        }

        return NextResponse.json({ message: "Filtered requests successfully", "pendingRequests": ret, status: 200 }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}