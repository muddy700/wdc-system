import { faker } from "@faker-js/faker";
import { Project, IProject } from "../../projects/project.model";
import { ProjectPhase, IProjectPhase } from "../projectPhase.model";

export const seedProjectPhases = async (phasesPerProject: number) => {
  try {
    const projects = await Project.find();

    projects.forEach(async (project) => {
      await createPhases(project, phasesPerProject);
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createPhases = async (project: IProject, numberOfPhases: number) => {
  try {
    const projectPhases = await ProjectPhase.countDocuments({
      project: project._id,
    });

    if (projectPhases >= numberOfPhases) {
      //   console.log(
      //     `You have: ${projectPhases} phases for project: ${project.name}`
      //   );

      return true;
    }

    const missingPhases = numberOfPhases - projectPhases;

    const phases = getPhasesPayload(project, missingPhases);

    phases.forEach(async (phase) => {
      const phaseDuplicates = await ProjectPhase.countDocuments({
        project: project._id, // Or phase.project
        name: phase.name,
      });

      if (!phaseDuplicates) {
        await ProjectPhase.create(phase);

        console.log(
          `Created phase: ${phase.name} for project: ${project.name}`
        );
      }
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getPhasesPayload = (project: IProject, count: number) => {
  const phasesList = [
    {
      name: "Preparation",
      project: project._id,
      description: faker.lorem.sentences(6),
    },
    {
      project: project._id,
      name: "Implementation",
      description: faker.lorem.sentences(6),
    },
  ];

  //   for (let i = 0; i < count; i++) {
  //     const phaseInfo: IProjectPhase = {
  //       project: project._id,
  //       name: faker.name.findName(),
  //       description: faker.lorem.sentences(6),
  //     } as unknown as IProjectPhase;

  //     phasesList.push(phaseInfo);
  //   }

  return phasesList;
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
