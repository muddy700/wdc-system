import * as ProjectPhaseRepository from "./projectPhase.repository";
import { IProjectPhase } from "./projectPhase.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createProjectPhase = async (body: IProjectPhase) => {
  try {
    const projectPhase = await ProjectPhaseRepository.createProjectPhase(body);

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhases = async (name: string) => {
  try {
    const projectPhases = await ProjectPhaseRepository.getProjectPhases(name);

    return projectPhases;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhaseById = async (projectPhaseId: string) => {
  try {
    const projectPhase = await ProjectPhaseRepository.getProjectPhaseById(projectPhaseId);

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProjectPhase = async (projectPhaseId: string, body: IProjectPhase) => {
  try {
    const projectPhase = await ProjectPhaseRepository.updateProjectPhase(projectPhaseId, body);

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProjectPhase = async (projectPhaseId: string) => {
  try {
    const projectPhase = await ProjectPhaseRepository.deleteProjectPhase(projectPhaseId);

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add projectPhase-filter  by query
// export const getProjectPhasesByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const projectPhases = await ProjectPhaseRepository.getProjectPhasesByQuery(searchQuery);

//     return projectPhases;
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
