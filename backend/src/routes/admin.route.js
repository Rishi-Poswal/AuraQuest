import express from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { addCourse, getCourse, getCourseByCode} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/add-course",addCourse);
router.get("/get-course", protectRoute, getCourse);
router.get("/get-course-by-code/:code", protectRoute, getCourseByCode);



export default router;