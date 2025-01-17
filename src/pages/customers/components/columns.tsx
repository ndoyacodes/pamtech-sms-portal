import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { Customer } from '../data/schema'

export const columns: ColumnDef<Customer>[] = [
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
      <DataTableColumnHeader column={column} title='S/NO' />
    ),
    cell: ({ row, }) => <div className='w-[80px]'>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName || ''
      const lastName = row.original.lastName || ''
      return (
        <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {`${firstName} ${lastName}`.trim() || 'N/A'}
        </span>
      )
    },
  },
  {
    accessorKey: 'companyName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('companyName') || 'N/A'}
      </span>
    ),
  },

  {
    accessorKey: 'customerType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('customerType') !== null || row.getValue('customerType') !== undefined && row.getValue('customerType')}
      </span>
    ),
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
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => (
      <Badge 
        variant={
          row.getValue('status') === true
        ? 'success'
        : row.getValue('status') === false
        ? 'secondary'
        : 'destructive'
        }
      >
        {row.getValue('status') === true
          ? 'Active'
          : row.getValue('status') === false
          ? 'Pending'
          : 'Inactive'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
