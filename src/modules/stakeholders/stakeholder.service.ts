import * as StakeholderRepository from "./stakeholder.repository";
import { IStakeholder } from "./stakeholder.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createStakeholder = async (body: IStakeholder) => {
  try {
    const stakeholder = await StakeholderRepository.createStakeholder(body);

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholders = async (name: string) => {
  try {
    const stakeholders = await StakeholderRepository.getStakeholders(name);

    return stakeholders;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholderById = async (stakeholderId: string) => {
  try {
    const stakeholder = await StakeholderRepository.getStakeholderById(stakeholderId);

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateStakeholder = async (stakeholderId: string, body: IStakeholder) => {
  try {
    const stakeholder = await StakeholderRepository.updateStakeholder(stakeholderId, body);

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteStakeholder = async (stakeholderId: string) => {
  try {
    const stakeholder = await StakeholderRepository.deleteStakeholder(stakeholderId);

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add stakeholder-filter  by query
// export const getStakeholdersByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const stakeholders = await StakeholderRepository.getStakeholdersByQuery(searchQuery);

//     return stakeholders;
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
