import { IStakeholder, Stakeholder } from "./stakeholder.model";

export const createStakeholder = async (body: IStakeholder) => {
  try {
    const stakeholder = await Stakeholder.create(body);

    return stakeholder.populate("project").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholders = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add description, email, phoneNumber, gender, position in regex
    const stakeholders = Stakeholder.find({
      name: { $regex: search },
    }).populate("project");

    return stakeholders;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholderById = async (stakeholderId: string) => {
  try {
    const stakeholder = await Stakeholder.findOne({
      _id: stakeholderId,
    }).populate("project");

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateStakeholder = async (
  stakeholderId: string,
  body: IStakeholder
) => {
  try {
    const stakeholder = await Stakeholder.findOneAndUpdate(
      { _id: stakeholderId },
      { ...body },
      { new: true }
    ).populate("project");

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteStakeholder = async (stakeholderId: string) => {
  try {
    const stakeholder = await Stakeholder.findOneAndDelete({
      _id: stakeholderId,
    });

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add stakeholder-filter  by query
// export const getStakeholdersByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const stakeholders = await Stakeholder.aggregate([
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

//   return stakeholders[0].data;

//   //   return Stakeholder.find().populate("contact assignee lastActivity");
// };
