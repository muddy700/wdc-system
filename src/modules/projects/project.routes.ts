import express from "express";
const router = express.Router();
import * as ProjectController from "./project.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("projects", "create-projects"),
  ProjectController.createProject
);

router.put(
  "/:projectId",
  checkPermission("projects", "update-projects"),
  ProjectController.updateProject
);

router.get(
  "/:projectId",
  checkPermission("projects", "read-projects"),
  ProjectController.getprojectById
);

router.delete(
  "/:projectId",
  checkPermission("projects", "delete-projects"),
  ProjectController.deleteProject
);

router.get(
  "/",
  checkPermission("projects", "read-projects"),
  ProjectController.getProjects
);

// router.get(
//   "/by-query",
//   checkPermission("projects", "read-projects"),
//   ProjectController.getProjectsByQuery
// );

export const ProjectRoutes = router;
