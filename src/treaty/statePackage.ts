import { Level } from "../types/earlyWarning";

export const LevelName = {
    [Level.high]: "High",
    [Level.ordinary]: "Ordinary",
    [Level.log]: "Log",
};
export enum StateCode {
    // 5000~6000
    Error = 5001,
    // 2000~3000
    Ok = 2000,
}