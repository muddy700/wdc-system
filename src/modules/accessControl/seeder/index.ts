import { Role } from "../role.model";
import { Permission } from "../permission.model";
import { PERMISSIONS, rootPermissions } from "./permissions";
import { addPermissionsToRole } from "../accessControl.service";
import { IUser, User, USER_TYPES } from "../../users/user.model";

export const rootUser: IUser = {
  firstName: "Root",
  lastName: "Admin",
  type: USER_TYPES.ROOT,
  email: "root@worldbank.org",
  phoneNumber: "+255713000000",
  password: "root@worldbank",
  status: 1,
} as unknown as IUser;

export const seedUser = async () => {
  try {
    console.log("Seeding Users...");

    const users = [
      {
        info: rootUser,
        role: {
          name: "Root",
          description: "Initial user of the system used to onboard others.",
          status: 1,
        },
        permissions: rootPermissions,
      },
    ];

    await createPermission();
    // await cleanData();
    users.forEach(async (user) => {
      await createRole(user.role, user.info, user.permissions);
    });

    console.log("User Seeding Completed.");
  } catch (e) {
    return {
      developerMessage: e.message,
    };
  }
};

export const createPermission = async () => {
  try {
    PERMISSIONS.forEach(async (permission) => {
      const permissionInfo = {
        moduleName: permission.moduleName,
        genericName: permission.genericName,
      };

      const count = await Permission.countDocuments(permissionInfo);

      if (count === 0) {
        Permission.create(permission);

        console.log("Created Permission: ", permission.genericName);
      }
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

export const createRole = async (
  role: any,
  user: object,
  permissions: Array<string>
) => {
  try {
    const count = await Role.countDocuments({ name: role.name });

    if (count === 0) {
      const newRole = await Role.create(role);
      await assignRolePermission(newRole._id, permissions);

      createUser({ ...user, role: newRole._id });
      console.log("Created Role: ", role.name);
    } else {
      const roleInfo = await Role.findOne({ name: role.name });
      await assignRolePermission(roleInfo?._id, permissions);

      // createUser({ ...user, role: roleInfo._id }); Un-Comment this line to create extra users if exist
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export const createUser = async (user: any) => {
  try {
    const count = await User.countDocuments({ email: user.email });
    if (count === 0) {
      console.log("Created User: ", user.email);

      return await User.create(user);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export const assignRolePermission = async (roleId: string, permissions: string[]) => {
  try {
    for (let i = 0; i < permissions.length; i++) {
      const permission = await Permission.findOne({
        genericName: permissions[i],
      });

      const count = await Role.countDocuments({
        _id: roleId,
        permissions: { $in: [permission?._id] },
      });

      if (count === 0) {
        const role = await addPermissionsToRole(roleId, [permission?._id]);

        console.log(
          `Assigned permission: ${permission?.genericName} to role: ${role?.name}`
        );
      }
    }

    return true;
  } catch (e) {
    console.log(e.message);
  }
};
