import { Db } from "mongodb";
import fs from "fs";
import path from "path";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface GlobalServiceConfig {
        email?: string;
        emailPasswd?: string;
        emailServiceHost: string;
        emailServicePort: number;
        emailServicePortSecure: boolean;
    }
}

const projectRootPath = path.resolve(__dirname);
const configName = "wallerConfig.json";
const configPath = path.resolve(projectRootPath, configName);
if (!fs.existsSync(configPath)) {
    //create null config file
    const defConfig:GlobalServiceConfig={
        ewToken: "",
        ewPasswd: "",
        ewRecvEmail: "",
        emailServiceHost: "",
        emailServicePort: 465,
        emailServicePortSecure: true,
        email: "",
        emailPasswd: "",
    };
    fs.writeFileSync(
        configPath,
        JSON.stringify(defConfig)
    );
}
const projectConfig = JSON.parse(fs.readFileSync(configPath).toString());

export interface GlobalService {
    dbCon?: Db;
    emailer: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null;
    projectRootPath: string;
    config: GlobalServiceConfig;
}

export const globalService = {
    projectRootPath: projectRootPath,
    config: projectConfig,
    emailer: null,
} as GlobalService;
