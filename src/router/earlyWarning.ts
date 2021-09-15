import express, { NextFunction, Request, Response } from "express";
import { globalService } from "../globalService";
import { AuthPackage, Level } from "../types/earlyWarning";
import { ReqWarning } from "../service/dbTypes";
import { ERRORPakge as ERRORPackage, OKPakge as OKPackage, Packager } from "../treaty/package";
import { autoSendEWEmail } from "../middleware/autoEmail";
import { ewAuth } from "../middleware/auth";
import { dbTestMiddleware } from "../middleware/dbTest";
import { StateCode } from "../treaty/statePackage";

const ewErrorInfoCollectionName = "ewErrorInfoCollectionName";
const ew = express.Router();
const route = ew;

// filter package packagetoken is true then mixin attr
// else
// set the is null
const ewPackageTransform = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const transformTargetPackage = req.body as ReqWarning;
    if (transformTargetPackage.token == globalService.config.ewToken) {
        transformTargetPackage.recvTime = Date.now();
        transformTargetPackage.sourceIp = req.ip;
        next();
    } else {
        res.json(ERRORPackage);
    }
};

// all add db conn test
ew.use(dbTestMiddleware);
ew.post(
    "/recv",
    express.json(),
    ewPackageTransform,
    autoSendEWEmail,
    (req, res) => {
        const reqBody = req.body as ReqWarning | null;
        if (reqBody != null) {
            const ewErrorInfoConllection = globalService.dbCon!.collection(
                ewErrorInfoCollectionName
            );
            ewErrorInfoConllection
                .insertOne(reqBody)
                .then(() => res.json(OKPackage));
        } else {
            res.json(ERRORPackage);
        }
    }
);

ew.post("/show", express.json(), ewAuth, async (req, res) => {
    const ewErrorInfoCollection = globalService.dbCon!.collection(
        ewErrorInfoCollectionName
    );
    const dbRes: ReqWarning[] = await ewErrorInfoCollection.find().toArray();
    res.json(Packager(StateCode.Ok,dbRes,""));
});

ew.post("/statistics", express.json(), ewAuth, async (req, res) => {
    const ewErrorInfoCollection = globalService.dbCon!.collection(
        ewErrorInfoCollectionName
    );
    //null map
    let resMap = Object.assign(Object.create(null), {
        "24": {
            [Level.high]: 0,
            [Level.ordinary]: 0,
            [Level.log]: 0,
        },
        "ALL": {
            [Level.high]: 0,
            [Level.ordinary]: 0,
            [Level.log]: 0,
        },
    });
    let top24TimeToken = Date.now() - 3600 * 24 * 1000; //to 24h
    await ewErrorInfoCollection.find().forEach((doc: ReqWarning) => {
        const timeArea = top24TimeToken < doc.recvTime ? "24" : "ALL";
        resMap[timeArea][doc.level] += 1;
    });
    res.json(Packager(StateCode.Ok,resMap,""));
});

export { ewErrorInfoCollectionName, route };