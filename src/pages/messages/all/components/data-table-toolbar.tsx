import { Download } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import { DataTableViewOptions } from './data-table-view-options';
import { IconFilter } from '@tabler/icons-react';
import { z } from 'zod';
import { formatDateForInput } from '../../../../lib/utils'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query'
import { senderIdService } from '@/api/services/customers/senderid.services.ts'

const formSchema = z.object({
  period: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  direction: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  fromAddress: z.string().optional(),
  messageId: z.string().optional(),
  senderId: z.number().optional(),
  recipient: z.string().optional(),
  msisdn: z.string().optional(),
});

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onFilterSubmit?: (data: any) => void;
}

const getFieldType = (fieldName: string, value: any): string => {
  if (fieldName === 'senderId') return 'NUMBER';
  if (fieldName === 'fromDate' || fieldName === 'toDate') return 'DATE';
  if (typeof value === 'boolean') return 'BOOLEAN';
  if (typeof value === 'number') return 'NUMBER';
  return 'STRING';
};

// const formatDateForInput = (date: Date): string => {
//   return date.toISOString().slice(0, 16);
// };

export function DataTableToolbar<TData>({
                                          table,
                                          onFilterSubmit
                                        }: DataTableToolbarProps<TData>) {
  const [showFilter, setShowFilter] = useState(false);
  const [showDateFields, setShowDateFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: '',
      fromDate: '',
      toDate: '',
      status: '',
      senderId: undefined,
      msisdn: '',
    },
  });

  const periodValue = form.watch('period');

  useEffect(() => {
    setShowDateFields(periodValue === 'CUSTOM');

    if (periodValue !== 'CUSTOM') {
      const now = new Date();
      let fromDate = new Date();
      let toDate = new Date();

      switch (periodValue) {
        case 'TODAY':
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(23, 59, 59, 999);
          break;

        case 'YESTERDAY':
          fromDate = new Date(now);
          fromDate.setDate(now.getDate() - 1);
          fromDate.setHours(0, 0, 0, 0);

          toDate = new Date(now);
          toDate.setDate(now.getDate() - 1);
          toDate.setHours(23, 59, 59, 999);
          break;

        case 'THIS_WEEK':
          fromDate = new Date(now);
          const firstDayOfWeek = now.getDate() - now.getDay(); // Sunday = 0
          fromDate.setDate(firstDayOfWeek);
          fromDate.setHours(0, 0, 0, 0);

          toDate = new Date(now);
          toDate.setHours(23, 59, 59, 999);
          break;

        case 'THIS_MONTH':
          fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
          fromDate.setHours(0, 0, 0, 0);

          toDate = new Date(now);
          toDate.setHours(23, 59, 59, 999);
          break;

        default:
          fromDate = new Date(0);
          toDate = new Date(0);
          break;
      }

      if (periodValue) {
        form.setValue('fromDate', formatDateForInput(fromDate));
        form.setValue('toDate', formatDateForInput(toDate));
      } else {
        form.setValue('fromDate', '');
        form.setValue('toDate', '');
      }
    }
  }, [periodValue, form]);

  const { data: senderIds, isLoading: loadingSenderIds } = useQuery({
    queryKey: ['sender-ids'],
    queryFn: async () => {
      const response = await senderIdService.getCustomerSenderIds({
        page: 0,
        size: 10000,
      });

      return (
        // @ts-ignore
        response?.content?.map((sid: { id: any; senderId: any }) => ({
          value: sid.id,
          label: sid.senderId,
        })) || []
      )
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const filters = Object.entries(values)
        .filter(([key, value]) => {
          if (key === 'period') return false;
          if ((key === 'fromDate' || key === 'toDate') && (!values.fromDate && !values.toDate)) return false;
          if (key !== 'fromDate' && key !== 'toDate') {
            return value !== undefined && value !== '';
          }
          return false;
        })
        .map(([key, value]) => {
          if (key === 'msisdn') {
            return {
              key: 'recipient',
              operator: 'LIKE',
              field_type: 'STRING',
              value: value,
              values: [value],
            };
          }

          if (key === 'senderId') {
            return {
              key: 'sender.id',
              operator: 'EQUAL',
              field_type: 'STRING',
              value: value,
              values: [value],
            };
          }

          return {
            key,
            operator: 'EQUAL',
            field_type: getFieldType(key, value),
            value: value,
            values: [value],
          };
        });

      if (values.fromDate || values.toDate) {
        filters.push({
          key: 'createdAt',
          operator: 'BETWEEN',
          field_type: 'DATE',
          value: formatDateForInput(values.fromDate) || null,
          // @ts-ignore
          value_to: formatDateForInput(values.toDate) || null,
          values: [formatDateForInput(values.fromDate) || '', formatDateForInput(values.toDate) || '']
        });
      }

      const requestData = {
        filters,
        sorts: [],
        page: 0,
        size: 10
      };

      console.log('Submitting filter data:', requestData);

      if (onFilterSubmit) {
        await onFilterSubmit(requestData);
      }

      // Close the filter panel after successful submission
      // setShowFilter(false);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    form.reset();
    table.getAllColumns().forEach(column => {
      column.setFilterValue(undefined);
    });

    if (onFilterSubmit) {
      const emptyRequestData = {
        filters: [],
        sorts: [],
        page: 0,
        size: 10
      };
      onFilterSubmit(emptyRequestData);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between '>
        <div className='flex flex-1 flex-col-reverse sm:flex-row sm:items-center sm:space-x-2'>
          <div className='flex gap-x-2'>
            <Button
              variant='default'
              onClick={() => setShowFilter(!showFilter)}
              className='h-8 px-3'
            >
              Filter <IconFilter className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='default' className='h-8 px-3'>
              Export <Download className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>

      {showFilter && (
        <div className='mt-4 rounded-lg bg-white p-6 shadow-md'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 md:grid-cols-6'>
              <FormField
                control={form.control}
                name='period'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='dark:text-black'>Period</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='dark:text-black'>
                          <SelectValue placeholder='Select one'  />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='TODAY'>Today</SelectItem>
                        <SelectItem value='YESTERDAY'>Yesterday</SelectItem>
                        <SelectItem value='THIS_WEEK'>This week</SelectItem>
                        <SelectItem value='THIS_MONTH'>This month</SelectItem>
                        <SelectItem value='CUSTOM'>Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {showDateFields && (
                <>
                  <FormField
                    control={form.control}
                    name='fromDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='dark:text-black'>From Date</FormLabel>
                        <FormControl>
                          <Input type='datetime-local' className='dark:text-black' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='toDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='dark:text-black'>To Date</FormLabel>
                        <FormControl>
                          <Input type='datetime-local' className='dark:text-black' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name='senderId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='dark:text-black'>Sender ID</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      // @ts-ignore
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className='dark:text-black'>
                          <SelectValue placeholder='Select sender ID' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {loadingSenderIds ? (
                          <SelectItem value="loading">Loading...</SelectItem>
                        ) : (
                          senderIds?.map((sender: any) => (
                            <SelectItem key={sender.value} value={sender.value.toString()}>
                              {sender.label}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='msisdn'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='dark:text-black'>Phone Number</FormLabel>
                    <FormControl>
                      <Input className='dark:text-black' {...field} placeholder={"2557XXXXXXX"} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='dark:text-black'>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='dark:text-black'>
                          <SelectValue  placeholder='Select one' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='DELIVERED'>Delivered</SelectItem>
                        <SelectItem value='PENDING'>Pending</SelectItem>
                        <SelectItem value='SENT'>Sent</SelectItem>
                        <SelectItem value='FAILED'>Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="col-span-full flex justify-end mt-4">
                <Button
                  type="submit"
                  variant="default"
                  disabled={isLoading}
                >
                  {isLoading ? 'Applying...' : 'Apply Filters'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="ml-2"
                  onClick={handleClearFilters}
                  disabled={isLoading}
                >
                  Clear Filters
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}