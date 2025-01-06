import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { planService } from '@/api/services/plan/plan.service';

export const usePlan = () => {
    const queryClient = useQueryClient();

    // Create plan mutation
    const createPlan = useMutation({
        mutationFn: ({ data }: { data: any }) => planService.createPlan(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success('Plan created successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create plan';
            toast.error(errorMessage);
        }
    });

      // Create plan mutation
      const createSubscriptionPlan = useMutation({
        mutationFn: ({ data }: { data: any }) => planService.createPlanSUbscription(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success('Plan subscription created successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create plan subscription, try again';
            toast.error(errorMessage);
        }
    });

    // Update plan mutation
    const updatePlan = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => 
            planService.updatePlan(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success('Plan updated successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to update plan';
            toast.error(errorMessage);
        }
    });

    // Delete plan mutation
    const deletePlan = useMutation({
        mutationFn: (id: number) => planService.deletePlan(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            toast.success('Plan deleted successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to delete plan';
            toast.error(errorMessage);
        }
    });

    return {
        createPlan,
        updatePlan,
        deletePlan,
        createSubscriptionPlan
    };
};