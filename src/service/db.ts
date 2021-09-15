import { NextFunction, Request, Response } from "express";
import {  MongoClient } from "mongodb";

const mongodbUrl="mongodb://127.0.0.1:27017";
const dbName="waller";


const _initDB=async ()=>{
    const client=new MongoClient(mongodbUrl,{useUnifiedTopology:true});
    return (await client.connect()).db(dbName);
}

export const dbConPromise = _initDB();

