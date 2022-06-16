import { IEngagementLevel, EngagementLevel } from "./engagementLevel.model";

export const createEngagementLevel = async (body: IEngagementLevel) => {
  try {
    const engagementLevel = await EngagementLevel.create(body);

    return engagementLevel.populate("projectPhase stakeholder").execPopulate();
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

export const getEngagementLevelsByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: object
) => {
  console.log("SearchQuery: ", searchQuery);

  const engagementLevels = await EngagementLevel.aggregate([
    { $match: { ...searchQuery } },
    {
      $lookup: {
        from: "projectphases",
        localField: "projectPhase",
        foreignField: "_id",
        as: "projectPhase",
      },
    },
    {
      $lookup: {
        from: "stakeholders",
        localField: "stakeholder",
        foreignField: "_id",
        as: "stakeholder",
      },
    },
    {
      $addFields: {
        dateCreated: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
      },
    },
    {
      $unwind: {
        path: "$projectPhase",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$stakeholder",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: offset }, { $limit: perPage }],
      },
    },
  ]);

  if (engagementLevels[0].data.length === 0) {
    return { data: [], totalRows: 0 };
  }

  return {
    data: engagementLevels[0].data,
    totalRows: engagementLevels[0].metadata[0].total,
  };
};
