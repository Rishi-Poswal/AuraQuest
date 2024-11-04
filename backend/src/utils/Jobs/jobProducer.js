import {Queue} from "bullmq";
import redisClient from "./redisClient.js";
import { ApiError } from "../ApiError.js";
import { notificationWorker } from "./jobWorker.js";


const notificationQueue = new Queue('notificationQueue', {
    connection: redisClient
})

const enqueueNotification = async ({type,           //type = ['reminder', 'normal']
                                    targetType,     // = ['single', 'sections', 'batch', 'all']
                                    userId,         //if target is single, then neccessary
                                    sectionList=[], //if target is sections, then needed
                                    batch,          //if target is batch, needed
                                    title,          
                                    description,    //one of title or description is needed
                                    taskId}) =>{    //if type is reminder, taskId is needed
    try{
        
        if(targetType==='single' && !userId){
            throw new ApiError(500, 'No user ID found to send a notification to');
        }
        else if(targetType==='sections' && sectionList.length===0){
            throw new ApiError(500, 'No section found to send a notification to')
        }
        else if(targetType==='batch' && !batch){
            throw new ApiError(500, 'No batch found to send a notification to')
        }

        const job = await notificationQueue.add('notification', {
            type,
            targetType,     
            userId,
            sectionList,    // sectionList = []   if targetType is sections
            batch,
            title,
            description,
            taskId
        })

        console.log(`job added to notification queue with ID ${job.id}`);
    }
    catch(err){
        console.log(`error in enqueueNotification - jobProducer.js`, err);  
    }
}


//REMINDER QUEUE ---------------------------------

const reminderQueue = new Queue('reminderQueue', {
    connection: redisClient
})

const enqueueReminder = async ({targetType,     // = ['single', 'sections', 'batch', 'all']
                                userId,         //if target is single, then neccessary
                                sectionList=[], //if target is sections, then needed
                                batch,          //if target is batch, needed
                                title, 
                                description,    //one of title or description is needed
                                taskId,         //always needed
                                delay}) =>{     //how much time (from current) should it wait
    try{

        if(targetType==='single' && !userId){
            throw new ApiError(500, 'No user ID found to set a reminder for');
        }
        else if(targetType==='sections' && sectionList.length===0){
            throw new ApiError(500, 'No section found to set a reminder for')
        }
        else if(targetType==='batch' && !batch){
            throw new ApiError(500, 'No batch found to set a reminder for')
        }

        const job = await reminderQueue.add('reminder', {
            targetType,     //maybe : single, sections, batch, all
            userId,
            sectionList,    // sectionList = []   if targetType is sections
            batch,
            title,
            description,
            taskId
        },{
            delay: delay
        })

        console.log(`job added to reminder queue with ID ${job.id}`);
    }
    catch(err){
        console.log(`error in enqueueReminder - jobProducer.js`, err);  
    }
}

export {enqueueNotification, enqueueReminder}
