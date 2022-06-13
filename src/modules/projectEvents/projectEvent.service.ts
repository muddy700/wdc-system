import * as ProjectEventRepository from "./projectEvent.repository";
import { IProjectEvent } from "./projectEvent.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createProjectEvent = async (body: IProjectEvent) => {
  try {
    const projectEvent = await ProjectEventRepository.createProjectEvent(body);

    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectEvents = async (keyword: string) => {
  try {
    const projectEvents = await ProjectEventRepository.getProjectEvents(
      keyword
    );

    return projectEvents;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectEventById = async (projectEventId: string) => {
  try {
    const projectEvent = await ProjectEventRepository.getProjectEventById(
      projectEventId
    );

    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProjectEvent = async (
  projectEventId: string,
  body: IProjectEvent
) => {
  try {
    const projectEvent = await ProjectEventRepository.updateProjectEvent(
      projectEventId,
      body
    );

    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProjectEvent = async (projectEventId: string) => {
  try {
    const projectEvent = await ProjectEventRepository.deleteProjectEvent(
      projectEventId
    );

    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add projectEvent-filter  by query
// export const getProjectEventsByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const projectEvents = await ProjectEventRepository.getProjectEventsByQuery(searchQuery);

//     return projectEvents;
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
