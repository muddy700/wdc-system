import { IAuditTrail, AuditTrail } from './auditTrail.model';

export const logEvent = async (info: any) => {
    try {
        AuditTrail.create(info);
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getLogs = async (offset: number, perPage: number) => {
    try {
        const logs = await AuditTrail.find({})
            .populate('actor', '_id firstName middleName lastName displayName')
            .skip(offset)
            .limit(perPage)
            .sort({ createdAt: -1 });

        const count = await AuditTrail.countDocuments({});

        return { logs, count };
    } catch (e) {
        throw new Error(e.message);
    }
}