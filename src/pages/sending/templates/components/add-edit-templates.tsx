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
import Select from 'react-select'
import { Textarea } from '@/components/ui/textarea'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

// ===== Validation Schema =====
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  customer: z.string().min(1, 'Customer is required'),
  tag: z.string().optional(),
  message: z
    .string()
    .max(160, 'Message must be 160 characters or less')
    .min(1, 'Message is required'),
})

type FormSchema = z.infer<typeof formSchema>

const AddTemplateForm: React.FC = () => {
  const [charCount, setCharCount] = useState(0)
  const maxChars = 160

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      customer: '',
      tag: 'Phone',
      message: '',
    },
  })

  const onSubmit = (data: FormSchema) => {
    console.log('Form Submitted:', data)
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
      {/* ===== Page Title ===== */}
      <Layout.Header>
        <h1 className='text-2xl font-bold'>Add Template</h1>
      </Layout.Header>

      {/* ===== Form ===== */}
      <Layout.Body>
        <Form {...form}>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* ===== Name ===== */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder='Required' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ===== Customer ===== */}
            <FormField
              control={form.control}
              name='customer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Customer *</FormLabel>
                  <FormControl>
                    <Select
                      placeholder='Select Customer'
                      defaultValue={{ value: 'Ernest Kisingo', label: 'Ernest Kisingo' }}
                      options={[
                        { value: 'Ernest Kisingo', label: 'Ernest Kisingo' },
                        { value: 'Customer A', label: 'Customer A' },
                        { value: 'Customer B', label: 'Customer B' },
                      ]}
                      onChange={(e) => field.onChange(e?.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ===== Tag ===== */}
            <FormField
              control={form.control}
              name='tag'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Tag</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={{ value: 'Phone', label: 'Phone' }}
                      options={[
                        { value: 'Phone', label: 'Phone' },
                        { value: 'Email', label: 'Email' },
                      ]}
                      onChange={(e) => field.onChange(e?.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ===== Message ===== */}
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter message...'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                        setCharCount(e.target.value.length)
                      }}
                      maxLength={maxChars}
                    />
                  </FormControl>
                  <div className='text-sm text-gray-500'>
                    {maxChars - charCount} CHARACTERS REMAINING
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ===== Buttons ===== */}
            <div className='flex gap-4'>
              <Button type='submit' className='btn-primary'>
                Save
              </Button>
              <Button type='reset' className='btn-secondary'>
                Reset
              </Button>
            </div>
          </form>
          </div>
        </Form>
      </Layout.Body>
    </Layout>
  )
}

export default AddTemplateForm
