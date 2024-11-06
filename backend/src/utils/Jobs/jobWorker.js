import { Worker } from "bullmq";
import redisClient from "./redisClient.js";
import { enqueueNotification } from "./jobProducer.js";

import {sendReminderToSingleStudent,
        sendReminderToSections,
        sendReminderToAllStudents,

        sendNotificationToSingleUser,
        sendNotificationToSections,
        sendNotificationToAllUsers} from "../FCM/sendNotification.js";

const notificationWorker = new Worker('notificationQueue', async (job)=>{
    try{
        const {type, targetType, userId, sectionList, batch, title, description, taskId} =  job.data;
         
        if(type==='reminder'){
            if(!taskId){
                console.log(`taskId is needed`);
                return null;
            } 

            switch(targetType){
                case 'single': 
                    sendReminderToSingleStudent(userId, title, description, taskId);
                    break;
                case 'sections': 
                    sendReminderToSections(sectionList, title, description, taskId);
                    break;
                // case 'batch': 
                //     sendReminderToBatch(batch, title, description, taskId);
                //     break;
                case 'all': 
                    sendReminderToAllStudents(title, description, taskId);
                    break;                
            }
        }
        else{  //type= 'normal'
            
            switch(targetType){
                case 'single': 
                    sendNotificationToSingleUser(userId, title, description);
                    break;
                case 'sections': 
                    sendNotificationToSections(sectionList, title, description);
                    break;
                // case 'batch': 
                //     sendNotificationToBatch(batch, title, description);
                //     break;
                case 'all': 
                    sendNotificationToAllUsers(title, description);
                    break;                
            }

        }

        console.log(`job with id ${job.id} is done`);
    }
    catch(err){
        console.log(`Error in notificationWorker (jobWorker.js) `, err);
    }
},
{
    connection:redisClient
})





const reminderWorker = new Worker('reminderQueue', async (job)=>{
    try{
        const {targetType, userId, sectionList, batch, title, description, taskId} =  job.data;

        await enqueueNotification({type:'reminder', 
                                   targetType, 
                                   userId, 
                                   sectionList, 
                                   batch, 
                                   title, 
                                   description, 
                                   taskId});
    }
    catch(err){
        console.log(`error in reminderWorker (jobWorker.js)`, err);
    }
},{
    connection:redisClient
})

//notification worker listeners:

notificationWorker.on('error', (error) => {
    console.error('Worker encountered an error: (jobWorker.js)', error);
});

notificationWorker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error (jobWorker.js) ${err.message}`);
});

notificationWorker.on('completed', (job) => {
    console.log(`Job ${job.id} completed! (jobWorker.js)`);
});


//reminder worker listeners:
reminderWorker.on('error', (error) => {
    console.error('Reminder Worker encountered an error: (jobWorker.js)', error);
});

reminderWorker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error (jobWorker.js) ${err.message}`);
});

reminderWorker.on('completed', (job) => {
    console.log(`Job ${job.id} completed! (jobWorker.js)`);
});

export {notificationWorker, reminderWorker}