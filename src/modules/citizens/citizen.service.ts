import * as CitizenRepository from "./citizen.repository";
import { ICitizen } from "./citizen.model";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const createCitizen = async (body: ICitizen) => {
  try {
    const citizen = await CitizenRepository.createCitizen(body);

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizens = async (
  offset: number,
  perPage: number,
  userId: string
) => {
  try {
    let condition: any = {};

    if (userId !== undefined && userId !== "") {
      condition.createdBy = ObjectId(userId);
    }

    const citizens = await CitizenRepository.getCitizens(
      offset,
      perPage,
      condition
    );

    return citizens;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAllCitizens = async (
  offset: number,
  perPage: number,
  userId: string
) => {
  try {
    let condition: any = {};

    if (userId !== undefined && userId !== "") {
      condition.createdBy = ObjectId(userId);
    }

    const citizens = await CitizenRepository.getAllCitizens(
      offset,
      perPage,
      condition
    );

    return citizens;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizenById = async (citizenId: string) => {
  try {
    const citizen = await CitizenRepository.getCitizenById(citizenId);

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateCitizen = async (citizenId: string, body: ICitizen) => {
  try {
    const citizen = await CitizenRepository.updateCitizen(citizenId, body);

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteCitizen = async (citizenId: string) => {
  try {
    const citizen = await CitizenRepository.deleteCitizen(citizenId);

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};
