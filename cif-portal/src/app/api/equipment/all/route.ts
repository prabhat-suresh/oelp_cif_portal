import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
      const equipment = await Equipment.find();
      return NextResponse.json({"equipment_details": equipment},{status: 200});
  } catch (error) {
      return NextResponse.json({ message: error}, { status: 500 });
  }
}