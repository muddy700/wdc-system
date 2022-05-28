import axios from "axios";
import { constants } from "../config/constants";

const { EMAIL_URL, EMAIL_SENDER } = constants;

export const sendEmail = async (recipient: any, message: any) => {
    try {
        const emailPayLoad = {
            from: EMAIL_SENDER,
            to: recipient,
            subject: 'IPF CRM Notification',
            html: message
        };

        const response = await axios.post(
            EMAIL_URL,
            emailPayLoad
        );

        return response;
    } catch (e) {
        throw new Error(e.message);
    }
}