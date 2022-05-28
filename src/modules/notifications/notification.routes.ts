import express from 'express';
const router = express.Router();
import * as NotificationController from "./notification.controller";
import { isAuthenticated } from '../auth/auth.controller';

router.get('/', isAuthenticated, NotificationController.getUserNotification);
router.post('/subscribe', isAuthenticated, NotificationController.registerUserDevice);
router.patch('/:notificationId/read', isAuthenticated, NotificationController.markAsRead);

export const NotificationRoutes = router;
