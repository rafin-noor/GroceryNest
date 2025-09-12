import express from 'express';
import {upload} from '../configs/multer.js';
import {addProduct, changeStock, productById, productList, updateProductsWithSellerId} from '../controllers/productController.js';
import authseller from '../middlewares/authseller.js';

const productRouter = express.Router();

productRouter.post('/add',upload.array(["images"]),authseller,addProduct);
productRouter.get('/list',productList)
productRouter.get('/id',productById)
productRouter.post('/stock',authseller,changeStock)
productRouter.post('/migrate-seller-id', authseller, updateProductsWithSellerId); // Migration endpoint

export default productRouter;
