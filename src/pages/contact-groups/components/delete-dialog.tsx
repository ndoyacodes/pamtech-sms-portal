import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { contactService } from '@/api/services/contacts/contacts.service'

interface DeleteNumberDialogProps {
    id: any
    name: string | any
    onClose: () => void
}

const DeleteNumberDialog = ({ id, name, onClose }: DeleteNumberDialogProps) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            return await contactService.deletePhoneBookNumber(id)
        },
        onSuccess: () => {
            toast.success('Number deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['phonebook'] })
            onClose()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete phonebook'
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
                    <DialogTitle>Delete Phonebook number</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this number <strong>{name}</strong>? This action cannot be undone.
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

export default DeleteNumberDialog