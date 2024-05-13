import { connect } from "@/dbConfig/dbConfig";
import Project from "@/models/projectModel";
import User from "@/models/userModel"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { email, projectName, projectFunds } = req_body; // TODO: check email belongs to faculty
    const current_user = await User.findOne({ email });

    if (!current_user) {
        return NextResponse.json({"status":500, "message": "Didn't find user in database"})
    }

    if (current_user.role != "faculty") {
        return NextResponse.json({"status":400, "message": "User does not have authorization"})
    } else {
        const new_project = new Project({
            projectName, projectFunds
        })
        // adding project to user table of faculty
        const update_response = User.findByIdAndUpdate(
        email,
          { $push: { ongoingProjects: projectName } },
          (err: any, updatedUser:any) => {
            if (err) {
              console.error('Error updating user:', err);
            } else {
              console.log('Updated user:', updatedUser);
            }
          });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
