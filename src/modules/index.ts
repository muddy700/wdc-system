import express from "express";
import swaggerUi from "swagger-ui-express";
import { AuthRoutes } from "./auth/auth.routes";
import { UserRoutes } from "./users/user.routes";
import { isAuthenticated } from "./auth/auth.controller";
import * as swaggerDocument from "../config/swagger.json";
import { AuditTrailRoutes } from "./auditTrail/auditTrail.routes";
import { AccessControlRoutes } from "./accessControl/accessControl.routes";

import { OtpRoutes } from "./otp/otp.routes";
import { NotificationRoutes } from "./notifications/notification.routes";

export const initializeRoutes = (app: express.Application) => {
  app.use("/api/v1/auth/", AuthRoutes);
  app.use("/api/v1/users/", isAuthenticated, UserRoutes);
  app.use("/api/v1/audit-trail/", isAuthenticated, AuditTrailRoutes);
  app.use("/api/v1/access-control/", isAuthenticated, AccessControlRoutes);
  app.use("/api/v1/otp/", OtpRoutes);
  app.use("/api/v1/notifications/", NotificationRoutes);
  app.use("/api/v1/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
