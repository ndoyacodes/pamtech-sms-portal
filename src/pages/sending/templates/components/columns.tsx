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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>{row.getValue('name')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'messageType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Message type' />
    ),
    cell: ({ row }) => (
      <div className='w-[150px]'>{row.getValue('messageType')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'message',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Message' />
    ),
    cell: ({ row }) => {
      const message = row.getValue('message') as string
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {typeof message === 'string' && message.length > 50 ? `${message.slice(0, 50)}...` : message}
          </span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'activated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('active')
      return (
      <div className='flex w-[100px] items-center'>
        <Badge variant={isActive ? 'default' : 'destructive'}>
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
