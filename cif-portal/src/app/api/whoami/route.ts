import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import {redirect} from "next/navigation";

export async function GET(request : NextRequest) {
    try {
        const userEmail = await getDataFromToken(request)
        console.log("UserEmail", userEmail)
        if (!userEmail.length) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
            // return NextResponse.json({
            //     message: "User does not have a token"
            // }, {
            //     status: 400
            // })
        }
        console.log(userEmail);
        return NextResponse.json({
            message: "User found in the database",
            email: userEmail
        }, {
            status: 200
        })

    } catch (error : any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}