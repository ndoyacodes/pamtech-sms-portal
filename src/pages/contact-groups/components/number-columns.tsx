import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { useState } from 'react'
import { Button } from '@/components/custom/button'
import DeleteNumberDialog from './delete-dialog'

export const columns: ColumnDef<any>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='#' />,
    cell: ({ row }) => <div className='w-[80px]'>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Number' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.getValue('msisdn')}</div>
    ),
  },

  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Column A' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.getValue('msisdn')}</div>
    ),
  },

  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Column B' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.getValue('msisdn')}</div>
    ),
  },

  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Column C' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.getValue('msisdn')}</div>
    ),
  },

  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Column D' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.getValue('msisdn')}</div>
    ),
  },

  {
    accessorKey: 'msisdn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Action' />
    ),
    cell: ({ row }) => {
      const [deleteState, setdeleteState] = useState(false)
      return (
        <div className=' truncate'>
          <Button
            onClick={() => setdeleteState(true)}
            size='sm'
            variant='destructive'
          >
            Delete
          </Button>
          {deleteState && (
            <DeleteNumberDialog
              id={row.getValue('id')}
              name={row.getValue('msisdn')}
              onClose={() => setdeleteState(false)}
            />
          )}
        </div>
      )
    },
  },
]
