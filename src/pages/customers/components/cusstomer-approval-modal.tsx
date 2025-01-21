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
  
  interface CustomerApprovalModalProps {
    customerId: number;
    actionType: string;
    onClose: () => void;
  }
  
  const CustomerApprovalModal = ({ customerId, actionType, onClose }: CustomerApprovalModalProps) => {
    const [remarks, setRemarks] = useState('');
    const { approveCustomer } = useCustomer();
  
    const handleSubmit = async () => {
      if (actionType === 'REJECT' && !remarks.trim()) {
        toast.error('Remarks are required for rejection.');
        return;
      }
  
      const approved = actionType === 'APPROVE';
      approveCustomer.mutate(
        {
          id: customerId,
          remarks: remarks,
          approved: approved,
        },
        {
          onSuccess: () => {
            toast.success(
              approved
                ? 'Customer approved successfully!'
                : 'Customer rejected successfully!'
            );
            onClose();
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || 'Failed to process the request.';
            toast.error(errorMessage);
          },
        }
      );
    };
  
    return (
      <Dialog open={true} onOpenChange={onClose} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Approval</DialogTitle>
            <DialogDescription>
              {actionType === 'APPROVE'
                ? 'Are you sure you want to approve this customer?'
                : 'Are you sure you want to reject this customer? This action is irreversible.'}
            </DialogDescription>
          </DialogHeader>
  
          <div className="space-y-4 py-4">
            {actionType === 'REJECT' && (
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Enter remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
  
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'APPROVE' ? 'default' : 'destructive'}
              loading={approveCustomer.isPending}
              onClick={handleSubmit}
              disabled={approveCustomer.isPending}
            >
              {actionType === 'APPROVE' ? 'Approve' : 'Reject'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CustomerApprovalModal;