import React, { useState } from 'react'
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
import { Layout } from '@/components/custom/layout'
import { Switch } from '@/components/ui/switch'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  sendWelcomeMessage: z.boolean().default(false),
  sendUnsubscribeNotification: z.boolean().default(false),
})

export const NewContactGroupForm: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sendWelcomeMessage: true,
      sendUnsubscribeNotification: true,
    },
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data)
    // Handle API submission here
  }

  return (
    <Layout>
       {/* ===== Top Heading ===== */}
          <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-md shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">New Contact Group</h2>

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
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Settings Section */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
              <h3
                className="text-lg font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => setIsSettingsOpen((prev) => !prev)}
              >
                SETTINGS
              </h3>
              {isSettingsOpen && (
                <div className="mt-4 space-y-4">
                  {/* Send Welcome Message */}
                  <FormField
                    control={form.control}
                    name="sendWelcomeMessage"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Send welcome message?</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Send Unsubscribe Notification */}
                  <FormField
                    control={form.control}
                    name="sendUnsubscribeNotification"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>
                          Send unsubscribe notification to subscribers?
                        </FormLabel>
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
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
      </Layout.Body>
    </Layout>
  )
}

export default NewContactGroupForm
