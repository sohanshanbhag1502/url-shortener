import { Router, Request, Response } from "express";
import { redisClient } from "./db/redis";

interface shortenReqBody{
    original: string;
}

interface getReqBody{
    shortened: string;
}

function getRandomString(length: number):string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const shortenRouter=Router({ mergeParams: true });

const shorten = async (req:Request, res:Response) => {
    const body: shortenReqBody =req.body as shortenReqBody;
    if (body){
        const shortenedURL:string|null = await redisClient.get(body.original);
        if (shortenedURL){
            res.status(200).json({"message":shortenedURL});
            return;
        }
        var shortURL=getRandomString(5);
        while (await redisClient.get(shortURL)){
            shortURL=getRandomString(5);
        }
        await redisClient.set(shortURL, body.original);
        await redisClient.set(body.original, shortURL);
        res.status(200).json({"message":shortURL});
        return;
    }
    res.status(400).json({"message":"Invalid request"});
}
shortenRouter.post("/shorten", shorten)

const getURL = async (req:Request, res:Response) => {
    const body: getReqBody =req.body as getReqBody;
    if (body){
        const originalURL:string|null = await redisClient.get(body.shortened);
        if (originalURL){
            res.status(200).json({"message":originalURL});
            return;
        }
        else{
            res.status(404).json({"message":"The given shortened URL Not found"});
            return;
        }
    }
    
}
shortenRouter.post("/geturl", getURL)

export default shortenRouter;