import { faker } from "@faker-js/faker";
import { Piu, IPiu } from "../../pius/piu.model";
import { Project, IProject } from "../project.model";

export const seedTestingProjects = async (projectsPerPiu: number) => {
  try {
    const pius: Array<IPiu> = await Piu.find();

    pius.forEach(async (piu) => {
      await createProjects(projectsPerPiu, piu);
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

export const createProjects = async (projectsPerPiu: number, piu: IPiu) => {
  try {
    const piuProjects = await Project.find({ piu: piu._id });

    if (piuProjects.length >= projectsPerPiu) {
      console.log(
        "You have: " +
          piuProjects.length +
          " Project(s) for PIU: " +
          piu.registeredName
      );

      return true;
    }

    const projects: Array<IProject> = getProjectsPayload(projectsPerPiu, piu);

    projects.forEach(async (project) => {
      await Project.create(project);

      console.log("Created project: " + project.name);
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

export const getProjectsPayload = (count: number, piu: IPiu) => {
  const projectList: Array<IProject> = [];

  for (let i = 0; i < count; i += 1) {
    //Create random objects depending on count-value

    const projectInfo: IProject = {
      piu: piu._id,
      continent: "Africa",
      startDate: faker.date.past(2),
      endDate: faker.date.future(10),
      progres: faker.random.numeric(2),
      budget: faker.random.numeric(10),
      country: faker.address.country(),
      name: faker.commerce.productName(),
      abbreviation: faker.random.alpha(3),
      description: faker.lorem.sentences(5),

      attachments: [
        getAttachment("pdf"),
        getAttachment("audio"),
        getAttachment("image"),
        getAttachment("image"),
      ],
    } as unknown as IProject;

    projectList.push(projectInfo);
  }

  return projectList;
};

export const getAttachment = (type: string) => {
  return {
    type,
    url: faker.internet.url(),
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentences(5),
  };
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
