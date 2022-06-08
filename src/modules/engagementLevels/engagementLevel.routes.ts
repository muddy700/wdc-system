import express from "express";
const router = express.Router();
import * as EngagementLevelController from "./engagementLevel.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("engagementLevels", "create-engagementLevels"),
  EngagementLevelController.createEngagementLevel
);

router.put(
  "/:engagementLevelId",
  checkPermission("engagementLevels", "update-engagementLevels"),
  EngagementLevelController.updateEngagementLevel
);

router.get(
  "/:engagementLevelId",
  checkPermission("engagementLevels", "read-engagementLevels"),
  EngagementLevelController.getEngagementLevelById
);

router.delete(
  "/:engagementLevelId",
  checkPermission("engagementLevels", "delete-engagementLevels"),
  EngagementLevelController.deleteEngagementLevel
);

router.get(
  "/",
  checkPermission("engagementLevels", "read-engagementLevels"),
  EngagementLevelController.getEngagementLevels
);

// router.get(
//   "/by-query",
//   checkPermission("engagementLevels", "read-engagementLevels"),
//   EngagementLevelController.getEngagementLevelsByQuery
// );

export const EngagementLevelRoutes = router;
