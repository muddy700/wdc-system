import { IProjectEvent, ProjectEvent } from "./projectEvent.model";

export const createProjectEvent = async (body: IProjectEvent) => {
  try {
    const projectEvent = await ProjectEvent.create(body);

    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectEvents = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add type, and channel in regex
    const projectEvents = ProjectEvent.find({
      title: { $regex: search },
    });

    return projectEvents;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectEventById = async (projectEventId: string) => {
  try {
    const projectEvent = await ProjectEvent.findOne({
      _id: projectEventId,
    });

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
    const projectEvent = await ProjectEvent.findOneAndUpdate(
      { _id: projectEventId },
      { ...body },
      { new: true }
    );
    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProjectEvent = async (projectEventId: string) => {
  try {
    const projectEvent = await ProjectEvent.findOneAndDelete({
      _id: projectEventId,
    });

    return projectEvent;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add projectEvent-filter  by query
// export const getProjectEventsByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const projectEvents = await ProjectEvent.aggregate([
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

//   return projectEvents[0].data;

//   //   return ProjectEvent.find().populate("contact assignee lastActivity");
// };
