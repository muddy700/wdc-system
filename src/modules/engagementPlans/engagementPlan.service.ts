import * as EngagementPlanRepository from "./engagementPlan.repository";
import { IEngagementPlan } from "./engagementPlan.model";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const createEngagementPlan = async (body: IEngagementPlan) => {
  try {
    const engagementPlan = await EngagementPlanRepository.createEngagementPlan(
      body
    );

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementPlans = async (keyword: string) => {
  try {
    const engagementPlans = await EngagementPlanRepository.getEngagementPlans(
      keyword
    );

    return engagementPlans;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementPlanById = async (engagementPlanId: string) => {
  try {
    const engagementPlan = await EngagementPlanRepository.getEngagementPlanById(
      engagementPlanId
    );

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateEngagementPlan = async (
  engagementPlanId: string,
  body: IEngagementPlan
) => {
  try {
    const engagementPlan = await EngagementPlanRepository.updateEngagementPlan(
      engagementPlanId,
      body
    );

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteEngagementPlan = async (engagementPlanId: string) => {
  try {
    const engagementPlan = await EngagementPlanRepository.deleteEngagementPlan(
      engagementPlanId
    );

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementPlansByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: Object
) => {
  try {
    searchQuery = prepareSearchQuery(searchQuery);

    const engagementPlans =
      await EngagementPlanRepository.getEngagementPlansByQuery(
        offset,
        perPage,
        searchQuery
      );

    return engagementPlans;
  } catch (e) {
    throw new Error(e.message);
  }
};

const prepareSearchQuery = (searchQuery: any) => {
  //Loop through the searchQuery object-properties

  Object.keys(searchQuery).forEach((key) => {
    if (key === "project") {
      searchQuery.project = ObjectId(searchQuery.project);
    }

    if (key === "stakeholder") {
      searchQuery.stakeholder = ObjectId(searchQuery.stakeholder);
    }

    if (key === "projectPhase") {
      searchQuery.projectPhase = ObjectId(searchQuery.projectPhase);
    }
  });

  return searchQuery;
};

// const prepareSearchQuery = (searchQuery: any) => {
//   //Loop through the searchQuery object-properties

//   Object.keys(searchQuery).forEach((key) => {
//     if (key === "status") {
//       searchQuery.status = parseInt(searchQuery.status);
//     }
//     //TODO: Review this(date-filter) logic
//     if (key === "dateCreated") {
//       searchQuery.dateCreated = { $eq: searchQuery.dateCreated };
//     }

//     // * Ignore filtering by date-range if dateCreated-filter is present
//     // * to avoid data conflict / inconsistance: See below-code
//     if (
//       !searchQuery.dateCreated &&
//       (key === "startDate" || key === "endDate")
//     ) {
//       if (
//         (key === "startDate" && searchQuery.endDate !== undefined) ||
//         (key === "endDate" && searchQuery.startDate !== undefined)
//       ) {
//         searchQuery.dateCreated = {
//           $gte: searchQuery.startDate,
//           $lte: searchQuery.endDate,
//         };
//       } else if (key === "startDate") {
//         searchQuery.dateCreated = { $gte: searchQuery.startDate };
//       } else if (key === "endDate") {
//         searchQuery.dateCreated = { $lte: searchQuery.endDate };
//       }
//     }

//     if (
//       (key === "maxValue" && searchQuery.minValue !== undefined) ||
//       (key === "minValue" && searchQuery.maxValue !== undefined)
//     ) {
//       searchQuery.value = {
//         $gte: parseFloat(searchQuery.minValue),
//         $lte: parseFloat(searchQuery.maxValue),
//       };
//     } else if (key === "maxValue") {
//       searchQuery.value = { $lte: parseFloat(searchQuery.maxValue) };
//     } else if (key === "minValue") {
//       searchQuery.value = { $gte: parseFloat(searchQuery.minValue) };
//     }
//   });

//   //Remove extra properties
//   const { minValue, maxValue, startDate, endDate, ...restFilters } =
//     searchQuery;

//   return restFilters;
// };
