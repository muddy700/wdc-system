// import axios from "axios";
import nodemailer from "nodemailer";
import { constants } from "../config/constants";

const { EMAIL_SERVICE, EMAIL_PASSWORD, EMAIL_USER, APP_NAME } = constants;

export const sendEmail = async (recipient: any, message: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const emailPayLoad = {
      from: EMAIL_USER,
      to: recipient,
      subject: `${APP_NAME} Notifications`,
      html: message,
    };

    const response = await transporter.sendMail(emailPayLoad);

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};
