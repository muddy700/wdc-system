import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../users/user.model";
import { constants } from "../../config/constants";
import { updateUser } from "../users/user.service";
import { sendEmail } from "../../services/email.service";
import { getUserByEmail } from "../users/user.repository";

export const login = async (body: any) => {
  try {
    let token = null;
    let response;

    const { email, password } = body;

    const user = await getUserByEmail(email);

    if (user && user.comparePassword(password)) {
      token = await getUserAuthToken(user);

      const message = "Logged in successfully.";
      response = { statusCode: 200, success: true, message, user, token };
    } else {
      response = {
        statusCode: 401,
        success: false,
        message: i18n.__("wrong-password"),
        user: {},
        token,
      };
    }

    if (token && !user?.firstTimeLoginFlag) {
      const firstTimeLoginFlag = user?.firstTimeLoginFlag;
      response = {
        statusCode: 403,
        success: false,
        message: i18n.__("change-default-password"),
        user: {},
        token,
        firstTimeLoginFlag,
      };
    }

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const isAuthenticated = (authorization: any) => {
  if (authorization === undefined || authorization === "") {
    throw new Error("Authorization scheme not specified");
  }

  const tokenInfo = authorization.split(" ");

  if (tokenInfo[0] !== constants.AUTHORIZATION_SCHEME) {
    throw new Error("Incorrect authorization scheme.");
  }

  const token = tokenInfo[1];
  const user = jwt.verify(token, constants.JWT_SECRET);
  return user;
};

export const changePassword = async (
  password: string,
  oldPassword: string,
  email: string
) => {
  try {
    let response;

    const user = await getUserByEmail(email);

    if (user && user.comparePassword(oldPassword)) {
      await user.changePassword(password);

      response = {
        statusCode: 200,
        success: true,
        message: i18n.__("password-changed"),
      };
    } else {
      response = {
        statusCode: 401,
        success: false,
        message: i18n.__("wrong-old-password"),
      };
    }

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    let token = null;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("User with that email is not found.");
    }

    token = await getUserAuthToken(user);
    const link = `${constants.APP_BASE_URL}/auth/reset-password?token=${token}`;

    const name = user ? user.firstName + " " + user.lastName : "Sir / Madam";
    await sendEmail(user.email, i18n.__("forgot-password", name, link));

    const body = { token: hashToken(token) };
    await updateUser(user._id, body);

    return {
      data: null,
      success: true,
      statusCode: 200,
      message: `Password reset link sent to ${user.email}`,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const resetPassword = async (
  email: string,
  password: string,
  token: string
) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("User with that email is not found.");
    }

    const storedResetToken = user.token ? user.token : "token";

    if (!compareToken(token, storedResetToken)) {
      throw new Error("Invalid token.");
    }

    await user.changePassword(password);
    await updateUser(user._id, { token: null });

    return {
      data: null,
      success: true,
      statusCode: 200,
      message: `Password changed successfully.`,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserAuthToken = async (user: IUser) => {
  return jwt.sign(user.toJSON(), constants.JWT_SECRET);
};

export function compareToken(
  candidateToken: string,
  existingToken: string
): boolean {
  if (bcrypt.compareSync(candidateToken, existingToken)) {
    return true;
  } else return false;
}

export function hashToken(token: string): string {
  return bcrypt.hashSync(token, 10);
}
