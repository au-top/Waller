import { NextFunction, Request, Response } from "express";
import { globalService } from "../globalService";
import { ERRORPakge } from "../treaty/package";

export const dbTestMiddleware=(req: Request, res: Response, next: NextFunction)=>{
    if(globalService.dbCon!=null){
        next();
    }else{
        res.send(ERRORPakge);
    }
};
