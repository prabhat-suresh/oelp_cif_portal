import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

// to do
// 1. add email verification
// 2. assign roles
export async function POST(request: NextRequest) {
  try {
    const request_body = await request.json();

    // log
    console.log(request_body);
    const { username, email, password, mobile, department } = request_body;

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    // hash password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobile: mobile,
      department: department,
    });
    // save the user
    const savedUser = await newUser.save();

    // log
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// curl command to check
// curl -X POST \
// -H "Content-Type: application/json" \
// -d '{"username":"test","email":"test@test.com","password":"pass"}' \
// http://localhost:3000/api/createuser
