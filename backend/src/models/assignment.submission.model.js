import mongoose from "mongoose";


const assignmentSubmissionSchema = new mongoose.Schema({
  
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CrAssignment",
        required: true
    },
  
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // Submission link
    submissionLink: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: 'Please provide a valid submission link'
        }
    },
    status: {
        type: String,
        enum: ['SUBMITTED', 'LATE', 'DUE'],
        default: 'DUE',
    },
   
   
}, { 
    timestamps: true,
    // Indexing
    indexes: [
        { assignment: 1, student: 1 },
        { status: 1 }
    ]
});


export const AssignSubmit = mongoose.model("AssignSubmit", assignmentSubmissionSchema);