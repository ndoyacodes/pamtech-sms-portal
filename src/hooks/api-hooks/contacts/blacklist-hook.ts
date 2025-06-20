import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { blacklistService } from '@/api/services/contacts/blacklist.service'; 
import { useNavigate } from 'react-router-dom';

export const useBlacklist = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    

    // Add to blacklist mutation
    const addToBlacklist = useMutation({
        mutationFn: ({ data }: { data: any }) => blacklistService.createBlacklistEntry(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blacklists'] });
            navigate('/blacklists');
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
            navigate('/blacklists');
            queryClient.invalidateQueries({ queryKey: ['blacklists'] });
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