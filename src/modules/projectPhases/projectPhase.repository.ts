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

// TODO: Change the filtering logic to use aggregate function if there's a need
export const getProjectPhasesByQuery = async (searchQuery: Object) => {
  try {
    console.log("SearchQuery: ", searchQuery);

    const projectPhases = ProjectPhase.find({ ...searchQuery }).populate(
      "project"
    );

    return projectPhases;
  } catch (e) {
    throw new Error(e.message);
  }
};
