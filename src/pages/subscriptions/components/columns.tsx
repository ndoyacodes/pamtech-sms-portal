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
    accessorKey: 'numberOfSmsPurchased',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Number of sms purchased' />
    ),
    cell: ({ row }) => {

      return (
        <div className='flex space-x-2'>
           {/* <Badge variant='outline'>{label.label}</Badge> */}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('numberOfSmsPurchased')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'currentBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Current balance' />
    ),
    cell: ({ row }) => <div className='w-[150px]'>{row.getValue('currentBalance')}</div>,
  },
  {
    accessorKey: 'expiryDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expiry date' />
    ),
    cell: ({ row }) => <div className='w-[100px]'>{new Date(row.getValue('expiryDate')).toLocaleDateString()}</div>,
  },
   {
     accessorKey: 'expired',
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title='Status' />
     ),
     cell: ({ row }) => (
       <Badge
         variant={
           row.getValue('expired')  ? 'destructive' : 'success'
         }
       >
         {row.getValue('expired')? 'Expired' : 'Active'}
       </Badge>
     ),
   },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
