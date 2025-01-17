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
import DeleteBlacklistDialog from './approval-confimation'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const customer = customerSchema.parse(row.original)
  const [approveModal, setApproveModal] = useState(false);
  const [revokeApprovalMOdal, setRevokeApprovalMOdal] = useState(false)
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
<<<<<<< HEAD
        onClick={() =>  {
          navigate(`/customer/${customer.id}`)
        }}
        >View</DropdownMenuItem>
        <DropdownMenuItem>edit</DropdownMenuItem>
       {
          customer.status ? <DropdownMenuItem
          onClick={() =>  setRevokeApprovalMOdal(true)}
          >Revoke Approval</DropdownMenuItem> : <DropdownMenuItem
          onClick={() =>  setApproveModal(true)}
          >Approve</DropdownMenuItem>
       }
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
=======
          onClick={() => {
            navigate(`/customer/${task.id}`)
          }}
        >
          View
>>>>>>> 79897e0c3987caf0d506b460f9de93d12036462e
        </DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        {!(
          task.approvalStatus === 'REJECTED' ||
          task.approvalStatus === 'APPROVED'
        ) ? <></> : (
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
<<<<<<< HEAD
     {approveModal && <CustomerApprovalModal customerId={customer?.id} onClose={() =>  setApproveModal(false)}/>} 
      {revokeApprovalMOdal && <DeleteBlacklistDialog mode="disapprove" customerId={customer?.id} onClose={() =>  setRevokeApprovalMOdal(false)}/>}
=======
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
>>>>>>> 79897e0c3987caf0d506b460f9de93d12036462e
    </DropdownMenu>
  )
}
