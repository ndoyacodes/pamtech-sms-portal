// import React, { useState } from 'react'
import { FormSchema, formSchema } from '../data/currency-form-schema'
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
         <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
      <div className='mb-4 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Add Currency</h2>
            <p className='text-muted-foreground'>
              Fill in the form below to create  currency
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />

              {/* Code Input Field */}
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                <Input
                  placeholder="Enter code (max 5 characters)"
                  maxLength={5}
                  {...field}
                />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />

              {/* Format Input Field */}
              <FormField
                control={form.control}
                name='format'
                render={({ field }) => (
                <FormItem>
                <FormLabel>Format</FormLabel>
                <FormControl>
                <Input placeholder="Enter format" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className='mt-4'>
                <Button type='submit' className='btn-primary w-full'>
                Create currency
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
