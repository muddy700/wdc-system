import * as HouseService from "./house.service";
import { constants } from "../../config/constants";
import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";

const { PERPAGE } = constants;

export const createHouse = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const house = await HouseService.createHouse(body);

    const message = "House created successfully.";

    await logEvent({
      request: req,
      activity: `Created House:  ${house.identificationNumber}`,
    });

    return res.status(200).json({ success: true, message, data: house });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getHouses: RequestHandler = async (req, res) => {
  try {
    let { totalRecords, searchQuery } = req.query;
    const currentPage = (req.query.currentPage as unknown as number) || 1;
    const perPage = totalRecords
      ? parseInt(totalRecords as unknown as string)
      : parseInt(PERPAGE);
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } = await HouseService.getHouses(
      offset,
      perPage,
      searchQuery as unknown as string
    );

    const metadata = {};
    const count = data ? data.length : 0;

    const message = "Houses retrieved successfully.";
    const pagination = {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalRows / perPage) || 1,
      totalRows,
    };

    return res
      .status(200)
      .json({ success: true, message, count, pagination, data });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteHouse = async (req: Request, res: Response) => {
  try {
    const { houseId } = req.params;
    const house = await HouseService.deleteHouse(houseId);

    if (!house) {
      const message = `No House found with id: ${houseId}`;

      return res.status(404).json({ success: false, message, data: house });
    }

    const message = "House deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted House:  ${house.identificationNumber}`,
    });

    return res.status(200).json({ success: true, message, data: house });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getHouseById = async (req: Request, res: Response) => {
  try {
    const { houseId } = req.params;
    const house = await HouseService.getHouseById(houseId);

    if (!house) {
      const message = `No House found with id: ${houseId}`;

      return res.status(404).json({ success: false, message, data: house });
    }

    const message = "House retrieved successfully.";

    return res.status(200).json({ success: true, message, data: house });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateHouse = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { houseId } = req.params;

    const house = await HouseService.updateHouse(houseId, body);

    if (!house) {
      const message = `No House found with id: ${houseId}`;

      return res.status(404).json({ success: false, message, data: house });
    }

    const message = "House updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated House:  ${house.identificationNumber}`,
    });

    return res.status(200).json({ success: true, message, data: house });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

const errorResponse = (res: Response, statusCode: number, error: any) => {
  // Formulate response

  return res.status(statusCode).json({
    data: null,
    success: false,
    message: "Operation failed.",
    developerMessage: error.message,
    userMessage: "Oops... Something went wrong, contact the admin...",
  });
};
