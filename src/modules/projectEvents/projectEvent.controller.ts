import * as ProjectEventService from "./projectEvent.service";
import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";

export const createProjectEvent = async (req: any, res: Response) => {
  try {
    const { body } = req;

    const projectEvent = await ProjectEventService.createProjectEvent(body);

    const message = "Project-Event created successfully.";

    await logEvent({
      request: req,
      activity: `Created Project-Event:  ${projectEvent.title}`,
    });

    return res.status(200).json({ success: true, message, data: projectEvent });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getProjectEvents: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const projectEvents = await ProjectEventService.getProjectEvents(
      (searchQuery as unknown as string) ?? ""
    );

    const count = projectEvents.length;
    const message = "Project-Events retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: projectEvents });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteProjectEvent = async (req: Request, res: Response) => {
  try {
    const { projectEventId } = req.params;
    const projectEvent = await ProjectEventService.deleteProjectEvent(
      projectEventId
    );

    if (!projectEvent) {
      const message = `No Project-Event found with id: ${projectEventId}`;

      return res
        .status(404)
        .json({ success: false, message, data: projectEvent });
    }

    const message = "Project-Event deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Project-Event:  ${projectEvent.title}`,
    });

    return res.status(200).json({ success: true, message, data: projectEvent });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getProjectEventById = async (req: Request, res: Response) => {
  try {
    const { projectEventId } = req.params;
    const projectEvent = await ProjectEventService.getProjectEventById(
      projectEventId
    );

    if (!projectEvent) {
      const message = `No Project-Event found with id: ${projectEventId}`;

      return res
        .status(404)
        .json({ success: false, message, data: projectEvent });
    }

    const message = "Project-Event retrieved successfully.";

    return res.status(200).json({ success: true, message, data: projectEvent });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateProjectEvent = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { projectEventId } = req.params;

    const projectEvent = await ProjectEventService.updateProjectEvent(
      projectEventId,
      body
    );

    if (!projectEvent) {
      const message = `No Project-Event found with id: ${projectEventId}`;

      return res
        .status(404)
        .json({ success: false, message, data: projectEvent });
    }

    const message = "Project-Event updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated Project-Event:  ${projectEvent.title}`,
    });

    return res.status(200).json({ success: true, message, data: projectEvent });
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

// TODO: Add projectEvent-filter  by query
// export const getProjectEventsByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const projectEvents = await ProjectEventService.getProjectEventsByQuery(searchQuery);

//     const count = projectEvents.length;
//     const message = "ProjectEvents retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: projectEvents });
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
