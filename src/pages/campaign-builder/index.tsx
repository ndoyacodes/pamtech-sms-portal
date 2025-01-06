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
import { contactService } from '@/api/services/contacts/contacts.service';
import { senderIdService } from '@/api/services/customers/senderid.services';
import { useQuery } from '@tanstack/react-query';

const MESSAGE_TYPES = [
  { value: 'TEXT', label: 'Plain Text' },
  { value: 'UNICODE', label: 'Unicode' },
  { value: 'FLASH', label: 'Flash Message' },
];

const RECIPIENT_MODES = [
  { value: 'PHONEBOOK', label: 'Phone Book' },
  { value: 'MANUAL', label: 'Manual Entry' },
];

const formSchema = z.object({
  senderId: z.number().min(1, { message: 'Sender ID is required' }),
  phonebookId: z.number().optional(),
  message: z.string().min(1, { message: 'Message is required' }),
  messageType: z.string().min(1, { message: 'Message type is required' }),
  scheduled: z.boolean().default(false),
  scheduleDateTime: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
  recipients: z.string().optional(),
  recipientMode: z.string().min(1, { message: 'Recipient mode is required' }),
});

export const BulkSMSForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderId: null,
      phonebookId: null,
      message: '',
      messageType: 'TEXT',
      scheduled: false,
      scheduleDateTime: '',
      saveAsTemplate: false,
      recipients: '',
      recipientMode: 'PHONEBOOK',
    },
  });

  const watchScheduled = form.watch('scheduled');
  const watchRecipientMode = form.watch('recipientMode');

  const { data: phoneBooks, isLoading: loadingPhoneBooks } = useQuery({
    queryKey: ['phone-books'],
    queryFn: async () => {
      const response:any = await contactService.getPhoneBooks({
        page: 0,
        size: 100,
      });
      return response?.content?.map((pb:any) => ({
        value: pb.id,
        label: pb.name,
      })) || [];
    },
  });

  const { data: senderIds, isLoading: loadingSenderIds } = useQuery({
    queryKey: ['sender-ids'],
    queryFn: async () => {
      const response:any = await senderIdService.getCustomerSenderIds({
        page: 0,
        size: 100,
      });
      return response?.content?.map((sid:any) => ({
        value: sid.id,
        label: sid.senderId,
      })) || [];
    },
  });


  const onSubmit = (data:any) => {
    console.log('Form data:', data);
    // Handle form submission
  };

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
          <h2 className="text-2xl font-semibold mb-6">Send Bulk SMS</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Sender Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sender Information</h3>
                    
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

                    <FormField
                      control={form.control}
                      name="messageType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Type *</FormLabel>
                          <FormControl>
                            <Select
                              className="my-react-select-container"
                              classNamePrefix="my-react-select"
                              placeholder="Select message type"
                              options={MESSAGE_TYPES}
                              onChange={(option) => field.onChange(option?.value)}
                              value={MESSAGE_TYPES.find(option => option.value === field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Recipients Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recipients</h3>

                    <FormField
                      control={form.control}
                      name="recipientMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Mode *</FormLabel>
                          <FormControl>
                            <Select
                              className="my-react-select-container"
                              classNamePrefix="my-react-select"
                              placeholder="Select recipient mode"
                              options={RECIPIENT_MODES}
                              onChange={(option) => field.onChange(option?.value)}
                              value={RECIPIENT_MODES.find(option => option.value === field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchRecipientMode === 'PHONEBOOK' ? (
                      <FormField
                        control={form.control}
                        name="phonebookId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Book *</FormLabel>
                            <FormControl>
                              <Select
                                className="my-react-select-container"
                                classNamePrefix="my-react-select"
                                isLoading={loadingPhoneBooks}
                                placeholder="Select phone book"
                                options={phoneBooks}
                                onChange={(option) => field.onChange(option?.value)}
                                value={phoneBooks?.find((option:any) => option.value === field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="recipients"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipients *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter phone numbers (one per line)"
                                className="resize-none h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter phone numbers in international format, one per line
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {/* Scheduling Options */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="scheduled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Schedule Message</FormLabel>
                            <FormDescription>
                              Send this message at a later time
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

                    {watchScheduled && (
                      <FormField
                        control={form.control}
                        name="scheduleDateTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule Date and Time *</FormLabel>
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

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Message Content */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Message Content</h3>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your message"
                              className="resize-none h-64"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="saveAsTemplate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Save as Template</FormLabel>
                            <FormDescription>
                              Save this message for future use
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
                  </div>
                </div>
              </div>

              {/* Submit Button - Full Width */}
              <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </Layout.Body>
    </Layout>
  );
};

export default BulkSMSForm;