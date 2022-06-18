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

export const getStakeholdersByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: object
) => {
  console.log("SearchQuery: ", searchQuery);

  const stakeholders = await Stakeholder.aggregate([
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "project",
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
    { $match: { ...searchQuery } },
    // { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$scope",
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

  if (stakeholders[0].data.length === 0) {
    return { data: [], totalRows: 0 };
  }

  return {
    data: stakeholders[0].data,
    totalRows: stakeholders[0].metadata[0].total,
  };
};
