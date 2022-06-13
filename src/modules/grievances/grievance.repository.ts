import { IGrievance, Grievance } from "./grievance.model";

export const createGrievance = async (body: IGrievance) => {
  try {
    const grievance = await Grievance.create(body);

    return grievance.populate("project department reporter").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getGrievances = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add status, and compainer in regex
    const grievances = Grievance.find({ nature: { $regex: search } }).populate(
      "project department reporter"
    );

    return grievances;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getGrievanceById = async (grievanceId: string) => {
  try {
    const grievance = await Grievance.findOne({ _id: grievanceId }).populate(
      "project department reporter"
    );

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateGrievance = async (
  grievanceId: string,
  body: IGrievance
) => {
  try {
    const grievance = await Grievance.findOneAndUpdate(
      { _id: grievanceId },
      { ...body },
      { new: true }
    ).populate("project department reporter");

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteGrievance = async (grievanceId: string) => {
  try {
    const grievance = await Grievance.findOneAndDelete({
      _id: grievanceId,
    }).populate("project department reporter");

    return grievance;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add grievance-filter  by query
// export const getGrievancesByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const grievances = await Grievance.aggregate([
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

//   return grievances[0].data;

//   //   return Grievance.find().populate("contact assignee lastActivity");
// };
