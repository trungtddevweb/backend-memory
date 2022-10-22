import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Không thể để trống"],
      maxLength: 255,
    },
    image: { type: String, default: "" },
    email: {
      type: String,
      unique: true,
      required: [true, "Không thể để trống"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Không thể để trống"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
