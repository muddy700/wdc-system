import { Request, Response } from "express";
import { constants } from "../../config/constants";
import * as accessControlService from "./accessControl.service";
import { IRole } from "./role.model";
import { logEvent } from "../auditTrail/auditTrail.service";

const { PERPAGE } = constants;

export const getRoles = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.searchQuery as unknown as string;

    const perPage = +PERPAGE;
    const currentPage =
      req.query.currentPage !== undefined
        ? (req.query.currentPage as unknown as number)
        : 1;
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } = await accessControlService.getRoles(
      offset,
      perPage,
      searchQuery ?? ""
    );

    const count = data.length;
    const message = "Roles retrieved successfully.";
    const pagination = {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalRows / perPage),
      totalRows,
    };

    return res
      .status(200)
      .json({ success: true, message, count, pagination, data });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const role = await accessControlService.createRole(body);

    const message = "Role created successfully.";

    await logEvent({
      request: req,
      activity: `Created a role  ${role.name}`,
    });

    return res.status(200).json({ success: true, message, data: role });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId as unknown as string;
    const { name, description, status }: IRole = req.body;

    const role = await accessControlService.updateRole(roleId, {
      ...(name && { name }),
      ...(status && { status }),
      ...(description && { description }),
    });

    if (!role) {
      const message = `No role found with id: ${roleId}`;

      return res.status(404).json({ success: false, message, data: role });
    }

    const message = "Role updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a role  ${role.name}`,
    });

    return res.status(200).json({ success: true, message, data: role });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await accessControlService.getPermissions();
    const count = permissions.length;

    const message = "Permissions retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: permissions });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateRolePermission = async (req: Request, res: Response) => {
  try {
    let role: any = {};
    const roleId = req.params.roleId as unknown as string;
    const { added, removed } = req.body.permissions;

    if (added.length > 0) {
      role = await accessControlService.addPermissionsToRole(roleId, added);
    }

    if (removed.length > 0) {
      role = await accessControlService.removePermissionsFromRole(
        roleId,
        removed
      );
    }

    if (removed.length === 0 && added.length === 0) {
      const message = `No added or removed permissions-ids passed`;

      return res.status(400).json({ success: false, message, data: null });
    }

    if (!role) {
      const message = `No role found with id: ${roleId}`;

      return res.status(404).json({ success: false, message, data: role });
    }

    const message = "Role-permissions updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated permissions for a role  ${role.name}`,
    });

    return res.status(200).json({ success: true, message, data: role });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getUsersByRoleId = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId as unknown as string;

    const users = await accessControlService.getUsersByRoleId(roleId);
    const count = users.length;

    if (!count) {
      const message = `No user found with role-id: ${roleId}`;

      return res
        .status(404)
        .json({ success: false, message, count, data: users });
    }

    const message = "Users retrieved successfully.";

    return res.status(200).json({ success: true, message, count, data: users });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId as unknown as string;
    const deletedRole = await accessControlService.getRoleById(roleId);

    const role = await accessControlService.deleteRole(roleId);

    if (!role.deletedCount) {
      const message = `No role found with id: ${roleId}`;

      return res.status(404).json({ success: false, message, data: role });
    }

    const message = "Role deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted a role  ${deletedRole!.name}`,
    });

    return res.status(200).json({ success: true, message, data: role });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId as unknown as string;

    const role = await accessControlService.getRoleById(roleId);

    if (!role) {
      const message = `No role found with id: ${roleId}`;

      return res.status(404).json({ success: false, message, data: role });
    }

    const message = "Role retrieved successfully.";

    return res.status(200).json({ success: true, message, data: role });
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
