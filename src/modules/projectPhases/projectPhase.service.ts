import * as ProjectPhaseRepository from "./projectPhase.repository";
import { IProjectPhase } from "./projectPhase.model";
// import { Types } from "mongoose";
// const ObjectId = Types.ObjectId;

export const createProjectPhase = async (body: IProjectPhase) => {
  try {
    const projectPhase = await ProjectPhaseRepository.createProjectPhase(body);

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhases = async (name: string) => {
  try {
    const projectPhases = await ProjectPhaseRepository.getProjectPhases(name);

    return projectPhases;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhaseById = async (projectPhaseId: string) => {
  try {
    const projectPhase = await ProjectPhaseRepository.getProjectPhaseById(
      projectPhaseId
    );

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProjectPhase = async (
  projectPhaseId: string,
  body: IProjectPhase
) => {
  try {
    const projectPhase = await ProjectPhaseRepository.updateProjectPhase(
      projectPhaseId,
      body
    );

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProjectPhase = async (projectPhaseId: string) => {
  try {
    const projectPhase = await ProjectPhaseRepository.deleteProjectPhase(
      projectPhaseId
    );

    return projectPhase;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getProjectPhasesByQuery = async (searchQuery: Object) => {
  try {
    const projectPhases = await ProjectPhaseRepository.getProjectPhasesByQuery(
      searchQuery
    );

    return projectPhases;
  } catch (e) {
    throw new Error(e.message);
  }
};
