import mongoose from "mongoose"

const BRANCH_NAMES = [
    'Computer Science and Engineering',
    'Electrical Engineering', 
    'Mechanical Engineering', 
    'Civil Engineering',
    'Chemical Engineering',
    'Electronics and Communication Engineering',
    'Production and Industrial Engineering',
    'Electronics and Computational Mechanics',
    'Materials Engineering'
    
];

const sectionSchema = new mongoose.Schema({
        branch: {
            type: String,
            enum: BRANCH_NAMES,
            required: true,
            unique: true
        },
        sectionName: {
            type:String,
            required: true,
        },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }],
        CRs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            validate: {
                validator: function(v) {
                    return this.classRepresentatives.length <= 2;
                },
                message: 'A section can have maximum 2 Class Representatives'
            }
        }],
        assignments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment"
        }],
        eventSchedule: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Timetable"
        }]
    },
    {timestamps:true}
);

const Section = mongoose.model("Section", sectionSchema);

export default Section