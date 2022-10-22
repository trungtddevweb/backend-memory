import express from "express";
import {
  addPost,
  deletedPost,
  getAPost,
  getPosts,
  updatedPost,
} from "../controllers/post.js";

const router = express.Router();

// Login
router.get("/", getPosts);
router.get("/:id", getAPost);
router.post("/", addPost);
router.put("/:id", updatedPost);
router.delete("/:id", deletedPost);

export default router;
