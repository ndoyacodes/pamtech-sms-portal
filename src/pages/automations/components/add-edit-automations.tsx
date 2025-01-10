import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import Select from 'react-select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/hooks/use-auth-store'
import { useQuery } from '@tanstack/react-query'
import { contactService } from '@/api/services/contacts/contacts.service'
import { senderIdService } from '@/api/services/customers/senderid.services'
import { templateService } from '@/api/services/message/template.service'
import { useCampaign } from '@/hooks/api-hooks/compaign/campaign-hook'

const RECURRING_PERIODS = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'YEARLY', label: 'Yearly' },
]

const daysOfWeek = [
  { value: 'MONDAY', label: 'Monday' },
  { value: 'TUESDAY', label: 'Tuesday' },
  // ... other days
]

const datesInMonth = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}))

const months = [
  { value: 'JANUARY', label: 'January' },
  { value: 'FEBRUARY', label: 'February' },
  // ... other months
]

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().optional(),
  phoneBooks: z
    .array(z.number())
    .nonempty({ message: 'Phone Books are required' }),
  senderId: z.number().min(1, { message: 'Sender ID is required' }),
  messageTemplate: z
    .number()
    .min(1, { message: 'Message Template is required' }),
  startDate: z.string().nonempty({ message: 'Start Date is required' }),
  endDate: z.string().nonempty({ message: 'End Date is required' }),
  recurring: z.boolean().default(false),
  recurringPeriod: z.string().optional(),
  nextRunDate: z.string().optional(),
  isActive: z.boolean().default(true),
  weeklyDays: z.array(z.string()).optional(),
  monthlyDates: z.array(z.number()).optional(),
  yearlyMonth: z.string().optional(),
  yearlyDate: z.number().optional(),
})

export const CampaignForm = () => {
  const { user } = useAuthStore()
  const [showNextRunDate, setShowNextRunDate] = React.useState(false)
  const { createCampaign } = useCampaign()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      phoneBooks: [],
      senderId: null,
      messageTemplate: null,
      startDate: '',
      endDate: '',
      recurring: false,
      recurringPeriod: '',
      nextRunDate: '',
      isActive: true,
      weeklyDays: [],
      monthlyDates: [],
      yearlyMonth: '',
      yearlyDate: 1,
    },
  })

  const watchRecurring = form.watch('recurring')
  const watchRecurringPeriod = form.watch('recurringPeriod')

  React.useEffect(() => {
    setShowNextRunDate(watchRecurringPeriod === 'DAILY')
  }, [watchRecurringPeriod])

  const { data: phoneBooks, isLoading } = useQuery({
    queryKey: ['phone-books'],
    queryFn: async () => {
      const response: any = await contactService.getCustomerPhoneBooks({
        page: 0,
        size: 10,
      })
      const fResponse = response?.content?.map((mt: any) => ({
        value: mt.id,
        label: mt.name,
      }))
      return fResponse || []
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  const { data: senderIds, isLoading: loadingSenderIds } = useQuery({
    queryKey: ['sender-ids'],
    queryFn: async () => {
      const response: any = await senderIdService.getCustomerSenderIds({
        page: 0,
        size: 100,
      })
      const fResponse = response?.content?.map((mt: any) => ({
        value: mt.id,
        label: mt.senderId,
      }))
      return fResponse || []
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  const { data: messageTemplates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response: any = await templateService.getCustomerTemplates(
        user?.customer?.id,
        {
          page: 0,
          size: 100,
        }
      )
      const fResponse = response?.map((mt: any) => ({
        value: mt.id,
        label: mt.name,
      }))
      return fResponse || []
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data)
    createCampaign.mutate({ data: data })
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4 '>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card className=' mx-auto p-8'>
          <h2 className='mb-6 text-2xl font-semibold'>Create Campaign</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Left Column */}
                <div className='space-y-6'>
                  {/* Basic Information Section */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Basic Information</h3>

                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter campaign name'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Enter campaign description'
                              className='resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                
                  </div>

                  {/* Content Selection Section */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Content Selection</h3>

                    <FormField
                      control={form.control}
                      name='messageTemplate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Template *</FormLabel>
                          <FormControl>
                            <Select
                              className='my-react-select-container'
                              classNamePrefix='my-react-select'
                              isLoading={isLoadingTemplates}
                              placeholder='Select message template'
                              options={messageTemplates}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              }
                              value={messageTemplates?.find(
                                (option: any) => option.value === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='senderId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender ID *</FormLabel>
                          <FormControl>
                            <Select
                              className='my-react-select-container'
                              classNamePrefix='my-react-select'
                              isLoading={loadingSenderIds}
                              placeholder='Select sender ID'
                              options={senderIds}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              }
                              value={senderIds?.find(
                                (option: any) => option.value === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
                  {/* Audience Section */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Audience</h3>

                    <FormField
                      control={form.control}
                      name='phoneBooks'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Books *</FormLabel>
                          <FormControl>
                            <Select
                              isMulti
                              className='my-react-select-container'
                              classNamePrefix='my-react-select'
                              isLoading={isLoading}
                              placeholder='Select phone books'
                              options={phoneBooks}
                              onChange={(options) =>
                                field.onChange(options?.map((opt) => opt.value))
                              }
                              value={phoneBooks?.filter((option: any) =>
                                //@ts-ignore
                                field.value?.includes(option.value)
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Schedule Section */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Schedule</h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='startDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date *</FormLabel>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='endDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date *</FormLabel>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name='recurring'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Recurring Campaign
                            </FormLabel>
                            <FormDescription>
                              Enable if this campaign should run multiple times
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {watchRecurring && (
                      <FormField
                        control={form.control}
                        name='recurringPeriod'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recurring Period *</FormLabel>
                            <FormControl>
                              <Select
                                className='my-react-select-container'
                                classNamePrefix='my-react-select'
                                placeholder='Select recurring period'
                                options={RECURRING_PERIODS}
                                onChange={(option) =>
                                  field.onChange(option?.value)
                                }
                                value={RECURRING_PERIODS.find(
                                  (option) => option.value === field.value
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {showNextRunDate && (
                      <FormField
                        control={form.control}
                        name='nextRunDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Run Date *</FormLabel>
                            <FormControl>
                              <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {watchRecurringPeriod === 'WEEKLY' && (
                      <FormField
                        control={form.control}
                        name='weeklyDays'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Days of the Week *</FormLabel>
                            <FormControl>
                              <Select
                                isMulti
                                className='my-react-select-container'
                                classNamePrefix='my-react-select'
                                //@ts-ignore
                                options={daysOfWeek}
                                value={field.value}
                                onChange={(selected) =>
                                  //@ts-ignore
                                  field.onChange(selected.map((d) => d.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {watchRecurringPeriod === 'MONTHLY' && (
                      <FormField
                        control={form.control}
                        name='monthlyDates'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dates in Month *</FormLabel>
                            <FormControl>
                              <Select
                                className='my-react-select-container'
                                classNamePrefix='my-react-select'
                                isMulti
                                //@ts-ignore
                                options={datesInMonth}
                                value={field.value}
                                onChange={(selected) =>
                                  //@ts-ignore
                                  field.onChange(selected.map((d) => d.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {watchRecurringPeriod === 'YEARLY' && (
                      <div>
                        <FormField
                          control={form.control}
                          name='yearlyMonth'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Month *</FormLabel>
                              <FormControl>
                                <Select
                                  className='my-react-select-container'
                                  classNamePrefix='my-react-select'
                                  //@ts-ignore
                                  options={months}
                                  value={field.value}
                                  onChange={(option) =>
                                    //@ts-ignore
                                    field.onChange(option?.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='yearlyDate'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date *</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  min='1'
                                  max='31'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}{' '}
                    
                  </div>
                </div>
              </div>

              {/* Status Section - Full Width */}
              {/* <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        Active Campaign
                      </FormLabel>
                      <FormDescription>
                        Inactive campaigns won't be executed
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              {/* Submit Button */}
              <div className='flex justify-end mt-11'>
                <Button
                  type='submit'
                  className='w-full md:w-auto'
                  loading={createCampaign.isPending}
                  disabled={createCampaign.isPending}
                >
                  Create Campaign
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default CampaignForm
