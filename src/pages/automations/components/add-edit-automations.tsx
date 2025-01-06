import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { Layout } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import Select from 'react-select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useQuery } from '@tanstack/react-query';
import { contactService } from '@/api/services/contacts/contacts.service';
import { senderIdService } from '@/api/services/customers/senderid.services';
import { templateService } from '@/api/services/message/template.service';

const RECURRING_PERIODS = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'YEARLY', label: 'Yearly' },
  { value: 'CUSTOM', label: 'Custom' },
];

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  description: z.string().optional(),
  phoneBooks: z.array(z.number()).nonempty({ message: 'Phone Books are required' }),
  senderId: z.number().min(1, { message: 'Sender ID is required' }),
  messageTemplate: z.number().min(1, { message: 'Message Template is required' }),
  startDate: z.string().nonempty({ message: 'Start Date is required' }),
  endDate: z.string().nonempty({ message: 'End Date is required' }),
  recurring: z.boolean().default(false),
  recurringPeriod: z.string().optional(),
  nextRunDate: z.string().optional(),
  targetAudienceCount: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const CampaignForm = () => {
  const { user } = useAuthStore();
  const [showNextRunDate, setShowNextRunDate] = React.useState(false);

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
      targetAudienceCount: 0,
      isActive: true,
    },
  });

  const watchRecurring = form.watch('recurring');
  const watchRecurringPeriod = form.watch('recurringPeriod');

  React.useEffect(() => {
    setShowNextRunDate(watchRecurringPeriod === 'CUSTOM');
  }, [watchRecurringPeriod]);

  const { data: phoneBooks, isLoading } = useQuery({
    queryKey: ['phone-books'],
    queryFn: async () => {
      const response: any = await contactService.getPhoneBooks({
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
    // Handle API submission here
  }


  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card className=" mx-auto p-8">
          <h2 className="text-2xl font-semibold mb-6">Create Campaign</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter campaign name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter campaign description"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetAudienceCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience Count</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Content Selection Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Selection</h3>
                    
                    <FormField
                      control={form.control}
                      name="messageTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Template *</FormLabel>
                          <FormControl>
                            <Select
                              className="my-react-select-container"
                              classNamePrefix="my-react-select"
                              isLoading={isLoadingTemplates}
                              placeholder="Select message template"
                              options={messageTemplates}
                              onChange={(option) => field.onChange(option?.value)}
                              value={messageTemplates?.find((option:any) => option.value === field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="senderId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender ID *</FormLabel>
                          <FormControl>
                            <Select
                              className="my-react-select-container"
                              classNamePrefix="my-react-select"
                              isLoading={loadingSenderIds}
                              placeholder="Select sender ID"
                              options={senderIds}
                              onChange={(option) => field.onChange(option?.value)}
                              value={senderIds?.find((option:any) => option.value === field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Audience Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Audience</h3>
                    
                    <FormField
                      control={form.control}
                      name="phoneBooks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Books *</FormLabel>
                          <FormControl>
                            <Select
                              isMulti
                              className="my-react-select-container"
                              classNamePrefix="my-react-select"
                              isLoading={isLoading}
                              placeholder="Select phone books"
                              options={phoneBooks}
                              onChange={(options) => field.onChange(options?.map(opt => opt.value))}
                              //@ts-ignore
                              value={phoneBooks?.filter((option:any) => field.value?.includes(option.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Schedule Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Schedule</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="recurring"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Recurring Campaign</FormLabel>
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
                        name="recurringPeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recurring Period *</FormLabel>
                            <FormControl>
                              <Select
                                className="my-react-select-container"
                                classNamePrefix="my-react-select"
                                placeholder="Select recurring period"
                                options={RECURRING_PERIODS}
                                onChange={(option) => field.onChange(option?.value)}
                                value={RECURRING_PERIODS.find(option => option.value === field.value)}
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
                        name="nextRunDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Run Date *</FormLabel>
                            <FormControl>
                              <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Status Section - Full Width */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Campaign</FormLabel>
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
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  Create Campaign
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </Layout.Body>
    </Layout>
  );
};

export default CampaignForm;