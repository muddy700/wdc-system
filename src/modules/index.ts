import express from "express";
import swaggerUi from "swagger-ui-express";
import { AuthRoutes } from "./auth/auth.routes";
import { UserRoutes } from "./users/user.routes";
import { HouseRoutes } from "./houses/house.routes";
import { isAuthenticated } from "./auth/auth.controller";
import { CitizenRoutes } from "./citizens/citizen.routes";
import * as swaggerDocument from "../config/swagger.json";
import { AuditTrailRoutes } from "./auditTrail/auditTrail.routes";
import { DepartmentRoutes } from "./departments/department.routes";
import { AccessControlRoutes } from "./accessControl/accessControl.routes";

// Currently not used routes
import { OtpRoutes } from "./otp/otp.routes";
import { NotificationRoutes } from "./notifications/notification.routes";

export const initializeRoutes = (app: express.Application) => {
  app.use("/api/v1/auth/", AuthRoutes);
  app.use("/api/v1/users/", isAuthenticated, UserRoutes);
  app.use("/api/v1/houses/", isAuthenticated, HouseRoutes);
  app.use("/api/v1/citizens/", isAuthenticated, CitizenRoutes);
  app.use("/api/v1/departments/", isAuthenticated, DepartmentRoutes);
  app.use("/api/v1/audit-trail/", isAuthenticated, AuditTrailRoutes);
  app.use("/api/v1/access-control/", isAuthenticated, AccessControlRoutes);
  app.use("/api/v1/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Currently not used routes
  app.use("/api/v1/otp/", OtpRoutes);
  app.use("/api/v1/notifications/", NotificationRoutes);
};
