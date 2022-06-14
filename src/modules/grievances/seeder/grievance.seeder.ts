import { faker } from "@faker-js/faker";
import { User, IUser } from "../../users/user.model";
import { getAttachment } from "../../projects/seeder";
import { Grievance, IGrievance } from "../grievance.model";
import { IProject, Project } from "../../projects/project.model";
import { Department, IDepartment } from "../../departments/department.model";

var users: Array<IUser> = [];
var departments: Array<IDepartment> = [];

export const seedGrievances = async (grievancesPerProject: number) => {
  try {
    const projects = await Project.find();

    projects.forEach(async (project) => {
      const projectGrievances = await Grievance.countDocuments({
        project: project._id,
      });

      if (projectGrievances < grievancesPerProject) {
        users = await User.find();
        // TODO: when data(Roles and Users for each project) added
        //   users = await User.find({ project: project._id });

        departments = await Department.find();
        // TODO: when data(Departments for each project) added
        // departments = await Department.find({ piu: project.piu });

        const missingCount = grievancesPerProject - projectGrievances;

        await createGrievances(missingCount, project);
      }
    });

    // Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createGrievances = async (count: number, project: IProject) => {
  try {
    const grievancesPayload: Array<IGrievance> = getGrievancesPaylod(
      count,
      project
    );

    grievancesPayload.forEach(async (grievance) => {
      // No need to check for duplicates because we use random data

      const response = await Grievance.create(grievance);

      console.log(`Created Grievance for project: ${response.project}`);
    });

    // Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getGrievancesPaylod = (count: number, project: IProject) => {
  const grievancesList: Array<IGrievance> = [];

  const natures = [
    "Other",
    "Demotion",
    "Discipline",
    "Denial of benefits",
    "Classification Desputes",
  ];

  for (let i = 0; i < count; i++) {
    const grievanceInfo: IGrievance = {
      project: project._id,
      resolvedOn: faker.date.future(),
      nature: getRandomElement(natures),
      dateOfIncident: faker.date.past(),
      description: faker.lorem.sentences(3),
      reporter: getRandomElement(users)._id,
      status: getRandomElement([0, 1, 2, 3]),
      estimatedResolveDate: faker.date.future(),
      department: getRandomElement(departments)._id,
      incidentCount: getRandomElement([2, 10, 25, 7]),
      complainerSuggestions: faker.lorem.sentences(2),
      frequencyOfIncident: getRandomElement([0, 1, 2]),
      attachments: [
        getAttachment("pdf"),
        getAttachment("audio"),
        getAttachment("image"),
      ],
      complainer: {
        fullName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        phoneNumber: faker.phone.phoneNumber("2557########"),
      },
    } as unknown as IGrievance;

    grievancesList.push(grievanceInfo);
  }

  return grievancesList;
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
