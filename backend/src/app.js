import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/taskRoutes.js'
import notificationRoutes from './routes/notification.route.js';
import { enqueueNotification, enqueueReminder } from "./utils/Jobs/jobProducer.js";
import scheduleRoutes from './routes/schedule.routes.js';
import dashboardRoutes from './routes/dashboard.route.js';
import adminRoutes from './routes/admin.route.js';
import dailyChallengeRoutes from './routes/dailyChallenge.route.js';

dotenv.config()
    

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials:true
}))



// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Main app working' });
});

app.use("/api",userRoutes);

// app.use("/api/user",userRoutes);

//authentication routes
app.use("/api/auth", authRoutes);

//personal task handling routes
app.use("/api/task", taskRoutes);

app.use("/api/notification", notificationRoutes);

app.use("/api/events", scheduleRoutes);

//dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Admin tasks
app.use("/api/admin", adminRoutes);

//user daily challenge
app.use("/api/dailyChallenge",dailyChallengeRoutes);


export {app}