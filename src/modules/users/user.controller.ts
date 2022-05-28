import { Request, Response } from "express";
import * as userService from "./user.service";
import { constants } from "../../config/constants";
import { logEvent } from "../auditTrail/auditTrail.service";
import { USER_TYPES } from "./user.model";

const { PERPAGE } = constants;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const user = await userService.createUser(body);

    const message = "User created successfully.";

    await logEvent({
      request: req,
      activity: `Created a user with email  ${user.email}`,
    });

    return res.status(200).json({ success: true, message, data: user });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const user = await userService.createStaff(body);

    const message = "Staff created successfully.";

    await logEvent({
      request: req,
      activity: `Created staff with email  ${user.email}`,
    });

    return res.status(200).json({ success: true, message, data: user });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getCompanyUsers = async (req: Request, res: Response) => {
  try {
    let { role, searchQuery } = req.query;
    const currentPage = (req.query.currentPage as unknown as number) || 1;
    const perPage = parseInt(PERPAGE);
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } = await userService.getCompanyUsers(
      offset,
      perPage,
      searchQuery as unknown as string,
      role as unknown as string
    );

    const metadata = {};
    const count = data ? data.length : 0;

    const message = "Staffs retrieved successfully.";
    const pagination = {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalRows / perPage) || 1,
      totalRows,
    };

    return res
      .status(200)
      .json({ success: true, message, count, pagination, data });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);

    if (!user) {
      const message = `No user found with id: ${id}`;

      return res.status(404).json({ success: false, message, data: user });
    }

    const message = "User retrieved successfully.";

    return res.status(200).json({ success: true, message, data: user });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.getUser(id);

    const user = await userService.deleteUser(id);

    if (!user.deletedCount) {
      const message = `No user found with id: ${id}`;

      return res.status(404).json({ success: false, message, data: user });
    }
    //logEvent({ request: req, activity: `Deleted user ${user?.firstName ?? user?.displayName} whose phone number is ${user?.phoneNumber} ` });

    const message = "User deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted a user with email  ${deletedUser?.email}`,
    });

    return res.status(200).json({ success: true, message, data: user });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await userService.updateUser(id, body);
    if (!user) {
      const message = `No user found with id: ${id}`;

      return res.status(404).json({ success: false, message, data: user });
    }
    //logEvent({ request: req, activity: `Deleted user ${user?.firstName ?? user?.displayName} whose phone number is ${user?.phoneNumber} ` });

    const message = "User updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a user with email  ${user.email}`,
    });

    return res.status(200).json({ success: true, message, data: user });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getUserByPhoneNumber = async (req: Request, res: Response) => {
  try {
    const phoneNumber = req.query.phoneNumber as unknown as string;

    const user = await userService.getUserByPhoneNumber(phoneNumber!, [
      USER_TYPES.USER,
      USER_TYPES.STAFF,
      USER_TYPES.ROOT,
    ]);

    if (!user) {
      const message = `No user found with phoneNumber: ${phoneNumber}`;

      return res.status(404).json({ success: false, message, data: user });
    }

    const message = "User retrieved successfully.";

    return res.status(200).json({ success: true, message, data: user });
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
