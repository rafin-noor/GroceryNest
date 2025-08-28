import express from 'express';
import {register, login, isAuth, logout} from '../controllers/userController.js';
import authuser from '../middlewares/authuser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authuser, isAuth);
userRouter.get('/logout', logout);

export default userRouter;
