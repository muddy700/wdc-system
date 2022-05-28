import { Request, Response } from 'express';
import * as notificationService from "./notification.service";

export const getUserNotification = async (req: any, res: Response) => {
    try {
        const { _id: userId } = req.authUser;

        const notifications = await notificationService.getUserNotification(userId);

        return res.status(200).json(notifications);
    } catch (e) {
        return res.status(400).json({
            userMessage: e.message,
            developerMessage: e.message
        });
    }
}

export const markAsRead = async (req: any, res: Response) => {
    try {
        const { _id: recipientId } = req.authUser;
        const { notificationId } = req.params;

        const notifications = await notificationService.markAsRead(notificationId, recipientId);

        return res.status(200).json(notifications);
    } catch (e) {
        return res.status(400).json({
            userMessage: e.message,
            developerMessage: e.message
        });
    }
}

export const registerUserDevice = async (req: any, res: Response) => {
    try {
        const { _id: userId } = req.authUser;
        const { deviceId } = req.body;

        const device = await notificationService.registerUserDevice({ user: userId, deviceId });

        return res.status(200).json(device);
    } catch (e) {
        return res.status(400).json({
            userMessage: e.message,
            developerMessage: e.message
        });
    }
}

