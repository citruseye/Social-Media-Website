import express from "express";
import { createPost, getAllPosts, likeOrDislike } from "../controllers/postController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,createPost);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/allposts/:id").get(isAuthenticated, getAllPosts);


export default router;