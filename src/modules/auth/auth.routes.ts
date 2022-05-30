import express from 'express';
const router = express.Router();
import * as AuthController from './auth.controller';
import { isAuthenticated } from '../auth/auth.controller';

router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post("/reset-password", isAuthenticated, AuthController.resetPassword);
router.post('/change-password', isAuthenticated, AuthController.changePassword);

export const AuthRoutes = router;