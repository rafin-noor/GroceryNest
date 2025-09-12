import Wishlist from "../models/wishlist.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        if (!productId) return res.json({ success: false, message: "ProductId is required" });

        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) wishlist = await Wishlist.create({ userId, products: [] });

        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        res.json({ success: true, message: "Added to wishlist" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) return res.json({ success: false, message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(id => id !== productId);
        await wishlist.save();

        res.json({ success: true, message: "Removed from wishlist" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
// Get user's wishlist
export const getWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        let wishlist = await Wishlist.findOne({ userId }).populate('products');
        if (!wishlist) wishlist = { products: [] };

        res.json({ success: true, products: wishlist.products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};



