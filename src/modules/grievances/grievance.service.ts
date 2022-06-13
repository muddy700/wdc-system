import * as GrievanceRepository from "./grievance.repository";
import { IGrievance } from "./grievance.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createGrievance = async (body: IGrievance) => {
  try {
    const grievance = await GrievanceRepository.createGrievance(body);

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getGrievances = async (keyword: string) => {
  try {
    const grievances = await GrievanceRepository.getGrievances(keyword);

    return grievances;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getGrievanceById = async (grievanceId: string) => {
  try {
    const grievance = await GrievanceRepository.getGrievanceById(grievanceId);

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateGrievance = async (
  grievanceId: string,
  body: IGrievance
) => {
  try {
    const grievance = await GrievanceRepository.updateGrievance(
      grievanceId,
      body
    );

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteGrievance = async (grievanceId: string) => {
  try {
    const grievance = await GrievanceRepository.deleteGrievance(grievanceId);

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add grievance-filter  by query
// export const getGrievancesByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const grievances = await GrievanceRepository.getGrievancesByQuery(searchQuery);

//     return grievances;
//   } catch (e) {
//     throw new Error(e.message);
//   }
// };

// const prepareSearchQuery = (searchQuery: any) => {
//   //Loop through the searchQuery object-properties

//   Object.keys(searchQuery).forEach((key) => {
//     if (key === "status") {
//       searchQuery.status = parseInt(searchQuery.status);
//     }

//     if (key === "assignee") {
//       searchQuery.assignee = ObjectId(searchQuery.assignee);
//     }

//     if (key === "contact") {
//       searchQuery.contact = ObjectId(searchQuery.contact);
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
