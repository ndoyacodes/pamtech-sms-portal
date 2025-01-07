import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { templateService } from '@/api/services/message/template.service'
import { toast } from 'react-toastify'

interface DeleteTemplateDialogProps {
    id: any
    name: string | any
    onClose: () => void
}

const DeleteTemplateDialog = ({ id, name, onClose }: DeleteTemplateDialogProps) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            return await templateService.deleteTemplate(id)
        },
        onSuccess: () => {
            toast.success('Template deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['templates'] })
            // onClose()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete template'
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
                    <DialogTitle>Delete Template</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        // className="btn-danger"
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

export default DeleteTemplateDialog