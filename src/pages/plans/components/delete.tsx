import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { planService } from '@/api/services/plan/plan.service'
import { toast } from 'react-toastify'

interface DeletePlanDialogProps {
    id: any
    name: string | any
    onClose: () => void
}

const DeletePlanDialog = ({ id, name, onClose }: DeletePlanDialogProps) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            return await planService.deletePlan(id)
        },
        onSuccess: () => {
            toast.success('Plan deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['plans'] })
            onClose()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete plan'
            toast.error(errorMessage)
        },
    })

    const handleDelete = () => {
        mutation.mutate()
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Plan</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the plan <strong>{name}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={'destructive'}
                        loading={mutation.isPending}
                        onClick={handleDelete}
                        disabled={mutation.isPending}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeletePlanDialog