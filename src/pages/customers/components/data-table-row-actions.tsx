import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { customerSchema } from '../data/schema'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CustomerApprovalModal from './cusstomer-approval-modal'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = customerSchema.parse(row.original);
  const [approveModal, setApproveModal] = useState(false)
  const navigate =  useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
        onClick={() =>  {
          navigate(`/customer/${task.id}`)
        }}
        >View</DropdownMenuItem>
        <DropdownMenuItem>edit</DropdownMenuItem>
        <DropdownMenuItem
        onClick={() =>  setApproveModal(true)}
        >approve</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
     {approveModal && <CustomerApprovalModal customerId={task?.id} onClose={() =>  setApproveModal(false)}/>} 
    </DropdownMenu>
  )
}
