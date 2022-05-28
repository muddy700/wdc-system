import express from "express";
const router = express.Router();
import * as UserController from "./user.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.get(
  "/phone-number",
  checkPermission("users", "read-users"),
  UserController.getUserByPhoneNumber
);

router.get(
  "/",
  checkPermission("users", "read-users"),
  UserController.getCompanyUsers
);

router.post(
  "/",
  checkPermission("users", "create-users"),
  UserController.createUser
);

router.post(
  "/invite",
  checkPermission("users", "create-users"),
  UserController.createStaff
);

router.patch(
  "/:id([\\dA-Fa-f]+)",
  checkPermission("users", "update-users"),
  UserController.updateUser
);
router.delete(
  "/:id([\\dA-Fa-f]+)",
  checkPermission("users", "delete-users"),
  UserController.deleteUser
);

router.get(
  "/:id([\\dA-Fa-f]+)",
  checkPermission("users", "read-users"),
  UserController.getUser
);

export const UserRoutes = router;
