import express from 'express';
import { isSellerAuth, sellerlogin, sellerlogout } from '../controllers/sellerController.js';
import authseller from "../middlewares/authseller.js";

const sellerRouter = express.Router();

sellerRouter.post('/login',sellerlogin);
sellerRouter.get('/is-auth',authseller,isSellerAuth);
sellerRouter.get('/logout',sellerlogout);

export default sellerRouter;