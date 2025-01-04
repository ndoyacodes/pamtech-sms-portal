import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { blacklistService } from '@/api/services/contacts/blacklist.service'; 

export const useBlacklist = () => {
    const queryClient = useQueryClient();

    // Add to blacklist mutation
    const addToBlacklist = useMutation({
        mutationFn: ({ data }: { data: any }) => blacklistService.createBlacklistEntry(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blacklist'] });
            toast.success('Added to blacklist successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to add to blacklist';
            toast.error(errorMessage);
        }
    });

    // // Update blacklist entry mutation
    // const updateBlacklistEntry = useMutation({
    //     mutationFn: ({ id, data }: { id: number; data: any }) => 
    //         blacklistService.(id, data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    //         toast.success('Blacklist entry updated successfully');
    //     },
    //     onError: (error: any) => {
    //         const errorMessage = 
    //             error?.response?.data?.message || 'Failed to update blacklist entry';
    //         toast.error(errorMessage);
    //     }
    // });

    // Remove from blacklist mutation
    const removeFromBlacklist = useMutation({
        mutationFn: (id: number) => blacklistService.deleteBlacklistEntry(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blacklist'] });
            toast.success('Removed from blacklist successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to remove from blacklist';
            toast.error(errorMessage);
        }
    });

    return {
        addToBlacklist,
        removeFromBlacklist
    };
};