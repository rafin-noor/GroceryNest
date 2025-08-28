import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        mongoose.connection.on('connected',()=> console.log("Database connected successfully"));
        await mongoose.connect(`${process.env.MONGODB_URI}/GroceryNest`)
    } catch (error){
        console.error("Database connection failed:", error.message);

    }
}

export default connectDB;
