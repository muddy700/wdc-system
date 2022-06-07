import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as DepartmentService from "./department.service";

export const createDepartment = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const department = await DepartmentService.createDepartment(body);

    const message = "Department created successfully.";

    await logEvent({
      request: req,
      activity: `Created Department:  ${department.name}`,
    });

    return res.status(200).json({ success: true, message, data: department });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getDepartments: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const departments = await DepartmentService.getDepartments(
      (searchQuery as unknown as string) ?? ""
    );

    const count = departments.length;
    const message = "Departments retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: departments });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;
    const department = await DepartmentService.deleteDepartment(departmentId);

    if (!department) {
      const message = `No Department found with id: ${departmentId}`;

      return res
        .status(404)
        .json({ success: false, message, data: department });
    }

    const message = "Department deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Department:  ${department.name}`,
    });

    return res.status(200).json({ success: true, message, data: department });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;
    const department = await DepartmentService.getDepartmentById(departmentId);

    if (!department) {
      const message = `No Department found with id: ${departmentId}`;

      return res
        .status(404)
        .json({ success: false, message, data: department });
    }

    const message = "Department retrieved successfully.";

    return res.status(200).json({ success: true, message, data: department });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateDepartment = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { departmentId } = req.params;

    const department = await DepartmentService.updateDepartment(
      departmentId,
      body
    );

    if (!department) {
      const message = `No Department found with id: ${departmentId}`;

      return res
        .status(404)
        .json({ success: false, message, data: department });
    }

    const message = "Department updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated Department:  ${department.name}`,
    });

    return res.status(200).json({ success: true, message, data: department });
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

// TODO: Add department-filter  by query
// export const getDepartmentsByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const departments = await DepartmentService.getDepartmentsByQuery(searchQuery);

//     const count = departments.length;
//     const message = "Departments retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: departments });
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
