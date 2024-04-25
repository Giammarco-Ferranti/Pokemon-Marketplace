import express from "express";
import { createOrder } from "../controllers/index.js";

const router = express.Router();

router.post("/", createOrder);

export default router;
