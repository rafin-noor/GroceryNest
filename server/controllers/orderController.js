import Product from "../models/product.js";
import Order from "../models/order.js";

// Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body; 
        const userId = req.userId; // from middleware
        if (!userId) { 
            return res.json({ success: false, message: "User not authorized" }); 
        }
        if (!address || !items || items.length === 0) { 
            return res.json({ success: false, message: "Invalid Data" }); 
        }
        
        let subtotal = await items.reduce(async (acc, item) => {
           const product = await Product.findById(item.product);
           const priceToUse = product.offerPrice > 0 ? product.offerPrice : product.price;
           return (await acc) + priceToUse * item.quantity;
        }, 0);

        // Add tax (2%) 
        const tax = Math.floor(subtotal * 0.02); 
        let amount = subtotal + tax;
        //  Add delivery charge (fixed 50 for example) 
        const deliveryCharge = 50;
        // Final amount 
        const grandTotal = amount + deliveryCharge;

        await Order.create({ 
            userId, 
            items, 
            amount, // subtotal + tax 
            deliveryCharge, // new 
            grandTotal, // new 
            address, 
            paymentType: "COD", 
        });
        return res.json({ success: true, message: "Order Placed Successfully" });    
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

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

// Place Order Online (bKash): /api/order/online
export const placeOrderOnline = async (req, res) => {
    try {
        const { items, address, bkashNumber, bkashPin } = req.body;
        const userId = req.userId;

        if (!userId) return res.json({ success: false, message: "User not authorized" });
        if (!address || !items || items.length === 0 || !bkashNumber || !bkashPin) {
            return res.json({ success: false, message: "Invalid Data" });
        }

        //  Validate bKash number and PIN format
        const bkashNumberRegex = /^01\d{9}$/; // 11 digits starting with 01
        const bkashPinRegex = /^\d{5}$/;      // exactly 5 digits

        if (!bkashNumberRegex.test(bkashNumber)) {
            return res.json({ success: false, message: "Invalid bKash number format!" });
        }
        if (!bkashPinRegex.test(bkashPin)) {
            return res.json({ success: false, message: "Invalid bKash PIN format!" });
        }

        // Calculate subtotal
        let subtotal = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            const priceToUse = product.offerPrice > 0 ? product.offerPrice : product.price;
            return (await acc) + priceToUse * item.quantity;
        }, 0);

        const tax = Math.floor(subtotal * 0.02);
        let amount = subtotal + tax;
        const deliveryCharge = 50;
        const grandTotal = amount + deliveryCharge;

        await Order.create({
            userId,
            items,
            amount,
            deliveryCharge,
            grandTotal,
            address,
            paymentType: "Online",
            isPaid: true,
            bkashNumber,
            bkashPin,
            paymentStatus: "Paid",
        });

        return res.json({ success: true, message: "Order placed and payment successful." });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Mark Order as Paid (only for COD)
export const markOrderPaid = async (req, res) => {
    try {
        const { id } = req.params;

        // Find order
        const order = await Order.findById(id);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Only COD orders can be marked manually
        if (order.paymentType !== "COD") {
            return res.json({ success: false, message: "Only COD orders can be marked as paid manually" });
        }

        // If already paid
        if (order.isPaid) {
            return res.json({ success: false, message: "Order already marked as paid" });
        }

        // Update order
        order.isPaid = true;
        order.paymentStatus = "Paid";
        await order.save();

        return res.json({ success: true, message: "Order marked as Paid successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};





