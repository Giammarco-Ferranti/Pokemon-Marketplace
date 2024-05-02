import express from "express";
import { login, signUp } from "../controllers/index.js";
import { getBestUsers } from "../controllers/user/getBestUsers.js";

const router = express.Router();

router.get("/best-users", getBestUsers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
