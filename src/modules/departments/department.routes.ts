import express from "express";
const router = express.Router();
import * as DepartmentController from "./department.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("departments", "create-departments"),
  DepartmentController.createDepartment
);

router.put(
  "/:departmentId",
  checkPermission("departments", "update-departments"),
  DepartmentController.updateDepartment
);

router.get(
  "/:departmentId",
  checkPermission("departments", "read-departments"),
  DepartmentController.getDepartmentById
);

router.delete(
  "/:departmentId",
  checkPermission("departments", "delete-departments"),
  DepartmentController.deleteDepartment
);

router.get(
  "/",
  checkPermission("departments", "read-departments"),
  DepartmentController.getDepartments
);

// router.get(
//   "/by-query",
//   checkPermission("departments", "read-departments"),
//   DepartmentController.getDepartmentsByQuery
// );

export const DepartmentRoutes = router;
