import * as notificationRepository from './notification.repository';
import { INotification } from './notification.model';
import { IDevice } from './device.model';
// import { firebaseAdmin } from '';

export const storeNotification = async (body: Pick<INotification, 'resource' | 'onModel' | 'recipient' | 'description' | 'type' | 'actor'>) => {
    try {
        const notification = await notificationRepository.storeNotification(body);

        const res = body.recipient.forEach((recipient) => sendPushNotification(recipient, body.description!))

        return notification;
        //  return await sendPushNotification('610fa0490b6a44486f93c433', body.description!);
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getUserNotification = async (userId: string) => {
    try {
        const notifications = await notificationRepository.getUserNotification(userId);

        return notifications;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const markAsRead = async (notificationId: string, recipientId: string) => {
    try {
        const count = await notificationRepository.countRead(notificationId, recipientId);
        if (count > 0) {
            throw new Error('This notification is already marked as read by you.');
        }

        const notification = await notificationRepository.markAsRead(notificationId, recipientId);

        return notification;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const registerUserDevice = async (body: any) => {
    return notificationRepository.registerUserDevice(body);
}

export const getDeviceIdByUserId = async (userId: string) => {
    return notificationRepository.getDeviceIdByUserId(userId);
}

export const sendPushNotification = async (userId: string, message: string) => {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    const payload = {
        notification: {
            title: 'Tiger Loyalty',
            body: message
        }
    };

    try {
        const device = await getDeviceIdByUserId(userId);

        if (!device) {
            throw new Error('User device Id is not found');
        }

        const registrationToken = device.deviceId;

        const response = ''
        // const response = await firebaseAdmin.messaging().sendToDevice(registrationToken, payload, options);

        console.log('response', response);
        return response;
    } catch (e) {
        console.log(e.message)
    }
}
