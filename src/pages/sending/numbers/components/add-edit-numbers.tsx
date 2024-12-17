import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select  as ReactSelect} from '@/components/ui/select'
import Select  from 'react-select'
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
import { useLocation } from 'react-router-dom'
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

// ===== Schema Validation =====
const formSchema = z.object({
  number: z.string().min(1, 'Number is required'),
  status: z.string().min(1, 'Status is required'),
  capabilities: z.array(z.string()).min(1, 'Select at least one capability'),
  price: z.string(),
  billing_cycle: z.string().min(1, 'Billing cycle is required'),
  customer: z.string().min(1, 'Customer is required'),
  currency: z.string().min(1, 'Currency is required'),
})

type FormSchema = z.infer<typeof formSchema>


const AddEditNumber: React.FC = () => {
    const location = useLocation();
    const initialData  = location?.state?.record;
    const mode = initialData ? 'edit' : 'add';
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: '',
      status: '',
      capabilities: [],
      price: '0',
      billing_cycle: '',
      customer: '',
      currency: 'USD',
    },
  })

  const onSubmit = (data: FormSchema) => {}

  // Set form data when editing
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.reset(initialData)
    }
  }, [mode, initialData, form])

  // Multi-select options for Capabilities
  const capabilityOptions = [
    { value: 'SMS', label: 'SMS' },
    { value: 'Voice', label: 'Voice' },
    { value: 'MMS', label: 'MMS' },
    { value: 'WhatsApp', label: 'WhatsApp' },
  ]

  return (
    <Layout>
      {/* ===== Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Header >
      <h2 className='text-2xl font-bold'>
          {mode === 'edit' ? 'Edit Number' : 'Add New Number'}
        </h2>
      </Layout.Header>
   

      <Layout.Body>
      <p>Numbers allow you to be recognisable and reachable for your Customers: provide a response option to your marketing messages, 
        <br />
        be reachable locally in another country and manage your inbound messages if your sms gateway support this feature.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* ===== Left Column ===== */}
              <div className='space-y-4'>
                {/* Number Input */}
                <FormField
                  control={form.control}
                  name='number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status Select */}
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <ReactSelect
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='Available'>Available</SelectItem>
                                <SelectItem value='Unavailable'>Unavailable</SelectItem>
                            </SelectContent>
                        </ReactSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Capabilities Multi-Select */}
                <FormField
                  control={form.control}
                  name='capabilities'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capabilities</FormLabel>
                      <FormControl>
                        <Select
                          isMulti
                          options={capabilityOptions}
                          placeholder='Select capabilities'
                          value={capabilityOptions.filter(option =>
                            field.value.includes(option.value)
                          )}
                          onChange={(selectedOptions:any) =>
                            field.onChange(selectedOptions.map((option:any) => option.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Input */}
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type='number' min='0' placeholder='Enter Price' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ===== Right Column ===== */}
              <div className='space-y-4'>
                {/* Billing Cycle */}
                <FormField
                  control={form.control}
                  name='billing_cycle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <FormControl>
                        <ReactSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select billing cycle' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Monthly'>Monthly</SelectItem>
                            <SelectItem value='Yearly'>Yearly</SelectItem>
                          </SelectContent>
                        </ReactSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Customer */}
                <FormField
                  control={form.control}
                  name='customer'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Customer</FormLabel>
                      <FormControl>
                        <ReactSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select customer' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Super Admin'>Super Admin</SelectItem>
                            <SelectItem value='Customer1'>Customer 1</SelectItem>
                            <SelectItem value='Customer2'>Customer 2</SelectItem>
                          </SelectContent>
                        </ReactSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency */}
                <FormField
                  control={form.control}
                  name='currency'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <ReactSelect
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
                        </ReactSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type='submit' className='btn-primary'>
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          </form>
        </Form>
      </Layout.Body>
    </Layout>
  )
}

export default AddEditNumber
