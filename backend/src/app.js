import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from '../routes/user.route.js';
import authRoutes from '../routes/auth.route.js';
dotenv.config()

const app = express();

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

app.use("/api/auth", authRoutes);

// app.get('/api/testing', (req,res)=>{
//     res.send('testing cors')
// });

export {app}