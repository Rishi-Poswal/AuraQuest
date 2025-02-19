
import { sendNotificationToSingleDevice } from "../utils/FCM/sendNotification.js";

import  User  from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


const storeUserFCMtoken = async (req,res) =>{
    try{
        const {userFCMtoken} = req.body;
        const userId = req.user._id;  

        const user = await User.findOne({
            $or: [
                // {username: username},
                {_id: userId}
            ]
        })

        if(!user){
            console.log(`user not found - notification controller`);
            return res.status(500).json({message: `Error in storeUserFCMtoken, notification controller`});
        }

        user.userFCMtoken = userFCMtoken;
        await user.save();
        console.log(`userFCmtoken stored `);

        //await sendNotificationToSingleDevice(userFCMtoken, 'Testing', 'Please work');

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
        const {username, title, description} = req.body;

        const user = await User.findOne({username:username});
        const userFCMtoken = user.userFCMtoken;

        const response = await sendNotificationToSingleDevice(userFCMtoken, title, description);
        res.status(200).json({ message: 'Notification sent successfully', response });
    }
    catch(err){
        console.log('err in FCM controller 2', err);
        throw new Error;
    }
}

export {storeUserFCMtoken, sendForceNotification}