import { connect } from "@/dbConfig/dbConfig";
import Equipment from "@/models/equipmentModel";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export default function
