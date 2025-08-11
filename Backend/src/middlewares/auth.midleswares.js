const jwt = require("jsonwebtoken");
const userModel = require("../models/user.modle");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Login to view profile" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
