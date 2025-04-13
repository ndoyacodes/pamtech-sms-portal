import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { reportService } from '@/api/services/customers/invoice.service';

export const useInvoiceGenerator = () => {
    const queryClient = useQueryClient();

    // Approve customer mutation
    // const previewInvoice = useMutation({
    //     mutationFn: (data: any) => reportService.previewInvoice(data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['invoice', 'customer-details'] }).then(r => console.log(r));
    //     },
    //     onError: (error: any) => {
    //         const errorMessage = 
    //             error?.response?.data?.message || 'Failed to get invoice data';
    //         toast.error(errorMessage);
    //     }
    // });

    const generateInvoice = useMutation({
        mutationFn: (data: any) => reportService.generateInvoice(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoice', 'customer-details'] }).then(r => console.log(r));
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to get invoice data';
            toast.error(errorMessage);
        }
    });

    return {
        generateInvoice
    };
};