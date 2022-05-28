import { constants } from "./constants";
import { seedUser } from "../modules/accessControl/seeder/";
import { seedTestingUsers } from "../modules/users/seeder/index";

export const seedInitialData = async () => {
  try {
    // seedConfigurations();

    await seedUser();

    if (constants.NODE_ENV === "dev") {
      // await seedTestingUsers(3);

      // await seedTestingDeals(3) 
    }
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};
