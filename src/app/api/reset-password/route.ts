import { User } from "@/Models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/Database/Mongo.config";
import bcrypt from "bcryptjs";
import Cryptr from "cryptr";
import Env from "@/config/env";

export async function POST(request: NextRequest) {
  connect();
  //type of our body
  type body = {
    email: string;
    signature: string;
    password: string;
    cnfPassword: string;
  };
  const body: body = await request.json();

  // TODO: You have to add validation here to check both passwords are same

  if(body.password != body.cnfPassword){
    return NextResponse.json({status : 500 , message : 'Password not same'})
  }

  // * Decrypt string
  const crypter = new Cryptr(Env.NEXTAUTH_SECRET);
  const email = crypter.decrypt(body.email);

  
  const user = await User.findOne({
    email: email,
    password_reset_token: body.signature,
  });

  // if data is not found then
  if (user == null || user == undefined) {
    return NextResponse.json({ status: 400, message: "User doesn't exist" });
  }

  user.password = await bcrypt.hash(body.password, 10);
  user.password_reset_token = null;
  await user.save();
  return NextResponse.json({
    status: 200,
    message: "Password changed successfully.Please login with new password",
  });
}
