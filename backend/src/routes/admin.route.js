import express from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { addCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/add-course",addCourse);


export default router;