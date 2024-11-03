import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    taskId: {
        type: String,
        unique: true,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },

    type: {
        type: String,
        enum: ['Course', 'Assignment', 'Project'],
        required: true
    },
    aura:{
        type: Number,
        required: true
     },
 
    title: {
        type: String,
        required: true,
        trim: true
    },
    
    description: {
        type: String,
        trim: true
    },
    
    dueDate: {
        type: Date,
        required: true
    },
    
    dueTime: {
        type: String, // Stored as string in HH:MM format
        default: "23:59"
    },

    assignmentMode: {
        type: String,
        enum:['CR_ASSIGNED', 'SELF_ASSIGNED'],
        default: 'SELF_ASSIGNED',
    },
    
    // Reference to the assignment if assigned by CR
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        default: null
    },
    
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'],
        default: 'PENDING'
    },  
}, {
    timestamps: true, 
    

    // indexes: [
    //     { userId: 1, type: 1 },
    //     { dueDate: 1 },
    //     { status: 1 }
    // ]
});


export const Task = mongoose.model("Task", taskSchema);