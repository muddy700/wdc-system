import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as StakeholderService from "./stakeholder.service";

export const createStakeholder = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const stakeholder = await StakeholderService.createStakeholder(body);

    const message = "Stakeholder created successfully.";

    await logEvent({
      request: req,
      activity: `Created Stakeholder:  ${stakeholder.name}`,
    });

    return res.status(200).json({ success: true, message, data: stakeholder });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getStakeholders: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const stakeholders = await StakeholderService.getStakeholders(
      (searchQuery as unknown as string) ?? ""
    );

    const count = stakeholders.length;
    const message = "Stakeholders retrieved successfully.";

    return res.status(200).json({ success: true, message, count, data: stakeholders });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteStakeholder = async (req: Request, res: Response) => {
  try {
    const { stakeholderId } = req.params;
    const stakeholder = await StakeholderService.deleteStakeholder(stakeholderId);

    if (!stakeholder) {
      const message = `No Stakeholder found with id: ${stakeholderId}`;

      return res.status(404).json({ success: false, message, data: stakeholder });
    }

    const message = "Stakeholder deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Stakeholder:  ${stakeholder.name}`,
    });

    return res.status(200).json({ success: true, message, data: stakeholder });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getstakeholderById = async (req: Request, res: Response) => {
  try {
    const { stakeholderId } = req.params;
    const stakeholder = await StakeholderService.getStakeholderById(stakeholderId);

    if (!stakeholder) {
      const message = `No Stakeholder found with id: ${stakeholderId}`;

      return res.status(404).json({ success: false, message, data: stakeholder });
    }

    const message = "Stakeholder retrieved successfully.";

    return res.status(200).json({ success: true, message, data: stakeholder });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateStakeholder = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { stakeholderId } = req.params;

    const stakeholder = await StakeholderService.updateStakeholder(stakeholderId, body);

    if (!stakeholder) {
      const message = `No Stakeholder found with id: ${stakeholderId}`;

      return res.status(404).json({ success: false, message, data: stakeholder });
    }

    const message = "Stakeholder updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated Stakeholder:  ${stakeholder.name}`,
    });

    return res.status(200).json({ success: true, message, data: stakeholder });
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

// TODO: Add stakeholder-filter  by query
// export const getStakeholdersByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const stakeholders = await StakeholderService.getStakeholdersByQuery(searchQuery);

//     const count = stakeholders.length;
//     const message = "Stakeholders retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: stakeholders });
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
