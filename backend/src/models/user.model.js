import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
        username:{
           type: String,
           unique: true,
           required:true,
        },
        email:{
           type: String,
           //unique: true,
           required:true,
        },
        password:{
           type: String,
           required:true,
        },
        role:{
            type: String,
            enum: ['Student', 'admin'],
            default: 'student',
            required: true
        },
        firstName:{
            type: String,
            // required: true
        },
        lastName:{
            
            type: String,
        },
        profilePic:{
            type: String,
            default: 'https://pm1.aminoapps.com/6286/7aee1dce5f8b7980a7960da82389a9902cae280f_00.jpg'
        },
        coverPic:{
            type: String
        },
        gender:{
            type: String,
            enum: ['male','female','other']
        },
        contact:{
            type: String
        },
        age:{
            type: Number
        },
        linkedIn:{
            type:String
        },
        isVerified: {
			type: Boolean,
			default: false,
		},
        userFCMtoken:{
            type:String
        },

        // activiteDaysId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Activity'
        // },
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
    },
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;