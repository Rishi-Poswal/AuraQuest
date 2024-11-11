import express from "express"
import { getAuraDistribution, getStudentActivity, getStudentAttendance, getStudentStats } from "../controllers/Dashboard/dashboard.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get('/getStats',protectRoute, getStudentStats);
router.get('/attendance',protectRoute, getStudentAttendance);
router.get('/aura-distribution',protectRoute, getAuraDistribution);
router.get('/studentActivity',protectRoute, getStudentActivity);


export default router