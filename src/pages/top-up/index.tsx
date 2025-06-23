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

  // Watch the `planId` and `amount` fields
  const selectedPlanId = form.watch('planId')
  const amount = form.watch('amount')

  // Fetch plans
  const { data: plans, isLoading: isPlansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await planService.getPlans({ page: 0, size: 10 })
      return response || []
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  // Find the selected plan
  const selectedPlan = plans?.find((plan: any) => plan.id === selectedPlanId)

  // Calculate the number of SMS (default to 0 if no plan or amount is selected)
  const numberOfSms =
    selectedPlan && amount
      ? Math.floor(Number(amount) / selectedPlan.pricePerSms)
      : 0

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
         <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mx-auto max-w-6xl rounded-md p-8 shadow-md'>
          <h2 className='mb-6 text-2xl font-semibold'>Top Up</h2>
          <p className='text-sm text-gray-600'>
            Add balance to your account to send messages
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Plan Selection */}
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
                        isLoading={isPlansLoading}
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

              {/* Amount Input */}
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (TZS)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter amount'
                        {...field}
                        type='number' // Ensure the input is a number
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display Number of SMS (always displayed, defaults to 0) */}
              <div className='mt-4'>
                <p className='text-sm text-gray-600'>
                  Number of SMS: <strong>{numberOfSms}</strong>
                </p>
              </div>

              {/* Submit Button */}
              <div className='flex justify-end'>
                <Button
                  type='submit'
                  loading={createSubscriptionPlan.isPending}
                  disabled={createSubscriptionPlan.isPending}
                >
                  Checkout
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