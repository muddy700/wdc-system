import express from "express";
const router = express.Router();
import * as ProjectEventController from "./projectEvent.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("projectEvents", "create-projectEvents"),
  ProjectEventController.createProjectEvent
);

router.put(
  "/:projectEventId",
  checkPermission("projectEvents", "update-projectEvents"),
  ProjectEventController.updateProjectEvent
);

router.get(
  "/:projectEventId",
  checkPermission("projectEvents", "read-projectEvents"),
  ProjectEventController.getProjectEventById
);

router.delete(
  "/:projectEventId",
  checkPermission("projectEvents", "delete-projectEvents"),
  ProjectEventController.deleteProjectEvent
);

router.get(
  "/",
  checkPermission("projectEvents", "read-projectEvents"),
  ProjectEventController.getProjectEvents
);

// router.get(
//   "/by-query",
//   checkPermission("projectEvents", "read-projectEvents"),
//   ProjectEventController.getProjectEventsByQuery
// );

export const ProjectEventRoutes = router;
