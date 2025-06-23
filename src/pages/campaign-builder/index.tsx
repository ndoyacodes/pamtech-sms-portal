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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { contactService } from '@/api/services/contacts/contacts.service';
import { senderIdService } from '@/api/services/customers/senderid.services';
import { useQuery } from '@tanstack/react-query';
import { useSms } from '@/hooks/api-hooks/message/sms-hook';
import { templateService } from '@/api/services/message/template.service';
import { useAuthStore } from '@/hooks/use-auth-store';
import React, { useEffect } from 'react';
import Select from 'react-select'

// Constants
const RECIPIENT_MODES = [
  { value: 'PHONEBOOK', label: 'Phone Book' },
  { value: 'FILE', label: 'Excel File' },
  { value: 'COMMA_SEPARATED', label: 'Comma Separated' },
];

// Form Schema
const formSchema = z.object({
  senderId: z.number().min(1, { message: 'Sender ID is required' }),
  phonebookId: z.any().optional(),
  message: z.string().min(1, { message: 'Message is required' }),
  messageType: z.string().min(1, { message: 'Message type is required' }),
  scheduled: z.boolean().default(false),
  scheduleDateTime: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
  recipients: z.string().optional(),
  recipientMode: z.string().min(1, { message: 'Recipient mode is required' }),
  file: z.any().optional(),
  commaSeparatedNumbers: z.string().optional(),
  messageTemplate: z.number().optional(),
  useTemplate: z.boolean().default(false),
});

export const BulkSMSForm = () => {
  const { sendBulkSMS } = useSms();
  const { user } = useAuthStore();

  // Form Initialization
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderId: undefined,
      phonebookId: undefined,
      message: '',
      messageType: 'static',
      scheduled: false,
      scheduleDateTime: '',
      saveAsTemplate: false,
      recipients: '',
      recipientMode: 'PHONEBOOK',
      file: null,
      commaSeparatedNumbers: '',
      messageTemplate: undefined,
      useTemplate: false,
    },
  });

  // Watchers
  const watchRecipientMode = form.watch('recipientMode');
  const watchScheduled = form.watch('scheduled');
  const watchUseTemplate = form.watch('useTemplate');
  const selectedTemplateId = form.watch('messageTemplate');

  // Fetch Phone Books
  const { data: phoneBooks, isLoading: loadingPhoneBooks } = useQuery({
    queryKey: ['phone-books'],
    queryFn: async () => {
      const response = await contactService.getCustomerPhoneBooks({ page: 0, size: 100 });
      // @ts-ignore
      return response?.content?.map((pb: any) => ({ value: pb.id, label: pb.name })) || [];
    },
  });

  // Fetch Sender IDs
  const { data: senderIds, isLoading: loadingSenderIds } = useQuery({
    queryKey: ['sender-ids'],
    queryFn: async () => {
      const response = await senderIdService.getCustomerSenderIds({ page: 0, size: 100 });
      // @ts-ignore
      return response?.content?.map((sid: any) => ({ value: sid.id, label: sid.senderId })) || [];
    },
  });

  // Fetch Message Templates
  const { data: messageTemplates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response = await templateService.getCustomerTemplates(user?.customer?.id, { page: 0, size: 100 });
      // @ts-ignore
      return response?.map((mt: any) => ({ value: mt.id, label: mt.name, message: mt.message })) || [];
    },
  });

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // @ts-ignore
      form.setValue('file', file);
    }
  };

  // Auto-Update Message Field When Template Changes
  useEffect(() => {
    if (watchUseTemplate && selectedTemplateId && messageTemplates) {
      const selectedTemplate = messageTemplates.find((t: any) => t.value === selectedTemplateId);
      if (selectedTemplate) {
        form.setValue('message', selectedTemplate.message);
      }
    }
  }, [selectedTemplateId, messageTemplates, form, watchUseTemplate]);

  // Form Submission
  const onSubmit = (data: any) => {
    const formData = new FormData();

    // Append common fields
    formData.append('senderId', data.senderId);
    formData.append('message', data.message);
    formData.append('messageType', data.messageType);
    formData.append('scheduled', data.scheduled.toString());
    formData.append('saveAsTemplate', data.saveAsTemplate.toString());
    formData.append('recipientMode', data.recipientMode);

    // Append schedule date time if scheduled
    if (data.scheduled && data.scheduleDateTime) {
      formData.append('scheduleDateTime', data.scheduleDateTime);
    }

    // Handle recipient mode
    switch (data.recipientMode) {
      case 'PHONEBOOK':
        formData.append('phonebookId', data.phonebookId);
        formData.append('recipients', data.phonebookId);
        break;
      case 'FILE':
        if (data.file) {
          formData.append('file', data.file);
          formData.append('recipients', data.file);
        }
        break;
      case 'COMMA_SEPARATED':
        formData.append('recipients', data.commaSeparatedNumbers);
        break;
    }

    // Send bulk SMS
    sendBulkSMS.mutate({ data: formData });
  };

  // Render Recipient Input Based on Mode
  const renderRecipientInput = () => {
    switch (watchRecipientMode) {
      case 'PHONEBOOK':
        return (
          <FormField
            control={form.control}
            name="phonebookId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Book *</FormLabel>
                <FormControl>
                  <Select
                    isLoading={loadingPhoneBooks}
                    isMulti
                    placeholder="Select phone book"
                    options={phoneBooks}
                    onChange={(options) => field.onChange(options?.map((opt: any) => opt.value))}
                    // @ts-ignore
                    value={phoneBooks?.filter((option: any) => field.value?.includes(option.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'FILE':
        return (
          <FormField
            control={form.control}
            name="file"
            // @ts-ignore
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1">
                  <FormLabel className="m-0">Upload Excel File *</FormLabel>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1Y1JNJ5d7wCyQB21gvAdwLJkGscxQR6KWkpQUkn733mY/export?format=xlsx&id=1Y1JNJ5d7wCyQB21gvAdwLJkGscxQR6KWkpQUkn733mY&gid=0"
                    download="SampleTemplate.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Download Excel Template
                  </a>
                </div>
                <FormControl>
                  <Input  className= "bg-white" type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                </FormControl>
                <FormDescription>
                  Upload an Excel file containing phone numbers in the first column.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'COMMA_SEPARATED':
        return (
          <FormField
            control={form.control}
            name="commaSeparatedNumbers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Numbers *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="+255 123 123 123 , +255 123 123 123, +255 123 123 123 , +255 123 123 123"
                    className="h-32 resize-none bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter phone numbers in international format, separated by commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Layout.Header sticky className="mt-4 lg:mt-0 md:mt-0 sm:mt-4">
      {/* <Search /> */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card className="w-full h-screen p-8 overflow-auto">
          <h2 className="mb-6 text-2xl font-semibold">Quick Send</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
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
                              isLoading={loadingSenderIds}
                              placeholder="Select sender ID"
                              options={senderIds}
                              onChange={(option: any) => field.onChange(option?.value)}
                              value={senderIds?.find((option: any) => option.value === field.value)}
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
                            <div className="flex flex-col space-y-2">
                              {RECIPIENT_MODES.map((mode) => (
                                <label key={mode.value} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value={mode.value}
                                    checked={field.value === mode.value}
                                    onChange={() => field.onChange(mode.value)}
                                    className="form-radio"
                                  />
                                  <span>{mode.label}</span>
                                </label>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {renderRecipientInput()}
                  </div>

                  {/* Scheduling Options */}
                  <div className="space-y-4">
                    {/*<FormField
                      control={form.control}
                      name="scheduled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Schedule Message</FormLabel>
                            <FormDescription>Send this message at a later time.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />*/}
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
                      name="useTemplate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Use Predefined Template</FormLabel>
                            <FormDescription>Select a predefined template for your message.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {watchUseTemplate && (
                      <FormField
                        control={form.control}
                        name="messageTemplate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message Template *</FormLabel>
                            <Select
                              isLoading={isLoadingTemplates}
                              options={messageTemplates}
                              onChange={(option: any) => field.onChange(option?.value)}
                              value={messageTemplates?.find((opt: any) => opt.value === field.value)}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className="h-48 md:h-64 resize-y bg-white"
                              {...field}
                              disabled={watchUseTemplate}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/*<FormField*/}
                    {/*  control={form.control}*/}
                    {/*  name="saveAsTemplate"*/}
                    {/*  render={({ field }) => (*/}
                    {/*    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">*/}
                    {/*      <div className="space-y-0.5">*/}
                    {/*        <FormLabel className="text-base">Save as Template</FormLabel>*/}
                    {/*        <FormDescription>Save this message for future use.</FormDescription>*/}
                    {/*      </div>*/}
                    {/*      <FormControl>*/}
                    {/*        <Switch checked={field.value} onCheckedChange={field.onChange} />*/}
                    {/*      </FormControl>*/}
                    {/*    </FormItem>*/}
                    {/*  )}*/}
                    {/*/>*/}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full md:w-auto" loading={sendBulkSMS.isPending}>
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