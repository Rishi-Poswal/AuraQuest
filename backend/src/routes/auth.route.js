import express from "express";
import { signup , verifyEmail ,forgotPassword, resetPassword, logout, checkAuth } from "../controllers/AuthControl/signup.js";
import protectRoute from "../middlewares/protectRoute.js"
import { login } from "../controllers/AuthControl/login.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", protectRoute, checkAuth);


export default router;