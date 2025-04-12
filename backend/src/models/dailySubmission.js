import mongoose from "mongoose";

const DailySubmissionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  challengeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Challenge", 
    required: true 
  },
  solution: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  date: {
        type: String,
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const DailySubmission =  mongoose.model("DailySubmission", DailySubmissionSchema);