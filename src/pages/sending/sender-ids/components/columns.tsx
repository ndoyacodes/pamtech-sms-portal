import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { DataSchema } from '../data/schema'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<DataSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
    
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='#' />
      ),
      cell: ({ row }) => <div className='w-[80px]'>{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
  {
    accessorKey: 'senderId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sender Id' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('senderId')}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'billingCycle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Billing Cycle' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('billingCycle')}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='  Price' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('price')}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
      accessorKey: 'approvalStatus',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Approval' />
      ),
      cell: ({ row }) => (
        <Badge variant={row.getValue('approvalStatus') === "PENDING" || row.getValue('approvalStatus') === null ? 'secondary'
          : row.getValue('approvalStatus') === "APPROVED" ? 'success' : 'destructive'}>
          {row.getValue('approvalStatus')}
        </Badge>
      ),
    },
  {
    accessorKey: 'activated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('activated')
      return (
      <div className='flex w-[100px] items-center'>
        <Badge variant={isActive ? 'success' : 'destructive'}>
        {isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>
      )
    },
    },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
