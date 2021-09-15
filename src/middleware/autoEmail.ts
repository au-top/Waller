import { NextFunction, Request, Response } from "express";
import { encodeHtml } from "../functions/encodeHtml";
import { globalService } from "../globalService";
import { ReqWarning } from "../service/dbTypes";
import { LevelName } from "../treaty/statePackage";

export const autoSendEWEmail = (req: Request, res: Response, next: NextFunction) => {
    const transfromTargetPackage = req.body as ReqWarning;
    if (
        globalService.emailer != null &&
        globalService.config.ewRecvEmail != null
    ) {
        globalService.emailer.sendMail(
            {
                from: globalService.config.email,
                to: globalService.config.email,
                subject: `Ew-${transfromTargetPackage.appName}-${
                    transfromTargetPackage.appVersion
                }-${transfromTargetPackage.clientId}-${
                    LevelName[transfromTargetPackage.level]
                }-${transfromTargetPackage.sourceIp}`, // Subject line
                html: `${Date().toString()}<br/><pre>${encodeHtml(
                    JSON.stringify(transfromTargetPackage, null, 2)
                )}</pre>`, // html body
            },
            (err, reply) => {
                console.log(err && err.stack);
                console.dir(reply);
            }
        );
    } else {
        console.log("emailer is on start");
    }
    next();
};