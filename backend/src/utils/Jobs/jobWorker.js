import { Worker } from "bullmq";
import redisClient from "./redisClient.js";

const notificationWorker = new Worker('notificationQueue', async (job)=>{
    console.log(`job done with title ${job.data.title}`);
},
{
    connection:redisClient
})

notificationWorker.on('error', (error) => {
    console.error('Worker encountered an error:', error);
});

notificationWorker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
});

notificationWorker.on('completed', (job) => {
    console.log(`Job ${job.id} completed!`);
});

export {notificationWorker}