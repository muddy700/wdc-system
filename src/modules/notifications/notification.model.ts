import { Schema, Document, model } from "mongoose";
import { IUser } from "../users/user.model";

export enum NOTIFICATION_TYPES {
    TRANSACTION = 'transaction',
    LOAN = 'Loan'
}

export enum ON_MODELS {
    TRANSACTION = 'Transaction',
    LOAN = 'Loan'
}
export interface INotification extends Document {
    resource: string,
    onModel: string,
    recipient: Array<string>,
    actor: IUser['_id'],
    description?: string,
    type: string,
    read?: Array<object>
}

const NotificationSchema = new Schema({
    resource: {
        type: Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: [ON_MODELS],
        index: true
    },
    recipient: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
    ],
    type: {
        type: String,
        enum: [NOTIFICATION_TYPES]
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    read: [{
        readAt: { type: Schema.Types.Date },
        readBy: { type: Schema.Types.ObjectId }
    }]
},
    { timestamps: true }
);

export const Notification = model<INotification>("Notification", NotificationSchema);