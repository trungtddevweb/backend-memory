import express from "express";
import dotenv from "dotenv";
import connectDB from "./connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// import routes
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Middleware error handlers

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is listening on ${process.env.PORT}`);
});
