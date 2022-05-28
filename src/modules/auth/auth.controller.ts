import { NextFunction, Request, Response } from "express";
import { updateUser } from "../users/user.service";
import * as authService from "./auth.service";
import { logEvent } from "../auditTrail/auditTrail.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await authService.login(body);
    const { statusCode, success, message, user, token, firstTimeLoginFlag } =
      response;

    if (Object.keys(user).length > 0) {
      await logEvent({
        request: { ...req, authUser: user },
        activity: `Has loggedIn`,
      });
    }

    return res
      .status(statusCode)
      .json({ success, message, data: { user, token, firstTimeLoginFlag } });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await authService.adminLogin(body);
    const { statusCode, success, message, user, token, firstTimeLoginFlag } =
      response;

    if (Object.keys(user).length > 0) {
      await logEvent({
        request: { ...req, authUser: user },
        activity: `Has loggedIn`,
      });
    }

    return res
      .status(statusCode)
      .json({ success, message, data: { user, token, firstTimeLoginFlag } });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const isAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    req.authUser = authService.isAuthenticated(authorization);

    next();
  } catch (e) {
    return errorResponse(res, 401, e);
  }
};

export const changePassword = async (req: any, res: Response) => {
  try {
    const { password, oldPassword } = req.body;
    const { email, type, _id } = req.authUser;

    const response = await authService.changePassword(
      password,
      oldPassword,
      email,
      type
    );

    updateUser(_id, { firstTimeLoginFlag: 1 });
    const { statusCode, success, message } = response;

    await logEvent({
      request: req,
      activity: `Changed his/her password`,
    });

    return res.status(statusCode).json({ success, message, data: null });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const forgotPassword = async (req: any, res: Response) => {
  try {
    const { email, userType } = req.body;

    const response = await authService.forgotPassword(email, userType);
    const { success, message, data, statusCode } = response;

    return res.status(statusCode).json({ success, message, data });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const resetPassword = async (req: any, res: Response) => {
  try {
    const { password, token } = req.body;
    const { email, type } = req.authUser;

    const response = await authService.resetPassword(
      email,
      type,
      password,
      token
    );

    const { success, message, data, statusCode } = response;

    await logEvent({
      request: req,
      activity: `Reseted his/her password`,
    });

    return res.status(statusCode).json({ success, message, data });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

const errorResponse = (res: Response, statusCode: number, error: any) => {
  // Formulate response

  return res.status(statusCode).json({
    success: false,
    message: "Operation failed.",
    data: null,
    userMessage: "Oops... Something went wrong, contact the admin...",
    developerMessage: error.message,
  });
};
