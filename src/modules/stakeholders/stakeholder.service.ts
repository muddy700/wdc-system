import * as StakeholderRepository from "./stakeholder.repository";
import { IStakeholder } from "./stakeholder.model";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const createStakeholder = async (body: IStakeholder) => {
  try {
    const stakeholder = await StakeholderRepository.createStakeholder(body);

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholders = async (name: string) => {
  try {
    const stakeholders = await StakeholderRepository.getStakeholders(name);

    return stakeholders;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholderById = async (stakeholderId: string) => {
  try {
    const stakeholder = await StakeholderRepository.getStakeholderById(
      stakeholderId
    );

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateStakeholder = async (
  stakeholderId: string,
  body: IStakeholder
) => {
  try {
    const stakeholder = await StakeholderRepository.updateStakeholder(
      stakeholderId,
      body
    );

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteStakeholder = async (stakeholderId: string) => {
  try {
    const stakeholder = await StakeholderRepository.deleteStakeholder(
      stakeholderId
    );

    return stakeholder;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getStakeholdersByQuery = async (
  offset: number,
  perPage: number,
  searchQuery: object
) => {
  try {
    searchQuery = prepareSearchQuery(searchQuery);

    const stakeholders = await StakeholderRepository.getStakeholdersByQuery(
      offset,
      perPage,
      searchQuery
    );

    return stakeholders;
  } catch (e) {
    throw new Error(e.message);
  }
};

const prepareSearchQuery = (searchQuery: any) => {
  //Loop through the searchQuery object-properties

  Object.keys(searchQuery).forEach((key) => {
    if (key === "project") {
      searchQuery.project = ObjectId(searchQuery.project);
    }
  });

  return searchQuery;
};
