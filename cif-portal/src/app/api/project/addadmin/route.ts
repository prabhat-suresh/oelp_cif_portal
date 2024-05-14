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
    const { email, newAdminMail, projectName } = req_body;
    const current_user = await User.findOne({ email });
    console.log(current_user);

    if (!current_user || current_user.role != 'faculty') {
        return NextResponse.json({
            message: "User does not have authorization"},{
            status:400
        })
    }
    const new_admin = await User.findOne({email: newAdminMail});
    if(!new_admin) {
        return NextResponse.json({
            message: "Given mail is not registered on portal"},{
            status: 400
        })
    }
    if (new_admin.role != 'faculty') {
        return NextResponse.json({
            message: "Given mail doesn't belong to a faculty"},{
            status: 400
        })
    }
    const project = await Project.findOne({projectName});
      console.log(project)
    if(!project) {
        return NextResponse.json({
            message: "Project does not exist"},{
            status: 400
        })
    }
    if(!project.projectAdmins.includes(email)) {
        return NextResponse.json({
            message: "User does not have admin access to this project"},{
            status: 400,
        })
    }
    if(project.projectAdmins.includes(newAdminMail)) {
        return NextResponse.json({
            message: "User already an admin for this project"},{
            status: 400
        })
    }
    project.projectAdmins.push(newAdminMail);
    await project.save();
    return NextResponse.json({
        message: "Admin added successfully"},{
        status: 200,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
