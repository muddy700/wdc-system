import { faker } from "@faker-js/faker";
import { Department } from "../department.model";
import { IPiu, Piu } from "../../pius/piu.model";

const departmentNames = ["Human Resource", "Finance"];

export const seedDepartments = async () => {
  try {
    const pius = await Piu.find();

    pius.forEach(async (piu) => {
      const piuDepartments = await Department.countDocuments({ piu: piu._id });

      if (piuDepartments < departmentNames.length) {
        await createDepartments(piu);
      }
    });

    // Other stuff
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createDepartments = async (piu: IPiu) => {
  try {
    departmentNames.forEach(async (name) => {
      const duplicates = await Department.countDocuments({
        name,
        piu: piu._id,
      });

      if (!duplicates) {
        const department = await Department.create({
          name,
          piu: piu._id,
          description: faker.lorem.sentences(3),
        });

        console.log(
          `Created Department: ${department.name} for PIU: ${piu.registeredName}`
        );
      }
    });

    // Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
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
