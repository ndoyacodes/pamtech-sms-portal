import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { Badge } from '@/components/ui/badge.tsx'
import { DataTableRowActions } from './data-table-row-actions'
import { isValid, parseISO, format } from 'date-fns';

export type Campaign = {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  recurringPeriod: string
  runStatus: string
  nextRun: string | null
  recurring: boolean
  sender: string
  messageTemplate: string
  active: boolean
}

export const columns: ColumnDef<Campaign>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[150px] truncate'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>
        {String(row.getValue('description')).substring(0, 50)}...
      </div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Date' />
    ),
    cell: ({ row }) => {
      const startDate = row?.original?.startDate;
      if (!startDate) return 'N/A';

      const parsedDate = parseISO(startDate);
      return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : 'Invalid Date';
    },
  },

  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Date' />
    ),
    cell: ({ row }) => {
      const endDate = row?.original?.endDate;
      if (!endDate) return 'N/A';

      const parsedDate = parseISO(endDate);
      return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : 'Invalid Date';
    },
  },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue('active') === true ? 'success' : 'destructive'}>
          {row.getValue('active') === true ? 'Active' : 'Not Active'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  },
]