import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
        studentId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "Student",
        },
        userId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required:true,
        },
        days:[{
            day: {
                type: Date
            },
            auraGained: {
                type: Number,
                default:0
            }
        }]
        
    },
    {timestamps:true}
);

export const Activity = mongoose.model("Activity", activitySchema);