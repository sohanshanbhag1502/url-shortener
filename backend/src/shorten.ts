import { Router, Request, Response } from "express";
import { redisClient } from "./db/redis";

interface shortenReqBody{
    original: string;
    shortened: string;
}

interface getReqBody{
    shortened: string;
}

const shortenRouter=Router({ mergeParams: true });

const shorten = async (req:Request, res:Response) => {
    const body: shortenReqBody =req.body as shortenReqBody;
    if (body){
        await redisClient.set(body.shortened, body.original);
        res.status(200).json({"message":"URL Shortened Successfully"});
        return;
    }
    res.status(200).json({"message":"URL Shortened Successfully"});
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