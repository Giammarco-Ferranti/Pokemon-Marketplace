import express from "express";
import { getProduct, uploadProduct } from "../controllers/index.js";
import { getAllProducts } from "../controllers/products/getAllProducts.js";
import upload from "../middlewares/multer/upload.js";
import { deleteProduct } from "../controllers/products/deleteProduct.js";
import { updateProduct } from "../controllers/products/updateProduct.js";
import { getMostPricy } from "../controllers/products/getMostPricy.js";
import { getProductsByUser } from "../controllers/products/getProductsByUser.js";
import { searchProduct } from "../controllers/products/searchProduct.js";

const router = express.Router();

router.patch("/update/:productId", updateProduct);
router.get("/all", getAllProducts);
router.get("/products/most-expensive", getMostPricy);
router.post("/products/upload", upload.single("image"), uploadProduct);
router.get("/products/search", searchProduct);
router.delete("/delete/:productId", deleteProduct);
router.get("/products/:userId", getProductsByUser);
router.get("/:productId", getProduct);

export default router;
