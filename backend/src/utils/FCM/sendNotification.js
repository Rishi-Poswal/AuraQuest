import { ApiError } from "../ApiError.js";
import admin from "./FCMconfig.js";
import User from "../../models/user.model.js";
import { Section } from "../../models/section.model.js";
import { Student } from "../../models/student.model.js";

const sendNotificationToSingleDevice = async (userFCMtoken, title, description, data = {})=>{

    if (!userFCMtoken){
        throw new ApiError(500, 'CANNOT FIND userFCMtoken')     
    } 
    if (!title || !body){
        throw new ApiError(500, 'nothing to send in notification')
    } 

    const message = {
        notification:{
            title,
            body:description
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

const sendNotificationToMultipleDevices = async (tokenList, title, description, data = {})=>{

    if (tokens.length ===0){
        throw new ApiError(500, 'No tokens found')     
    } 
    if (!title || !body){
        throw new ApiError(500, 'nothing to send in notification')
    } 

    const message = {
        tokens:tokenList,
        notification:{
            title,
            body:description
        },
        data
    }

    try{
        const response = await admin.messaging().sendEachForMulticast(message);

        console.log(`Notification sent to multiple devices${message}`)
        return response;
    }
    catch(err){
        console.log('err has been occurred in sendNotification.js', err); 
    }
}


//followings are functions which will collect user tokens (and check) 
//and then call above functions which engage directly with FCM admin

const sendReminderToSingleStudent = async (userId, title, description, taskId) => {
   try{
      const student = await Student.findOne(
        {userId: userId, taskList:taskId}
      );

      if(!student){
        console.log(`student not found`);
        return;
      }

      const userFCMtoken = student.userFCMtoken;

      if(userFCMtoken){
        await sendNotificationToSingleDevice(userFCMtoken, title, description);
      }
   }
   catch(err){
       console.log(`err in sendReminderToSingleUser (sendNotification.js) `, err);
   }
}

const sendReminderToSections= async (sectionList, title, description, taskId) => {
    try{

        for(const sectionName of  sectionList){

            const result = await Section.aggregate([
                {$match: {sectionName: sectionName}},

                {$unwind: "$students"},

                {$lookup: 
                    {
                       from: "students",
                       localField: "students",
                       foreignField: "_id",
                       as: "studentDetails"
                    }
                },

                {$unwind: "$studentDetails"},
 
                {$match : 
                  {"studentDetails.taskList": taskId}
                },

                { $lookup: 
                    {
                        from: "users",
                        localField: "studentDetails.userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
        
                { $unwind: "$userDetails" },
        
                { $project: { token: "$userDetails.userFCMtoken" } }
            ])

            const tokenList = result.map(doc => doc.token);

            await sendNotificationToMultipleDevices(tokenList,title,description);
        }

    }
    catch(err){
        console.log(`err in sendRemindertoSections (sendNotification.js) `, err);
    }
}

const sendReminderToAllStudents= async (title, description, taskId) => {
    try{

        const result = await Student.find(
            {  
                taskList: taskId,       //check to see if student has done the task already
                userFCMtoken: {$ne: null}
            },
            {
                _id:0,
                userFCMtoken:1
            }
        )

        const tokenAll = result.map(user => user.userFCMtoken);
        
        let tokenList=[];
        let cnt=0;

        for(const token of tokenAll){
            cnt++;
            tokenList.push(token);

            if(cnt===400){      //need to make batches as can't send notifications to more than 500 people at once;
                await sendNotificationToMultipleDevices(tokenList,title,description);
                tokenList=[];
                cnt=0;
            }
        }

    }
    catch(err){
        console.log(`err in sendReminderToAllStudents (sendNotification.js) `, err);
    }
}


//Following deals with normal notifications (no need to check taskId)

const sendNotificationToSingleUser = async (userId, title, description) => {
    try{
       const user = await User.findById(userId)

       const userFCMtoken = user.userFCMtoken;
 
       if(userFCMtoken){
         await sendNotificationToSingleDevice(userFCMtoken, title, description);
       }
    }
    catch(err){
        console.log(`err in sendNotificationToSingleUser (sendNotification.js) `, err);
    }
}
 
 const sendNotificationToSections= async (sectionList, title, description) => {
     try{
 
         for(const sectionName of  sectionList){
 
             const result = await Section.aggregate([
                 {$match: {sectionName: sectionName}},
 
                 {$unwind: "$students"},
 
                 {$lookup: 
                     {
                        from: "students",
                        localField: "students",
                        foreignField: "_id",
                        as: "studentDetails"
                     }
                 },
 
                 {$unwind: "$studentDetails"},
 
                 { $lookup: 
                     {
                         from: "users",
                         localField: "studentDetails.userId",
                         foreignField: "_id",
                         as: "userDetails"
                     }
                 },
         
                 { $unwind: "$userDetails" },
         
                 { $project: { token: "$userDetails.userFCMtoken" } }
             ])
 
             const tokenList = result.map(doc => doc.token)
                                     .filter((token)=>{
                                        if(token) return true;
                                        else return false;
                                     });
 
             await sendNotificationToMultipleDevices(tokenList,title,description);
         }
 
     }
     catch(err){
         console.log(`err in sendNotificationToSections (sendNotification.js) `, err);
     }
 }
 
 const sendNotificationToAllUsers = async (title, description) => {
     try{
 
         const result = await User.find(
             {         
                userFCMtoken: {$ne: null}
             }
         )
 
         const tokenAll = result.map(user => user.userFCMtoken);
         
         let tokenList=[];
         let cnt=0;
 
         for(const token of tokenAll){
             cnt++;
             tokenList.push(token);
 
             if(cnt===400){      //need to make batches as can't send notifications to more than 500 people at once;
                 await sendNotificationToMultipleDevices(tokenList,title,description);
                 tokenList=[];
                 cnt=0;
             }
         }
 
     }
     catch(err){
         console.log(`err in sendNotificationToAllUsers (sendNotification.js) `, err);
     }
 }

export {
    sendNotificationToSingleDevice,
    sendNotificationToMultipleDevices, 
    sendReminderToSingleStudent,
    sendReminderToSections,
    sendReminderToAllStudents,
    sendNotificationToSingleUser,
    sendNotificationToSections,
    sendNotificationToAllUsers
}