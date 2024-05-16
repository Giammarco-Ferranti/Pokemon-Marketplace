import express from "express";
import upload from "../middlewares/multer/upload.js";
import {
  deleteProduct,
  getAllProducts,
  getMostPricy,
  getProduct,
  getProductsByUser,
  searchProduct,
  updateProduct,
  uploadProduct,
} from "../controllers/index.js";
import { initializeProductsDb } from "../middlewares/Db-Initialize/ProductsInit.js";

const router = express.Router();

router.patch("/update/:productId", updateProduct);
router.get("/all", getAllProducts);
router.get("/products/most-expensive", getMostPricy);
router.post("/products/upload", uploadProduct);
router.get("/products/search", searchProduct);
router.delete("/delete/:productId", deleteProduct);
router.get("/products/:userId", getProductsByUser);
router.get("/:productId", getProduct);

export default router;
