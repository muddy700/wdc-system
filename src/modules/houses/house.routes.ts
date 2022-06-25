import express from "express";
const router = express.Router();
import * as HouseController from "./house.controller";
import { checkPermission } from "../accessControl/permissionCheck.middleware";

router.post(
  "/",
  checkPermission("houses", "create-houses"),
  HouseController.createHouse
);

router.put(
  "/:houseId",
  checkPermission("houses", "update-houses"),
  HouseController.updateHouse
);

router.get(
  "/:houseId",
  checkPermission("houses", "read-houses"),
  HouseController.getHouseById
);

router.delete(
  "/:houseId",
  checkPermission("houses", "delete-houses"),
  HouseController.deleteHouse
);

router.get(
  "/",
  checkPermission("houses", "read-houses"),
  HouseController.getHouses
);

export const HouseRoutes = router;
