import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

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
    accessorKey: 'sender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender" />
    ),
    },

  {
    accessorKey: 'recipient',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    },
    {
      accessorKey: 'message',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Message" />
      ),
      cell: ({ row }) => <div className='truncate max-w-[150px]'>{String(row.getValue('message')).substring(0, 50)}</div>
      },
    {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue('status') === 'success' ? 'secondary' : 'destructive'}>
      {row.getValue('status')}
      </Badge>
    ),
    },
    {
    accessorKey: 'network',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Network" />
    ),
    },
    {
    accessorKey: 'dateSent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Sent" />
    ),
    },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
