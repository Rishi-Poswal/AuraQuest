import { ApiError } from "../ApiError.js";
import admin from "./FCMconfig.js";
import User from "../../models/user.model.js";
import  Section  from "../../models/section.model.js";
import { Student } from "../../models/student.model.js";

//Final function which uses firebase-admin to send notification to a single device
const sendNotificationToSingleDevice = async (userFCMtoken, title, description, data = {})=>{

    if (!userFCMtoken){     //token is needed to send notification
        throw new ApiError(500, 'CANNOT FIND userFCMtoken')     
    } 
    if (!title || !description){   //what will the user do with an empty notification
        throw new ApiError(500, 'nothing to send in notification')
    } 

    const message = {     //message object will be passed to admin
        notification:{
            title,        
            body:description
        },
        token:userFCMtoken,
        data             //any additional data (optional)
    }

    try{
        //Sending notification
        const response = await admin.messaging().send(message);    
        console.log(`Notification sent ${message}`)
        return response;
    }
    catch(err){
        console.log('err has been occurred in sendNotification.js', err); 
    }
}

//Final function which uses firebase-admin to send notification to a multiple devices (free tier limit is 500 devices)
const sendNotificationToMultipleDevices = async (tokenList, title, description, data = {})=>{

    if (tokens.length ===0){    //if not a single token in tokenList
        throw new ApiError(500, 'No tokens found')     
    } 
    if (!title || !description){  //what will the users do with an empty notification
        throw new ApiError(500, 'nothing to send in notification')
    } 

    const message = {
        tokens:tokenList,   //here, we use tokens field and provide it a tokens array i.e., tokenList
        notification:{
            title,
            body:description
        },
        data
    }

    try{
        //sending notification using sendEachForMulticast feature
        const response = await admin.messaging().sendEachForMulticast(message);

        console.log(`Notification sent to multiple devices${message}`)
        return response;
    }
    catch(err){
        console.log('err has been occurred in sendNotification.js', err); 
    }
}

//----------------------------------------------------------------------------------------------------------------------
//followings are functions which will collect user tokens from db 
//and also make sure they haven't completed the task for which this reminder is to be sent.
//and then call above functions which engage directly with FCM admin


//check task completion and retrieve token for a single student 
const sendReminderToSingleStudent = async (userId, title, description, taskId) => {
   try{
      //CHECKING COMPLETION OF TASK:-
      //get student having userId and whose taskList include given taskId
      const student = await Student.findOne(
        {userId: userId, taskList:taskId}
      );
       
      if(!student){     //if we dont get any student object=> he have completed the task or there is not student with this userId
        console.log(`student not found`);
        return;
      }
      
      //RETRIEVING TOKEN:-
      //get user(student) object as it contains the token
      const user = await User.findById(userId);
      const userFCMtoken = user.userFCMtoken;

      if(userFCMtoken){    //send notification if the token is not null
        await sendNotificationToSingleDevice(userFCMtoken, title, description);
      }
   }
   catch(err){
       console.log(`err in sendReminderToSingleUser (sendNotification.js) `, err);
   }
}

//check task completion, make batches of tokens (acc to section) and send reminder
const sendReminderToSections= async (sectionList, title, description, taskId) => {
    try{
        //looping (using for of) over sectionList to make batches of tokens (as we cant send more than 500 tokens at once, so no risking)
        for(const sectionName of sectionList){
           
            //mongodb aggregation pipelining
            const result = await Section.aggregate([
                //stage 1 : select that section having sectionName
                {$match: {sectionName: sectionName}},
                
                //stage 2: unwinding or spreading students array (which was in section) into multiple documents
                {$unwind: "$students"},
                
                //stage 3: left join of incoming collection with Student collection, by using equality check on 
                //students field in input collection and _id in Student collection, and storing corresponding docs under studentDetails (an array)
                {$lookup: 
                    {
                       from: "students",
                       localField: "students",
                       foreignField: "_id",
                       as: "studentDetails"
                    }
                },
                
                //stage 4: spreading studentDetails array (here we will have only one element in it) into multiple docs
                {$unwind: "$studentDetails"},
                
                //stage 5: now include those docs only where taskList array includes taskId (those who are not included, means they already completed the task)
                {$match : 
                  {"studentDetails.taskList": taskId}
                },
            
                //stage 6: left join of incoming with User collection, by equalling studentDetails.userId = _id (User)
                { $lookup: 
                    {
                        from: "users",
                        localField: "studentDetails.userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                //stage 7: spread userDetails (here, only one element will be present)
                { $unwind: "$userDetails" },
                
                //stage 8: choosing which fields to have in the resulting collection, we want only tokens
                { $project: { token: "$userDetails.userFCMtoken" } }
            ])

            const tokenList = result.map(doc => doc.token)   //map will create an array 
                                    .filter((token)=>{       //filter will remove null or undefined tokens
                                       if(token) return true;
                                       else return false;
                                    });
            
            //call sendNotificationToMultipleDevices and provide it tokenList
            await sendNotificationToMultipleDevices(tokenList,title,description);
        }

    }
    catch(err){
        console.log(`err in sendRemindertoSections (sendNotification.js) `, err);
    }
}

//
const sendReminderToAllStudents= async (title, description, taskId) => {
    try{
        //MONGODB AGGREGATION PIPELINE:-
        const res = await Student.aggregate([
            //Stage 1: select those student docs whose taskList contains taskId
            {$match: {taskList: taskId}},

            //Stage 2: left join of input collection with User collection, by matching Student.userId = User._id
            {$lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails"
            }},
            
            //stage 3: spread userDetails (here, only one element will be present)
            {$unwind : "$userDetails"},
             
            //stage 4: removing unnecessary fields, and including only tokens
            {$project: {token: "$userDetails.userFCMtoken"}}
        ])
        

        const tokenAll = result.map(user => user.userFCMtoken)  //converts the array of docs into array of tokens
                               .filter(token => token);        //removes null tokens (uses truthy and falsy expressions)
        
        let tokenList=[];      //empty tokens array to make batches
        let cnt=0;             //to decide the max size of tokens array to pass
        
        //MAKING BATCHES OF TOKENS AND SENDING
        for(const token of tokenAll){   
            cnt++;
            tokenList.push(token);

            if(cnt===400){      
                //finally send tokenList to this function
                await sendNotificationToMultipleDevices(tokenList,title,description);
                tokenList=[];   //for next iterations
                cnt=0;
            }
        }

    }
    catch(err){
        console.log(`err in sendReminderToAllStudents (sendNotification.js) `, err);
    }
}

//-------------------------------------------------------------------------------------------------------------------
//Following deals with normal notifications, they collect user tokens from db (no need to check task completion)

const sendNotificationToSingleUser = async (userId, title, description) => {
    try{
        //get the user with given userId
       const user = await User.findById(userId)

        //get token from user 
       const userFCMtoken = user.userFCMtoken;
         
       //check if token is not null or undefined
       if(userFCMtoken){
         //send notification
         await sendNotificationToSingleDevice(userFCMtoken, title, description);
       }
    }
    catch(err){
        console.log(`err in sendNotificationToSingleUser (sendNotification.js) `, err);
    }
}
 
 const sendNotificationToSections= async (sectionList, title, description) => {
     try{
         //looping (using for of) over sectionList to make batches of tokens
         for(const sectionName of  sectionList){
 
             const result = await Section.aggregate([
                //stage 1 : select section having sectionName
                {$match: {sectionName: sectionName}},
                
                //stage 2: spreading students array into multiple docs
                {$unwind: "$students"},
                
                //stage 3: left join of incoming collection with Student collection, matching students(input) with _id(Student)
                {$lookup: 
                    {
                       from: "students",
                       localField: "students",
                       foreignField: "_id",
                       as: "studentDetails"
                    }
                },
                
                //stage 4: spreading studentDetails array 
                {$unwind: "$studentDetails"},
                
                //stage 5: left join of incoming with User collection, by matching studentDetails.userId = _id (User)
                { $lookup: 
                    {
                        from: "users",
                        localField: "studentDetails.userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                
                //stage 6: spreading studentDetails array 
                { $unwind: "$userDetails" },
                
                //including only token field
                { $project: { token: "$userDetails.userFCMtoken" } }
             ])
             
             //converting result having doc objects into array having tokens and filtering null tokens
             const tokenList = result.map(doc => doc.token)
                                     .filter((token)=>{
                                        if(token) return true;
                                        else return false;
                                     });
             //send notitication
             await sendNotificationToMultipleDevices(tokenList,title,description);
         }
 
     }
     catch(err){
         console.log(`err in sendNotificationToSections (sendNotification.js) `, err);
     }
 }
 
 const sendNotificationToAllUsers = async (title, description) => {
     try{
         //get all users whose userFCMtoken is not null
         const result = await User.find(
             {         
                userFCMtoken: {$ne: null}
             }
         )
         //making an arr of tokens with valid tokens
         const tokenAll = result.map(user => user.userFCMtoken).filter(token=> token);
         
         let tokenList=[];
         let cnt=0;
         
         //making batches of token
         for(const token of tokenAll){
             cnt++;
             tokenList.push(token);
 
             if(cnt===400){      
                //send notification
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