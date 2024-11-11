import mongoose from "mongoose"

const chapterSchema = new mongoose.Schema({
        title:{
           type: String,
        },
        description:{
           type: String,
        },
        // courseId:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Course"
        // },
        topics:[{
            type:String
        }],
        chapterNumber:{
            type: Number
        }
    },
    {timestamps:true}
);

export const Chapter = mongoose.model("Chapter", chapterSchema);