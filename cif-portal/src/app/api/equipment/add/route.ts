import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import User from "@/models/userModel"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { equipmentName, description, email } = req_body;
    //done: Check if email belongs to labstaff
    const currentUser = await User.findOne({ email })
    if(!currentUser || currentUser.role != "labStaff") {
      return NextResponse.json({
        message: "User not authorized to add equipments"},{
        status: 400,
      })
    }
    const findEquipment = await Equipment.findOne({ equipmentName })
    console.log(findEquipment);
    let equipment;
    if (!findEquipment) {
      equipment = new Equipment({
        equipmentName,
        description,
        labStaff: [email]
      })
    } else {
      findEquipment.totalQuantity = findEquipment.totalQuantity+1;
      findEquipment.availableQuantity = findEquipment.availableQuantity+1;
      await findEquipment.save();
      return NextResponse.json({
        message: "Equipment quantity updated"},{
        status:200
      })
    }
    const savedEquipment = await equipment.save();

    if (savedEquipment) {
      return NextResponse.json({
        message: "Equipment created successfully"},{
        status: 200,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
