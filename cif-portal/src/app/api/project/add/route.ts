import { connect } from "@/dbConfig/dbConfig";
import Project from "@/models/projectModel";
import User from "@/models/userModel"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
connect();

/*
* POST req: {email, projectName, projectFunds}
*      res: {status, message}
* */
export async function POST(request: NextRequest) {
  try {
    const req_body = await request.json();
    const { email, projectName, projectFunds } = req_body;
    const current_user = await User.findOne({ email });
    console.log(current_user);


    if (!current_user || current_user.role != 'faculty') {
        return NextResponse.json({
            message: "User does not have authorization", status: 400},{
            status:400
        })
    }
    const project = await Project.findOne({projectName});
    if(project) {
        return NextResponse.json({
            message: "Project already exists", status: 400},{
            status: 400,
        })
    }
    const new_project = new Project({
        projectName, projectFunds, projectAdmins:[email]
    })
    await new_project.save();

    return NextResponse.json({
        message: "Project created successfully"},{
        status: 200,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
