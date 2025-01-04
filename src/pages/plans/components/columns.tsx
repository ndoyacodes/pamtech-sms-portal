import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels } from '../data/data'
import { Invoice } from '../data/schema'

export const columns: ColumnDef<Invoice>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'billingCycle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Billing cycle' />
    ),
    cell: ({ row }) => <div className='w-[100px]'>{row.getValue('billingCycle')}</div>,
  },
  {
    accessorKey: 'popular',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Popular' />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue('popular') ? 'default' : 'secondary'}>
      {row.getValue('popular') ? 'Yes' : 'No'}
      </Badge>
    ),
    },

  {
    accessorKey: 'pricePerSms',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price per sms' />
    ),
    cell: ({ row }) => <div className='w-[100px]'>{row.getValue('pricePerSms')}</div>,
  },
  {
    accessorKey: 'popular',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer Visible' />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue('customerVisible') ? 'default' : 'secondary'}>
      {row.getValue('customerVisible') ? 'Yes' : 'No'}
      </Badge>
    ),
    },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
