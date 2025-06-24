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
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Select } from '@/components/ui/select'

// Validation Schema
const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  senderId: z.string().nonempty({ message: 'Sender ID is required' }),
  phoneNumbers: z.string().optional(),
  contactGroups: z.string().optional(),
  smsTemplate: z.string().nonempty({ message: 'SMS Template is required' }),
  smsType: z.string().default('Plain'),
  message: z.string().nonempty({ message: 'Message is required' }),
  scheduleBefore: z.string().nonempty({ message: 'Schedule Before is required' }),
  scheduleAt: z.string().nonempty({ message: 'Schedule At is required' }),
  timezone: z.string().nonempty({ message: 'Timezone is required' })
})

export const AutomationForm: React.FC = () => {
  // const [automationMe, setautomationMe] = useState(second)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      senderId: 'pamtech',
      phoneNumbers: '',
      contactGroups: '',
      smsTemplate: '',
      smsType: 'Plain',
      message: '',
      scheduleBefore: '0 day (on the same day)',
      scheduleAt: '10:51',
      timezone: '(GMT+03:00) Africa/Dar_es_Salaam'
    }
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data)
    // Handle API submission here
  }

  return (
    <Layout>
         <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        {/* <Search /> */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="p-8  rounded-md shadow-md max-w-7xl">
          <h2 className="text-2xl font-semibold mb-6">Say "Happy birthday"</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Required" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                {/* Sender ID Field */}
                <FormField
                  control={form.control}
                  name="senderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Numbers Field */}
                <FormField
                  control={form.control}
                  name="phoneNumbers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Numbers</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Groups Field */}
              <FormField
                control={form.control}
                name="contactGroups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Groups</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                {/* SMS Template Field */}
                <FormField
                  control={form.control}
                  name="smsTemplate"
                  render={() => (
                    <FormItem>
                      <FormLabel>SMS Template</FormLabel>
                      <FormControl>
                        <Select>
                          <option value="">Select one</option>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available Tag Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Tag</FormLabel>
                      <FormControl>
                        <Input   {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* SMS Type Field */}
              <FormField
                control={form.control}
                name="smsType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMS Type</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} />
                    </FormControl>
                    <p className="text-sm text-gray-500 text-right">160 CHARACTERS REMAINING | 1 MESSAGE (S)</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                {/* Schedule Before Field */}
                <FormField
                  control={form.control}
                  name="scheduleBefore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Before *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Schedule At Field */}
                <FormField
                  control={form.control}
                  name="scheduleAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>At *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Timezone Field */}
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-start">
                <Button type="submit">Send</Button>
              </div>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default AutomationForm