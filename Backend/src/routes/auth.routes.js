const express = require("express");
const router = express.Router();
const {registercontroller , loginController, getUserController, logoutController, getUser} = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.midleswares')

// API for Register
router.post("/register", registercontroller);

// API for login
router.post("/login", loginController);

// API for get user profile
router.get("/user",authMiddleware, getUserController);

// API for logout user
router.post('/logout', logoutController)

// API for geting userName
router.post('/user',getUser);
module.exports = router;
