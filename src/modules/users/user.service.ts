// import { createOtp } from "../otp/otp.service";
import { constants } from "../../config/constants";
import * as userRepository from "./user.repository";
import { getUserAuthToken } from "../auth/auth.service";
import { sendEmail } from "../../services/email.service";
import { USER_STATUSES, USER_TYPES } from "./user.model";

const { EMAIL_URL, EMAIL_SENDER, APP_BASE_URL } = constants;

export const createUser = async (body: any) => {
  const { email } = body;

  if (await userRepository.getUserByEmail(email)) {
    throw new Error(i18n.__("email-exists"));
  }

  const user = await userRepository.createUser(body);

  // const otp = await createOtp({ username: body.email }, 'true', USER_TYPES.USER);

  // const verificationLink = `${APP_BASE_URL}/`
  // const message = ` <p>Hello  ${user.firstName},click the link below to verify your email</p>
  // <p>Hello  ${user.firstName}, </p>;
  // `;

  // sendEmail(email, i18n.__('welcome-user', user.firstName!));

  return user;
};

export const createStaff = async (body: any) => {
  try {
    body.type = USER_TYPES.STAFF;

    if (await userRepository.getUserByEmail(body.email)) {
      throw new Error(i18n.__("email-exists"));
    }

    const password = Math.random().toString(36).substr(2, 16).toUpperCase();
    body.password = password;

    await sendEmail(body.email, i18n.__("welcome-staff", body.email, password));

    const user = await userRepository.createUser(body);

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUsers = (
  offset: number,
  perPage: number,
  keyword: string,
  role: string
) => {
  return userRepository.getUsers(offset, perPage, keyword, role);
};

export const getUser = (userId: any) => {
  return userRepository.getUser(userId);
};

export const deleteUser = (userId: string) => {
  return userRepository.deleteUser(userId);
};

export const updateUser = async (userId: string, body: any) => {
  return userRepository.updateUser(userId, body);
};

export const deactivate = async (userId: string) => {
  const user = await userRepository.changeUserStatus(userId, {
    status: USER_STATUSES.INACTIVE,
  });

  return { user, token: await getUserAuthToken(user!) };
};

export const activate = async (userId: string) => {
  const user = await userRepository.changeUserStatus(userId, {
    status: USER_STATUSES.ACTIVE,
  });

  return { user, token: await getUserAuthToken(user!) };
};

// export const getUserByPhoneNumber = (phoneNumber: string, userType: any) => {
//   return userRepository.getUserByPhoneNumber(phoneNumber, userType);
// };

export const getUserByEmail = (email: string) => {
  return userRepository.getUserByEmail(email);
};
