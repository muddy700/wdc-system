import express from "express";
const router = express.Router();
import * as AuditTrailController from "./auditTrail.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.get(
  "/",
  checkPermission("audit-trail", "read-audit-trail"),
  AuditTrailController.getLogs
);

export const AuditTrailRoutes = router;
