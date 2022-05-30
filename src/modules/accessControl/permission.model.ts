import { Schema, Document, model } from 'mongoose';

export interface IPermission extends Document {
    displayName: string,
    genericName: string,
    moduleName: string
}

const PermissionSchema = new Schema({
    displayName: {
        type: String,
        required: [true, 'Display name is required!'],
    },
    genericName: {
        type: String,
        required: [true, 'Generic name is required!'],
    },
    moduleName: {
        type: String,
        required: [true, 'Module name is required!'],
    },
},
    { timestamps: true }
);

export const Permission = model<IPermission>('Permission', PermissionSchema);