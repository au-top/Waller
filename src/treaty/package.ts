import { StateCode } from "./statePackage";

export interface PackageStruct{
    code: number,
    data: any,
    info: string,
}

export const Packager = (code: number, data: any, info: string) => ({
    code: code,
    data: data,
    info: info,
} as PackageStruct);

export const OKPakge = Packager(StateCode.Ok, {}, "");
export const ERRORPakge = Packager(StateCode.Error, {}, "");
