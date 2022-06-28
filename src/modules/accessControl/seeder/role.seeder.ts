import { Role } from "../role.model";
import { assignRolePermission } from "./index";
import { rootPermissions } from "./permissions";

export const seedInitialRoles = async () => {
  try {
    initialRoles.forEach(async (role) => {
      //Create role

      await createRole(role, rolePermissions[role.name]);
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

export const createRole = async (role: any, permissions: Array<string>) => {
  try {
    const count = await Role.countDocuments({ name: role.name });

    if (count === 0) {
      const newRole = await Role.create(role);
      await assignRolePermission(newRole._id, permissions);

      console.log("Created Role: ", role.name);
    } else {
      const roleInfo = await Role.findOne({ name: role.name });

      await assignRolePermission(roleInfo?._id, permissions);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * Initial roles applied to this project.
 */
export const initialRoles = [
  {
    name: "Executive",
    description: "Some description about this role",
  },
  {
    name: "Messenger",
    description: "Some description about this role",
  },
];

/**
 * Permissions for each role
 */
const rolePermissions: any = {
  // Staff: ["read-users"],
  Executive: rootPermissions,
  Messenger: rootPermissions,
  // "System Tester": rootPermissions,
};
