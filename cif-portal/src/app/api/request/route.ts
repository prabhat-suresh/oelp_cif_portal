import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { equipmentID, userID, startTime, endTime } = req_body;
    const equipment = await Equipment.findOne({ equipmentID });

    if (!equipment.status) {
      return NextResponse.json(
        { error: "Equipment is not available" },
        { status: 400 },
      );
    }
    // logic for checking if the requested time slot is available
    // if not available, return timeConflict error and request user to enter new time slot
    equipment.status = true;
    equipment.endtimeslotarray.push(endTime);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
