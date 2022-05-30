import { IOtp } from "./otp.model";
import * as otpRepository from "./otp.repository";
import { generateOTP } from "../../utils";
import { constants } from "../../config/constants";
import { sendSMS } from "../../services/sms.service";
import { getUserByPhoneNumber } from "../users/user.service";
import { getUserByEmail } from "../users/user.repository";
import { USER_TYPES } from "../users/user.model";
import { sendEmail } from "../../services/email.service";

export const createOtp = async (
  body: any,
  isRegistered: string,
) => {
  try {
    const { email: username } = body;
    //TODO:rember to cast string true to boolean
    if (isRegistered === "true") {
      const user = await getUserByEmail(username);

      if (!user) {
        throw new Error(i18n.__("unrecognized-user"));
      }
    }

    const otp = generateOTP();
    const otpInfo = { username, otp };
    await otpRepository.deleteOtp(username);
    const createdOtp = await otpRepository.createOtp(otpInfo);
    //await sendSMS(phoneNumber, i18n.__('otp-message', `${otp}`, constants.OTP_EXPIRATION_TIME));

    return createdOtp;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const sendOtpViaEmail = async (body: any) => {
  try {
    const { email } = body;
    const phoneNumber = email; //assigning email to phoneNumber variable since it has been used throughout the otp module

    const user = await getUserByEmail(phoneNumber);

    if (!user) {
      throw new Error(i18n.__("unrecognized-user"));
    }

    const otp = generateOTP();
    const otpInfo = { phoneNumber, otp };

    await otpRepository.deleteOtp(phoneNumber);
    const createdOtp = await otpRepository.createOtp(otpInfo);
    // await sendEmail(email, i18n.__('otp-message', `${otp}`, constants.OTP_EXPIRATION_TIME));

    return createdOtp;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const verifyOtp = async (body: IOtp) => {
  const availableOTP = await otpRepository.getOTP(body);

  if (!availableOTP) {
    throw new Error(i18n.__("unrecognized-otp"));
  }

  if (hasOTPExpired(availableOTP.createdAt)) {
    throw new Error(i18n.__("expired-otp"));
  }

  return otpRepository.verifyOtp(body);
};

export const verifyEmail = async (body: any) => {
  const availableOTP = await otpRepository.getOTP(body);

  if (!availableOTP) {
    throw new Error(i18n.__("unrecognized-otp"));
  }

  if (hasOTPExpired(availableOTP.createdAt)) {
    throw new Error(i18n.__("expired-otp"));
  }

  return otpRepository.verifyOtp(body);
};

export const hasOTPExpired = (createdAt: any) => {
  try {
    let hasExpired: boolean = false;

    const now = new Date(Date.now());
    createdAt = new Date(createdAt);

    const diff = (now.getTime() - createdAt.getTime()) / 1000 / 60;
    const minutes = Math.abs(Math.round(diff));

    // if (minutes > parseInt(constants.OTP_EXPIRATION_TIME)) {
    //     hasExpired = true;
    // }

    return hasExpired;
  } catch (e) {
    throw new Error(e.message);
  }
};
