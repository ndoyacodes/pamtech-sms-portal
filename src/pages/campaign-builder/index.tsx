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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Layout } from '@/components/custom/layout'

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  senderId: z.string().optional(),
  contactGroups: z.string().optional(),
  smsTemplate: z.string().optional(),
  message: z
    .string()
    .max(160, { message: 'Message cannot exceed 160 characters' })
    .nonempty({ message: 'Message is required' }),
  scheduleCampaign: z.boolean(),
  advancedOptions: z.boolean(),
})

export const CampaignBuilder: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      senderId: '',
      contactGroups: '',
      smsTemplate: '',
      message: '',
      scheduleCampaign: false,
      advancedOptions: false,
    },
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data)
    // Handle API submission
  }

  return (
    <Layout>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-md shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Campaign Builder</h2>

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

            {/* Sender ID */}
            <FormField
              control={form.control}
              name="senderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ORIGINATOR</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="OPES"
                      options={[
                        { value: 'opes', label: 'OPES' },
                        { value: 'custom', label: 'Custom' },
                      ]}
                      onChange={(option) => field.onChange(option?.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Groups */}
            <FormField
              control={form.control}
              name="contactGroups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Groups</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact groups" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SMS Template */}
            <FormField
              control={form.control}
              name="smsTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMS Template</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="Select one"
                      options={[
                        { value: 'template1', label: 'Template 1' },
                        { value: 'template2', label: 'Template 2' },
                      ]}
                      onChange={(option) => field.onChange(option?.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <div className="text-sm text-gray-600">
                    160 CHARACTERS REMAINING
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Schedule Campaign */}
            <FormField
              control={form.control}
              name="scheduleCampaign"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="ml-2">
                    Schedule campaign?{' '}
                    <span className="text-sm text-gray-600">
                      Set a specific date, time, and frequency for your campaign
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Advanced Options */}
            <FormField
              control={form.control}
              name="advancedOptions"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="ml-2">Advanced</FormLabel>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit">Send</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  )
}

export default CampaignBuilder
