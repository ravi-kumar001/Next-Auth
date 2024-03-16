import { User } from "@/Models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { render } from "@react-email/render";
import FrogetPassword from "@/emails/ForgotPassword";
import { sendEmail } from "@/config/emailSend";
import { connect } from "@/Database/Mongo.config";

export async function POST(request: NextRequest) {
  connect();
  //type of our body
  type body = {
    email: string;
  };
  const body: body = await request.json();

  // check our exact user from database if not found then return errors

  const user = await User.findOne({ email: body.email });
  if (user == null) {
    return NextResponse.json({
      status: 400,
      errors: {
        error: "Not found user with this email.",
      },
    });
  }

  // logic for if user exists generate password reset token

  const pass_reset_token = cryptoRandomString({
    length: 64,
    type: "alphanumeric",
  });

  user.password_reset_token = pass_reset_token;
  await user.save();

  // encrypt the email

  const cryptr = new Cryptr(Env.NEXTAUTH_SECRET);
  const encryptedEmail = cryptr.encrypt(user.email);

  // make a complex url
  const url = `${Env.APP_URL}/reset-password/${encryptedEmail}?signature=${pass_reset_token}`;
  try {
    const html = render(
      FrogetPassword({
        params: {
          name: user.name,
          url: url,
        },
      })
    );
    await sendEmail(body.email, "Regarding forgot password", html);
    return NextResponse.json({
      status: 200,
      message: "email sent successfully. Check your email",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, messgae: "something went wrong!" });
  }
}
