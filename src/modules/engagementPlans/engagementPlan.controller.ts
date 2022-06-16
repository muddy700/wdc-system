import { constants } from "../../config/constants";
import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as EngagementPlanService from "./engagementPlan.service";

const { PERPAGE } = constants;

export const createEngagementPlan = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const engagementPlan = await EngagementPlanService.createEngagementPlan(
      body
    );

    const message = "Engagement Plan created successfully.";

    await logEvent({
      request: req,
      activity: `Created Engagement Plan:  ${engagementPlan.activity}`,
    });

    return res
      .status(200)
      .json({ success: true, message, data: engagementPlan });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getEngagementPlans: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const engagementPlans = await EngagementPlanService.getEngagementPlans(
      (searchQuery as unknown as string) ?? ""
    );

    const count = engagementPlans.length;
    const message = "Engagement Plans retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, count, data: engagementPlans });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deleteEngagementPlan = async (req: Request, res: Response) => {
  try {
    const { engagementPlanId } = req.params;
    const engagementPlan = await EngagementPlanService.deleteEngagementPlan(
      engagementPlanId
    );

    if (!engagementPlan) {
      const message = `No Engagement Plan found with id: ${engagementPlanId}`;

      return res
        .status(404)
        .json({ success: false, message, data: engagementPlan });
    }

    const message = "Engagement Plan deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted Engagement Plan:  ${engagementPlan.activity}`,
    });

    return res
      .status(200)
      .json({ success: true, message, data: engagementPlan });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getEngagementPlanById = async (req: Request, res: Response) => {
  try {
    const { engagementPlanId } = req.params;
    const engagementPlan = await EngagementPlanService.getEngagementPlanById(
      engagementPlanId
    );

    if (!engagementPlan) {
      const message = `No Engagement Plan found with id: ${engagementPlanId}`;

      return res
        .status(404)
        .json({ success: false, message, data: engagementPlan });
    }

    const message = "Engagement Plan retrieved successfully.";

    return res
      .status(200)
      .json({ success: true, message, data: engagementPlan });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updateEngagementPlan = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { engagementPlanId } = req.params;

    const engagementPlan = await EngagementPlanService.updateEngagementPlan(
      engagementPlanId,
      body
    );

    if (!engagementPlan) {
      const message = `No Engagement Plan found with id: ${engagementPlanId}`;

      return res
        .status(404)
        .json({ success: false, message, data: engagementPlan });
    }

    const message = "Engagement Plan updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a EngagementPlan:  ${engagementPlan.activity}`,
    });

    return res
      .status(200)
      .json({ success: true, message, data: engagementPlan });
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

export const getEngagementPlansByQuery: RequestHandler = async (req, res) => {
  try {
    let searchQuery: Object = appendSearchKeywords(req);
    const currentPage = (req.query.currentPage as unknown as number) || 1;

    const perPage = parseInt(PERPAGE);
    const offset = perPage * currentPage - perPage;

    const { data, totalRows } =
      await EngagementPlanService.getEngagementPlansByQuery(
        offset,
        perPage,
        searchQuery
      );

    const count = data.length;
    const message = "Engagement Plans retrieved successfully.";

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
  const { project, stakeholder, projectPhase } = req.query;

  //Assign properties into search-query iff they have values
  searchQuery = {
    ...(project && { project }),
    ...(stakeholder && { stakeholder }),
    ...(projectPhase && { projectPhase }),
  };

  return searchQuery;
};
