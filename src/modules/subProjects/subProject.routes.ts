import express from "express";
const router = express.Router();
import * as SubProjectController from "./subProject.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("subProjects", "create-subProjects"),
  SubProjectController.createSubProject
);

router.put(
  "/:subProjectId",
  checkPermission("subProjects", "update-subProjects"),
  SubProjectController.updateSubProject
);

router.get(
  "/:subProjectId",
  checkPermission("subProjects", "read-subProjects"),
  SubProjectController.getSubProjectById
);

router.delete(
  "/:subProjectId",
  checkPermission("subProjects", "delete-subProjects"),
  SubProjectController.deleteSubProject
);

router.get(
  "/",
  checkPermission("subProjects", "read-subProjects"),
  SubProjectController.getSubProjects
);

// router.get(
//   "/by-query",
//   checkPermission("subProjects", "read-subProjects"),
//   SubProjectController.getSubProjectsByQuery
// );

export const SubProjectRoutes = router;
