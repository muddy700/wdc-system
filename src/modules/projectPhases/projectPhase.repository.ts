import { IProjectPhase, ProjectPhase } from "./projectPhase.model";

export const createProjectPhase = async (body: IProjectPhase) => {
  try {
    const projectPhase = await ProjectPhase.create(body);

    return projectPhase.populate("project").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhases = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add description in regex
    const projectPhases = ProjectPhase.find({
      name: { $regex: search },
    }).populate("project");

    return projectPhases;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhaseById = async (projectPhaseId: string) => {
  try {
    const projectPhase = await ProjectPhase.findOne({
      _id: projectPhaseId,
    }).populate("project");

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProjectPhase = async (
  projectPhaseId: string,
  body: IProjectPhase
) => {
  try {
    const projectPhase = await ProjectPhase.findOneAndUpdate(
      { _id: projectPhaseId },
      { ...body },
      { new: true }
    ).populate("project");

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProjectPhase = async (projectPhaseId: string) => {
  try {
    const projectPhase = await ProjectPhase.findOneAndDelete({
      _id: projectPhaseId,
    });

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add projectPhase-filter  by query
// export const getProjectPhasesByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const projectPhases = await ProjectPhase.aggregate([
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

//   return projectPhases[0].data;

//   //   return ProjectPhase.find().populate("contact assignee lastActivity");
// };
