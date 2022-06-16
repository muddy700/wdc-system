import { constants } from "../../config/constants";
import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as CommitmentService from "./commitment.service";

const { PERPAGE } = constants;

export const createCommitment = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const commitment = await CommitmentService.createCommitment(body);

    const message = "Commitment created successfully.";

    await logEvent({
      request: req,
      activity: `Created a commitment on project:  ${commitment.project.name}`,
    });

    return res.status(200).json({ success: true, message, data: commitment });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getCommitments: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const commitments = await CommitmentService.getCommitments(
      (searchQuery as unknown as string) ?? ""
    );

    const count = commitments.length;
    const message = "Commitments retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: commitments });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteCommitment = async (req: Request, res: Response) => {
  try {
    const { commitmentId } = req.params;
    const commitment = await CommitmentService.deleteCommitment(commitmentId);

    if (!commitment) {
      const message = `No Commitment found with id: ${commitmentId}`;

      return res
        .status(404)
        .json({ success: false, message, data: commitment });
    }

    const message = "Commitment deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted a commitment on project:  ${commitment.project.name}`,
    });

    return res.status(200).json({ success: true, message, data: commitment });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getCommitmentById = async (req: Request, res: Response) => {
  try {
    const { commitmentId } = req.params;
    const commitment = await CommitmentService.getCommitmentById(commitmentId);

    if (!commitment) {
      const message = `No Commitment found with id: ${commitmentId}`;

      return res
        .status(404)
        .json({ success: false, message, data: commitment });
    }

    const message = "Commitment retrieved successfully.";

    return res.status(200).json({ success: true, message, data: commitment });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateCommitment = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { commitmentId } = req.params;

    const commitment = await CommitmentService.updateCommitment(
      commitmentId,
      body
    );

    if (!commitment) {
      const message = `No Commitment found with id: ${commitmentId}`;

      return res
        .status(404)
        .json({ success: false, message, data: commitment });
    }

    const message = "Commitment updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a commitment on project:  ${commitment.project.name}`,
    });

    return res.status(200).json({ success: true, message, data: commitment });
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

export const getCommitmentsByQuery: RequestHandler = async (req, res) => {
  try {
    let searchQuery: Object = appendSearchKeywords(req);
    const currentPage = (req.query.currentPage as unknown as number) || 1;

    const perPage = parseInt(PERPAGE);
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } = await CommitmentService.getCommitmentsByQuery(
      offset,
      perPage,
      searchQuery
    );

    const count = data.length;
    const message = "Commitments retrieved successfully.";

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

const appendSearchKeywords = (req: Request) => {
  let searchQuery: Object = {};
  const { project, actor, status, projectPhase } = req.query;

  //Assign properties into search-query iff they have values
  searchQuery = {
    ...(actor && { actor }),
    ...(status && { status }),
    ...(project && { project }),
    ...(projectPhase && { projectPhase }),
  };

  return searchQuery;
};
