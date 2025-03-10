// data-table-row-actions.tsx
import { Row } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/custom/button.tsx'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { Campaign } from '@/pages/automations/components/columns.tsx'
import { useState } from 'react'
import CampaignConfirmationModal from './campaigns-confirmation.tsx'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const navigate = useNavigate()
  const campaign = row.original as Campaign
  const [enableState, setEnableState] = useState('enable')
  const [enableMOdal, setEnableMOdal] = useState(false)

  const handleEdit = () => {
    if (!campaign?.id) {
      toast({
        title: 'Error',
        description: 'Campaign ID is missing.',
        variant: 'destructive',
      })
      return
    }

    navigate(`/automations/campaign/${campaign.id}`, { state: { campaign } })
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={handleEdit}>View</DropdownMenuItem>
        {campaign.active ? (
          <DropdownMenuItem
            onClick={() => {
              setEnableMOdal(true)
              setEnableState('disable')
            }}
          >
            Disabe
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              setEnableMOdal(true)
              setEnableState('enable')
            }}
          >
            Enable
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => {
          setEnableMOdal(true)
          setEnableState('delete')
        }}>Delete</DropdownMenuItem>
      </DropdownMenuContent>

      {enableMOdal && (
        <CampaignConfirmationModal
          campaign={campaign.name}
          campaignId={campaign.id}
          mode={enableState}
          onClose={() => setEnableMOdal(false)}
        />
      )}
    </DropdownMenu>
  )
}
