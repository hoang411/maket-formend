// src/types/partner.ts
export interface Partner {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
}

export interface PartnerDTO {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
}