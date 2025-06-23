import { messageService } from '@/api/services/message/message.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useSms = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const sendBulkSMS = useMutation({
        mutationFn: ({ data }: { data: any }) => messageService.sendBulkSMS(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sms'] });
            toast.success('Campaign was successfully sent.');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || 'Failed to send sms';
            toast.error(errorMessage);
        }
    });

    return {
        sendBulkSMS
    };
};