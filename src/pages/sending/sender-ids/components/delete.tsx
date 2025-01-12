import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
  import { Button } from '@/components/custom/button'
  import { useMutation, useQueryClient } from '@tanstack/react-query'
import { senderIdService } from '@/api/services/customers/senderid.services'
import { toast } from 'react-toastify'

  
  interface DeleteDialogProps {
    id: any
    name: string | any
    onClose: () => void
  }
  
  const DeleteDialog = ({ id, name, onClose }: DeleteDialogProps) => {
    const queryClient = useQueryClient()
  
    const mutation = useMutation({
      mutationFn: async () => {
        return await senderIdService.deleteSenderId(id)
      },
      onSuccess: () => {
        toast.success('Sender Id deleted successfully')
        queryClient.invalidateQueries({ queryKey: ['farmers'] }) 
        onClose()
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || 'Failed to delete sender Id'
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
            <DialogTitle>Delete {name}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
  
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="btn-danger"
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
  
  export default DeleteDialog
  