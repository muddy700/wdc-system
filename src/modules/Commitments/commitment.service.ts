import * as CommitmentRepository from "./commitment.repository";
import { ICommitment } from "./commitment.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createCommitment = async (body: ICommitment) => {
  try {
    const commitment = await CommitmentRepository.createCommitment(body);

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCommitments = async (name: string) => {
  try {
    const commitments = await CommitmentRepository.getCommitments(name);

    return commitments;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCommitmentById = async (commitmentId: string) => {
  try {
    const commitment = await CommitmentRepository.getCommitmentById(
      commitmentId
    );

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateCommitment = async (
  commitmentId: string,
  body: ICommitment
) => {
  try {
    const commitment = await CommitmentRepository.updateCommitment(
      commitmentId,
      body
    );

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteCommitment = async (commitmentId: string) => {
  try {
    const commitment = await CommitmentRepository.deleteCommitment(
      commitmentId
    );

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add commitment-filter  by query
// export const getCommitmentsByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const commitments = await CommitmentRepository.getCommitmentsByQuery(searchQuery);

//     return commitments;
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
