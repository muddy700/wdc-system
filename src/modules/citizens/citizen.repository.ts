import { ICitizen, Citizen } from "./citizen.model";

export const createCitizen = async (body: ICitizen) => {
  try {
    const citizen = await Citizen.create(body);

    return citizen.populate("house createdBy").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizens = async (
  offset: number,
  perPage: number,
  filter: any
) => {
  try {
    console.log(filter);

    const citizens = await Citizen.aggregate([
      {
        $match: {
          ...filter,
        },
      },
      {
        $lookup: {
          from: "houses",
          localField: "house",
          foreignField: "_id",
          as: "house",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$house",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          semifullName: { $concat: ["$firstName", " ", "$lastName"] },
          fullName: {
            $concat: ["$firstName", " ", "$middleName", " ", "$lastName"],
          },
        },
      },
      { $sort: { fullName: 1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: offset }, { $limit: perPage }],
        },
      },
    ]);

    if (citizens[0].data.length === 0) {
      return { citizens: [], count: 0 };
    }

    return { data: citizens[0].data, totalRows: citizens[0].metadata[0].total };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAllCitizens = async (
  offset: number,
  perPage: number,
  filter: any
) => {
  try {
    console.log(filter);

    const citizens = await Citizen.aggregate([
      {
        $match: {
          ...filter,
        },
      },
      {
        $lookup: {
          from: "houses",
          localField: "house",
          foreignField: "_id",
          as: "house",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$house",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          semifullName: { $concat: ["$firstName", " ", "$lastName"] },
          fullName: {
            $concat: ["$firstName", " ", "$middleName", " ", "$lastName"],
          },
        },
      },
      { $sort: { fullName: 1 } },
      {
        $group: {
          _id: "$createdBy",
          count: { $sum: 1 },
          citizens: { $push: "$$ROOT" },
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: offset }, { $limit: perPage }],
        },
      },
    ]);

    if (citizens[0].data.length === 0) {
      return { citizens: [], count: 0 };
    }

    return { data: citizens[0].data, totalRows: citizens[0].metadata[0].total };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizenById = async (citizenId: string) => {
  try {
    const citizen = await Citizen.findOne({ _id: citizenId }).populate(
      "house createdBy"
    );

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateCitizen = async (citizenId: string, body: ICitizen) => {
  try {
    const citizen = await Citizen.findOneAndUpdate(
      { _id: citizenId },
      { ...body },
      { new: true }
    ).populate("house createdBy");

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteCitizen = async (citizenId: string) => {
  try {
    const citizen = await Citizen.findOneAndDelete({ _id: citizenId });

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};
