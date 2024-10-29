import mongoose from "mongoose"

const statsSchema = new mongoose.Schema({
        studentId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "Student",
           required:true,
        },
        aura:{
           type: Number,
           default: 0,
        },
        level:{
           type: String,
        },
        currentRank:{
            type: NUmber,
        },
        badges:[{
            type: String //ref it badges object
        }],
        totalLecturesAttended:{
            type: Number,
            default: 0
        },
        totalDailyChallengesCompleted:{
            type: Number,
            default: 0
        },
        totalAssignmentsSubmitted:{
            type: Number,
            default: 0
        },
        achievements:[{
            type: String,
        }],
    },
    {timestamps:true}
);

export const Stats = mongoose.model("Stats", statsSchema);