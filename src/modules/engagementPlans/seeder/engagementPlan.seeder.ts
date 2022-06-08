import {
  Stakeholder,
  IStakeholder,
} from "../../stakeholders/stakeholder.model";
import {
  ProjectPhase,
  IProjectPhase,
} from "../../projectPhases/projectPhase.model";

import { faker } from "@faker-js/faker";
import { IEngagementPlan, EngagementPlan } from "../engagementPlan.model";

export const seedEngagementPlans = async (plansPerPhase: number) => {
  try {
    const stakeholders = await Stakeholder.find();
    const totalPhases = await ProjectPhase.countDocuments({
      project: stakeholders[0].project, // Each project has the same number of phases
    });

    stakeholders.forEach(async (stakeholder) => {
      //Check counts before creating

      const stakeholderPlans = await EngagementPlan.countDocuments({
        stakeholder: stakeholder._id,
        project: stakeholder.project,
      });

      //Total for all phases
      const totalPlans = totalPhases * plansPerPhase;

      if (stakeholderPlans < totalPlans) {
        const remainingPlans = totalPlans - stakeholderPlans;

        await createEngagementPlans(stakeholder, remainingPlans);
      }
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createEngagementPlans = async (
  stakeholder: IStakeholder,
  numberOfPlans: number
) => {
  try {
    const phases = await ProjectPhase.find({ project: stakeholder.project });

    phases.forEach(async (phase) => {
      const plans: Array<IEngagementPlan> = getPlansPayload(
        stakeholder,
        phase,
        numberOfPlans
      );

      plans.forEach(async (plan) => {
        // No need to check for duplicates because we use random words
        await EngagementPlan.create(plan);

        console.log(
          `Created plan for stakeholder:${stakeholder.name}, on phase: ${phase.name} `
        );
      });

      // Other stuffs
    });
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getPlansPayload = (
  stakeholder: IStakeholder,
  phase: IProjectPhase,
  numberOfPlans: number
) => {
  const plansList = [];
  
  const frequencyList = [
    "Weekly",
    "Monthly",
    "Everyday",
    "Once every 2 months",
  ];

  const channelsList = [
    "Email",
    "Phone",
    "Physical",
    "Whatsapp",
    "Zoom Meeting",
  ];

  for (let i = 0; i < numberOfPlans; i++) {
    //Create dummy objects depending on number of plans

    const planInfo: IEngagementPlan = {
      projectPhase: phase._id,
      stakeholder: stakeholder._id,
      project: stakeholder.project,
      activity: faker.lorem.sentence(5),
      startingDate: faker.date.future(),
      channel: getRandomElement(channelsList),
      frequency: getRandomElement(frequencyList),
    } as unknown as IEngagementPlan;

    plansList.push(planInfo);
  }

  return plansList;
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
