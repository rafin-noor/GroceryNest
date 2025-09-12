import express from "express";
import { sendMessage, getMessages, getChatUsers } from "../controllers/chatController.js";
import authuser from "../middlewares/authuser.js";
import authseller from "../middlewares/authseller.js";

const chatRouter = express.Router();

// user routes
chatRouter.post("/user/send", authuser, sendMessage);
chatRouter.get("/user/messages", authuser, getMessages);

// seller routes
chatRouter.post("/seller/send", authseller, sendMessage);
chatRouter.get("/seller/messages", authseller, getMessages);

// seller: get chat users
chatRouter.get("/seller/users", authseller, getChatUsers);


export default chatRouter;



