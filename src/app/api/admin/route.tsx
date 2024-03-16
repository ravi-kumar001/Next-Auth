import { connect } from "@/Database/Mongo.config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/Models/UserSchema";

export async function POST(req: NextResponse) {
    connect();
  const password = await bcrypt.hash("12345", 10);
  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    role: "Admin",
    password: password,
  });

  return NextResponse.json({ status: 200, message: "successfully created" });
}
