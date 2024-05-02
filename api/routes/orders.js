import express from "express";
import { createOrder } from "../controllers/index.js";
import { updateStatus } from "../controllers/orders/updateStatus.js";
import { deleteOrder } from "../controllers/orders/deleteOrders.js";
import { getAllOrders } from "../controllers/orders/getAllOrders.js";

const router = express.Router();

router.post("/get-all", getAllOrders);
router.post("/", createOrder);
router.post("/update-status", updateStatus);
router.delete("/delete/:id", deleteOrder);

export default router;
