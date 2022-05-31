import express from "express";
const router = express.Router();
import * as PiuController from "./piu.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("pius", "create-pius"),
  PiuController.createPiu
);

router.put(
  "/:piuId",
  checkPermission("pius", "update-pius"),
  PiuController.updatePiu
);

router.get(
  "/:piuId",
  checkPermission("pius", "read-pius"),
  PiuController.getpiuById
);

router.delete(
  "/:piuId",
  checkPermission("pius", "delete-pius"),
  PiuController.deletePiu
);

router.get(
  "/",
  checkPermission("pius", "read-pius"),
  PiuController.getPius
);

// router.get(
//   "/by-query",
//   checkPermission("pius", "read-pius"),
//   PiuController.getPiusByQuery
// );

export const PiuRoutes = router;
