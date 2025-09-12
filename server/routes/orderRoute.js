import express from 'express';
import authuser from '../middlewares/authuser.js';
import {getAllrOrders, getUserOrders, placeOrderCOD,placeOrderOnline, markOrderPaid} from "../controllers/orderController.js";
import authseller from '../middlewares/authseller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authuser,placeOrderCOD)
// New Online Payment route
orderRouter.post('/online', authuser, placeOrderOnline);
orderRouter.get('/user', authuser,getUserOrders)
orderRouter.get('/seller',authseller,getAllrOrders)
orderRouter.put('/mark-paid/:id', authseller, markOrderPaid);

export default orderRouter;



