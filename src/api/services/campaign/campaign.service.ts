import { APIClient } from '../../axios/instance';

export interface CampaignData {
        id: number;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        budget: number;
        customer: number;
        status: string;
}

class CampaignService extends APIClient {
        constructor() {
                super('baseService');
        }

        // Create a new campaign
        createCampaign(data: any) {
                return this.post<CampaignData>('/campaign/new', data);
        }

        // Get all campaigns
        getCampaigns(params?: { page?: number; size?: number }) {
                return this.get<CampaignData[]>('/campaign', params);
        }

        // Get campaigns by customer
        getCustomerCampaigns(params?: { page?: number; size?: number }) {
                return this.get<any>('/campaign/customer',params);
        }

        // Get a single campaign by ID
        getCampaignById(id: string) {
                return this.get<CampaignData>(`/campaign/${id}`);
        }

        // Update a campaign
        updateCampaign(id: number, data: Partial<CampaignData>) {
                return this.patch<CampaignData>(`/campaign/${id}`, data);
        }

        // Delete a campaign
        deleteCampaign(id: number) {
                return this.delete<void>(`/campaign/${id}`, {id:id});
        }
}

export const campaignService = new CampaignService();