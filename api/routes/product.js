import express from "express";
import { getProduct, uploadProduct } from "../controllers/index.js";
import { getAllProducts } from "../controllers/products/getAllProducts.js";
import upload from "../middlewares/multer/upload.js";

const router = express.Router();

router.get("/:productId", getProduct);
router.get("/", getAllProducts);
router.post("/upload", upload.single("image"), uploadProduct);

export default router;
