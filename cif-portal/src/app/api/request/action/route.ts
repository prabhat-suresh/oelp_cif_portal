import { connect } from "@/dbConfig/dbConfig";
import Request from "@/models/RequestModel";
import User from "@/models/userModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Equipment from "@/models/equipmentModel";
connect();

export async function POST(req: NextRequest) {
    try {
        const req_body = await req.json();
        const {email, requestID, action}: any = req_body;
        // just check if the email can take action

        const current_user = await User.findOne({email});
        if (!current_user) {
            return NextResponse.json( {message: "Internal server error while fetching user"}, {status: 500});
        }
        const user_role = current_user.role;
        console.log(user_role)
        if (user_role == "faculty") {
            const request_row = await Request.findOne({_id:requestID});
            request_row.paApproval = action;
            await request_row.save();
        } else if (user_role == "labStaff") {
            const request_row = await Request.findOne({_id:requestID});
            console.log(request_row);
            request_row.staffApproval = action;
            request_row.status=true;
            await request_row.save();
            // adding time slots in the equipment table
            const equipment = await Equipment.findOne({_id:request_row.equipmentID})
            equipment.timeSlots.push([new Date(request_row.startTime), new Date(request_row.endTime)]);
            await equipment.updateOne({ timeSlots: equipment.timeSlots });
            await equipment.save();
            // TODO: Trigger to cancel all requests for same slot.
        } else {
            return NextResponse.json({message: "User does not have authorization."}, {status: 400} );
        }

        return NextResponse.json({message: "Request Approved"}, {status: 200});

    } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });

    }
}