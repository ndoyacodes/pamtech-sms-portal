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
import Select from 'react-select'
import { useQuery } from '@tanstack/react-query'
import { planService } from '@/api/services/plan/plan.service'
import { usePlan } from '@/hooks/api-hooks/plan/plan-hooks'

const formSchema = z.object({
  planId: z.number().min(1, 'Please select a plan'),
  amount: z.string().min(1, 'Please enter amount'),
})

export const CampaignBuilder: React.FC = () => {
  const { createSubscriptionPlan } = usePlan()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      planId: 0,
    },
  })

  const { data: plans, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await planService.getPlans({ page: 0, size: 10 })
      return response || []
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data)
    createSubscriptionPlan.mutate({
      data: {
        planId: data.planId,
        amount: data.amount,
      },
    })
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
        <div className='mx-auto  max-w-6xl rounded-md p-8 shadow-md'>
          <h2 className='mb-6 text-2xl font-semibold'>Top Up</h2>
          <p className='text-sm text-gray-600'>
            Add balance to your account to snd messages
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* SMS Template */}
              <FormField
                control={form.control}
                name='planId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan</FormLabel>
                    <FormControl>
                      <Select
                        className='my-react-select-container'
                        classNamePrefix='my-react-select'
                        isLoading={isLoading}
                        placeholder='Select a plan'
                        options={plans?.map((plan: any) => ({
                          value: plan.id,
                          label: `${plan.name} - ${plan.pricePerSms} TZS`,
                        }))}
                        onChange={(option) => field.onChange(option?.value)}
                        value={
                          plans?.find((plan: any) => plan.id === field.value)
                            ? {
                                value: field.value,
                                label: `${plans?.find((plan: any) => plan.id === field.value)?.name} - ${plans.find((plan: any) => plan.id === field.value)?.pricePerSms} TZS`,
                              }
                            : null
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Groups */}
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (TZS)</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter balace' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className='flex justify-end'>
                <Button
                  type='submit'
                  loading={createSubscriptionPlan.isPending}
                  disabled={createSubscriptionPlan.isPending}
                >
                  checkout
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default CampaignBuilder
