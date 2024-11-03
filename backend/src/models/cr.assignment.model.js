import mongoose from "mongoose";


const crAssignmentSchema = new mongoose.Schema({
    // The CR who is uploading the assignment
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
 
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },

    assignment: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        // Assignment resource link (provided by CR)
        resourceLink: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
                },
                message: 'Please provide a valid resource URL'
            }
        },
     
        subject: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        dueTime:{
            type: String,
            required: true
        },
        Aura:{
            type: Number,
            default : 100
        },
       
    },
   
}, { 
    timestamps: true,
    indexes: [
        { branch: 1, section: 1 },
        { uploadedBy: 1, status: 1 }
    ]
});

export const CrAssignment = mongoose.model("CrAssignment", crAssignmentSchema);