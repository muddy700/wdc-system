import { constants } from "./constants";
// import { seedTestingPius } from "../modules/pius/seeder";
import { seedTestingUser } from "../modules/users/seeder";
import { seedUser } from "../modules/accessControl/seeder/";
// import { seedTestingProjects } from "../modules/projects/seeder";
import { seedInitialRoles } from "../modules/accessControl/seeder/role.seeder";

export const seedInitialData = async () => {
  try {
    // seedConfigurations();

    await seedUser();

    if (constants.NODE_ENV === "dev") {
      // await seedInitialRoles();

      // await seedTestingUser();

      // await seedTestingPius(2);

      // await seedTestingProjects(1);
    }
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};
