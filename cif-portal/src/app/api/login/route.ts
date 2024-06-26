import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// mandatory connect
connect();

export async function POST(request: NextRequest) {
  try {
    const request_body = await request.json();
    const { email, password } = request_body;
    console.log(request_body)
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password", status: 400 }, { status: 400 });
    }
    console.log(user);

    // tokens
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "5h",
    });

    const response = NextResponse.json({
      message: "Login successful", status: 200
    }, { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
