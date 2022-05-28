import { User } from "../users/user.model";
import { IPermission, Permission } from "./permission.model";
import { IRole, Role } from "./role.model";

export const getRoles = async (offset: number, perPage: number,  searchQuery: string) => {
    try {
        let condition: any = {  };
        let search;

        if (searchQuery !== undefined && searchQuery !== '') {
            search = new RegExp('.*' + searchQuery + '.*', 'i');
            condition.$or = [
                { name: { $regex: search } },
            ]
        }

        const roles = await Role.aggregate([
            {
                $match: {
                    ...condition
                }
            },
            { $lookup: { from: 'permissions', localField: 'permissions', foreignField: '_id', as: 'permissions' } },
            
            { $sort: { name: 1 } },
            
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [{ $skip: offset }, { $limit: perPage }]
                }
            }
        ]);
        if (roles[0].data.length === 0) {
            return { data: [], totalRows: 0 };
        }

        return { data: roles[0].data, totalRows: roles[0].metadata[0].total };
    } catch (e) {
        throw new Error(e.message);
    }
}

export const createRole = async (body: IRole) => {
    try {
        const role = await Role.create(body);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const addPermissionsToRole = async (roleId: string, permissions: Array<IPermission>) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: roleId },
            { $addToSet: { permissions: { $each: permissions } } },
            { new: true }
        );

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const removePermissionsFromRole = async (roleId: string, permissions: any[]) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: roleId },
            { $pullAll: { permissions } },
            { new: true }
        );

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const updateRole = async (roleId: string, body: IRole) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: roleId },
            { ...body },
            {
                new: true
            }
        );

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getPermissions = async () => {
    try {
        const permissions = await Permission.find({});

        return permissions;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getUsersByRoleId = async (roleId: string) => {
    try {
        const users = await User.find({ role: roleId });

        return users;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const deleteRole = async (roleId: string) => {
    try {
        const role = await Role.deleteOne({ _id: roleId });

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getRoleById = async (roleId: string) => {
    try {
        const role = await Role.findOne({ _id: roleId })
            .populate('permissions');

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getUsersByPermission = async (permission: string) => {
    try {
        let users = await Permission.aggregate([{
            $match: {
                "genericName": permission,
            },
        },
        {
            $lookup: {
                from: "rolepermissions",
                localField: "_id",
                foreignField: "permission",
                as: "rolePermissions"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "rolePermissions.role",
                foreignField: "role",
                as: "users",
            }
        },
        {
            $project: {
                users: 1,
            }
        },
        ]);

        users = (users.length == 0 ? [] : users[0].users);

        return users;
    } catch (e) {
        throw new Error(e.message);
    }
}