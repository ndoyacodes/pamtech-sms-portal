import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import Select, { MultiValue } from 'react-select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/hooks/use-auth-store'
import { useQuery } from '@tanstack/react-query'
import { contactService } from '@/api/services/contacts/contacts.service'
import { senderIdService } from '@/api/services/customers/senderid.services'
import { templateService } from '@/api/services/message/template.service'
import { useCampaign } from '@/hooks/api-hooks/compaign/campaign-hook'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast.ts'

const RECURRING_PERIODS = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
]

const daysOfWeek = [
  { value: 'MON', label: 'Monday' },
  { value: 'TUE', label: 'Tuesday' },
  { value: 'WED', label: 'Wednesday' },
  { value: 'THU', label: 'Thursday' },
  { value: 'FRI', label: 'Friday' },
  { value: 'SAT', label: 'Saturday' },
  { value: 'SUN', label: 'Sunday' },
]

const datesInMonth = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}))

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
  startDate: z.any().optional(),
  endDate: z.any().optional(),
  recurring: z.boolean().default(false),
  recurringPeriod: z.any().optional(),
  nextRunDate: z.any().optional(),
  isActive: z.boolean().default(true),
  weeklyDays: z.array(z.string()).optional(),
  monthlyDates: z.array(z.number()).optional(),
  yearlyMonth: z.any().optional(),
  yearlyDate: z.any().optional(),
  runTime: z.any().optional()
})

export const CampaignForm = () => {
  const { user } = useAuthStore()
  const [showNextRunDate, setShowNextRunDate] = React.useState(false)
  const { createCampaign } = useCampaign()
  const navigate = useNavigate()

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
      recurringPeriod: null,
      nextRunDate: '',
      isActive: true,
      weeklyDays: [],
      monthlyDates: [],
      yearlyMonth: null,
      yearlyDate: 1,
      runTime: '',
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
    let periodParam: string[] = []

    switch (data.recurringPeriod) {
      case 'DAILY':
        // @ts-ignore
        periodParam = [data.nextRunDate] || []
        break
      case 'WEEKLY':
        periodParam = data.weeklyDays || []
        break
      case 'MONTHLY':
        periodParam =
          data.monthlyDates?.map((date: number) => date.toString()) || []
        break
      case 'YEARLY':
        if (data.yearlyMonth && data.yearlyDate) {
          periodParam = [`${data.yearlyMonth}-${data.yearlyDate}`]
        }
        break
      default:
        periodParam = []
        break
    }

    let {
      weeklyDays,
      monthlyDates,
      yearlyMonth,
      yearlyDate,
      nextRunDate,
      ...newData
    } = data
    newData = { ...newData, periodParam }
    createCampaign.mutate(
      { data: newData },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Campaign created successfully!',
            variant: 'default',
          })

          navigate('/automations')
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Failed to create campaign. Please try again.',
            variant: 'destructive',
          })
          console.error('Error creating campaign:', error)
        },
      }
    )
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Layout>
      <Layout.Header sticky className='mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card className='mx-auto p-8 '>
          <h2 className='mb-6 text-2xl font-semibold'>Create Campaign</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 '>
                {/* Left Column */}
                <div className='flex h-fit flex-col space-y-6'>
                  {/* Basic Information Section */}
                  <div className='flex-grow space-y-4'>
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
                <div className='flex h-fit flex-col space-y-6'>
                  {/* Audience Section */}
                  <div className='flex-grow space-y-4'>
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
                                // @ts-ignore
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
                      <>
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
                      </>
                    )}
                    {!watchRecurring && (
                      <FormField
                        control={form.control}
                        name='nextRunDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Run Date *</FormLabel>
                            <FormControl>
                              <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {showNextRunDate && (
                      <FormField
                        control={form.control}
                        name='runTime'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Run Time *</FormLabel>
                            <FormControl>
                              <Input type='time' {...field} />
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
                                options={daysOfWeek}
                                value={daysOfWeek.filter((day) =>
                                  // @ts-ignore
                                  field.value?.includes(day.value)
                                )}
                                onChange={(
                                  selected: MultiValue<{
                                    value: string
                                    label: string
                                  }>
                                ) =>
                                  field.onChange(
                                    selected.map((option) => option.value)
                                  )
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
                                isMulti
                                className='my-react-select-container'
                                classNamePrefix='my-react-select'
                                options={datesInMonth}
                                value={datesInMonth.filter((date) =>
                                  // @ts-ignore
                                  field.value?.includes(date.value)
                                )}
                                onChange={(
                                  selected: MultiValue<{
                                    value: number
                                    label: string
                                  }>
                                ) =>
                                  field.onChange(
                                    selected.map((option) => option.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='mt-11 flex justify-end'>
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
