import { connect } from "@/dbConfig/dbConfig";
import Request from "@/models/RequestModel";
import User from "@/models/userModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const req_body = await req.json();
        const { email, requestID, action }: any = req_body;
        // just check if the email can take action

        const user_row = await User.findOne({ email });
        if (!user_row) {
            return NextResponse.json({ "status": 500, "message": "Internal server error" });
        }
        const user_role = user_row.role;
        if (user_role == "faculty") {
            const request_row = await Request.findOneAndUpdate({ requestID }, { paApproval: action });
        }
        else if (user_role == "staff") {
            const request_row = await Request.findOneAndUpdate({ requestID }, { staffApproval: action });
        }
        else {
            return NextResponse.json({ "status": 400, "message": "User does not have authorization." });
        }

        return NextResponse.json({ "status": 200, "message": "Request Approved" });

    } catch (error: any) {
        return NextResponse.json({ "status": 500, "error": error.message })
    }
}