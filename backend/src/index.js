import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/db.js";

dotenv.config()
const port = process.env.PORT || 8000


connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running at port ${port}`)
    })

}).catch((err)=>{
   console.log(`Mongodb connection failure`, err);
})