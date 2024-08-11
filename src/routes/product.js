import express from "express";
import productController from "../controllers/product.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello product");
})
router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
export default router;