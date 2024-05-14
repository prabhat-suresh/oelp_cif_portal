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
                message: "User does not have authorization to add students"
            },{
                status: 400},);
        }
        const project = await Project.findOne({projectName});
        if(!project) {
            return NextResponse.json({
                message: "Invalid project name"
            },{
                status: 400},)
        }
        if (!project.projectAdmins.includes(email)){
            return NextResponse.json(
                {
                message: "User does not have admin access to the given project"
                },
                {
                status: 400
                }
            );
        }

        const student = await User.findOne({email:studentEmail});
        if(!student || student.role != 'student'){
            return NextResponse.json({
                message: "User is not registered on the portal or the user is not a student"},{
                status: 400,
            })
        }
        if(student.workingOnProjects.includes(project.projectName)) {
            return NextResponse.json({
                message: "Student is already part of the project"},{
                status: 400,

            })
        }
        student.workingOnProjects.push(project.projectName);
        console.log(student.workingOnProjects);
        await student.save();
        return NextResponse.json({
            message: "Student added to the project successfully"
        },{
            status: 200,
        })
    } catch (error : any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
    }
}