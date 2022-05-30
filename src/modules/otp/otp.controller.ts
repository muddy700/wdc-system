import { Request, Response } from "express";
import * as otpService from "./otp.service";

export const createOtp = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const isRegistered = req.query.isRegistered as unknown as string;

    const otp = await otpService.createOtp(body, isRegistered);

    return res.status(200).json(otp);
  } catch (e) {
    return res.status(400).json({
      userMessage: e.message,
      developerMessage: e.message,
    });
  }
};

export const sendOtpViaEmail = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const otp = await otpService.sendOtpViaEmail(body);

    return res.status(200).json(otp);
  } catch (e) {
    return res.status(400).json({
      userMessage: e.message,
      developerMessage: e.message,
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;
    const { otp } = req.body;
    const body: any = { phoneNumber, otp };

    const verifiedOtp = await otpService.verifyOtp(body);

    return res.status(200).json(verifiedOtp);
  } catch (e) {
    return res.status(400).json({
      userMessage: e.message,
      developerMessage: e.message,
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const verifiedOtp = await otpService.verifyEmail({ email, otp });

    return res.status(200).json(verifiedOtp);
  } catch (e) {
    return res.status(400).json({
      userMessage: e.message,
      developerMessage: e.message,
    });
  }
};
