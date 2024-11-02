import { getToken } from "firebase/messaging";
import { messaging } from "./FCMconfig";
import axios from "axios";


const getUserFCMtoken = async ()=>{
    try{
      const token = await getToken(messaging, {vapidkey: import.meta.env.VITE_VAPID_KEY})
      console.log(token);

      sendFCMtokenToServer(token)

    }catch(err){
      console.log(`error occured while retrieving FCM token`,err)
    }
}

const sendFCMtokenToServer = async (token)=>{
    try{
        const response = 
        await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/notification/storeUserFCMtoken`, 
            {userFCMtoken:token});
        
        if(response.success){
            console.log(`token stored in server successfully`); 
        }
        else{
            console.log(`unsuccessful attempt to store token in server`);
        }
    
    }catch(error){
        console.log(`error while sending user token to server`, error);
    }
}


const requestNotificationPermission = ()=>{

    Notification.requestPermission()
    .then((permission)=>{
      if(permission==='granted'){
        getUserFCMtoken()
      }
      else{
        console.log(`notifications not allowed`)
      }

    }).catch((err) => {
      console.log(`error occured in requesting permission`, err);  
    })
}

export {requestNotificationPermission, sendFCMtokenToServer}