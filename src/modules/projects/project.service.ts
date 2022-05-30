import * as ProjectRepository from "./project.repository";
import { IProject } from "./project.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createProject = async (body: IProject) => {
  try {
    const project = await ProjectRepository.createProject(body);

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjects = async (name: string) => {
  try {
    const projects = await ProjectRepository.getProjects(name);

    return projects;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const project = await ProjectRepository.getProjectById(projectId);

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProject = async (projectId: string, body: IProject) => {
  try {
    const project = await ProjectRepository.updateProject(projectId, body);

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const project = await ProjectRepository.deleteProject(projectId);

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add project-filter  by query
// export const getProjectsByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const projects = await ProjectRepository.getProjectsByQuery(searchQuery);

//     return projects;
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
