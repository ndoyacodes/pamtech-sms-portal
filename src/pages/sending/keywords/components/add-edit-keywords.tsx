import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { Textarea } from '@/components/ui/textarea'
import { Layout } from '@/components/custom/layout'
import Select  from 'react-select'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

// ===== Validation Schema =====
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  keyword: z.string().min(1, 'Keyword is required'),
  sender_id: z.string().optional(),
  reply_text: z.string().optional(),
  reply_voice: z.string().optional(),
  reply_mms: z.any().optional(),
  status: z.string().min(1, 'Status is required'),
  customer: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  currency: z.string().min(1, 'Currency is required'),
  renew: z.string().min(1, 'Renew field is required'),
})

type FormSchema = z.infer<typeof formSchema>

const KeywordForm: React.FC = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      keyword: '',
      sender_id: '',
      reply_text: '',
      reply_voice: '',
      status: '',
      customer: '',
      price: '',
      currency: 'USD',
      renew: 'Yearly',
    },
  })

  const onSubmit = (data: FormSchema) => {
    console.log('Form Data:', data)
  }

  return (
    <Layout>
      {/* ===== Page Title ===== */}
         <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Header>
        <h1 className='text-2xl font-bold'>Create New Keyword</h1>
      </Layout.Header>

      {/* ===== Form ===== */}
      <Layout.Body>
      <p className='mb-2'>
      A keyword makes it easy for subscribers to opt in to receive important messages and offers . There are no forms to fill out, apps to download, or URLs to remember. 
      <br />
      All they need to do is text your keyword to your number, and they’re in. You can assign an unique keyword to a unique user on pamtech SMS</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* ===== Title & Keyword ===== */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder='Required' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='keyword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keyword *</FormLabel>
                    <FormControl>
                      <Input placeholder='Required' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ===== Sender ID & Reply Text ===== */}
            <FormField
              control={form.control}
              name='sender_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender ID</FormLabel>
                  <FormControl>
                    <Input placeholder='Optional' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='reply_text'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reply Text For Recipient</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter reply text...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ===== Reply Voice & Reply MMS ===== */}
            <FormField
              control={form.control}
              name='reply_voice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reply Voice For Recipient</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter reply voice...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='reply_mms'
              render={() => (
                <FormItem>
                  <FormLabel>Reply MMS For Recipient</FormLabel>
                  <FormControl>
                    <Input placeholder='Choose file'  type='file'/>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ===== Status & Customer ===== */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <FormControl>
                        <Select
                      className="my-react-select-container"
                        classNamePrefix="my-react-select"
                        placeholder='Select status'
                        options={[
                          { value: 'Assigned', label: 'Assigned' },
                          { value: 'Unassigned', label: 'Unassigned' },
                        ]}
                        onChange={(e:any) => field.onChange(e?.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='customer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Customer</FormLabel>
                    <FormControl>
                        <Select
                      className="my-react-select-container"
                        classNamePrefix="my-react-select"
                        placeholder='None'
                        options={[
                          { value: 'Customer1', label: 'Customer 1' },
                          { value: 'Customer2', label: 'Customer 2' },
                        ]}
                        onChange={(e:any) => field.onChange(e?.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* ===== Price & Currency ===== */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Required' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='currency'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency *</FormLabel>
                    <FormControl>
                        <Select
                      className="my-react-select-container"
                        classNamePrefix="my-react-select"
                        defaultValue={{ value: 'USD', label: 'US Dollar (USD)' }}
                        options={[
                          { value: 'USD', label: 'US Dollar (USD)' },
                          { value: 'EUR', label: 'Euro (EUR)' },
                          { value: 'GBP', label: 'British Pound (GBP)' },
                        ]}
                        onChange={(e:any) => field.onChange(e?.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ===== Renew ===== */}
            <FormField
              control={form.control}
              name='renew'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Renew *</FormLabel>
                  <FormControl>
                      <Select
                      className="my-react-select-container"
                        classNamePrefix="my-react-select"
                      defaultValue={{ value: 'Yearly', label: 'Yearly' }}
                      options={[
                        { value: 'Monthly', label: 'Monthly' },
                        { value: 'Yearly', label: 'Yearly' },
                      ]}
                      onChange={(e:any) => field.onChange(e?.value)}
                    />
                  </FormControl>
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
        </Form>
      </Layout.Body>
    </Layout>
  )
}

export default KeywordForm
