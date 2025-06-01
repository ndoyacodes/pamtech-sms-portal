// import React, { useState } from 'react'
import { FormSchema, formSchema } from '../data/sender-id-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useSenderId } from '@/hooks/api-hooks/customers/senderid-hook'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const AddEditCustomer = () => {
 const { createSenderId, updateSenderId} = useSenderId();
 const location =  useLocation();
 const senderId = location?.state?.record;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: senderId || {
      billingCycle:"CUSTOM",
      senderId:senderId?.senderId || "",
      price:0
    }
  })

  useEffect(() => {
    form.setValue('name', senderId?.senderId)
  }, [senderId])

  function onSubmit(data: FormSchema) {
    const finalData = {
      ...data,
      price:0,
      billingCycle:"CUSTOM",
    }
    if (senderId) {
      updateSenderId.mutate({ id: senderId?.id, data: {...finalData, id:senderId?.id} })
    } else {
      createSenderId.mutate({ data: finalData })
    }
  }

  const isLoading = createSenderId.isPending || updateSenderId.isPending

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
         <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
      <div className='mb-4 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{senderId? "Edit Sender ID": "Add New Sender ID"}</h2>
            <p className='text-muted-foreground'>
            Sender ID is what appears on people's phones to show who the SMS is from.
            <br />
             It can be your Brand Name or Company Name. 
             Set Price value 0 for free of cost sender id on pamtech SMS
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
              {/* Name Input Field */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                <FormItem>
                <FormLabel>Sender ID'</FormLabel>
                <FormControl>
                <Input placeholder="Enter Sender ID'" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />

            
                {/* Billing Cycle Select Field */}
                {/* <FormField
                  control={form.control}
                  name='billingCycle'
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycle</FormLabel>
                    <FormControl>
                      <Select
                      
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder='Select billing cycle' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='DAILY'>Daily</SelectItem>
                        <SelectItem value='WEEKLY'>Weekly</SelectItem>
                        <SelectItem value='MONTHLY'>Monthly</SelectItem>
                        <SelectItem value='YEARLY'>Yearly</SelectItem>
                        <SelectItem value='CUSTOM'>Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                /> */}


              {/* Format Input Field */}
              {/* <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                <Input placeholder="Enter Price" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              /> */}

              {/* Submit Button */}
              <div className='mt-4'>
                <Button type='submit' className='btn-primary w-full'
                loading={isLoading}
                disabled={isLoading}
                >{senderId? "Edit Sender ID": "Create Sender ID"}
                </Button>
              </div>
              </div>
            </div>
           
          </form>
        </Form>
      </Layout.Body>
    </Layout>
  )
}

export default AddEditCustomer
