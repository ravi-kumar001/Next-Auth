import { connect } from "@/Database/Mongo.config";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { loginSchema } from "@/validation/validation";
import errorReporter from "@/validation/errorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/Models/UserSchema";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    const validator = vine.compile(loginSchema);
    vine.errorReporter = () => new errorReporter();
    const output = await validator.validate(body);

    /* Find User */
    const user = await User.findOne({ email: output.email });
    const authUser = bcrypt.compareSync(output.password, user.password);

    if (authUser) {
      return NextResponse.json(
        { status: 200, message: "Successfully Logged In" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Please Check crendials",
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
