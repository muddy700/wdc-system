import { IProject, Project } from "./project.model";

export const createProject = async (body: IProject) => {
  try {
    const project = await Project.create(body);

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjects = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add description, continent, country and abbreviation in regex
      const projects = Project.find({ name: { $regex: search } })
          .populate("piu");

    return projects;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const project = await Project.findOne({ _id: projectId });

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProject = async (projectId: string, body: IProject) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      { ...body },
      { new: true }
    );

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const project = await Project.deleteOne({ _id: projectId });

    return project;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add project-filter  by query
// export const getProjectsByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const projects = await Project.aggregate([
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

//   return projects[0].data;

//   //   return Project.find().populate("contact assignee lastActivity");
// };
