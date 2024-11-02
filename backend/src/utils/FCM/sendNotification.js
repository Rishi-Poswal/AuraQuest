import { ApiError } from "../ApiError.js";
import admin from "./FCMconfig.js";

const sendNotification = async (userFCMtoken, title, body, data = {})=>{

    if (!userFCMtoken){
        throw new ApiError(500, 'CANNOT FIND userFCMtoken')     
    } 
    if (!title || !body){
        throw new ApiError(500, 'nothing to send in notification')
    } 

    const message = {
        notification:{
            title,
            body
        },
        token:userFCMtoken,
        data
    }

    try{
        const response = await admin.messaging().send(message);
        console.log(`Notification sent ${message}`)
        return response;
    }
    catch(err){
        console.log('err has been occurred in sendNotification.js', err); 
    }
}

export {sendNotification}