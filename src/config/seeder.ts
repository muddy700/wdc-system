import { constants } from "./constants";
import { seedTestingUser } from "../modules/users/seeder";
import { seedUser } from "../modules/accessControl/seeder/";
import { seedTestingPius } from "../modules/pius/seeder/index";
import { seedTestingProjects } from "../modules/projects/seeder/index";
import { seedGrievances } from "../modules/grievances/seeder/grievance.seeder";
import { seedInitialRoles } from "../modules/accessControl/seeder/role.seeder";
import { seedCommitments } from "../modules/commitments/seeder/commitment.seeder";
import { seedProjectPhases } from "../modules/projectPhases/seeder/projectPhase.seeder";
import { seedTestingStakeholders } from "../modules/stakeholders/seeder/stakeholder.seeder";
import { seedEngagementPlans } from "../modules/engagementPlans/seeder/engagementPlan.seeder";
import { seedEngagementLevels } from "../modules/engagementLevels/seeder/engagementLevel.seeder";

export const seedInitialData = async () => {
  try {
    // seedConfigurations();

    // await seedUser();

    if (constants.NODE_ENV === "dev") {
      await seedInitialRoles();

      // await seedTestingUser();

      // await seedTestingPius(3);

      // await seedTestingProjects(2);

      // await seedTestingStakeholders(2);

      // await seedProjectPhases(2)

      // await seedEngagementPlans(2);

      // await seedEngagementLevels()

      // await seedCommitments(1)

      // await seedGrievances(6)
    }
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};
