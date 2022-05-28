import * as accessControlRepository from './accessControl.repository';
import { IPermission } from './permission.model';
import { IRole } from './role.model';

export const getRoles = async (offset: number, perPage: number,  keyword: string) => {
    try {
        return accessControlRepository.getRoles(offset, perPage, keyword);

        
    } catch (e) {
        throw new Error(e.message);
    }
}

export const createRole = async (body: IRole) => {
    try {
        const role = await accessControlRepository.createRole(body);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const addPermissionsToRole = async (roleId: string, permissions: Array<IPermission>) => {
    try {
        const role = await accessControlRepository.addPermissionsToRole(roleId, permissions);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const removePermissionsFromRole = async (roleId: string, permissions: Array<string>) => {
    try {
        const role = await accessControlRepository.removePermissionsFromRole(roleId, permissions);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const updateRole = async (roleId: string, body: any) => {
    try {
        const role = await accessControlRepository.updateRole(roleId, body);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getPermissions = async () => {
    try {
        const permissions = await accessControlRepository.getPermissions();

        return permissions;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getUsersByRoleId = async (roleId: string) => {
    try {
        const users = await accessControlRepository.getUsersByRoleId(roleId);

        return users;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const deleteRole = async (roleId: string) => {
    try {
        const role = await accessControlRepository.deleteRole(roleId);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}

export const getRoleById = async (roleId: string) => {
    try {
        const role = await accessControlRepository.getRoleById(roleId);

        return role;
    } catch (e) {
        throw new Error(e.message);
    }
}