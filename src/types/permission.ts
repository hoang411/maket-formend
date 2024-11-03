// src/types/permission.ts
export interface Permission {
    id: number;
    name: string;
    code: string;
    description?: string;
}

export interface RolePermission {
    role: UserRole;
    permissions: Permission[];
}

export interface UserPermission {
    userId: number;
    permissions: Permission[];
}