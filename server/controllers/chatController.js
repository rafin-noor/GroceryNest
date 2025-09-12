import Chat from "../models/chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, receiverId } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Message required" });
    }

    const newMsg = await Chat.create({
      senderId: req.userId || null,
      isSeller: req.isSeller || false,
      receiverId: receiverId || null,
      message,
    });

    res.json({ success: true, data: newMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    let messages;

    if (req.isSeller) {
      // Seller: fetch messages for a specific user
      const { userId } = req.query;
      if (!userId)
        return res.status(400).json({ success: false, message: "User ID required" });

      messages = await Chat.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }).sort({ createdAt: 1 });
    } else {
      // User: fetch messages with seller
      messages = await Chat.find({
        $or: [
          { senderId: req.userId },
          { receiverId: req.userId }
        ]
      }).sort({ createdAt: 1 });
    }

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all users who have chatted with seller
export const getChatUsers = async (req, res) => {
  try {
    if (!req.isSeller) return res.status(403).json({ success: false, message: "Not Authorized" });

    const users = await Chat.aggregate([
      {
        $match: { $or: [{ isSeller: false }, { receiverId: { $exists: true } }] },
      },
      {
        $group: { _id: "$senderId" } // group by user ID
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: { _id: "$user._id", name: "$user.name", email: "$user.email" }
      }
    ]);

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark Order as Paid: /api/order/mark-paid/:id
export const markOrderAsPaid = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (order.isPaid) {
            return res.json({ success: false, message: "Order is already marked as paid" });
        }

        order.isPaid = true;
        order.paymentStatus = "Paid";
        await order.save();

        res.json({ success: true, message: "Order marked as paid successfully", order });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



 