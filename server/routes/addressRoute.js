import express from 'express';
import authuser from '../middlewares/authuser.js';
import { addAddress,getAddress } from '../controllers/addressController.js';

const addressRouter = express.Router();

addressRouter.post('/add',authuser, addAddress);
addressRouter.get('/get',authuser, getAddress);

export default addressRouter;
