import { IHouse, House } from "./house.model";

export const createHouse = async (body: IHouse) => {
  try {
    let house = await House.create(body);

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getHouses = async (
  offset: number,
  perPage: number,
  searchQuery: string
) => {
  try {
    let condition: any = {};

    const search = new RegExp(".*" + searchQuery + ".*", "i");

    if (searchQuery !== undefined && searchQuery !== "") {
      condition.$or = [{ identificationNumber: { $regex: search } }];
    }

    const houses = await House.aggregate([
      {
        $match: {
          ...condition,
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

    if (houses[0].data.length === 0) {
      return { houses: [], count: 0 };
    }

    return { data: houses[0].data, totalRows: houses[0].metadata[0].total };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getHouseById = async (houseId: string) => {
  try {
    const house = await House.findOne({ _id: houseId });

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteHouse = async (houseId: string) => {
  try {
    const house = await House.findOneAndDelete({ _id: houseId });

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateHouse = async (houseId: string, body: IHouse) => {
  try {
    const house = await House.findOneAndUpdate(
      { _id: houseId },
      { ...body },
      { new: true }
    );

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};
