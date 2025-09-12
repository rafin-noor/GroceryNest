import express from "express";
import { addReview, getReviewsByProduct,getReviewsBySeller } from "../controllers/reviewController.js";
import authuser from "../middlewares/authuser.js";
import authseller from "../middlewares/authseller.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authuser, addReview);
reviewRouter.get("/product/:id", getReviewsByProduct);

// Since there's only one seller → return all reviews
reviewRouter.get("/seller", authseller, getReviewsBySeller);

export default reviewRouter;
