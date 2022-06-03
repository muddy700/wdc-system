import { constants } from "./constants";
import { seedUser } from "../modules/accessControl/seeder/";
import { seedTestingUser } from "../modules/users/seeder/index";
import { seedInitialRoles } from "../modules/accessControl/seeder/role.seeder";

export const seedInitialData = async () => {
  try {
    // seedConfigurations();

    await seedUser();

    if (constants.NODE_ENV === "dev") {
      await seedInitialRoles();

      await seedTestingUser();
    }
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};
