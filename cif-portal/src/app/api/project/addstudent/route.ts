import Project from "@/models/projectModel"
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server";
connect()

export async function POST(request: NextRequest) {
    try {
        const req_body = await request.json();
        const { email, studentEmail, projectName } = req_body;
        const currentUser = await User.findOne({email});
        if(!currentUser || currentUser.role != 'faculty') {
            return NextResponse.json({
                status: 400,
                message: "User does not have authorization to add students"
            });
        }
        const project = await Project.findOne({projectName});
        if(!project) {
            return NextResponse.json({
                status: 400,
                message: "Invalid project name"
            })
        }
        if (!project.projectAdmins.includes(email)){
            return NextResponse.json({
                status: 400,
                message: "User does not have admin access to the given project"
            });
        }

        const student = await User.findOne({email:studentEmail});
        if(!student || student.role != 'student'){
            return NextResponse.json({
                status: 400,
                message: "User is not registered on the portal or the user is not a student"
            })
        }
        if(student.workingOnProjects.includes(project.projectName)) {
            return NextResponse.json({
                status: 400,
                message: "Student is already part of the project"
            })
        }
        student.workingOnProjects.push(project.projectName);
        console.log(student.workingOnProjects);
        await student.save();
        return NextResponse.json({
            status: 200,
            message: "Student added to the project successfully"
        })
    } catch (error : any) {
        return NextResponse.json({
            status: 500,
            error: error.message
        })
    }
}