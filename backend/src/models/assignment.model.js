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
    targetGroup: {
        type: String,
        enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'],
        default: 'A1'
    },
    targetStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

export const Assignment = mongoose.model("Assignment", assignmentSchema);