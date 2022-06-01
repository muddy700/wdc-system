import * as SubProjectRepository from "./subProject.repository";
import { ISubProject } from "./subProject.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createSubProject = async (body: ISubProject) => {
  try {
    const subProject = await SubProjectRepository.createSubProject(body);

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getSubProjects = async (name: string) => {
  try {
    const subProjects = await SubProjectRepository.getSubProjects(name);

    return subProjects;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getSubProjectById = async (subProjectId: string) => {
  try {
    const subProject = await SubProjectRepository.getSubProjectById(subProjectId);

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateSubProject = async (subProjectId: string, body: ISubProject) => {
  try {
    const subProject = await SubProjectRepository.updateSubProject(subProjectId, body);

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteSubProject = async (subProjectId: string) => {
  try {
    const subProject = await SubProjectRepository.deleteSubProject(subProjectId);

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add subProject-filter  by query
// export const getSubProjectsByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const subProjects = await SubProjectRepository.getSubProjectsByQuery(searchQuery);

//     return subProjects;
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
