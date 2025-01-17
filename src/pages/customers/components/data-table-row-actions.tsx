import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const task = customerSchema.parse(row.original)
  const [approveModal, setApproveModal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const navigate = useNavigate()

  const handleCloseApprovalModal = () => {
    setApproveModal(false)
  }

  const handleCloseRejectModal = () => {
    setApproveModal(false)
  }

  // @ts-ignore
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
          onClick={() => {
            navigate(`/customer/${task.id}`)
          }}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        {(task.approvalStatus !== 'REJECTED' ||
          task.approvalStatus !== 'APPROVED') && (
          <>
            <DropdownMenuItem onClick={() => setApproveModal(true)}>
              Approve
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setRejectModal(true)}>
              Reject
            </DropdownMenuItem>
          </>
        )}
        {task.approvalStatus === 'APPROVED' && (
          <DropdownMenuItem>
            Delete
            {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      {approveModal && (
        <CustomerApprovalModal
          customerId={task?.id}
          actionType={'APPROVE'}
          onClose={handleCloseApprovalModal}
        />
      )}
      {rejectModal && (
        <CustomerApprovalModal
          customerId={task?.id}
          actionType={'REJECT'}
          onClose={handleCloseRejectModal}
        />
      )}
    </DropdownMenu>
  )
}
