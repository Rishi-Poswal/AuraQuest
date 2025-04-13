import mongoose from "mongoose"
const BRANCH_NAMES = [
    'CSE',
    'EE', 
    'ME', 
    'CE',
    'CHE',
    'ECE',
    'PIE',
    'ECMs',
    'MTE',
    
];
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
        batch:{
            type: Number,
            required: true
        },
        branch: {
            type: String,
            enum: BRANCH_NAMES,
            required: true,
            unique: true
        },
        semester:{
            type: Number,
            required: true,
            min: 1,
            max: 8 
        },
        // stats:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Stats"
        // },
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
                type: Number,
                default:0
            },
            absent:{
                type:Number,
                default:0
            }
        }],
        // activityId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Activity'
        // },
  
    },
    {timestamps:true}
);

export const Student = mongoose.model("Student", studentSchema);