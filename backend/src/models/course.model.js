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
            unique: true,
            required: true,
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
        semester:{
            type: Number
        },
        chapters:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chapter"
        }],
        faculties:[{
            // type: mongoose.Schema.Types.ObjectId,
            type: String ,
            // ref:"Faculty"
        }],
        Announcements: [{
            title: String,
            message: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            postedAt: {
                type: Date,
                default: Date.now,
            },
        }],
        assignments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment"
        }],
    },
    {timestamps:true}
);

export const Course = mongoose.model("Course", courseSchema);