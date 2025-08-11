const userModel = require("../models/user.modle");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registercontroller = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isExists = await userModel.findOne({ username });
    if (isExists) {
      return res.status(401).json({
        message: "Username is already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username: username,
      password: hashPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(201).json({
      message: "Your are register successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid username and password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
      message: "Login successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = req.user.toObject();
    // Remove password
    delete user.password;

    res.status(200).json({
      message: "User profile fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  const {id} = req.body;
  try {
    const user = await userModel.findById({ _id: id });
    res.status(200).json({
      message: "user fatched successfully",
      user,
    });
  } catch (error) {
    console.log("error while fetching user", error);
  }
};

module.exports = {
  registercontroller,
  loginController,
  getUserController,
  logoutController,
  getUser,
};
