import Product from "../models/product.js";
import Order from "../models/order.js";
import mongoose from "mongoose";


// Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;   // ✅ get userId from middleware

        if (!userId) {
            return res.json({ success: false, message: "User not authorized" });
        }

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" });
        }

        // ✅ Calculate Amount Using Items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) continue;
            amount += product.offerPrice * item.quantity; // fixed typo
        }

        // Add tax charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
          userId,
          items,
          amount,
          address,
          paymentType: "COD",
        });


        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Orders by User ID: /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;   // ✅ from middleware
        if (!userId) {
            return res.json({ success: false, message: "User not authorized" });
        }

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product address")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Get All Orders(for seller) /api/order/seller
export const getAllrOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



