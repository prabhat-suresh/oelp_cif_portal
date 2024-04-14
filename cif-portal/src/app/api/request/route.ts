import { v4 as uuidv4 } from "uuid";
import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import Request from "@/models/RequestModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { equipmentID, email, startTime, endTime } = req_body;
    const equipment = await Equipment.findOne({ equipmentID });
    if (!equipment) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 },
      );
    }
    if (!equipment.status) {
      return NextResponse.json(
        { error: "Equipment is not available" },
        { status: 400 },
      );
    }
    console.log("whatupp");
    // logic for checking if the requested time slot is available
    // if not available, return timeConflict error and request user to enter new time slot
    const dateArray = equipment.timeSlots;
    // date array will always be sorted
    // can be improved using binary search
    let i = 0;
    for (; i < dateArray.length && dateArray[i][0] > new Date(startTime); i++) {
      if (
        (dateArray[i][0] >= new Date(startTime) &&
          dateArray[i][0] < new Date(endTime)) ||
        (dateArray[i][1] > new Date(startTime) &&
          dateArray[i][1] <= new Date(endTime))
      ) {
        return NextResponse.json({ error: "Time conflict" }, { status: 400 });
      }
    }
    // insert into proper position
    equipment.timeSlots.splice(i, 0, [new Date(startTime), new Date(endTime)]);
    console.log(equipment.timeSlots);
    await equipment.updateOne({ timeSlots: equipment.timeSlots });
    console.log("a-okay");
    const NewRequest = new Request({
      requestID: uuidv4(),
      equipmentID,
      email,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
    console.log("created request");
    const requestSaveStatus = await NewRequest.save();
    if (!requestSaveStatus) {
      return NextResponse.json(
        { error: "Request not created" },
        { status: 400 },
      );
    }
    console.log(requestSaveStatus);
    return NextResponse.json({
      message: "Request created successfully",
      success: true,
    });
    // TODO: add the above data to bookings
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
