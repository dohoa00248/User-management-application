
import Product from "../models/product.js";

const createProduct = async (productData) => {
    try {
        const { name, type, price } = productData;
        console.log(productData);
        const product = new Product({ name, type, price });
        const saveProduct = await product.save();
        console.log("Create product successfully !");
        return saveProduct;
        // res.status(201).json({ message: "Create product successfully", product: product });
    } catch (error) {
        console.log("Fail to create product !");
        // res.status(404).json({ message: "Fail to create product !" });
    }
}
const updateProduct = async (id, productData) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        console.log("Check:", updateProduct);
        if (!updateProduct) {
            console.log("Product not found!");
        }
        else {
            console.log("Update Product successfully !", updateProduct);
        }
        return updateProduct; // Trả về kết quả của việc cập nhật người dùng
    } catch (error) {
        console.log("Error:", error.message);
    }
}
export default {
    createProduct,
    updateProduct
}