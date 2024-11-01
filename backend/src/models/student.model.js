import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
        userId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required:true,
        },
        isCR:{
            type: Boolean,
            default: false
        },
        aura:{
           type: Number,
           default: 0
        },
        branch:{
            type: String,
        },
        batch:{
            type: Number,
            required: true
        },
        section:{
            type: String,
            required: true
        },
        sectionId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "Section"
        },
        stats:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stats"
        },
        taskList:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }],
        pendingAssignments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment"
        }],
        submittedAssignments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment"
        }],
        currentCourses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }],
        attendance:[{
            courseId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            },
            present:{
                type:NUmber,
                default:0
            },
            absent:{
                type:Number,
                default:0
            }
        }]
  
    },
    {timestamps:true}
);

export const Student = mongoose.model("Student", studentSchema);