import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  let result;
  const catName = req.query.cat;
  try {
    if (catName) {
      result = await Post.find({
        cat: {
          $in: [catName],
        },
      });
    } else {
      result = await Post.find();
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAPost = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const result = await newPost.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatedPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.query.edit,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Updated post successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deletedPost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
