import { Role } from "../../accessControl/role.model";
import { User, IUser, USER_TYPES } from "../user.model";

export const seedTestingUser = async () => {
  try {
    console.log("Seeding Test User...");

    const role = await Role.findOne({ name: "System Tester" });

    if (role) {
      const count = await User.countDocuments({
        email: systemTester.email,
      });

      if (count === 0) {
        await User.create({ ...systemTester, role: role._id });

        console.log(
          "Created User: " + systemTester.email + " with role: " + role.name
        );
      }
      // else {
      //   console.log(
      //     "User with email: " + systemTester.email + " already exist."
      //   );
      // }
    } else {
      console.log("No role found with name: System Tester");
    }

    //Do other stuff
  } catch (e) {
    return errorResponse(e);
  }
};

/**
 * System tester.
 *
 * User for testing api-endpoints
 * in development and staging environments
 */
export const systemTester: IUser = {
  status: 1,
  lastName: "Tester",
  firstName: "System",
  password: "12345678",
  type: USER_TYPES.USER,
  email: "tester@mail.com",
  phoneNumber: "255789101112",
} as unknown as IUser;

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
