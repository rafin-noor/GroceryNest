import express from 'express';
import authuser from '../middlewares/authuser.js';
import {getAllrOrders, getUserOrders, placeOrderCOD} from "../controllers/orderController.js";
import authseller from '../middlewares/authuser.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authuser,placeOrderCOD)
orderRouter.get('/user', authuser,getUserOrders)
orderRouter.get('/seller',authseller,getAllrOrders)

export default orderRouter;
