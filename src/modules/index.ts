import express from "express";
import swaggerUi from "swagger-ui-express";
import { PiuRoutes } from "./pius/piu.routes";
import { AuthRoutes } from "./auth/auth.routes";
import { UserRoutes } from "./users/user.routes";
import { isAuthenticated } from "./auth/auth.controller";
import { ProjectRoutes } from "./projects/project.routes";
import * as swaggerDocument from "../config/swagger.json";
import { AuditTrailRoutes } from "./auditTrail/auditTrail.routes";
import { AccessControlRoutes } from "./accessControl/accessControl.routes";

// Currently not used routes
import { OtpRoutes } from "./otp/otp.routes";
import { NotificationRoutes } from "./notifications/notification.routes";

export const initializeRoutes = (app: express.Application) => {
  app.use("/api/v1/auth/", AuthRoutes);
  app.use("/api/v1/pius/", isAuthenticated, PiuRoutes);
  app.use("/api/v1/users/", isAuthenticated, UserRoutes);
  app.use("/api/v1/projects/", isAuthenticated, ProjectRoutes);
  app.use("/api/v1/audit-trail/", isAuthenticated, AuditTrailRoutes);
  app.use("/api/v1/access-control/", isAuthenticated, AccessControlRoutes);
  app.use("/api/v1/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Currently not used routes
  app.use("/api/v1/otp/", OtpRoutes);
  app.use("/api/v1/notifications/", NotificationRoutes);
};
