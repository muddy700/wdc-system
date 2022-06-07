import * as DepartmentRepository from "./department.repository";
import { IDepartment } from "./department.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createDepartment = async (body: IDepartment) => {
  try {
    const department = await DepartmentRepository.createDepartment(body);

    return department;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getDepartments = async (name: string) => {
  try {
    const departments = await DepartmentRepository.getDepartments(name);

    return departments;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getDepartmentById = async (departmentId: string) => {
  try {
    const department = await DepartmentRepository.getDepartmentById(
      departmentId
    );

    return department;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateDepartment = async (
  departmentId: string,
  body: IDepartment
) => {
  try {
    const department = await DepartmentRepository.updateDepartment(
      departmentId,
      body
    );

    return department;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteDepartment = async (departmentId: string) => {
  try {
    const department = await DepartmentRepository.deleteDepartment(
      departmentId
    );

    return department;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add department-filter  by query
// export const getDepartmentsByQuery = async (searchQuery: object) => {
//   try {
//     searchQuery = prepareSearchQuery(searchQuery);

//     const departments = await DepartmentRepository.getDepartmentsByQuery(searchQuery);

//     return departments;
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
