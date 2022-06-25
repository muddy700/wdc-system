import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as CitizenService from "./citizen.service";

export const createCitizen = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const citizen = await CitizenService.createCitizen(body);

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

export const getCitizens: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const citizens = await CitizenService.getCitizens(
      (searchQuery as unknown as string) ?? ""
    );

    const count = citizens.length;
    const message = "Citizens retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: citizens });
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
