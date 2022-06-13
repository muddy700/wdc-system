import express from "express";
const router = express.Router();
import * as GrievanceController from "./grievance.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("grievances", "create-grievances"),
  GrievanceController.createGrievance
);

router.put(
  "/:grievanceId",
  checkPermission("grievances", "update-grievances"),
  GrievanceController.updateGrievance
);

router.get(
  "/:grievanceId",
  checkPermission("grievances", "read-grievances"),
  GrievanceController.getGrievanceById
);

router.delete(
  "/:grievanceId",
  checkPermission("grievances", "delete-grievances"),
  GrievanceController.deleteGrievance
);

router.get(
  "/",
  checkPermission("grievances", "read-grievances"),
  GrievanceController.getGrievances
);

// router.get(
//   "/by-query",
//   checkPermission("grievances", "read-grievances"),
//   GrievanceController.getGrievancesByQuery
// );

export const GrievanceRoutes = router;
