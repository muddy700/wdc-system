import { constants } from "../../config/constants";
import * as CitizenService from "./citizen.service";
import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";

const { PERPAGE } = constants;

export const createCitizen = async (req: any, res: Response) => {
  try {
    const { body, authUser } = req;
    const citizen = await CitizenService.createCitizen({
      ...body,
      createdBy: authUser._id,
    });

    const message = "Citizen created successfully.";

    await logEvent({
      request: req,
      activity: `Created Citizen:  ${citizen.firstName}`,
    });

    return res.status(200).json({ success: true, message, data: citizen });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getCitizens: RequestHandler = async (req: any, res: Response) => {
  try {
    let { totalRecords, userId } = req.query;
    const currentPage = (req.query.currentPage as unknown as number) || 1;
    const perPage = totalRecords
      ? parseInt(totalRecords as unknown as string)
      : parseInt(PERPAGE);
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } = await CitizenService.getCitizens(
      offset,
      perPage,
      userId as unknown as string
    );
    console.log(req.authUser);

    const metadata = {};
    const count = data ? data.length : 0;

    const message = "Citizens retrieved successfully.";
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

export const getAllCitizens: RequestHandler = async (req: any, res: Response) => {
  try {
    let { totalRecords, userId } = req.query;
    const currentPage = (req.query.currentPage as unknown as number) || 1;
    const perPage = totalRecords
      ? parseInt(totalRecords as unknown as string)
      : parseInt(PERPAGE);
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } = await CitizenService.getAllCitizens(
      offset,
      perPage,
      userId as unknown as string
    );
    console.log(req.authUser);

    const metadata = {};
    const count = data ? data.length : 0;

    const message = "Citizens retrieved successfully.";
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

export const deleteCitizen = async (req: Request, res: Response) => {
  try {
    const { citizenId } = req.params;
    const citizen = await CitizenService.deleteCitizen(citizenId);

    if (!citizen) {
      const message = `No Citizen found with id: ${citizenId}`;

      return res.status(404).json({ success: false, message, data: citizen });
    }

    const message = "Citizen deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Citizen:  ${citizen.firstName}`,
    });

    return res.status(200).json({ success: true, message, data: citizen });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getCitizenById = async (req: Request, res: Response) => {
  try {
    const { citizenId } = req.params;
    const citizen = await CitizenService.getCitizenById(citizenId);

    if (!citizen) {
      const message = `No Citizen found with id: ${citizenId}`;

      return res.status(404).json({ success: false, message, data: citizen });
    }

    const message = "Citizen retrieved successfully.";

    return res.status(200).json({ success: true, message, data: citizen });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateCitizen = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { citizenId } = req.params;

    const citizen = await CitizenService.updateCitizen(citizenId, body);

    if (!citizen) {
      const message = `No Citizen found with id: ${citizenId}`;

      return res.status(404).json({ success: false, message, data: citizen });
    }

    const message = "Citizen updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated Citizen:  ${citizen.firstName}`,
    });

    return res.status(200).json({ success: true, message, data: citizen });
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
