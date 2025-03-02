import { Cross2Icon, FileIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

// import { priorities, statuses } from '../data/data'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { useNavigate } from 'react-router-dom'
import {  IconPlus } from '@tabler/icons-react'
import { useAuthStore } from '@/hooks/use-auth-store'

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  onStatusChange: (status:string) => void;
  status: string;
}

export function DataTableToolbar<TData>({
  table,
  // status
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const navigate =  useNavigate();
  const {user } =  useAuthStore();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter ...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
  {/*<DropdownMenu>*/}
    {/*<DropdownMenuTrigger asChild>
      <Button variant="outline" className="h-8 w-[150px]">
        {statuses.find(s => status === s.value)?.label || 'Filter by Status'}
        <IconArrowDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>*/}
    {/*<DropdownMenuContent align="end">
      <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {statuses.map((statusdt) => (
        <DropdownMenuItem
          key={statusdt.value}
          onClick={() => onStatusChange(statusdt.value)}
        >
          {statusdt.icon && <statusdt.icon className="mr-2 h-4 w-4" />}
          {statusdt.label}
          {status == statusdt.value && (
            <span className="ml-auto">✓</span>
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>*/}
  {/*</DropdownMenu>*/}
        <div className='flex gap-x-2'>
          {/*{table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}

            />
          )}*/}

               {user?.customer && (
                <Button
                variant='default'
                onClick={() => navigate('/sms/top-up')}
                className='h-8 px-2 lg:px-3'
              >
                New subscription
                <IconPlus className='ml-2 h-4 w-4' />
              </Button>
               )}
               <Button
            variant='default'
            // onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Export
            <FileIcon className='ml-2 h-4 w-4' />
          </Button>
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
