import * as EngagementLevelRepository from "./engagementLevel.repository";
import { IEngagementLevel } from "./engagementLevel.model";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const createEngagementLevel = async (body: IEngagementLevel) => {
  try {
    const engagementLevel =
      await EngagementLevelRepository.createEngagementLevel(body);

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementLevels = async (keyword: string) => {
  try {
    const engagementLevels =
      await EngagementLevelRepository.getEngagementLevels(keyword);

    return engagementLevels;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementLevelById = async (engagementLevelId: string) => {
  try {
    const engagementLevel =
      await EngagementLevelRepository.getEngagementLevelById(engagementLevelId);

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateEngagementLevel = async (
  engagementLevelId: string,
  body: IEngagementLevel
) => {
  try {
    const engagementLevel =
      await EngagementLevelRepository.updateEngagementLevel(
        engagementLevelId,
        body
      );

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteEngagementLevel = async (engagementLevelId: string) => {
  try {
    const engagementLevel =
      await EngagementLevelRepository.deleteEngagementLevel(engagementLevelId);

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementLevelsByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: Object
) => {
  try {
    searchQuery = prepareSearchQuery(searchQuery);

    const engagementLevels =
      await EngagementLevelRepository.getEngagementLevelsByQuery(
        offset,
        perPage,
        searchQuery
      );

    return engagementLevels;
  } catch (e) {
    throw new Error(e.message);
  }
};

const prepareSearchQuery = (searchQuery: any) => {
  //Loop through the searchQuery object-properties

  Object.keys(searchQuery).forEach((key) => {
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
