import { faker } from "@faker-js/faker";
import {
  IStakeholder,
  Stakeholder,
} from "../../stakeholders/stakeholder.model";
import {
  ProjectPhase,
  IProjectPhase,
} from "../../projectPhases/projectPhase.model";
import { IEngagementLevel, EngagementLevel } from "../engagementLevel.model";

export const seedEngagementLevels = async () => {
  try {
    const stakeholders = await Stakeholder.find();

    stakeholders.forEach(async (stakeholder) => {
      const projectPhases = await ProjectPhase.find({
        project: stakeholder.project,
      });

      projectPhases.forEach(async (phase) => {
        const count = await EngagementLevel.countDocuments({
          stakeholder: stakeholder._id,
          projectPhase: phase._id,
        });

        if (count === 0) {
          await createEngagementLevel(stakeholder, phase);
        }
      });
    });

    // Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createEngagementLevel = async (
  stakeholder: IStakeholder,
  phase: IProjectPhase
) => {
  try {
    const levels = ["Leading", "Neutral", "Unaware", "Resistant", "Supportive"];

    const payload: IEngagementLevel = {
      projectPhase: phase._id,
      stakeholder: stakeholder._id,
      desiredLevel: getRandomElement(levels),
      currentLevel: getRandomElement(levels),
    } as unknown as IEngagementLevel;

    await EngagementLevel.create(payload);

    console.log(
      `Created Engagement-Level for stakeholder: ${stakeholder.name}`
    );

    return true;
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getRandomElement = (itemList: Array<any>) => {
  const randomInt: number = faker.datatype.number(itemList.length - 1);

  return itemList[randomInt];
};

export const errorResponse = (error: any) => {
  //Formatting Response

  return {
    data: null,
    success: false,
    message: "Operation failed!.",
    developerMessage: error.message,
    userMessage: "Oops... Something went wrong, contact the admin...",
  };
};
