export enum Level {
    high = 100,
    ordinary = 200,
    log = 300,
}
// set globalServiceConfig

declare global {
    interface GlobalServiceConfig {
        ewToken: string;
        ewPasswd: string;
        ewRecvEmail?:string;
    }
}

export interface AuthPackage {
    passwd?: string;
}
