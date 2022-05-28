import express from "express";
const router = express.Router();
import * as AccessController from "./accessControl.controller";
import { checkPermission } from "./permissionCheck.middleware";

router.post(
  "/roles",
  checkPermission("access-control", "create-roles"),
  AccessController.createRole
);

router.patch(
  "/roles/:roleId",
  checkPermission("access-control", "update-roles"),
  AccessController.updateRole
);

router.get(
  "/roles",
  checkPermission("access-control", "read-roles"),
  AccessController.getRoles
);

router.get(
  "/permissions",
  checkPermission("access-control", "read-permissions"),
  AccessController.getPermissions
);

router.patch(
  "/roles/:roleId/grant-permission",
  checkPermission("access-control", "update-roles"),
  AccessController.updateRolePermission
);

router.get(
  "/roles/:roleId/staff",
  checkPermission("users", "read-users"),
  AccessController.getUsersByRoleId
);

router.get(
  "/roles/:roleId",
  checkPermission("access-control", "read-roles"),
  AccessController.getRoleById
);

router.delete(
  "/roles/:roleId",
  checkPermission("access-control", "delete-roles"),
  AccessController.deleteRole
);

export const AccessControlRoutes = router;
