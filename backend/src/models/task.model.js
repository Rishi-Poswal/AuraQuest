import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        type:{
            type: String
        },
        title:{
           type: String,
        },
        description:{
           type: String,
        },
        dueDate:{
            type: Date
        },
        assignmentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment"
        }
    },
    {timestamps:true}
);

export const Task = mongoose.model("Task", taskSchema);