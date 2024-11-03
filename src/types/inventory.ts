// src/types/inventory.ts
export interface InventoryCheck {
    id: number;
    userId: number;
    user?: User;
    name: string;
    status: InventoryStatus;
    note?: string;
    inventoryCheckDetails: InventoryCheckDetail[];
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryCheckDetail {
    id: number;
    inventoryCheckId: number;
    productId: number;
    product?: Product;
    actualInventory: number;
    systemInventory: number;
    reasonMissing?: string;
    note?: string;
}

export type InventoryStatus = 'CREATED' | 'INPUTTING' | 'COMPLETED_INPUT' | 'BALANCED' | 'CANCELLED';

export interface InventoryCheckDTO {
    userId: number;
    name: string;
    status: InventoryStatus;
    note?: string;
    inventoryCheckDetails: InventoryCheckDetailDTO[];
}

export interface InventoryCheckDetailDTO {
    productId: number;
    actualInventory: number;
    reasonMissing?: string;
    note?: string;
}