import express from 'express';
const router = express.Router();
import * as OTPController from './otp.controller';

router.post('/', OTPController.createOtp);
router.patch('/verify/:phoneNumber', OTPController.verifyOtp);
router.post('/verify-email', OTPController.verifyEmail);
router.post('/send-email', OTPController.sendOtpViaEmail);

export const OtpRoutes = router;