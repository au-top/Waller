import express from "express";
import { globalService } from "./globalService";
import {dbConPromise} from "./service/db";
import "./service/emailer";
import * as ew from "./router/earlyWarning";
(async()=>{
    globalService.dbCon=await dbConPromise;
    const appServer=express();
    // config router
    appServer.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers","Accept,Origin, X-Requested-With, Content-Type, Authorization");
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    appServer.options("*",(req,res,next)=>res.status(200).send());
    appServer.use("/ew",ew.route);
    appServer.use("/",express.static(`${__dirname}/waller_view/dist`));
    appServer.use((res,req)=>req.status(404).send(""));
    appServer.listen(8081,"0.0.0.0",()=>console.log("start listen 0.0.0.0:8081"));
})().catch(e=>{
    throw e;
});