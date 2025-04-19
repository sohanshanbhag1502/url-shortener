import { createClient } from "redis"
import dotenv from "dotenv";

dotenv.config()

const redisURI=process.env.REDIS_URI;
if (!redisURI){
    throw new Error(`Invalid Redis URL`);
}

export const redisClient = createClient({url:redisURI})

redisClient.on('error', (err)=>{
    console.log("Redis Client Error", err);
})

redisClient.on("ready", ()=>{
    console.log("Connected to redis server successfully");
})

export default async function connectRedis() {
    await redisClient.connect();
}