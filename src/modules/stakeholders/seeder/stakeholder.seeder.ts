import { faker } from "@faker-js/faker";
import { Stakeholder, IStakeholder } from "../stakeholder.model";
import { Project, IProject } from "../../projects/project.model";
import { getAddress, getLocation, getPerson } from "../../pius/seeder/index";

export const seedTestingStakeholders = async (
  stakeholdersPerProject: number
) => {
  try {
    const projects = await Project.find();

    projects.forEach(async (project) => {
      await createStakeholder(project, stakeholdersPerProject);
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createStakeholder = async (project: IProject, count: number) => {
  try {
    const projectStakeholders = await Stakeholder.countDocuments({
      project: project._id,
    });

    if (projectStakeholders >= count) {
      console.log(
        "You have: " +
          projectStakeholders +
          " Stakeholder(s) for Project: " +
          project.name
      );

      return true;
    }

    const stakeholders: Array<IStakeholder> = getStakeholdersPayload(
      project,
      count
    );

    stakeholders.forEach(async (stakeholder) => {
      const stakeholderDuplicates = await Stakeholder.countDocuments({
        project: project._id,
        role: stakeholder.role,
        name: stakeholder.name,
        type: stakeholder.type,
        scope: stakeholder.scope,
      });

      if (!stakeholderDuplicates) {
        await Stakeholder.create(stakeholder);

        console.log("Created stakeholder: " + stakeholder.name);
      }
    });

    //Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getStakeholdersPayload = (project: IProject, count: number) => {
  const stakeholderList: Array<IStakeholder> = [];

  const roles: Array<string> = [
    "Advisor",
    "Supplier",
    "Approver",
    "Contractor",
    "Beneficiary",
  ];

  const channels: Array<string> = [
    "Phone",
    "Email",
    "Physical",
    "Whatsapp",
    "Zoom Meeting",
  ];

  const disabilities: Array<string> = [
    "None",
    "Deaf",
    "Vision Impairment",
    "Physical Disability",
  ];

  const scopes: Array<string> = ["Internal", "External"];
  const levels: Array<string> = ["Weak", "Medium", "Strong"];
  const sectors: Array<string> = ["Education", "Health", "Social"];
  const types: Array<string> = ["Individual", "Positional", "Organizational"];

  for (let i = 0; i < count; i++) {
    const stakeholderInfo: IStakeholder = {
      type: types[1],
      project: project._id,
      address: getAddress(),
      location: getLocation(),
      contactPerson: getPerson(),
      name: faker.name.findName(),
      email: faker.internet.email(),

      role: getRandomElement(roles),
      scope: getRandomElement(scopes),
      gender: faker.name.gender(true),
      relationshipHolder: getPerson(),
      company: getStakeholderCompany(),
      concern: faker.lorem.sentences(6),
      websiteLink: faker.internet.url(),

      description: faker.lorem.sentences(5),
      levelOfInterest: getRandomElement(levels),
      levelOfInfluence: getRandomElement(levels),
      disability: getRandomElement(disabilities),
      logo: faker.image.business(300, 300, true),
      bestMethodOfContact: getRandomElement(channels),
      phoneNumber: faker.phone.phoneNumber("2557########"),
      sectors: [getRandomElement(sectors), getRandomElement(sectors)],
      goals: [getString(), getString(), getString(), getString(), getString()],
    } as unknown as IStakeholder;

    stakeholderList.push(stakeholderInfo);
  }

  return stakeholderList;
};

const getString = () => {
  return faker.lorem.sentence(10);
};

const getStakeholderCompany = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    websiteLink: faker.internet.url(),
    stakeholderPosition: faker.name.jobType(),
    logo: faker.image.business(300, 300, true),
    phoneNumber: faker.phone.phoneNumber("2557########"),
  };
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
