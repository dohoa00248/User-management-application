import productService from "../services/product.js";
const createProduct = async (req, res) => {
    try {
        let productData = req.body;
        console.log(productData);
        const product = await productService.createProduct(productData);
        res.status(201).json({ message: "Create product successfully", product: product });
    } catch (error) {
        res.status(404).json({ message: "Fail to create product !" });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        let productData = req.body;
        console.log(productData);
        const product = await productService.updateProduct(id, productData);
        res.status(201).json({ message: "update product successfully", product: product });
    } catch (error) {
        res.status(404).json({ message: "Fail to update product !" });
    }
}
export default {
    createProduct,
    updateProduct
}