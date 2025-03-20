import { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast.ts'

const RECURRING_PERIODS = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'YEARLY', label: 'Yearly' },
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

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.any(),
  phoneBooks: z.array(z.number()).min(1, 'Phone Books are required'),
  senderId: z.number().min(1, 'Sender ID is required'),
  messageTemplate: z.number().min(1, 'Message Template is required'),
  startDate: z.any().optional(),
  endDate: z.any().optional(),
  recurring: z.boolean().default(false),
  recurringPeriod: z.string().optional(),
  nextRunDate: z.any().optional(),
  isActive: z.boolean().default(true),
  weeklyDays: z.array(z.string()).optional(),
  monthlyDates: z.array(z.number()).optional(),
  yearlyMonth: z.string().optional(),
  yearlyDate: z.number().optional(),
  runTime: z.any().optional()
}).superRefine((data, ctx) => {
  if (data.recurring) {
    if (!data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start date is required for recurring campaigns',
        path: ['startDate']
      })
    }
    if (!data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date is required for recurring campaigns',
        path: ['endDate']
      })
    }
    if (!data.recurringPeriod) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Recurring period is required',
        path: ['recurringPeriod']
      })
    }

    switch (data.recurringPeriod) {
      case 'WEEKLY':
        if (!data.weeklyDays?.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Weekly days are required',
            path: ['weeklyDays']
          })
        }
        break
      case 'MONTHLY':
        if (!data.monthlyDates?.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Monthly dates are required',
            path: ['monthlyDates']
          })
        }
        break
      case 'YEARLY':
        if (!data.yearlyMonth) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Yearly month is required',
            path: ['yearlyMonth']
          })
        }
        if (!data.yearlyDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Yearly date is required',
            path: ['yearlyDate']
          })
        }
        break
      case 'DAILY':
        if (!data.runTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Run time is required for daily campaigns',
            path: ['runTime']
          })
        }
        break
    }
  } else {
    if (!data.nextRunDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Next run date is required',
        path: ['nextRunDate']
      })
    }
  }
})

export const CampaignForm = () => {
  const { user } = useAuthStore()
  const { createCampaign } = useCampaign()
  const navigate = useNavigate()
  const [selectedTemplateContent, setSelectedTemplateContent] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: null,
      phoneBooks: [],
      senderId: undefined,
      messageTemplate: undefined,
      startDate: null,
      endDate: null,
      recurring: false,
      recurringPeriod: undefined,
      nextRunDate: null,
      isActive: true,
      weeklyDays: [],
      monthlyDates: [],
      yearlyMonth: undefined,
      yearlyDate: 1,
      runTime: null,
    },
  })

  const watchRecurring = form.watch('recurring')
  const watchRecurringPeriod = form.watch('recurringPeriod')
  const watchMessageTemplate = form.watch('messageTemplate')

  const { data: phoneBooks, isLoading } = useQuery({
    queryKey: ['phone-books'],
    queryFn: async () => {
      const response: any = await contactService.getCustomerPhoneBooks({
        page: 0,
        size: 10,
      })
      return response?.content?.map((mt: any) => ({
        value: mt.id,
        label: mt.name,
      })) || []
    },
  })

  const { data: senderIds, isLoading: loadingSenderIds } = useQuery({
    queryKey: ['sender-ids'],
    queryFn: async () => {
      const response: any = await senderIdService.getCustomerSenderIds({
        page: 0,
        size: 100,
      })
      return response?.content?.map((mt: any) => ({
        value: mt.id,
        label: mt.senderId,
      })) || []
    },
  })

  const { data: messageTemplates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response = await templateService.getCustomerTemplates(
        user?.customer?.id,
        { page: 0, size: 100 }
      )
      // @ts-ignore
      return response?.map((mt: any) => ({
        value: mt.id,
        label: mt.name,
        content: mt.message,
      })) || []
    },
  })

  useEffect(() => {
    if (watchMessageTemplate && messageTemplates) {
      const template = messageTemplates.find(
        (t: any) => t.value === watchMessageTemplate
      )
      setSelectedTemplateContent(template?.content || '')
    } else {
      setSelectedTemplateContent('')
    }
  }, [watchMessageTemplate, messageTemplates])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    let periodParam: string[] = []

    switch (data.recurringPeriod) {
      case 'DAILY':
        periodParam = [data.runTime || '']
        break
      case 'WEEKLY':
        periodParam = data.weeklyDays || []
        break
      case 'MONTHLY':
        periodParam = data.monthlyDates?.map(String) || []
        break
      case 'YEARLY':
        periodParam = [`${data.yearlyMonth}-${data.yearlyDate}`]
        break
      default:
        if (!data.recurring) {
          periodParam = [data.nextRunDate || '']
        }
    }

    const payload = {
      ...data,
      periodParam: periodParam.length > 0 ? periodParam : undefined
    }

    createCampaign.mutate(
      { data: payload },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Campaign created successfully!',
          })
          navigate('/automations')
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Failed to create campaign. Please try again.',
            variant: 'destructive'
          })
          console.error('Error creating campaign:', error)
        },
      }
    )
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card className='mx-auto p-8'>
          <h2 className='mb-6 text-2xl font-semibold'>Create Campaign</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Left Column */}
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Basic Information</h3>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Content Selection</h3>
                    <FormField
                      control={form.control}
                      name='messageTemplate'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Template *</FormLabel>
                          <Select
                            isLoading={isLoadingTemplates}
                            options={messageTemplates}
                            onChange={(option: any) => {
                              console.log(option)
                              field.onChange(option?.value)
                              setSelectedTemplateContent(option?.content || '')
                            }}
                            value={messageTemplates?.find(
                              (opt: any) => opt.value === field.value
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchMessageTemplate && (
                      <FormItem>
                        <Card className='p-4 bg-muted/50'>
                          <div className='whitespace-pre-wrap text-sm'>
                            {selectedTemplateContent}
                          </div>
                        </Card>
                      </FormItem>
                    )}

                    <FormField
                      control={form.control}
                      name='senderId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender ID *</FormLabel>
                          <Select
                            isLoading={loadingSenderIds}
                            options={senderIds}
                            onChange={(option) => field.onChange(option?.value)}
                            value={senderIds?.find(
                              (opt: any) => opt.value === field.value
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Audience</h3>
                    <FormField
                      control={form.control}
                      name='phoneBooks'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Books *</FormLabel>
                          <Select
                            isMulti
                            isLoading={isLoading}
                            options={phoneBooks}
                            onChange={(options) =>
                              field.onChange(options?.map(opt => opt.value))
                            }
                            value={phoneBooks?.filter((opt: any) =>
                              field.value?.includes(opt.value)
                            )}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Schedule</h3>
                    <FormField
                      control={form.control}
                      name='recurring'
                      render={({ field }) => (
                        <FormItem className='rounded-lg border p-4'>
                          <div className='flex items-center justify-between'>
                            <div className='space-y-0.5'>
                              <FormLabel>Recurring Campaign</FormLabel>
                              <FormDescription>
                                Enable to schedule multiple runs
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />

                    {watchRecurring ? (
                      <>
                        <div className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name='startDate'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date *</FormLabel>
                                <Input type='date' {...field} />
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
                                <Input type='date' {...field} />
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
                              <Select
                                options={RECURRING_PERIODS}
                                onChange={(option) => field.onChange(option?.value)}
                                value={RECURRING_PERIODS.find(
                                  opt => opt.value === field.value
                                )}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {watchRecurringPeriod === 'WEEKLY' && (
                          <FormField
                            control={form.control}
                            name='weeklyDays'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Days of Week *</FormLabel>
                                <Select
                                  isMulti
                                  options={daysOfWeek}
                                  value={daysOfWeek.filter(opt =>
                                    field.value?.includes(opt.value))
                                  }
                                  onChange={(options) =>
                                    field.onChange(options?.map(opt => opt.value))
                                  }
                                />
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
                                <FormLabel>Monthly Dates *</FormLabel>
                                <Select
                                  isMulti
                                  options={datesInMonth}
                                  value={datesInMonth.filter(opt =>
                                    field.value?.includes(opt.value))
                                  }
                                  onChange={(options) =>
                                    field.onChange(options?.map(opt => opt.value))
                                  }
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {watchRecurringPeriod === 'YEARLY' && (
                          <div className='grid grid-cols-2 gap-4'>
                            <FormField
                              control={form.control}
                              name='yearlyMonth'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Month *</FormLabel>
                                  <Select
                                    options={MONTHS}
                                    value={MONTHS.find(
                                      opt => opt.value === field.value
                                    )}
                                    onChange={(option) => field.onChange(option?.value)}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='yearlyDate'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Day *</FormLabel>
                                  <Select
                                    options={datesInMonth}
                                    value={datesInMonth.find(
                                      opt => opt.value === field.value
                                    )}
                                    onChange={(option) => field.onChange(option?.value)}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        {watchRecurringPeriod === 'DAILY' && (
                          <FormField
                            control={form.control}
                            name='runTime'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Daily Run Time *</FormLabel>
                                <Input type='time' {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </>
                    ) : (
                      <FormField
                        control={form.control}
                        name='nextRunDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Run Date *</FormLabel>
                            <Input type='datetime-local' {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <Button
                  type='submit'
                  className='w-full md:w-auto'
                  loading={createCampaign.isPending}
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