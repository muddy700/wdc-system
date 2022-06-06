import express from "express";
const router = express.Router();
import * as EngagementPlanController from "./engagementPlan.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("engagementPlans", "create-engagementPlans"),
  EngagementPlanController.createEngagementPlan
);

router.put(
  "/:engagementPlanId",
  checkPermission("engagementPlans", "update-engagementPlans"),
  EngagementPlanController.updateEngagementPlan
);

router.get(
  "/:engagementPlanId",
  checkPermission("engagementPlans", "read-engagementPlans"),
  EngagementPlanController.getEngagementPlanById
);

router.delete(
  "/:engagementPlanId",
  checkPermission("engagementPlans", "delete-engagementPlans"),
  EngagementPlanController.deleteEngagementPlan
);

router.get(
  "/",
  checkPermission("engagementPlans", "read-engagementPlans"),
  EngagementPlanController.getEngagementPlans
);

// router.get(
//   "/by-query",
//   checkPermission("engagementPlans", "read-engagementPlans"),
//   EngagementPlanController.getEngagementPlansByQuery
// );

export const EngagementPlanRoutes = router;
