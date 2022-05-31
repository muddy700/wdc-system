import { IPiu, Piu } from "./piu.model";

export const createPiu = async (body: IPiu) => {
  try {
    const piu = await Piu.create(body);

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getPius = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    // TODO: Add description, email, yearFound, registrationNumber, websiteLink and abbreviation in regex
    const pius = Piu.find({ registeredName: { $regex: search } });

    return pius;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getPiuById = async (piuId: string) => {
  try {
    const piu = await Piu.findOne({ _id: piuId });

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updatePiu = async (piuId: string, body: IPiu) => {
  try {
    const piu = await Piu.findOneAndUpdate(
      { _id: piuId },
      { ...body },
      { new: true }
    );

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deletePiu = async (piuId: string) => {
  try {
    const piu = await Piu.findOneAndDelete({ _id: piuId });

    return piu;
  } catch (e) {
    throw new Error(e.message);
  }
};

// TODO: Add piu-filter  by query
// export const getPiusByQuery = async (searchQuery: object) => {
//   console.log("SearchQuery: ", searchQuery);

//   const pius = await Piu.aggregate([
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

//   return pius[0].data;

//   //   return Piu.find().populate("contact assignee lastActivity");
// };
