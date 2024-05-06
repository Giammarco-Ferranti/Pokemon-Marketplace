import express from "express";
import { login, signUp, getBestUsers } from "../controllers/index.js";

const router = express.Router();

router.get("/best-users", getBestUsers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
