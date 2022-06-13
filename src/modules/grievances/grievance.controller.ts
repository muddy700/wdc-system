import * as GrievanceService from "./grievance.service";
import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";

export const createGrievance = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { authUser } = req;

    const grievance = await GrievanceService.createGrievance({
      ...body,
      reporter: authUser._id,
    });

    const message = "Grievance created successfully.";

    await logEvent({
      request: req,
      activity: `Created a grievance on project:  ${grievance.project.name}`,
    });

    return res.status(200).json({ success: true, message, data: grievance });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getGrievances: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const grievances = await GrievanceService.getGrievances(
      (searchQuery as unknown as string) ?? ""
    );

    const count = grievances.length;
    const message = "Grievances retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: grievances });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteGrievance = async (req: Request, res: Response) => {
  try {
    const { grievanceId } = req.params;
    const grievance = await GrievanceService.deleteGrievance(grievanceId);

    if (!grievance) {
      const message = `No Grievance found with id: ${grievanceId}`;

      return res.status(404).json({ success: false, message, data: grievance });
    }

    const message = "Grievance deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted a grievance on project:  ${grievance.project.name}`,
    });

    return res.status(200).json({ success: true, message, data: grievance });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getGrievanceById = async (req: Request, res: Response) => {
  try {
    const { grievanceId } = req.params;
    const grievance = await GrievanceService.getGrievanceById(grievanceId);

    if (!grievance) {
      const message = `No Grievance found with id: ${grievanceId}`;

      return res.status(404).json({ success: false, message, data: grievance });
    }

    const message = "Grievance retrieved successfully.";

    return res.status(200).json({ success: true, message, data: grievance });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateGrievance = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { grievanceId } = req.params;

    const grievance = await GrievanceService.updateGrievance(grievanceId, body);

    if (!grievance) {
      const message = `No Grievance found with id: ${grievanceId}`;

      return res.status(404).json({ success: false, message, data: grievance });
    }

    const message = "Grievance updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a grievance on project:  ${grievance.project.name}`,
    });

    return res.status(200).json({ success: true, message, data: grievance });
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

// TODO: Add grievance-filter  by query
// export const getGrievancesByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const grievances = await GrievanceService.getGrievancesByQuery(searchQuery);

//     const count = grievances.length;
//     const message = "Grievances retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: grievances });
//   } catch (e) {
//     return errorResponse(res, 400, e);
//   }
// };

// const appendSearchKeywords = (req: Request) => {
//   let searchQuery: Object = {};
//   const {
//     status,
//     assignee,
//     metric,
//     type,
//     contact,
//     minValue,
//     maxValue,
//     dateCreated,
//     startDate,
//     endDate,
//   } = req.query;

//   //Assign properties into search-query iff they have values
//   searchQuery = {
//     ...(type && { type }),
//     ...(status && { status }),
//     ...(metric && { metric }),
//     ...(contact && { contact }),
//     ...(minValue && { minValue }),
//     ...(maxValue && { maxValue }),
//     ...(assignee && { assignee }),
//     ...(startDate && { startDate }),
//     ...(endDate && { endDate }),
//     ...(dateCreated && { dateCreated }),
//   };

//   return searchQuery;
// };
