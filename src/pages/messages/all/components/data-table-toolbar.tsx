import { Cross2Icon, FileIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { priorities, statuses } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { IconFilter } from '@tabler/icons-react'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  period: z.string(),
  date: z.string(),
  direction: z.string(),
  type: z.string(),
  status: z.string(),
  to: z.string(),
  from: z.string(),
  messageId: z.string(),
})

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [ShowFIlter, setShowFIlter] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: '',
      date: '',
      direction: '',
      type: '',
      status: '',
      to: '',
      from: '',
      messageId: '',
    },
  })

  const isFiltered = table.getState().columnFilters.length > 0

  return (
   <>
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter invoices...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='Status'
              options={priorities}
            />
          )}
          <Button
            variant='default'
            onClick={() => setShowFIlter(!ShowFIlter)}
            className='h-8 px-2 lg:px-3'
          >
            Filter
            <IconFilter className='ml-2 h-4 w-4' />
          </Button>
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

    {ShowFIlter && (
  <div className='rounded-lg p-6 shadow'>
    <Form {...form}>
      <form className='grid grid-cols-2 gap-6'>
        {/* Left Column */}
        <div className='space-y-4'>
          {/* Period Field */}
          <FormField
            control={form.control}
            name='period'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Period:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select one' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='today'>Today</SelectItem>
                    <SelectItem value='yesterday'>Yesterday</SelectItem>
                    <SelectItem value='last7days'>Last 7 Days</SelectItem>
                    <SelectItem value='last30days'>
                      Last 30 Days
                    </SelectItem>
                    <SelectItem value='custom'>Custom</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='YYYY-MM-DD' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Direction Field */}
          <FormField
            control={form.control}
            name='direction'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direction:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select one' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='inbound'>Inbound</SelectItem>
                    <SelectItem value='outbound'>Outbound</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Type Field */}
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select one' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='sms'>SMS</SelectItem>
                    <SelectItem value='mms'>MMS</SelectItem>
                    <SelectItem value='voice'>Voice</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Right Column */}
        <div className='space-y-4'>
          {/* Status Field */}
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* To Field */}
          <FormField
            control={form.control}
            name='to'
            render={({ field }) => (
              <FormItem>
                <FormLabel>To:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* From Field */}
          <FormField
            control={form.control}
            name='from'
            render={({ field }) => (
              <FormItem>
                <FormLabel>From:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Message ID Field */}
          <FormField
            control={form.control}
            name='messageId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message ID:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  </div>
)}
   </>
  )
}


