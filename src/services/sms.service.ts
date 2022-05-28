import axios from "axios";
import { constants } from "../config/constants";

//const { SMS_URL, SMS_API_ID, SMS_API_PASSWORD, SMS_SENDER_ID } = constants;

export const sendSMS = async (recipient: any, message: any) => {
    try {
        const smsPayLoad = {
         /*    api_id: SMS_API_ID,
            api_password: SMS_API_PASSWORD,
            sms_type: 'P',
            encoding: 'T',
            sender_id: SMS_SENDER_ID,
            phonenumber: recipient,
            textmessage: message */
        };

        const response = await axios.post(
            'SMS_URL',
            smsPayLoad
        );
        return response;
    } catch (e) {
        throw new Error(e.message);
    }
}