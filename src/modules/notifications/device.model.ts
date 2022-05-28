import { Schema, Document, model } from "mongoose";

export enum DEVICE_TYPES {
    ANDROID = 'android',
    IOS = 'ios'
}

export interface IDevice extends Document {
    user: string,
    deviceId: string
}

const DeviceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true,
        index: true
    },
    deviceId: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

export const Device = model<IDevice>("Device", DeviceSchema);