import mongoose, { connect } from "mongoose";

const connectDB = () => {
  try {
    const connect = mongoose.connect(process.env.DB_URL);
    if (connect) {
      console.log("Connected to database!");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
