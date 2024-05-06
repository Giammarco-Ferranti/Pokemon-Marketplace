import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateStatus,
} from "../controllers/index.js";

const router = express.Router();

router.post("/get-all", getAllOrders);
router.post("/", createOrder);
router.post("/update-status", updateStatus);
router.delete("/delete/:id", deleteOrder);

export default router;
