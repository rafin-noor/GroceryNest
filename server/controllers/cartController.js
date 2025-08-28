import User from '../models/user.js';

// Update User Cartdata: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.userId;   // ✅ take from middleware, not req.body

        if (!userId) {
            return res.json({ success: false, message: "User not authorized" });
        }

        await User.findByIdAndUpdate(userId, { cartItems });
        res.json({ success: true, message: "Cart is Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

