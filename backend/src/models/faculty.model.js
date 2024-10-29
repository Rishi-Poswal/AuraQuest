import mongoose from "mongoose"

const facultySchema = new mongoose.Schema({
        userId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required:true,
        },
        fieldsOfStudy:[{
            type: String,
        }],
        joinedIn:{
            type:Date
        },
        degrees:[{
            degreeName:{
                type:String
            },
            from: {
                type:String
            }
        }],
        currentCourses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }],
        currentSections:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }],
       
    },
    {timestamps:true}
);

export const Faculty = mongoose.model("Faculty", facultySchema);