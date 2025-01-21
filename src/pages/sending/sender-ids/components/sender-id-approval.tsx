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
  import { Textarea } from '@/components/ui/textarea';
  import { toast } from 'react-toastify';
import { useSenderId } from '@/hooks/api-hooks/customers/senderid-hook';
  
  interface SenderIdApprovalModalProps {
    senderId: number;
    actionType: string;
    onClose: () => void;
  }
  
  const SenderIdApprovalModal = ({ senderId, actionType, onClose }: SenderIdApprovalModalProps) => {
    const [remarks, setRemarks] = useState('');
    const { approveSenderId } = useSenderId();
  
    const handleSubmit = async () => {
      if (actionType === 'REJECT' && !remarks.trim()) {
        toast.error('Remarks are required for rejection.');
        return;
      }
  
      const approved = actionType === 'APPROVE';
      approveSenderId.mutate(
       {data:  {
        id: senderId,
        remarks: remarks,
        approved: approved,
      }},
        {
          onSuccess: () => {
            toast.success(
              approved
                ? 'Sender Id approved successfully!'
                : 'Sender Id rejected successfully!'
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
            <DialogTitle>Senderr Id Approval</DialogTitle>
            <DialogDescription>
              {actionType === 'APPROVE'
                ? 'Are you sure you want to approve this sender name?'
                : 'Are you sure you want to reject this sender name? This action is irreversible.'}
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
              loading={approveSenderId.isPending}
              onClick={handleSubmit}
              disabled={approveSenderId.isPending}
            >
              {actionType === 'APPROVE' ? 'Approve' : 'Reject'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default SenderIdApprovalModal;