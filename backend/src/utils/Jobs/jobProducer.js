import {Queue} from "bullmq";
import redisClient from "./redisClient.js";

const notificationQueue = new Queue('notificationQueue', {
    connection: redisClient
})

const enqueueNotification = async () =>{
    try{
        const job = await notificationQueue.add('notification', {
            title:"Testing bullmq redis",
            description: "It worked"
        })
        console.log(`job added to notification queue with ID ${job.id}`);
    }
    catch(err){
        console.log(`error in enqueueNotification - jobProducer.js`, err);  
    }
}

export {enqueueNotification}
