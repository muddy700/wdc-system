import { IEngagementLevel, EngagementLevel } from "./engagementLevel.model";

export const createEngagementLevel = async (body: IEngagementLevel) => {
  try {
    const engagementLevel = await EngagementLevel.create(body);

    return engagementLevel
      .populate("projectPhase stakeholder")
      .execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementLevels = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add desiredLevel in regex
    const engagementLevels = EngagementLevel.find({
      currentLevel: { $regex: search },
    }).populate("projectPhase stakeholder");

    return engagementLevels;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementLevelById = async (engagementLevelId: string) => {
  try {
    const engagementLevel = await EngagementLevel.findOne({
      _id: engagementLevelId,
    }).populate("projectPhase stakeholder");

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateEngagementLevel = async (
  engagementLevelId: string,
  body: IEngagementLevel
) => {
  try {
    const engagementLevel = await EngagementLevel.findOneAndUpdate(
      { _id: engagementLevelId },
      { ...body },
      { new: true }
    ).populate("projectPhase stakeholder");

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteEngagementLevel = async (engagementLevelId: string) => {
  try {
    const engagementLevel = await EngagementLevel.findOneAndDelete({
      _id: engagementLevelId,
    });

    return engagementLevel;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add engagementLevel-filter  by query
// export const getEngagementLevelsByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const engagementLevels = await EngagementLevel.aggregate([
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

//   return engagementLevels[0].data;

//   //   return EngagementLevel.find().populate("contact assignee lastActivity");
// };
