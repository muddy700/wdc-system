import express from "express";
const router = express.Router();
import * as ProjectPhaseController from "./projectPhase.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("projectPhases", "create-projectPhases"),
  ProjectPhaseController.createProjectPhase
);

router.put(
  "/:projectPhaseId",
  checkPermission("projectPhases", "update-projectPhases"),
  ProjectPhaseController.updateProjectPhase
);

router.get(
  "/:projectPhaseId",
  checkPermission("projectPhases", "read-projectPhases"),
  ProjectPhaseController.getProjectPhaseById
);

router.delete(
  "/:projectPhaseId",
  checkPermission("projectPhases", "delete-projectPhases"),
  ProjectPhaseController.deleteProjectPhase
);

router.get(
  "/",
  checkPermission("projectPhases", "read-projectPhases"),
  ProjectPhaseController.getProjectPhases
);

// router.get(
//   "/by-query",
//   checkPermission("projectPhases", "read-projectPhases"),
//   ProjectPhaseController.getProjectPhasesByQuery
// );

export const ProjectPhaseRoutes = router;
