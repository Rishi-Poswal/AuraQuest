import express from "express"
import { sendForceNotification, storeUserFCMtoken } from "../controllers/notification.controller.js";

const router = express.Router();

//router.post('/storeUserFCMtoken', storeUserFCMtoken);
router.post('/sendForceNotification', sendForceNotification);

export default router