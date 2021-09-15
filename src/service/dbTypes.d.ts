import { Level } from "../types/earlyWarning";

export interface ReqWarning {
    // Error Level
    level: Level;
    // Warning App Name
    appName: string;
    // Warning App Version
    appVersion: string;
    // Warning Info of ALL
    allErrorInfo: string;
    // Client ID Or Token Or ClientName
    clientId: string;
    // Warning Info of Min
    minErrorInfo?: string;
    // Warning of Env
    otherInfo?: Record<string, any>;
    recvTime: number;
    sourceIp: string;
    token?: string;
}
