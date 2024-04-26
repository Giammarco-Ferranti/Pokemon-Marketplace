import express from "express";
import { createOrder } from "../controllers/index.js";
import { updateStatus } from "../controllers/orders/updateStatus.js";
import { deleteOrder } from "../controllers/orders/deleteOrders.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/update-status", updateStatus);
router.post("/delete", deleteOrder);

export default router;
