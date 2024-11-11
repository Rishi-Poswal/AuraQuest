import Redis from "ioredis";   //using 'ioredis' instead of 'redis' as it is more compatible with bullmq

//configuring redis client using redis cloud credentials... initiating the client will implicitly connect to redis cloud
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null
})

//Redis event listeners
redisClient.on('connect', () => {
    console.log('Connected to Redis Cloud');
});
  
redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redisClient;





//USING npm redis (not compatible with bullmq) :-

// import {createClient} from "redis";

// const redisClient = createClient({
//     password: '',
//     socket: {
//         host: '',
//         port: 
//     }
// });

// redisClient.on('error', (err)=>{
//     console.log('redis client encountered a error ... see redisClient.js', err);
// })

// await redisClient.connect();

// export default redisClient;