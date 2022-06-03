import { faker } from "@faker-js/faker";
import { User, IUser } from "../user.model";
import { Role } from "../../accessControl/role.model";

export const seedTestingUsers = async (usersPerRole: number) => {
  try {
    console.log("Seeding Test Users...");

    const roles = await Role.find();

    roles.forEach(async (role) => {
      //   const usersPerRole = 3;

      if (role.name !== "Root") {
        await createTestingUsers(role, usersPerRole);
      }
    });

    //Do other stuff
  } catch (e) {
    return errorResponse(e);
  }
};

export const createTestingUsers = async (role: any, usersPerRole: number) => {
  try {
    const users: Array<IUser> = [];

    for (let i = 0; i < usersPerRole; i++) {
      //Creating Dummy-Data depending on UsersPerRole

      const userInfo = {
        type: "staff",
        role: role._id,
        password: "12345678",
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email().toLocaleLowerCase(),
      } as unknown as IUser;

      users.push(userInfo);
    }

    const count = await User.countDocuments({ role: role._id });

    if (count < usersPerRole) {
      users.forEach(async (user) => {
        const emailExist = await User.countDocuments({ email: user.email });

        if (emailExist === 0) {
          await User.create(user);

          console.log(
            "Created User: " + user.email + " with role: " + role.name
          );
        } else {
          console.log("User with email: " + user.email + " already exist.");
        }
      });

      //Clear array
      users.length = 0;
    } else {
      console.log(`You have: ${count} Users with role: ${role.name}.`);

      //Clear array
      users.length = 0;
    }
  } catch (e) {
    return errorResponse(e);
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
