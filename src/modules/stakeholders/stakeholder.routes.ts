import express from "express";
const router = express.Router();
import * as StakeholderController from "./stakeholder.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("stakeholders", "create-stakeholders"),
  StakeholderController.createStakeholder
);

router.put(
  "/:stakeholderId",
  checkPermission("stakeholders", "update-stakeholders"),
  StakeholderController.updateStakeholder
);

router.get(
  "/by-query",
  checkPermission("stakeholders", "read-stakeholders"),
  StakeholderController.getStakeholdersByQuery
);

router.get(
  "/:stakeholderId",
  checkPermission("stakeholders", "read-stakeholders"),
  StakeholderController.getstakeholderById
);

router.delete(
  "/:stakeholderId",
  checkPermission("stakeholders", "delete-stakeholders"),
  StakeholderController.deleteStakeholder
);

router.get(
  "/",
  checkPermission("stakeholders", "read-stakeholders"),
  StakeholderController.getStakeholders
);

export const StakeholderRoutes = router;
