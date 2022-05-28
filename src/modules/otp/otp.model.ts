import { Schema, Document, model } from 'mongoose';

export interface IOtp extends Document {
    otp: number,
    username: string,
    createdAt: Date
}

const OtpSchema = new Schema({
    otp: {
        type: Number,
        required: [true, 'OTP  is required!'],
        index: true
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        index: true
    },
    varifiedAt: {
        type: Date
    },
},
    { timestamps: true }
);

export const OTP = model<IOtp>('OTP', OtpSchema);