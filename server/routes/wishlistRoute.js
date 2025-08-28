import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";
import authuser from '../middlewares/authuser.js';

const wishlistrouter = express.Router();

wishlistrouter.get("/", authuser, getWishlist);
wishlistrouter.post("/add", authuser, addToWishlist);
wishlistrouter.post("/remove", authuser, removeFromWishlist);

export default wishlistrouter;
