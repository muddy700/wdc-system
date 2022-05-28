import { Request, Response, NextFunction } from "express";
import { Role } from "./role.model";

export const checkPermission = (moduleName: any, route: any) => {
  return async function (req: any, res: Response, next: NextFunction) {
    try {
      let hasAccess = false;

      const role = await Role.findOne({ _id: req.authUser.role }).populate(
        "permissions"
      );

      if (!role) {
        throw new Error("Role does not exist");
      }

      if (role.permissions === undefined || role.permissions?.length === 0) {
        throw new Error("Role does not have permissions");
      }

      const { permissions } = role;

      for (let i = 0; i < permissions.length; i++) {
        if (
          permissions[i].genericName === route &&
          permissions[i].moduleName === moduleName
        ) {
          hasAccess = true;

          break;
        }
      }

      if (hasAccess) {
        next();
      } else {
        const error = {
          message: "You don't have access to this route",
        };

        return errorResponse(res, 403, error);
      }
    } catch (e) {
      return errorResponse(res, 403, e);
    }
  };
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
