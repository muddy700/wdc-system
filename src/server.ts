import express from "express";
import { middlewaresConfig } from "./config/middlewares";
import { constants } from "./config/constants";
import { connectDB } from "./config/database";
import { seedInitialData } from "./config/seeder";
import { initializeRoutes } from "./modules";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginExpress from "@bugsnag/plugin-express";
import("./jobs/index").then(() => {
  return true;
});

const app = express();
const { PORT, NODE_ENV, BUGSNAG_API_KEY } = constants;

// Starting Bugsnag
Bugsnag.start({
  apiKey: BUGSNAG_API_KEY,
  plugins: [BugsnagPluginExpress],
});

const bugsnagMiddleware = Bugsnag.getPlugin("express");

// This must be the first piece of middleware in the stack.
app.use(bugsnagMiddleware!.requestHandler);

// All other middleware and application routes go here
middlewaresConfig(app);
connectDB();
initializeRoutes(app);
seedInitialData();

// This handles any errors that Express catches
app.use(bugsnagMiddleware!.errorHandler);


if (NODE_ENV !== "test") {
  //Avoid address-in-use error when running multiple-test-suites

  app.listen(PORT, () => {
    console.log(`Application is running on port ${constants.PORT}`);
  });
}

export default app;
