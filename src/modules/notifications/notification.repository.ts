import { Types } from 'mongoose';
import { Device, IDevice } from './device.model';
import { INotification, Notification, NOTIFICATION_TYPES } from './notification.model';

export const storeNotification = async (body: Pick<INotification, 'resource' | 'onModel' | 'recipient' | 'description' | 'type'>) => {
    try {
        const notification = await Notification.create(body);

        return notification;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getUserNotification = async (recipientId: string) => {
    try {
        const ObjectId = Types.ObjectId;

        const notifications = await Notification.aggregate([
            { $unwind: '$recipient' },
            { $unwind: { path: '$read', preserveNullAndEmptyArrays: true } },
            {
                $match: {
                    'recipient': new ObjectId(recipientId)
                },
            },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    description: 1, type: 1, createdAt: 1,
                    read: {
                        $cond: {
                            if: { $eq: ['$read.readBy', new ObjectId(recipientId)] },
                            then: '$read',
                            else: {}
                        }
                    }
                }
            }
        ]);

        return notifications;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const markAsRead = async (notificationId: string, recipientId: string) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId },
            { $push: { read: { readBy: recipientId, readAt: new Date(Date.now()) } } },
            {
                new: true
            }
        );

        return notification;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const countRead = async (notificationId: string, recipientId: string) => {
    try {
        const notification = await Notification.countDocuments({ _id: notificationId, 'read.readBy': recipientId });

        return notification;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const registerUserDevice = async (body: IDevice) => {
    return Device.updateOne({ user: body.user }, body, { upsert: true, })
}

export const getDeviceIdByUserId = async (userId: string) => {
    return Device.findOne({ user: userId });
}
