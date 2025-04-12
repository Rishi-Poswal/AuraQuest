import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema({
    topic: { 
        type: String, 
        required: true 
    },
    difficulty: {
        type: String, 
    },
    content: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
    },
    date: {
        type: String,
    },
    score: { 
        type: Number, 
        default: 50 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Challenge =  mongoose.model("Challenge", ChallengeSchema);
