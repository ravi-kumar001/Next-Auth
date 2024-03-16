import { connect } from "@/Database/Mongo.config";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/validation/validation";
import errorReporter from "@/validation/errorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/Models/UserSchema";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const validator = vine.compile(registerSchema);
    vine.errorReporter = () => new errorReporter();
    const output = await validator.validate(body);

    /* Check Email already exists */
    const user = await User.findOne({ email: output.email });

    if (user) {
      return NextResponse.json({
        message: "Email already taken. Please try another email",
      });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(output.password, 10);
      output.password = hashedPassword;

      await User.create(output);
      return NextResponse.json(
        { status: 200, message: "Account created successfully.Please Login Here" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
