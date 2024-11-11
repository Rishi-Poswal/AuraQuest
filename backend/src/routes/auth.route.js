import express from "express";
import { signup , verifyEmail ,forgotPassword, resetPassword, logout } from "../controllers/AuthControl/signup.js";

import { login } from "../controllers/AuthControl/login.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);



export default router;