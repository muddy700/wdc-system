import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as ProjectService from "./project.service";

export const createProject = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const project = await ProjectService.createProject(body);

    const message = "Project created successfully.";

    await logEvent({
      request: req,
      activity: `Created a project:  ${project.name}`,
    });

    return res.status(200).json({ success: true, message, data: project });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const projects = await ProjectService.getProjects(
      (searchQuery as unknown as string) ?? ""
    );

    const count = projects.length;
    const message = "Projects retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: projects });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await ProjectService.getProjectById(projectId);
    const project = await ProjectService.deleteProject(projectId);

    if (!project.deletedCount) {
      const message = `No project found with id: ${projectId}`;

      return res.status(404).json({ success: false, message, data: project });
    }

    const message = "Project deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted a project:  ${deletedProject?.name}`,
    });

    return res.status(200).json({ success: true, message, data: project });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getprojectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await ProjectService.getProjectById(projectId);

    if (!project) {
      const message = `No project found with id: ${projectId}`;

      return res.status(404).json({ success: false, message, data: project });
    }

    const message = "Project retrieved successfully.";

    return res.status(200).json({ success: true, message, data: project });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateProject = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { projectId } = req.params;

    const project = await ProjectService.updateProject(projectId, body);

    if (!project) {
      const message = `No project found with id: ${projectId}`;

      return res.status(404).json({ success: false, message, data: project });
    }

    const message = "Project updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a project:  ${project.name}`,
    });

    return res.status(200).json({ success: true, message, data: project });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

const errorResponse = (res: Response, statusCode: number, error: any) => {
  // Formulate response

  return res.status(statusCode).json({
    success: false,
    message: "Operation failed.",
    data: null,
    userMessage: "Oops... Something went wrong, contact the admin...",
    developerMessage: error.message,
  });
};

// TODO: Add project-filter  by query
// export const getProjectsByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const projects = await ProjectService.getProjectsByQuery(searchQuery);

//     const count = projects.length;
//     const message = "Projects retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: projects });
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
