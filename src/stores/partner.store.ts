// src/stores/partner.store.ts
import { defineStore } from 'pinia';
import { partnerService } from '@/services';
import type { Partner, PartnerDTO, PartnerResponse, Page } from '@/types';

export const usePartnerStore = defineStore('partner', {
    state: () => ({
        partners: [] as PartnerResponse[],
        selectedPartner: null as PartnerResponse | null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            pageSize: 10
        },
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchAllPartners() {
            try {
                this.loading = true;
                const partners = await partnerService.getAllPartners();
                this.partners = partners;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchPartnersPage(page: number, pageSize: number) {
            try {
                this.loading = true;
                const response = await partnerService.getPartnersWithPagination(page, pageSize);
                this.partners = response.content;
                this.pagination = {
                    currentPage: page,
                    totalPages: response.totalPages,
                    pageSize
                };
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async searchPartners(name: string, page: number, pageSize: number) {
            try {
                this.loading = true;
                const response = await partnerService.searchPartnersByName(name, page, pageSize);
                this.partners = response.content;
                this.pagination = {
                    currentPage: page,
                    totalPages: response.totalPages,
                    pageSize
                };
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});