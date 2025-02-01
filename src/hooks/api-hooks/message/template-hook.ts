import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { templateService } from '@/api/services/message/template.service'; 
import { useNavigate } from 'react-router-dom';

export const useSmsTemplate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Create SMS template mutation
    const createTemplate = useMutation({
        mutationFn: ({ data }: { data: any }) => templateService.createTemplate(data),
        onSuccess: () => {
            navigate('/templates');
            queryClient.invalidateQueries({ queryKey: ['smsTemplates'] });
            toast.success('SMS template created successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to create SMS template';
            toast.error(errorMessage);
        }
    });

    // Update SMS template mutation
    const updateTemplate = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => 
            templateService.updateTemplate(id, data),
        onSuccess: () => {
            navigate('/templates');
            queryClient.invalidateQueries({ queryKey: ['smsTemplates'] });
            toast.success('SMS template updated successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to update SMS template';
            toast.error(errorMessage);
        }
    });

    // Delete SMS template mutation
    const deleteTemplate = useMutation({
        mutationFn: (id: number) => templateService.deleteTemplate(id),
        onSuccess: () => {
            navigate('/templates'); 
            queryClient.invalidateQueries({ queryKey: ['smsTemplates'] });
            toast.success('SMS template deleted successfully');
        },
        onError: (error: any) => {
            const errorMessage = 
                error?.response?.data?.message || 'Failed to delete SMS template';
            toast.error(errorMessage);
        }
    });

    return {
        createTemplate,
        updateTemplate,
        deleteTemplate
    };
};