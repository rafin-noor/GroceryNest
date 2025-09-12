import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js';

// Add Product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files;

        let images_url = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        await Product.create({ 
            ...productData, 
            image: images_url,
            sellerId: process.env.seller_email // Add sellerId when creating product
        });

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


// Get Product List: /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get Single Product by ID: /api/product/:id
export const productById = async (req, res) => {
    try {
        const { id } = req.params; // use params instead of body for GET
        const product = await Product.findById(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Change Product inStock: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });

        res.json({ success: true, message: "Stock Updated" });

    } catch (error) {
        console.log(error.message); // fixed typo
        res.json({ success: false, message: error.message });
    }
};

// Migration utility: Update products without sellerId
export const updateProductsWithSellerId = async (req, res) => {
    try {
        // Update all products that don't have sellerId
        const result = await Product.updateMany(
            { sellerId: { $exists: false } },
            { $set: { sellerId: process.env.seller_email } }
        );
        
        res.json({ 
            success: true, 
            message: `Updated ${result.modifiedCount} products with sellerId`,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


