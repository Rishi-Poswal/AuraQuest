import express from "express"
import { sendForceNotification, storeUserFCMtoken } from "../controllers/notification.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/storeUserFCMtoken', protectRoute, storeUserFCMtoken);
router.post('/sendForceNotification', sendForceNotification);

export default router