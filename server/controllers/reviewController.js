import Review from "../models/review.js";
import Product from "../models/product.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.json({ success: false, message: "Rating and comment required" });
    }

    const review = await Review.create({
      productId,
      userId: req.userId,
      rating,
      comment,
    });

    return res.json({ success: true, review });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get reviews for a product
export const getReviewsByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ productId: id }).populate("userId", "name email");
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// controllers/reviewController.js
export const getReviewsBySeller = async (req, res) => {
  try {
    // Since there is only one seller → return all reviews
    const reviews = await Review.find({})
      .populate("userId", "name email")
      .populate("productId", "name");

    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


