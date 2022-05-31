import * as PiuRepository from "./piu.repository";
import { IPiu } from "./piu.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createPiu = async (body: IPiu) => {
  try {
    const piu = await PiuRepository.createPiu(body);

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getPius = async (name: string) => {
  try {
    const pius = await PiuRepository.getPius(name);

    return pius;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getPiuById = async (piuId: string) => {
  try {
    const piu = await PiuRepository.getPiuById(piuId);

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updatePiu = async (piuId: string, body: IPiu) => {
  try {
    const piu = await PiuRepository.updatePiu(piuId, body);

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deletePiu = async (piuId: string) => {
  try {
    const piu = await PiuRepository.deletePiu(piuId);

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add piu-filter  by query
// export const getPiusByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const pius = await PiuRepository.getPiusByQuery(searchQuery);

//     return pius;
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
