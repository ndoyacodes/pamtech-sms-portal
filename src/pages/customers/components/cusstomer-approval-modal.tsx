import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/custom/button';
  import { Label } from '@/components/ui/label';
  import { useState } from 'react';
  import { useCustomer } from '@/hooks/api-hooks/customers/customer-hook';
  import { Textarea } from '@/components/ui/textarea';
  import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
  
  interface CustomerApprovalModalProps {
    customerId: number;
    actionType: string;
    onClose: () => void;
  }
  
  const CustomerApprovalModal = ({ customerId, actionType, onClose }: CustomerApprovalModalProps) => {
    const [remarks, setRemarks] = useState('')
    const { approveCustomer } = useCustomer()
    const queryClient =  useQueryClient();

    console.log(actionType);
    

    function capitalize(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleSubmit = async () => {
      if (actionType === 'REJECT' && !remarks.trim()) {
        toast.error('Remarks are required for rejection.')
        return
      }

      const approved = actionType === 'APPROVE' || actionType === 'ACTIVATE'
      approveCustomer.mutate(
        {
          id: customerId,
          remarks: remarks,
          approved: approved,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            toast.success(
              approved
                ? 'Customer approved successfully!'
                : 'Customer rejected / deactivated successfully!'
            )
            onClose()
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || 'Failed to process the request.'
            toast.error(errorMessage)
          },
        }
      )
    }

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Approval</DialogTitle>
            <DialogDescription>
              {`Are you sure you want to ${actionType.toLowerCase()} this customer?`}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            {actionType === 'REJECT' && (
              <div className='space-y-2'>
                <Label htmlFor='remarks'>Remarks</Label>
                <Textarea
                  id='remarks'
                  placeholder='Enter remarks'
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <div className='flex justify-end space-x-2'>
            <Button variant='secondary' onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={
                actionType === 'APPROVE' || actionType === 'ACTIVATE'
                  ? 'default'
                  : 'destructive'
              }
              loading={approveCustomer.isPending}
              onClick={handleSubmit}
              disabled={approveCustomer.isPending}
            >
              {capitalize(actionType.toLowerCase())}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  };
  
  export default CustomerApprovalModal;