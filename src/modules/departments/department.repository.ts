import { IDepartment, Department } from "./department.model";

export const createDepartment = async (body: IDepartment) => {
  try {
    const department = await Department.create(body);

    return department.populate("piu").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getDepartments = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add description in regex
    const departments = Department.find({ name: { $regex: search } }).populate(
      "piu"
    );

    return departments;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getDepartmentById = async (departmentId: string) => {
  try {
    const department = await Department.findOne({ _id: departmentId }).populate(
      "piu"
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
    const department = await Department.findOneAndUpdate(
      { _id: departmentId },
      { ...body },
      { new: true }
    ).populate("piu");

    return department;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteDepartment = async (departmentId: string) => {
  try {
    const department = await Department.findOneAndDelete({ _id: departmentId });

    return department;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add department-filter  by query
// export const getDepartmentsByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const departments = await Department.aggregate([
//     {
//       $addFields: {
//         dateCreated: {
//           $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//         },
//       },
//     },
//     { $match: { ...searchQuery } },
//     { $sort: { createdAt: -1 } },
//     { $facet: { metadata: [{ $count: "total" }], data: [] } },
//   ]);

//   return departments[0].data;

//   //   return Department.find().populate("contact assignee lastActivity");
// };
