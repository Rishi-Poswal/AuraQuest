import express from "express";
import protectRoute from "../middlewares/protectRoute.js"

import { addCourse, getCourse, getCourseByCode} from "../controllers/course.controller.js";
import { approve_challenge, gen_daily_challenge } from "../controllers/DailyChallenge/dailyChallenge.controller.js";

const router = express.Router();

router.post("/add-course",addCourse);
router.get("/get-course", protectRoute, getCourse);
router.get("/get-course-by-code/:code", protectRoute, getCourseByCode);


//daily challenges routes for admin:
router.post("/gen_daily_challenge", gen_daily_challenge);
router.post("/approve/:id", approve_challenge);


export default router;