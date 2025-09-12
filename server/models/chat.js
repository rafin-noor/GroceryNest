import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // user ID or null if seller
    isSeller: { type: Boolean, default: false },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // the user receiving message (for seller only)
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default Chat;
