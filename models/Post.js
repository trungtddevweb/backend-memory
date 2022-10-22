import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    content: { type: String, required: true },
    cat: { type: String, default: "life" },
    author: { type: Object, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
