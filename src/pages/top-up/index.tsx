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
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

const formSchema = z.object({

  amount: z.string().optional(),

})

export const CampaignBuilder: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data)
    // Handle API submission
  }

  return (
    <Layout>
           {/* ===== Top Heading ===== */}
            <Layout.Header sticky>
              <Search />
              <div className='ml-auto flex items-center space-x-4'>
                <ThemeSwitch />
                <UserNav />
              </div>
            </Layout.Header>
      
            <Layout.Body>
      <div className="p-8  rounded-md shadow-md max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Top Up</h2>
        <p className="text-sm text-gray-600">
          Add balance to your account to snd messages</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Contact Groups */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (TZS)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter balace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

     
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit">checkout</Button>
            </div>
          </form>
        </Form>
      </div>
      </Layout.Body>
    </Layout>
  )
}

export default CampaignBuilder
