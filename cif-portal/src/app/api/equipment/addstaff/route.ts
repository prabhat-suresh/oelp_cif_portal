import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel"
import User from "@/models/userModel"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

/*
* POST req: {email, equipmentID, projectFunds}
*      res: {status, message}
* */
export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { email, newStaffMail, equipmentName } = req_body;
    const current_user = await User.findOne({ email });
    console.log(current_user);

    if (!current_user || current_user.role != 'labStaff') {
        return NextResponse.json({
            message: "User does not have authorization",
            status:400
        })
    }
    const new_staff = await User.findOne({ email: newStaffMail });
    console.log(new_staff)
    if(!new_staff) {
        return NextResponse.json({
            message: "Given email is not registered on portal",
            status: 400
        })
    }
    console.log(new_staff.role)
    if (new_staff.role != 'labStaff') {

        return NextResponse.json({
            message: "Given email doesn't belong to a lab staff",
            status: 400
        })
    }
    const equipment = await Equipment.findOne({equipmentName});
    console.log(equipment)
    if(!equipment) {
        return NextResponse.json({
            message: "Equipment does not exist",
            status: 400
        })
    }
    if(!equipment.labStaff.includes(email)) {
        return NextResponse.json({
            message: "User does not have admin access to this equipment",
            status: 400,
        })
    }
    if(equipment.labStaff.includes(newStaffMail)) {
        return NextResponse.json({
            message: "User is already an admin for this equipment",
            status: 400
        })
    }
    equipment.labStaff.push(newStaffMail);
    await equipment.save();
    return NextResponse.json({
        message: "Lab staff added successfully for the project",
        status: 200,
        success: true
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
