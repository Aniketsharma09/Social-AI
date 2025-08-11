const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.midleswares");
const { createPostController, getPostsController, updatePostController, getUserPostController } = require('../controllers/post.controllers');
const multer = require("multer");

const upload = multer({storage : multer.memoryStorage()});
router.post('/',
    authMiddleware,
    upload.single("image"),
    createPostController
 );

router.get('/get', getPostsController);
router.post('/update', updatePostController);
router.get('/userposts', getUserPostController );

module.exports = router;