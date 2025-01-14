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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const navigate = useNavigate()
  const campaign = row.original as Campaign

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

  const handleDelete = () => {
    if (!campaign?.id) {
      toast({
        title: 'Error',
        description: 'Campaign ID is missing.',
        variant: 'destructive',
      })
      return
    }
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
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}