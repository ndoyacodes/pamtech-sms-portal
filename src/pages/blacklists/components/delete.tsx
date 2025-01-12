import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blacklistService } from '@/api/services/contacts/blacklist.service'
import { toast } from 'react-toastify'

interface DeleteBlacklistDialogProps {
    id: any
    name: string | any
    onClose: () => void
}

const DeleteBlacklistDialog = ({ id, name, onClose }: DeleteBlacklistDialogProps) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            return await blacklistService.deleteBlacklistEntry(id)
        },
        onSuccess: () => {
            toast.success('Blacklist deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['blacklists'] })
            onClose()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete blacklist'
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
                    <DialogTitle>Remove number from Blacklist</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to remove this number <strong>{name}</strong>? This action cannot be undone.
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

export default DeleteBlacklistDialog