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
import { campaignService } from '@/api/services/campaign/campaign.service'

interface EnableCampaignCOnfirmationProps {
    mode: string | any
    campaignId: any
    campaign: string
    onClose: () => void
}

const CampaignConfirmationModal = ({  mode, onClose, campaignId, campaign }: EnableCampaignCOnfirmationProps) => {
    const queryClient = useQueryClient();

    console.log(mode, campaignId, campaign);
    

    const mutation = useMutation({
        mutationFn: async () => {
            if (mode  === 'disable') {
               await campaignService.campaignAction(`disable/${campaignId}`);
            }else if (mode === 'enable'){
                await campaignService.campaignAction(`enable/${campaignId}`);
            }else if (mode === 'delete') {
                await campaignService.deleteCampaign(campaignId);
            }
        },
        onSuccess: () => {
            toast.success(`Campaign ${mode}d successfully`)
            queryClient.invalidateQueries({ queryKey: ['campaigns'] })
            onClose()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || `Failed to ${mode} campaign`
            toast.error(errorMessage)
        },
    })

    const handleApprove = () => {
            mutation.mutate()
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode} campaign</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {mode} this <strong>{campaign}</strong>?
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

export default CampaignConfirmationModal