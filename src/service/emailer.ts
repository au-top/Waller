import { globalService } from "../globalService";
import nodemailer from "nodemailer";
globalService.emailer =
    globalService.config.email != null &&
    globalService.config.emailPasswd != null
        ? nodemailer.createTransport({
                host: globalService.config.emailServiceHost??"",
                port: globalService.config.emailServicePort??465,
                secure: globalService.config.emailServicePortSecure??true, // true for 465, false for other ports
                auth: {
                    user: globalService.config.email, // generated ethereal user
                    pass: globalService.config.emailPasswd, // generated ethereal password
                },
        })
        : null;
