// src/types/management.ts
export interface ManagementUser extends User {
    totalOrders?: number;
    totalSpent?: number;
    lastLoginDate?: Date;
    status: UserStatus;
}

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export interface ManagerUserDTO extends UserDTO {
    role: UserRole;
    avatar?: string;
    status?: UserStatus;
}