import { constants } from "./constants";
import { seedTestingUser } from "../modules/users/seeder";
import { seedUser } from "../modules/accessControl/seeder/";
import { seedInitialRoles } from "../modules/accessControl/seeder/role.seeder";

export const seedInitialData = async () => {
  try {
    // seedConfigurations();

    await seedUser();

    if (constants.NODE_ENV === "dev") {
      // await seedInitialRoles();

      // await seedTestingUser();

      // await seedTestingPius(3);

      // await seedTestingProjects(2);

      // await seedTestingStakeholders(2);

      // await seedProjectPhases(2)

      // await seedEngagementPlans(2);

      // await seedEngagementLevels()

      // await seedCommitments(1)

      // await seedGrievances(6)

      // await seedDepartments();
    }
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};
