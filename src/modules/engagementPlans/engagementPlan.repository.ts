import { IEngagementPlan, EngagementPlan } from "./engagementPlan.model";

export const createEngagementPlan = async (body: IEngagementPlan) => {
  try {
    const engagementPlan = await EngagementPlan.create(body);

    return engagementPlan
      .populate("project stakeholder projectPhase")
      .execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementPlans = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add activity, channel, frequency and startingDate in regex
    const engagementPlans = EngagementPlan.find({
      activity: { $regex: search },
    }).populate("project stakeholder projectPhase");

    return engagementPlans;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementPlanById = async (engagementPlanId: string) => {
  try {
    const engagementPlan = await EngagementPlan.findOne({
      _id: engagementPlanId,
    }).populate("project stakeholder projectPhase");

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateEngagementPlan = async (
  engagementPlanId: string,
  body: IEngagementPlan
) => {
  try {
    const engagementPlan = await EngagementPlan.findOneAndUpdate(
      { _id: engagementPlanId },
      { ...body },
      { new: true }
    ).populate("project stakeholder projectPhase");

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteEngagementPlan = async (engagementPlanId: string) => {
  try {
    const engagementPlan = await EngagementPlan.findOneAndDelete({
      _id: engagementPlanId,
    });

    return engagementPlan;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getEngagementPlansByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: object
) => {
  console.log("SearchQuery: ", searchQuery);

  const engagementPlans = await EngagementPlan.aggregate([
    { $match: { ...searchQuery } },
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "project",
      },
    },
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
        path: "$project",
        preserveNullAndEmptyArrays: true,
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
    // { $sort: { createdAt: -1 } },
    // {
    //   $group: {
    //     _id: "$stakeholder.name",
    //     count: { $sum: 1 },
    //     plans: { $push: "$$ROOT" },
    //   },
    // },
    {
      $group: {
        _id: "$projectPhase.name",
        count: { $sum: 1 },
        stakeholders: { $push: "$$ROOT" },
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: offset }, { $limit: perPage }],
      },
    },
  ]);

  if (engagementPlans[0].data.length === 0) {
    return { data: [], totalRows: 0 };
  }

  return {
    data: engagementPlans[0].data,
    totalRows: engagementPlans[0].metadata[0].total,
  };
};
