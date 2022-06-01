import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as SubProjectService from "./subProject.service";

export const createSubProject = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const subProject = await SubProjectService.createSubProject(body);

    const message = "Sub-project created successfully.";

    await logEvent({
      request: req,
      activity: `Created Sub-project:  ${subProject.name}`,
    });

    return res.status(200).json({ success: true, message, data: subProject });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getSubProjects: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const subProjects = await SubProjectService.getSubProjects(
      (searchQuery as unknown as string) ?? ""
    );

    const count = subProjects.length;
    const message = "Sub-projects retrieved successfully.";

    return res.status(200).json({ success: true, message, count, data: subProjects });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteSubProject = async (req: Request, res: Response) => {
  try {
    const { subProjectId } = req.params;
    const subProject = await SubProjectService.deleteSubProject(subProjectId);

    if (!subProject) {
      const message = `No Sub-project found with id: ${subProjectId}`;

      return res.status(404).json({ success: false, message, data: subProject });
    }

    const message = "Sub-project deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Sub-project:  ${subProject.name}`,
    });

    return res.status(200).json({ success: true, message, data: subProject });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getSubProjectById = async (req: Request, res: Response) => {
  try {
    const { subProjectId } = req.params;
    const subProject = await SubProjectService.getSubProjectById(subProjectId);

    if (!subProject) {
      const message = `No Sub-project found with id: ${subProjectId}`;

      return res.status(404).json({ success: false, message, data: subProject });
    }

    const message = "Sub-project retrieved successfully.";

    return res.status(200).json({ success: true, message, data: subProject });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateSubProject = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { subProjectId } = req.params;

    const subProject = await SubProjectService.updateSubProject(subProjectId, body);

    if (!subProject) {
      const message = `No Sub-project found with id: ${subProjectId}`;

      return res.status(404).json({ success: false, message, data: subProject });
    }

    const message = "Sub-project updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a Sub-project:  ${subProject.name}`,
    });

    return res.status(200).json({ success: true, message, data: subProject });
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

// TODO: Add subProject-filter  by query
// export const getSubProjectsByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const subProjects = await SubProjectService.getSubProjectsByQuery(searchQuery);

//     const count = subProjects.length;
//     const message = "SubProjects retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: subProjects });
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
