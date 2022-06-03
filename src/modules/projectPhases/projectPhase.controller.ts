import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as ProjectPhaseService from "./projectPhase.service";

export const createProjectPhase = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const projectPhase = await ProjectPhaseService.createProjectPhase(body);

    const message = "Project-phase created successfully.";

    await logEvent({
      request: req,
      activity: `Created Project-phase:  ${projectPhase.name}`,
    });

    return res.status(200).json({ success: true, message, data: projectPhase });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getProjectPhases: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const projectPhases = await ProjectPhaseService.getProjectPhases(
      (searchQuery as unknown as string) ?? ""
    );

    const count = projectPhases.length;
    const message = "Project-phases retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: projectPhases });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteProjectPhase = async (req: Request, res: Response) => {
  try {
    const { projectPhaseId } = req.params;
    const projectPhase = await ProjectPhaseService.deleteProjectPhase(projectPhaseId);

    if (!projectPhase) {
      const message = `No Project-phase found with id: ${projectPhaseId}`;

      return res
        .status(404)
        .json({ success: false, message, data: projectPhase });
    }

    const message = "Project-phase deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Project-phase:  ${projectPhase.name}`,
    });

    return res.status(200).json({ success: true, message, data: projectPhase });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getProjectPhaseById = async (req: Request, res: Response) => {
  try {
    const { projectPhaseId } = req.params;
    const projectPhase = await ProjectPhaseService.getProjectPhaseById(projectPhaseId);

    if (!projectPhase) {
      const message = `No Project-phase found with id: ${projectPhaseId}`;

      return res
        .status(404)
        .json({ success: false, message, data: projectPhase });
    }

    const message = "Project-phase retrieved successfully.";

    return res.status(200).json({ success: true, message, data: projectPhase });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateProjectPhase = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { projectPhaseId } = req.params;

    const projectPhase = await ProjectPhaseService.updateProjectPhase(
      projectPhaseId,
      body
    );

    if (!projectPhase) {
      const message = `No Project-phase found with id: ${projectPhaseId}`;

      return res
        .status(404)
        .json({ success: false, message, data: projectPhase });
    }

    const message = "Project-phase updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a Project-phase:  ${projectPhase.name}`,
    });

    return res.status(200).json({ success: true, message, data: projectPhase });
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

// TODO: Add projectPhase-filter  by query
// export const getProjectPhasesByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const projectPhases = await ProjectPhaseService.getProjectPhasesByQuery(searchQuery);

//     const count = projectPhases.length;
//     const message = "ProjectPhases retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: projectPhases });
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
