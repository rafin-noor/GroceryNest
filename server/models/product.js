import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    weight: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    sellerId: { type: String, required: true }, // seller identification
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model('product', productSchema);
export default Product; 