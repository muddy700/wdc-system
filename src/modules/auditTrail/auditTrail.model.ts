import { Schema, Document, model } from 'mongoose';

export interface IAuditTrail extends Document {
    actor: string,
    displayName: string,
    activity: string,
    browser: string,
    operatingSystem: string,
    ipAddress: string,
    /* item: any, */
    request: any
}

const AuditTrailSchema = new Schema({
    actor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    activity: {
        type: String,
        required: true,
    },
    /*   item: {
          type: Object
      }, */
    browser: {
        type: String
    },
    operatingSystem: {
        type: String
    },
    ipAddress: {
        type: String
    },
},
    { timestamps: true }
);

export const AuditTrail = model<IAuditTrail>('AuditTrail', AuditTrailSchema);