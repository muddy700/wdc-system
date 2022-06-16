import { ICommitment, Commitment } from "./commitment.model";

export const createCommitment = async (body: ICommitment) => {
  try {
    const commitment = await Commitment.create(body);

    return commitment.populate("actor project projectPhase").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCommitments = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add actor, startDate, endDate, status and enddate in regex
    const commitments = Commitment.find({ activity: { $regex: search } }).populate(
      "actor project projectPhase"
    );

    return commitments;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCommitmentById = async (commitmentId: string) => {
  try {
    const commitment = await Commitment.findOne({ _id: commitmentId }).populate(
      "actor project projectPhase"
    );

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateCommitment = async (
  commitmentId: string,
  body: ICommitment
) => {
  try {
    const commitment = await Commitment.findOneAndUpdate(
      { _id: commitmentId },
      { ...body },
      { new: true }
    ).populate("actor project projectPhase");

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteCommitment = async (commitmentId: string) => {
  try {
    const commitment = await Commitment.findOneAndDelete({ _id: commitmentId });

    return commitment;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCommitmentsByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: object
) => {
  console.log("SearchQuery: ", searchQuery);

  const commitments = await Commitment.aggregate([
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
        localField: "actor",
        foreignField: "_id",
        as: "actor",
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
        path: "$actor",
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

  if (commitments[0].data.length === 0) {
    return { data: [], totalRows: 0 };
  }

  return {
    data: commitments[0].data,
    totalRows: commitments[0].metadata[0].total,
  };
};
