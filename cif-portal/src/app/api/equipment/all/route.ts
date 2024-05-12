import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
      const equipment = await Equipment.find();
      return NextResponse.json({status: 200, "equipment_details": equipment});
  } catch (error) {
      return NextResponse.json({ message: error, status: 500 });
  }
}