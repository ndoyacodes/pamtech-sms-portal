import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { campaignService } from '@/api/services/campaign/campaign.service'; // You'll need to create this service

export const useCampaign = () => {
    const queryClient = useQueryClient();

    // Create campaign mutation
    const createCampaign = useMutation({
        mutationFn: ({ data }: { data: any }) => campaignService.createCampaign(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            toast.success('Campaign created successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create campaign';
            toast.error(errorMessage);
        }
    });

    // Update campaign mutation
    const updateCampaign = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => 
            campaignService.updateCampaign(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            toast.success('Campaign updated successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to update campaign';
            toast.error(errorMessage);
        }
    });

    // Delete campaign mutation
    const deleteCampaign = useMutation({
        mutationFn: (id: number) => campaignService.deleteCampaign(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            toast.success('Campaign deleted successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to delete campaign';
            toast.error(errorMessage);
        }
    });

    return {
        createCampaign,
        updateCampaign,
        deleteCampaign
    };
};