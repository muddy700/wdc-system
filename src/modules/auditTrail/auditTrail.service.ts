import * as audiTrailRepository from "./auditTrail.repository";
import { IAuditTrail } from "./auditTrail.model";

export const getLogs = async (offset: number, perPage: number) => {
    try {
        return audiTrailRepository.getLogs(offset, perPage);
    } catch (e) {
        throw new Error(e.message);
    }
}

export const logEvent = async (info: any) => {
    try {
        const { request, activity } = info;
        const { authUser, useragent, ip } = request;

        const body = {
            activity,
            actor: authUser._id,
            operatingSystem: useragent.os,
            browser: useragent.browser,
            ipAddress: ip
        };

        audiTrailRepository.logEvent(body);
    } catch (e) {
        throw new Error(e.message);
    }
}
