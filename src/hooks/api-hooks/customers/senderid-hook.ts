import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { senderIdService } from '@/api/services/customers/senderid.services'; 

export const useSenderId = () => {
    const queryClient = useQueryClient();

    // Create sender ID mutation
    const createSenderId = useMutation({
        mutationFn: ({ data }: { data: any }) => senderIdService.createSenderId(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sender-ids'] });
            toast.success('Sender ID created successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create sender ID';
            toast.error(errorMessage);
        }
    });

    const approveSenderId = useMutation({
        mutationFn: ({ data }: { data: any }) => senderIdService.approveSenderId(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sender-ids'] });
            toast.success('Sender ID approved successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to approve sender ID';
            toast.error(errorMessage);
        }
    });

    // Update sender ID mutation
    const updateSenderId = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => 
            senderIdService.updateSenderId(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sender-ids'] });
            toast.success('Sender ID updated successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to update sender ID';
            toast.error(errorMessage);
        }
    });

    // Delete sender ID mutation
    const deleteSenderId = useMutation({
        mutationFn: (id: number) => senderIdService.deleteSenderId(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sender-ids'] });
            toast.success('Sender ID deleted successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to delete sender ID';
            toast.error(errorMessage);
        }
    });

    return {
        createSenderId,
        updateSenderId,
        deleteSenderId,
        approveSenderId
    };
};