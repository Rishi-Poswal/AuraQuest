import { sendNotification } from "../utils/FCM/sendNotification.js";
import  User  from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const storeUserFCMtoken = async (req,res) =>{
    try{
        const {userFCMtoken, username} = req.body;
        // const user = req.user;  //after middleware is written---------<<<<<<<<<<

        const user = await User.findOne({
            $or: [
                {username: username},
                //{_id: user._id}
            ]
        })

        if(!user){
            console.log(`user not found - notification controller`);
            return res.status(500).json({message: `Error in storeUserFCMtoken, notification controller`});
        }

        user.userFCMtoken += userFCMtoken;
        await user.save();
        console.log(`userFCmtoken stored `);

        await sendNotification(userFCMtoken, 'Testing', 'Please work');

        return res.status(200).json({message:'Token stored', success:true})
    }
    catch(err){
        console.log('err in storeUserFCMtoken notification controller', err);
        throw new ApiError(500, 'Error in storeUserFCMtoken, notification controller');
    }
}


//to check notification functionality
const sendForceNotification = async (req,res) =>{
    try{
        const {userFCMtoken, title, body} = req.body;

        const response = await sendNotification(userFCMtoken, title, body);
        res.status(200).json({ message: 'Notification sent successfully', response });
    }
    catch(err){
        console.log('err in FCM controller 2', err);
        throw new Error;
    }
}

export {storeUserFCMtoken, sendForceNotification}