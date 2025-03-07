import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { usersService } from '@/api/services/users/users.service.ts'

export const useUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Create plan mutation
    const createUser = useMutation({
        mutationFn: ({ data }: { data: any }) => usersService.createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/users');
            toast.success('User created successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create user';
            toast.error(errorMessage);
        }
    });

    // Update plan mutation
    const updateUserStatus = useMutation({
        mutationFn: ({ id }: { id: number }) =>
            usersService.updateStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/users');
            toast.success('User status updated successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to update user';
            toast.error(errorMessage);
        }
    });

    return {
        createUser,
        updateUserStatus,
    };
};