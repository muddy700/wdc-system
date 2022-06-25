import { ICitizen, Citizen } from "./citizen.model";

export const createCitizen = async (body: ICitizen) => {
  try {
    const citizen = await Citizen.create(body);

    return citizen.populate("house").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizens = async (keyword: string) => {
  try {
    const search = new RegExp(".*" + keyword + ".*", "i");

    const citizens = Citizen.find({ firstName: { $regex: search } }).populate(
      "house"
    );

    return citizens;
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
