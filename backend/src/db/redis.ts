import { createClient } from "redis"
import dotenv from "dotenv";

dotenv.config()

const redisURI=process.env.REDIS_URI;
if (!redisURI){
    console.log("Invalid Redis URL");
    process.exit(1);
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