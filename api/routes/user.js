import express from "express";
import { login, signUp, getBestUsers } from "../controllers/index.js";
import { initializeUserDb } from "../middlewares/Db-Initialize/UserInit.js";
const router = express.Router();

router.get("/best-users", getBestUsers);
router.post("/signup", initializeUserDb, signUp);
router.post("/login", login);

export default router;
