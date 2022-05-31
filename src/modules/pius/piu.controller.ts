import { Request, RequestHandler, Response } from "express";
import { logEvent } from "../auditTrail/auditTrail.service";
import * as PiuService from "./piu.service";

export const createPiu = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const piu = await PiuService.createPiu(body);

    const message = "Piu created successfully.";

    await logEvent({
      request: req,
      activity: `Created a piu:  ${piu.registeredName}`,
    });

    return res.status(200).json({ success: true, message, data: piu });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getPius: RequestHandler = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const pius = await PiuService.getPius(
      (searchQuery as unknown as string) ?? ""
    );

    const count = pius.length;
    const message = "Pius retrieved successfully.";

    return res.status(200).json({ success: true, message, count, data: pius });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const deletePiu = async (req: Request, res: Response) => {
  try {
    const { piuId } = req.params;
    const piu = await PiuService.deletePiu(piuId);

    if (!piu) {
      const message = `No piu found with id: ${piuId}`;

      return res.status(404).json({ success: false, message, data: piu });
    }

    const message = "Piu deleted successfully.";

    await logEvent({
      request: req,
      activity: `Deleted a piu:  ${piu.registeredName}`,
    });

    return res.status(200).json({ success: true, message, data: piu });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const getpiuById = async (req: Request, res: Response) => {
  try {
    const { piuId } = req.params;
    const piu = await PiuService.getPiuById(piuId);

    if (!piu) {
      const message = `No piu found with id: ${piuId}`;

      return res.status(404).json({ success: false, message, data: piu });
    }

    const message = "Piu retrieved successfully.";

    return res.status(200).json({ success: true, message, data: piu });
  } catch (e) {
    return errorResponse(res, 400, e);
  }
};

export const updatePiu = async (req: any, res: Response) => {
  try {
    const { body } = req;
    const { piuId } = req.params;

    const piu = await PiuService.updatePiu(piuId, body);

    if (!piu) {
      const message = `No piu found with id: ${piuId}`;

      return res.status(404).json({ success: false, message, data: piu });
    }

    const message = "Piu updated successfully.";

    await logEvent({
      request: req,
      activity: `Updated a piu:  ${piu.registeredName}`,
    });

    return res.status(200).json({ success: true, message, data: piu });
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

// TODO: Add piu-filter  by query
// export const getPiusByQuery: RequestHandler = async (req, res) => {
//   try {
//     let searchQuery: Object = appendSearchKeywords(req);

//     const pius = await PiuService.getPiusByQuery(searchQuery);

//     const count = pius.length;
//     const message = "Pius retrieved successfully.";

//     return res
//       .status(200)
//       .json({ success: true, message, count, data: pius });
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
