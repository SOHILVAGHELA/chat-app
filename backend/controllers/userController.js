import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !gender || !confirmPassword) {
      return res.status(400).json({ Message: "All field Mandatory" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ Message: "Password don't Match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ Message: "Username Already Exit try  Different" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // profilePhoto
    const MaleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const FeMaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // const MaleProfilePhoto = "https://avatar.iran.liara.run/public/boy";
    // const FeMaleProfilePhoto = "https://avatar.iran.liara.run/public/girl";
    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? MaleProfilePhoto : FeMaleProfilePhoto,
      gender,
    });
    return res
      .status(201)
      .json({ Message: "Account Created Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ Message: "All Field are Required" });
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ Message: "Incorrect Username and Password " });
    }
    const IsPasswordMatch = await bcrypt.compare(password, user.password);
    if (!IsPasswordMatch) {
      return res
        .status(400)
        .json({ Message: "Incorrect Username and Password" });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getOtherUser = async (req, res) => {
  const loggedUser = req.id;
  const getOtherUser = await User.find({ _id: { $ne: loggedUser } }).select(
    "-password"
  );
  return res.status(200).json(getOtherUser);
};
