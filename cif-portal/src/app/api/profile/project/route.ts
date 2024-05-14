import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

export async function POST(request : NextRequest) {
    try {
        const req_body = await request.json();
        const { email } = req_body;
        console.log("project_of_email", email);
        if(!email) {
            return NextResponse.json({
                message: "Invalid user email provided"
            }, {
                status: 400
            })
        }
        const current_user = await User.findOne({ email });
        if(current_user.role != 'student'){
            return NextResponse.json({
                message: "User provided is not a student"
            }, {
                status: 400
            })
        }
        return NextResponse.json({
            "currentProject":current_user.workingOnProjects
        }, {
            status: 200
        })


    } catch (error : any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status:500
            }
        )
    }
}