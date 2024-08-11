import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    type: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        trim: true
    }
}, {
    timestamps: true  // Tự động thêm createdAt và updatedAt
})

const Product = mongoose.model("Product", productSchema);

export default Product;
