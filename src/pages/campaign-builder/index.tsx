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
import { contactService } from '@/api/services/contacts/contacts.service'
import { senderIdService } from '@/api/services/customers/senderid.services'
import { useQuery } from '@tanstack/react-query'
import { useSms } from '@/hooks/api-hooks/message/sms-hook'

const MESSAGE_TYPES = [
  { value: 'dynamic', label: 'dynamic' },
  { value: 'static', label: 'static' }
]

const RECIPIENT_MODES = [
  { value: 'PHONEBOOK', label: 'Phone Book' },
  { value: 'FILE', label: 'Excel File' },
  { value: 'COMMA_SEPARATED', label: 'Comma Separated Numbers' },
]

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
  commaSeparatedNumbers: z.any().optional(),
})

export const BulkSMSForm = () => {
  const {sendBulkSMS} = useSms();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderId: null,
      phonebookId: null,
      message: '',
      messageType: 'static',
      scheduled: false,
      scheduleDateTime: '',
      saveAsTemplate: false,
      recipients: '',
      recipientMode: 'PHONEBOOK',
      file: null,
      commaSeparatedNumbers: '',
    },
  })

  const watchRecipientMode = form.watch('recipientMode')
  const watchScheduled = form.watch('scheduled')

  // Rest of the queries remain the same...
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      //@ts-ignore
      form.setValue('file', file)
    }
  }

  const { data: phoneBooks, isLoading: loadingPhoneBooks } = useQuery({
    queryKey: ['phone-books'],
    queryFn: async () => {
      const response: any = await contactService.getPhoneBooks({
        page: 0,
        size: 100,
      })
      return (
        response?.content?.map((pb: any) => ({
          value: pb.id,
          label: pb.name,
        })) || []
      )
    },
  })

  const { data: senderIds, isLoading: loadingSenderIds } = useQuery({
    queryKey: ['sender-ids'],
    queryFn: async () => {
      const response: any = await senderIdService.getCustomerSenderIds({
        page: 0,
        size: 100,
      })
      return (
        response?.content?.map((sid: any) => ({
          value: sid.id,
          label: sid.senderId,
        })) || []
      )
    },
  })

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    const formData = new FormData();
  
    // Add common fields
    formData.append('senderId', data.senderId);
    formData.append('message', data.message);
    formData.append('messageType', data.messageType);
    formData.append('scheduled', data.scheduled.toString());
    formData.append('saveAsTemplate', data.saveAsTemplate.toString());
    formData.append('recipientMode', data.recipientMode);
  
    // Add schedule date time if scheduled is true
    if (data.scheduled && data.scheduleDateTime) {
      formData.append('scheduleDateTime', data.scheduleDateTime);
    }
  
    // Handle different recipient modes
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
        formData.append('commaSeparatedNumbers', data.commaSeparatedNumbers);
        formData.append('recipients', data.commaSeparatedNumbers);
        break;
    }
  
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    sendBulkSMS.mutate({data: formData});
  };

  // In your JSX, replace the recipients section with:
  const renderRecipientInput = () => {
    switch (watchRecipientMode) {
      case 'PHONEBOOK':
        return (
          <FormField
            control={form.control}
            name='phonebookId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Book *</FormLabel>
                <FormControl>
                  <Select
                    className='my-react-select-container'
                    classNamePrefix='my-react-select'
                    isLoading={loadingPhoneBooks}
                    placeholder='Select phone book'
                    options={phoneBooks}
                    onChange={(option) => field.onChange(option?.value)}
                    value={phoneBooks?.find(
                      (option: any) => option.value === field.value
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case 'FILE':
        return (
          <FormField
            control={form.control}
            name='file'
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Upload Excel File *</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='.xlsx,.xls'
                    onChange={handleFileChange}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Upload an Excel file containing phone numbers in the first
                  column
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case 'COMMA_SEPARATED':
        return (
          <FormField
            control={form.control}
            name='commaSeparatedNumbers'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Numbers *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter phone numbers separated by commas (e.g., +1234567890, +9876543210)'
                    className='h-32 resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter phone numbers in international format, separated by
                  commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      default:
        return null
    }
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
        <Card className=' mx-auto p-8'>
          <h2 className='mb-6 text-2xl font-semibold'>Send Bulk SMS</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Left Column */}
                <div className='space-y-6'>
                  {/* Sender Information */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Sender Information</h3>

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

                    <FormField
                      control={form.control}
                      name='messageType'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message Type *</FormLabel>
                          <FormControl>
                            <Select
                              className='my-react-select-container'
                              classNamePrefix='my-react-select'
                              placeholder='Select message type'
                              options={MESSAGE_TYPES}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              }
                              value={MESSAGE_TYPES.find(
                                (option) => option.value === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Recipients Section */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Recipients</h3>

                    <FormField
                      control={form.control}
                      name='recipientMode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Mode *</FormLabel>
                          <FormControl>
                            <Select
                              className='my-react-select-container'
                              classNamePrefix='my-react-select'
                              placeholder='Select recipient mode'
                              options={RECIPIENT_MODES}
                              onChange={(option) =>
                                field.onChange(option?.value)
                              }
                              value={RECIPIENT_MODES.find(
                                (option) => option.value === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {renderRecipientInput()}
                  </div>

                  {/* Scheduling Options */}
                  <div className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='scheduled'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Schedule Message
                            </FormLabel>
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
                        name='scheduleDateTime'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule Date and Time *</FormLabel>
                            <FormControl>
                              <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
                  {/* Message Content */}
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Message Content</h3>

                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Enter your message'
                              className='h-64 resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='saveAsTemplate'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Save as Template
                            </FormLabel>
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
              <div className='flex justify-end pt-4'>
                <Button type='submit' className='w-full md:w-auto'
                loading={sendBulkSMS.isPending}
                disabled={sendBulkSMS.isPending}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default BulkSMSForm
