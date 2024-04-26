import express from "express";
import { getProduct, uploadProduct } from "../controllers/index.js";
import { getAllProducts } from "../controllers/products/getAllProducts.js";
import upload from "../middlewares/multer/upload.js";
import { deleteProduct } from "../controllers/products/deleteProduct.js";
import { updateProduct } from "../controllers/products/updateProduct.js";

const router = express.Router();

router.get("/:productId", getProduct);
router.get("/", getAllProducts);
router.post("/upload", upload.single("image"), uploadProduct);
router.delete("/delete/:productId", deleteProduct);
router.patch("/update/:productId", updateProduct);

export default router;
