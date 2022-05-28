import { Schema, Document, model } from 'mongoose';

export interface IPermission extends Document {
    displayName: string,
    genericName: string,
    moduleName: string
}

const PermissionSchema = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    genericName: {
        type: String,
        required: true,
    },
    moduleName: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

export const Permission = model<IPermission>('Permission', PermissionSchema);