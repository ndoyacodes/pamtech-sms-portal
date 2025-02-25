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
    type:"number"|"phonebook"
}

const DeleteNumberDialog = ({ id, name, onClose,type  }: DeleteNumberDialogProps) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            if (type === "number") {
                return await contactService.deletePhoneBookNumber(id)
            }else if(type === "phonebook") {
                 //soft delete phonebook
                return await contactService.deletePhoneBook(id)
            }
        },
        onSuccess: () => {
            toast.success(type === 'number' ? 'Number deleted successfully' : 'Phonebook deleted successfully')
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
                    <DialogTitle>{type === "number" ?"Delete Phonebook number": "Delete Phonebook"}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this {type ===  "number" ? "number": "phonebook"} <strong>{name}</strong>? This action cannot be undone.
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