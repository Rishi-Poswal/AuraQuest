import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials:true
}))


app.get('/', (req,res)=>{
    res.send('ok')
});

// app.get('/api/testing', (req,res)=>{
//     res.send('testing cors')
// });

export {app}