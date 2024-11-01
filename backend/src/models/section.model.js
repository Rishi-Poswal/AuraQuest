import mongoose from "mongoose"

const sectionSchema = new mongoose.Schema({
        sectionName: {
            type:String,
        },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }],
        CRs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }],
        assignments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment"
        }],
        // lectureSchedule: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Timetable"
        // }
    },
    {timestamps:true}
);

export const Section = mongoose.model("Section", sectionSchema);