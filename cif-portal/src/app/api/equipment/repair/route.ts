import Equipment from "@/models/equipmentModel"
import { NextResponse, NextRequest} from "next/server";
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import Request from "@/models/RequestModel"
connect()


export async function POST(request: NextRequest) {
    try {
        const req_body = await request.json();
        const { equipmentID, email } = req_body;
        if (!equipmentID || !email) {
            return NextResponse.json({
                error: "Insufficient inputs provided"},{
                status: 400
            });
        }

        const current_user = await User.findOne({ email });
        console.log(current_user);
        if (!current_user || current_user.role != 'labStaff') {
            return NextResponse.json({
                error: "User does not have authorization"},{
                status: 400
            });
        }

        const equipment = await Equipment.findOne({ _id: equipmentID });
        console.log(equipment)
        if (!equipment) {
            return NextResponse.json({
                error: "Equipment does not exist"},{
                status: 400
            });
        }
        if(!equipment.labStaff.includes(email)) {
            return NextResponse.json({error: "User does not have update permission for the given equipment"}, {status: 400})
        }
        equipment.damagedQuantity++;
        if (equipment.availableQuantity > 0) {
            equipment.availableQuantity--;
        }
        const equipmentSaveStatus = await equipment.save();
        if(!equipmentSaveStatus) {
            return NextResponse.json({error: "Error occurred while updating equipment details"}, {status: 500})
        }
        const request_for_equip = await Request.find({ equipmentID: equipment._id, status: null });
        for (const pendingRequest of request_for_equip) {
            pendingRequest.status = false;
            //TODO: Send mail to the students about the cancellation
        }

        const saveStatus = await Promise.all(request_for_equip.map(req => req.save()));
        if (!saveStatus.every(status => status)) {
            return NextResponse.json({
                error: "Database error occurred while rejecting requests"},{
                status: 500
            });
        }

        return NextResponse.json({
            message: "Equipment status changed successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal server error"},{
            status: 500
        });
    }
}
