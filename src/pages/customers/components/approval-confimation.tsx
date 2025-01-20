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
import { customerService } from '@/api/services/customers/customer.service'

interface DeleteBlacklistDialogProps {
    mode: string | any
    customerId: any
    onClose: () => void
}

const DeleteBlacklistDialog = ({  mode, onClose, customerId }: DeleteBlacklistDialogProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await  customerService.approveCustomer({id:customerId, remarks:'', approved:false})
        },
        onSuccess: () => {
            toast.success('Customer approval revoked successfully')
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            onClose()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Failed to revoke approval'
            toast.error(errorMessage)
        },
    })

    const handleApprove = () => {
        if (mode = "approve") {
            onClose()
            return true
        }
        else{
            mutation.mutate()
        }
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customer Appproval</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to confirm  <strong>{mode === 'approve'? "Appproval": "Disapprove"}</strong>? This customer.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant={'destructive'}
                        loading={mutation.isPending}
                        onClick={handleApprove}
                        disabled={mutation.isPending}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteBlacklistDialog