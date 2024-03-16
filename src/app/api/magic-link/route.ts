import { connect } from "@/Database/Mongo.config";
import { User } from "@/Models/UserSchema";
import Env from "@/config/env";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { sendEmail } from "@/config/emailSend";

export async function POST(request: NextRequest) {
  const body: magicLink = await request.json();

  connect();

  const user = await User.findOne({ email: body.email });
  if (user === null || user === undefined) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "No crendials found!",
      },
    });
  }

  // Generate magic Link Token
  const magic_link_token = cryptoRandomString({
    length: 64,
    type: "alphanumeric",
  });

  // encrypt our email

  const cryptr = new Cryptr(Env.NEXTAUTH_SECRET);
  const encryptedEmail = cryptr.encrypt(user.email);

  // make our url

  const url = `${Env.APP_URL}/magic-link/${encryptedEmail}?signature=${magic_link_token}`;

  //render our react magic email template

  try {
    const html = render(
      MagicLinkEmail({
        params: {
          name: user.name,
          url: url,
        },
      })
    );
    await sendEmail(body.email, "sign with email magic link", html);

    user.magic_link_token = magic_link_token;
    user.magic_link_token_at = Date.now();

    await user.save();

    return NextResponse.json({
      status: 200,
      message: "Magic Link send successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, messgae: "something went wrong!" });
  }
}
