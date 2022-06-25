import { IHouse } from "./house.model";
import * as HouseRepository from "./house.repository";

export const createHouse = async (body: IHouse) => {
  try {
    const house = await HouseRepository.createHouse(body);

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getHouses = async (
  offset: number,
  perPage: number,
  keyword: string
) => {
  try {
    const houses = await HouseRepository.getHouses(offset, perPage, keyword);

    return houses;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getHouseById = async (houseId: string) => {
  try {
    const house = await HouseRepository.getHouseById(houseId);

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateHouse = async (houseId: string, body: IHouse) => {
  try {
    const house = await HouseRepository.updateHouse(houseId, body);

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteHouse = async (houseId: string) => {
  try {
    const house = await HouseRepository.deleteHouse(houseId);

    return house;
  } catch (e) {
    throw new Error(e.message);
  }
};
