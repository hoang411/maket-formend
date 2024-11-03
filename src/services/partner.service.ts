// src/services/partner.service.ts
import type {
    Partner,
    PartnerDTO,
    PartnerResponse,
    PaginationParams
} from '@/types';

export const partnerService = {
    async getAllPartners(): Promise<PartnerResponse[]> {
        return api.get('/partners');
    },

    async getPartnersWithPagination(page: number, pageSize: number): Promise<Page<PartnerResponse>> {
        return api.get(`/partners/${page}/${pageSize}`);
    },

    async searchPartnersByName(name: string, page: number, pageSize: number): Promise<Page<PartnerResponse>> {
        return api.get(`/partners/findByName/${page}/${pageSize}`, { params: { name } });
    },

    async getPartnerById(id: number): Promise<PartnerResponse> {
        return api.get(`/partners/${id}`);
    },

    async createPartner(data: PartnerDTO): Promise<string> {
        return api.post('/partners/insert', data);
    },

    async updatePartner(id: number, data: PartnerDTO): Promise<string> {
        return api.put(`/partners/update/${id}`, data);
    },

    async deletePartner(id: number): Promise<string> {
        return api.delete(`/partners/delete/${id}`);
    }
};