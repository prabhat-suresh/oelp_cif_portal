import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { equipmentName, description, status, equipmentID } = req_body;
    const equipment = new Equipment({
      equipmentID,
      equipmentName,
      description,
      status,
    });
    const savedEquipment = await equipment.save();

    if (savedEquipment) {
      return NextResponse.json({
        message: "Equipment created successfully",
        success: true,
        status: 201,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
