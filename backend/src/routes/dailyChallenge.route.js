import express from "express";
import protectRoute from "../middlewares/protectRoute.js"
import {get_all_daily_challenges, get_daily_challenge , submit_solution, check_submission_status} from "../controllers/DailyChallenge/dailyChallenge.controller.js";

const router = express.Router();


router.get("/get_daily_challenge", get_daily_challenge);
router.get("/get_all_daily_challenges", get_all_daily_challenges);
router.post("/submit_solution", protectRoute, submit_solution);
router.get("/submission/:challengeId", protectRoute, check_submission_status);


export default router;