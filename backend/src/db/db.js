import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("db connected")
    }
    catch(err){
        console.log("MONGODB connection failed db.js", error);
        process.exit(1)
    }
}

export default connectDB