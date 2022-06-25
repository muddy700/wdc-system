import { ICitizen, Citizen } from "./citizen.model";

export const createCitizen = async (body: ICitizen) => {
  try {
    const citizen = await Citizen.create(body);

    return citizen.populate("house").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizens = async (
  offset: number,
  perPage: number,
  searchQuery: string
) => {
  try {
    let condition: any = {};

    const search = new RegExp(".*" + searchQuery + ".*", "i");

    if (searchQuery !== undefined && searchQuery !== "") {
      condition.$or = [
        { lastName: { $regex: search } },
        { firstName: { $regex: search } },
        { middleName: { $regex: search } },
      ];
    }

    const citizens = await Citizen.aggregate([
      {
        $addFields: {
          semifullName: { $concat: ["$firstName", " ", "$lastName"] },
          fullName: {
            $concat: ["$firstName", " ", "$middleName", " ", "$lastName"],
          },
        },
      },
      {
        $match: {
          ...condition,
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

export const getCitizenById = async (citizenId: string) => {
  try {
    const citizen = await Citizen.findOne({ _id: citizenId }).populate("house");

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
    ).populate("house");

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
