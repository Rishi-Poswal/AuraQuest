import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
        uploadedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        title:{
           type: String,
        },
        code:{
            type:String,
        },
        description:{
           type: String,
        },
        credits:{
            type: Number
        },
        branch:{
           type: String,
        },
        chapters:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chapter"
        }],
        faculties:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Faculty"
        }],
        semester:{
            type: Number
        }
    },
    {timestamps:true}
);

export const Course = mongoose.model("Course", courseSchema);