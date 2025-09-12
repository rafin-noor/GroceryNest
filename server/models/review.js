import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const Review = mongoose.models.review || mongoose.model("review", reviewSchema);
export default Review;
