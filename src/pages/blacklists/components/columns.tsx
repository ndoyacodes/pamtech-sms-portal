import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { DataSchema } from '../data/schema'

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
    cell: ({ row }) => <div className='w-[80px]'>{row.index +  1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='msisdn' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>{row.getValue('msisdn')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'reason',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reason' />
    ),
    cell: ({ row }) => (
      <div className='w-[120px]'>{row.getValue('reason')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
