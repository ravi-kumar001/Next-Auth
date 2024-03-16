import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    required: [true, "Name field is required"],
    type: Schema.Types.String,
    trim: true,
  },
  email: {
    required: [true, "email field is required"],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
    trim: true,
  },
  avtar: {
    required: false,
    type: Schema.Types.String,
  },
  role: {
    required: true,
    type: Schema.Types.String,
    default: "User",
  },
  password_reset_token: {
    require: false,
    type: Schema.Types.String,
    trim :  true
  },
  magic_link_token: {
    require: false,
    type: Schema.Types.String,
    trim :  true
  },
  magic_link_token_at : {
    require : false,
    type : Schema.Types.Date
  }
});
export const User = mongoose.models.User || mongoose.model("User", userSchema);
