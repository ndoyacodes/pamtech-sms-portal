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
  const [approveModal, setApproveModal] = useState(false)
  const [revokeApprovalMOdal, setRevokeApprovalMOdal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const navigate = useNavigate()

  const handleCloseApprovalModal = () => {
    setApproveModal(false)
  }

  const handleCloseRejectModal = () => {
    setRejectModal(false)
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
            navigate(`/customer/${customer.id}`)
          }}
        >
          View
        </DropdownMenuItem>
        {customer.approvalStatus !== 'DISABLED' &&
          customer.approvalStatus !== 'REJECTED' && (
            <DropdownMenuItem onClick={() => setRejectModal(true)}>
              Deactivate
            </DropdownMenuItem>
          )}

        {customer.approvalStatus === 'DISABLED' && (
          <DropdownMenuItem onClick={() => setApproveModal(true)}>
            Activate
          </DropdownMenuItem>
        )}

        {customer.approvalStatus !== 'REJECTED' && (
          <DropdownMenuItem
            onClick={() => {
              navigate(`/customers/add`, { state: { record: customer } })
            }}
          >
            Edit
          </DropdownMenuItem>
        )}
        {customer.approvalStatus === 'PENDING' && (
          <>
            <DropdownMenuItem onClick={() => setApproveModal(true)}>
              Approve
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setRejectModal(true)}>
              Reject
            </DropdownMenuItem>

            <DropdownMenuItem>Delete</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
      {revokeApprovalMOdal && (
        <DeleteBlacklistDialog
          mode='disapprove'
          customerId={customer?.id}
          onClose={() => setRevokeApprovalMOdal(false)}
        />
      )}
      {approveModal && (
        <CustomerApprovalModal
          customerId={customer?.id}
          actionType={
            customer.approvalStatus === 'PENDING' ? 'APPROVE' : 'ACTIVATE'
          }
          onClose={handleCloseApprovalModal}
        />
      )}
      {rejectModal && (
        <CustomerApprovalModal
          customerId={customer?.id}
          actionType={
            customer.approvalStatus === 'APPROVED' ? 'DEACTIVATE' : 'REJECT'
          }
          onClose={handleCloseRejectModal}
        />
      )}
    </DropdownMenu>
  )
}
