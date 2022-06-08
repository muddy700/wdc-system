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

// TODO: Add engagementPlan-filter  by query
// export const getEngagementPlansByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const engagementPlans = await EngagementPlan.aggregate([
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

//   return engagementPlans[0].data;

//   //   return EngagementPlan.find().populate("contact assignee lastActivity");
// };
