import { constants } from "./constants";
import { seedTestingUser } from "../modules/users/seeder";
import { seedUser } from "../modules/accessControl/seeder/";
import { seedHouses } from "../modules/houses/seeder/house.seeder";
import { seedCitizens } from "../modules/citizens/seeder/citizen.seeder";
import { seedInitialRoles } from "../modules/accessControl/seeder/role.seeder";

export const seedInitialData = async () => {
  try {
    // seedConfigurations();

    // await seedUser();

    if (constants.NODE_ENV === "dev") {
      // await seedInitialRoles();
      // await seedTestingUser();
      // await seedHouses(5)
      // await seedCitizens(3)
    }
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};
