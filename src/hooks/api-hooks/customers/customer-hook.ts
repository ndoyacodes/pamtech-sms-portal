import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { customerService } from '@/api/services/customers/customer.service';
import { useNavigate } from 'react-router-dom';
// import { data } from 'autoprefixer' // You'll need to create this service

export const useCustomer = () => {
    const queryClient = useQueryClient();
    const navigate =  useNavigate();

    // Create customer mutation
    const createCustomer = useMutation({
        mutationFn: ({ data }: { data: any }) => customerService.createCustomer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            navigate('/customers');
            toast.success('Customer created successfully');

        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create customer';
            toast.error(errorMessage);
        }
    });

    // Approve customer mutation
    const approveCustomer = useMutation({
        mutationFn: (data: any) => customerService.approveCustomer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers', 'customer-details'] }).then(r => console.log(r));
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to approve customer';
            toast.error(errorMessage);
        }
    });

    // Update customer mutation
    const updateCustomer = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => 
            customerService.updateCustomer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers', 'customer-details'] });
            navigate('/customers');
            toast.success('Customer updated successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to update customer';
            toast.error(errorMessage);
        }
    });

    // Delete customer mutation
    const deleteCustomer = useMutation({
        mutationFn: (id: number) => customerService.deleteCustomer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            navigate('/customers');
            toast.success('Customer deleted successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to delete customer';
            toast.error(errorMessage);
        }
    });

    return {
        createCustomer,
        updateCustomer,
        deleteCustomer,
        approveCustomer
    };
};