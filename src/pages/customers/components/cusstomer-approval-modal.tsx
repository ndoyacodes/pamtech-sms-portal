import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { useCustomer } from '@/hooks/api-hooks/customers/customer-hook'

interface CustomerApprovalModalProps {
    customerId: number
    onClose: () => void
}

const CustomerApprovalModal = ({ customerId, onClose }: CustomerApprovalModalProps) => {
    const [remarks, setRemarks] = useState('')
    const [approved, setApproved] = useState(false);
    const {approveCustomer} =  useCustomer();

    const handleSubmit = async () => {
      await  approveCustomer.mutate({data:{customerId:customerId, remarks:remarks, approved:approved}})
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customer Approval</DialogTitle>
                    <DialogDescription>
                        Update the customer approval status and provide remarks if necessary.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks</Label>
                        <Input
                            id="remarks"
                            placeholder="Enter remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="approved"
                            checked={approved}
                            onCheckedChange={(checked) => setApproved(checked as boolean)}
                        />
                        <Label htmlFor="approved">Approve Customer</Label>
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        loading={approveCustomer.isPending}
                        onClick={handleSubmit}
                        disabled={approveCustomer.isPending}
                    >
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomerApprovalModal