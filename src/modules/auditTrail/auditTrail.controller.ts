import { Request, Response } from "express";
import * as auditTrailService from "./auditTrail.service";
import { constants } from "../../config/constants";

const { PERPAGE } = constants;

export async function getLogs(req: Request, res: Response) {
    try {
    const perPage = parseInt(PERPAGE);
    const currentPage = req.query.currentPage as unknown as number;
    const offset = PERPAGE * currentPage - PERPAGE;

    const { logs, count } = await auditTrailService.getLogs(offset, perPage);

    const pagination = {
      currentPage,
      perPage: PERPAGE,
      totalPages: Math.ceil(count / PERPAGE),
      totalRows: count,
    };

    const message = "Logs retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, pagination, data: logs });
  } catch (e) {
    return errorResponse(res, 500, e);
  }
}

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
