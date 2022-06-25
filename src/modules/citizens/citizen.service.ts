import * as CitizenRepository from "./citizen.repository";
import { ICitizen } from "./citizen.model";

export const createCitizen = async (body: ICitizen) => {
  try {
    const citizen = await CitizenRepository.createCitizen(body);

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizens = async (firstName: string) => {
  try {
    const citizens = await CitizenRepository.getCitizens(firstName);

    return citizens;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getCitizenById = async (citizenId: string) => {
  try {
    const citizen = await CitizenRepository.getCitizenById(
      citizenId
    );

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateCitizen = async (
  citizenId: string,
  body: ICitizen
) => {
  try {
    const citizen = await CitizenRepository.updateCitizen(
      citizenId,
      body
    );

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteCitizen = async (citizenId: string) => {
  try {
    const citizen = await CitizenRepository.deleteCitizen(
      citizenId
    );

    return citizen;
  } catch (e) {
    throw new Error(e.message);
  }
};
