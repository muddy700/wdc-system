import express from "express";
import { middlewaresConfig } from "./config/middlewares";
import { constants } from "./config/constants";
import { connectDB } from "./config/database";
import { seedInitialData } from "./config/seeder";
import { initializeRoutes } from "./modules";
import("./jobs/index").then(() => {
  return true;
});

const app = express();

middlewaresConfig(app);
connectDB();
initializeRoutes(app);
seedInitialData();

if (constants.NODE_ENV !== "test") {
  //Avoid address-in-use error when running multiple-test-suites

  app.listen(constants.PORT, () => {
    console.log(`Application is running on port ${constants.PORT}`);
  });
}

export default app;
