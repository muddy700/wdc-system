import { ISubProject, SubProject } from "./subProject.model";

export const createSubProject = async (body: ISubProject) => {
  try {
    const subProject = await SubProject.create(body);

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getSubProjects = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add description, parentProject in regex
    const subProjects = SubProject.find({ name: { $regex: search } }).populate(
      "parentProject"
    );

    return subProjects;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getSubProjectById = async (subProjectId: string) => {
  try {
    const subProject = await SubProject.findOne({ _id: subProjectId });

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateSubProject = async (
  subProjectId: string,
  body: ISubProject
) => {
  try {
    const subProject = await SubProject.findOneAndUpdate(
      { _id: subProjectId },
      { ...body },
      { new: true }
    );

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteSubProject = async (subProjectId: string) => {
  try {
    const subProject = await SubProject.findOneAndDelete({ _id: subProjectId });

    return subProject;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add subProject-filter  by query
// export const getSubProjectsByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const subProjects = await SubProject.aggregate([
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

//   return subProjects[0].data;

//   //   return SubProject.find().populate("contact assignee lastActivity");
// };
