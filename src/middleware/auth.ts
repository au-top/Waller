import { NextFunction, Request, Response } from "express";
import { globalService } from "../globalService";
import { AuthPackage } from "../types/earlyWarning";
import { ERRORPakge } from "../treaty/package";

export const ewAuth = (req: Request, res: Response, next: NextFunction) => {
    const sendPackage = req.body as AuthPackage;
    if (
        sendPackage != undefined &&
        sendPackage.passwd != undefined &&
        sendPackage.passwd == globalService.config.ewPasswd
    ) {
        next();
    } else {
        res.json(ERRORPakge);
    }
};