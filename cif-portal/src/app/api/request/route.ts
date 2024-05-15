import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import Request from "@/models/RequestModel";
import User from "@/models/userModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
connect();

async function overLaps(startTime: Date, endTime: Date, all_req: any) {
  // Iterate over each entry in the Request document
  const arg_end = Number(new Date(endTime));
  const arg_start = Number(new Date(startTime))


  for (const entry of all_req) {
    // Check for overlap of arg with every request of user
    let startDB = Number(new Date(entry.startTime));
    let endDB = Number(new Date(entry.endTime));
    console.log(startTime, endTime, startDB, endDB);
    if (!(arg_end <= startDB || arg_start >= endDB)) {
      // If there's an overlap, return true
      return true;
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { equipmentID, email, startTime, endTime, projectName } = req_body;
    console.log(equipmentID)
    if (!mongoose.Types.ObjectId.isValid(equipmentID)) {
      return NextResponse.json({
        status: 500,
        error: "equipment ID is not valid"
      })
    }
    const student = await User.findOne({ email });
    if (!student || !student.workingOnProjects.includes(projectName)) {
      return NextResponse.json({
        error: "User is not valid or is not part of the project"
      }, {
        status: 400
      })
    }
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    if (start >= end || now > start) {
      return NextResponse.json({
        error: "Invalid start time and end time found"
      }, {
        status: 400
      })
    }
    const equipment = await Equipment.findOne({ _id: equipmentID });
    console.log(equipment)
    if (!equipment) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 400 },
      );
    }
    if (!equipment.availableQuantity) {
      return NextResponse.json(
        { error: "Equipment is not available" },
        { status: 400 },
      );
    }
    const requestCheck = await Request.findOne({ equipmentID, email, startTime, endTime });
    console.log("requestCheck ", requestCheck);
    if (requestCheck) {
      return NextResponse.json(
        { error: 'User already has an active request for the equipment in this time slot' },
        { status: 400 },
      )
    }
    const all_req = await Request.find({ email });
    if (all_req) {
      const overlap = await overLaps(startTime, endTime, all_req);
      console.log("overlaps ", overlap);
      if (overlap) {
        return NextResponse.json({
          status: 400,
          message: "User already has an active request in this duration"
        })
      }
    }

    // logic for checking if the requested time slot is available
    // if not available, return timeConflict error and request user to enter new time slot
    const dateArray = equipment.timeSlots;
    // // date array will always be sorted
    // // can be improved using binary search
    let i = 0;
    for (; i < dateArray.length && dateArray[i][0] > new Date(startTime); i++) {
      if (
        (dateArray[i][0] >= new Date(startTime) &&
          dateArray[i][0] < new Date(endTime)) ||
        (dateArray[i][1] > new Date(startTime) &&
          dateArray[i][1] <= new Date(endTime))
      ) {
        return NextResponse.json({ error: "This slot is already booked" }, { status: 400 });
      }
    }
    // should be done when the request is approved by lab staff

    // insert into proper position
    // equipment.timeSlots.splice(i, 0, [new Date(startTime), new Date(endTime)]);
    // console.log(equipment.timeSlots);
    // await equipment.updateOne({ timeSlots: equipment.timeSlots });
    // console.log("a-okay");
    const NewRequest = new Request({
      equipmentID,
      email,
      projectName,
      startTime: start,
      endTime: end,
    });
    console.log("created request");
    const requestSaveStatus = await NewRequest.save();
    if (!requestSaveStatus) {
      return NextResponse.json(
        { error: "Request not saved" },
        { status: 400 },
      );
    }
    console.log(requestSaveStatus);
    return NextResponse.json({
      message: "Request created successfully",
      status: 200
    },
      {
        status: 200
      });
    // TODO: add the above data to equipment time slots
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
