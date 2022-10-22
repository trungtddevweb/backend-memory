import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, email, image } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(500).json("Tên người dùng đã tồn tại!");
    }
    const newUser = new User({
      username,
      email,
      image,
      password: hash,
    });
    await newUser.save();
    res.status(201).json("Đăng kí thành công!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    // Check user
    if (!user) {
      return res.status(404).json("Không tìm thấy người dùng!");
    }
    // Check password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).json("Sai tên đăng nhập hoặc mật khẩu!");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    const { password, ...other } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...other } });
    console.log("User id", user._id);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
