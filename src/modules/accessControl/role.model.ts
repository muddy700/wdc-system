import { Schema, Document, model } from 'mongoose';
import { IPermission } from './permission.model';

export enum ROLE_STATUSES {
    ACTIVE = 1,
    INACTIVE = 0
};

export interface IRole extends Document {
    name: string,
    description: string,
    permissions: Array<IPermission>,
    status?: number
}

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission'
    }],
    status: {
        type: Number,
        enum: [ROLE_STATUSES],
        default: ROLE_STATUSES.ACTIVE
    }
},
    { timestamps: true }
);

export const Role = model<IRole>('Role', RoleSchema);