import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'user' },
    products: [{ type: String, ref: 'product' }]
}, { timestamps: true });

const Wishlist = mongoose.models.wishlist || mongoose.model('wishlist', wishlistSchema);
export default Wishlist;
