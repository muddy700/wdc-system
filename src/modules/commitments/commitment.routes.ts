import express from "express";
const router = express.Router();
import * as CommitmentController from "./commitment.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("commitments", "create-commitments"),
  CommitmentController.createCommitment
);

router.put(
  "/:commitmentId",
  checkPermission("commitments", "update-commitments"),
  CommitmentController.updateCommitment
);

router.get(
  "/:commitmentId",
  checkPermission("commitments", "read-commitments"),
  CommitmentController.getCommitmentById
);

router.delete(
  "/:commitmentId",
  checkPermission("commitments", "delete-commitments"),
  CommitmentController.deleteCommitment
);

router.get(
  "/",
  checkPermission("commitments", "read-commitments"),
  CommitmentController.getCommitments
);

// router.get(
//   "/by-query",
//   checkPermission("commitments", "read-commitments"),
//   CommitmentController.getCommitmentsByQuery
// );

export const CommitmentRoutes = router;
