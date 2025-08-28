import express from 'express';
import { isSellerAuth, sellerlogin, sellerlogout } from '../controllers/sellerController.js';
import authseller from "../middlewares/authseller.js";

const sellerRouter = express.Router();

sellerRouter.post('/login',sellerlogin);
sellerRouter.post('/is-auth',authseller,isSellerAuth);
sellerRouter.post('/logout',sellerlogout);

export default sellerRouter;