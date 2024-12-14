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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

const AddEditCustomer = () => {
  // const [imageBase64, setImageBase64] = useState<string | null>(null)
  // const mode = 'add'
  // const handleImageChange = (file: File) => {
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     if (reader.result) {
  //       setImageBase64(reader.result.toString())
  //     }
  //   }
  //   reader.readAsDataURL(file)
  // }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: FormSchema) {
    const finalData = {
      ...data,
    }
    console.log(finalData)
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
      <div className='mb-4 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Add New Sender ID</h2>
            <p className='text-muted-foreground'>
            Sender ID is what appears on people's phones to show who the SMS is from.
             It can be your Brand Name or Company Name. 
             Set Price value 0 for free of cost sender id on OPES SMS
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
                name='senderID'
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

              {/* Code Input Field */}
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder='Select billing cycle' />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value='active'>Active</SelectItem>
                      <SelectItem value='payment_required'>Payment required</SelectItem>
                      </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />

                {/* Billing Cycle Select Field */}
                <FormField
                  control={form.control}
                  name='billing_cycle'
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
                      <SelectItem value='monthly'>Monthly</SelectItem>
                      <SelectItem value='yearly'>Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />


                {/* Currency Select Field */}
                <FormField
                  control={form.control}
                  name='currency'
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder='Select currency' />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value='USD'>USD</SelectItem>
                      <SelectItem value='EUR'>EUR</SelectItem>
                      <SelectItem value='GBP'>GBP</SelectItem>
                      </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />


              {/* Format Input Field */}
              <FormField
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
              />

              {/* Submit Button */}
              <div className='mt-4'>
                <Button type='submit' className='btn-primary w-full'>
                Create Sender ID
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
