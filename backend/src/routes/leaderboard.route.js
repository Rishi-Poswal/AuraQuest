import express from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { get_leaderboard } from "../controllers/Leaderboard/leaderboard.controller.js";

const router = express.Router();

router.get("/get_leaderboard", protectRoute, get_leaderboard);

export default router;