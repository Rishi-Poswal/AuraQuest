import mongoose from "mongoose"

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assignLink:{
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    targetStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

export const Assignment = mongoose.model("Assignment", assignmentSchema);