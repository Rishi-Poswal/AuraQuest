import mongoose from "mongoose"

const assignmentSchema = new mongoose.Schema({
        uploadedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
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
        isActive:{
            type:Boolean
        },
        link:{
            type:String
        },
        sectionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section"
        },
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    },
    {timestamps:true}
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);