import i18n from "i18n";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helment from "helmet";
import express from "express";
import useragent from "express-useragent";

dotenv.config();

export const middlewaresConfig = (app: express.Application) => {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helment());
  app.use(express.json());
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  app.use(useragent.express());

  i18n.configure({
    locales: ["en", "sw"],
    fallbacks: { nl: "en" },
    directory: path.join(__dirname, "..", "..", "/src/locales"),
  });

  app.use(i18n.init);

  app.all("*", (req, res, next) => {
    console.log(path.join(__dirname, "..", "..", "/src/locales"));
    i18n.setLocale(req.headers["accept-language"] ?? "en");
    global.i18n = i18n;
    next();
  });

  //check api status
  app.get("/", (_, res) => {
    res.status(200).json({
      success: true,
      message: "Connected Successfull. ✅✅ ",
      data: {
        appName: "SE-GRMS",
        appDescription:
          "Stakeholder Management and Grievance Redress Mechanism System",
      },
      hint: "Add '/api/v1/doc' on url to see documentation",
    });
  });
};

//export const I18n=i18n;
