import { useState } from 'react'
import {
  CustomerSchema,
  customerFormSchema,
} from '../data/customer-form-schema'
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
import { PasswordInput } from '@/components/custom/password-input'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { IconUserPlus } from '@tabler/icons-react'
import {
  User,
  Building2,
  Mail,
  Globe,
  Phone,
  Languages,
  Shield,
  Clock,
} from 'lucide-react'
import { useCustomer } from '@/hooks/api-hooks/customers/customer-hook'
import { CustomerData, CustomerPostData } from '../data/types'

const AddEditCustomer = ({ customer }: { customer?: CustomerData }) => {
  const { updateCustomer, createCustomer } = useCustomer()
  //@ts-ignore
  const aryIanaTimeZones = Intl.supportedValuesOf('timeZone')

  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: customer || {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      timezone: '',
      language: '',
      companyName: '',
      website: '',
      customerType: 'POSTPAID',
      countryCode: '',
      phoneNumber: '',
      status: true,
      kycFile:null ,
    },
  })

  function onSubmit(data: CustomerSchema) {
    //@ts-ignore
    const postData: CustomerPostData = {
      ...data,
      website: data.website || '',
    }

    const formData = new FormData()

    Object.entries({
      ...postData,
    }).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    if (customer) {
      updateCustomer.mutate({ id: customer?.id, data: formData })
    } else {
      createCustomer.mutate({ data: formData })
    }
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
            <h2 className='text-2xl font-bold tracking-tight'>
              {customer ? 'Edit Customer' : 'Add Customer'}
            </h2>
            <p className='text-muted-foreground'>
              {customer
                ? 'Update the customer details below'
                : 'Fill in the form below to add a new customer'}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
                {/* First Name Field */}
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-9'
                            placeholder='John'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name Field */}
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-9'
                            placeholder='Doe'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-9'
                            placeholder='your@email.com'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-9'
                            placeholder='(255) 000-0000'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country Code Field */}
                <FormField
                  control={form.control}
                  name='countryCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Code</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Globe className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input className='pl-9' placeholder='+1' {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Language Field */}
                <FormField
                  control={form.control}
                  name='language'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select language' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='en'>English</SelectItem>
                          <SelectItem value='es'>Spanish</SelectItem>
                          <SelectItem value='fr'>French</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='kycFile'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KYC Document</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type='file'
                            className='pl-9'
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Shield className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <PasswordInput
                            className='pl-9'
                            placeholder='********'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Shield className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <PasswordInput
                            className='pl-9'
                            placeholder='********'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Name Field */}
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Building2 className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-9'
                            placeholder='Your Company Ltd.'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Website Field */}
                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Globe className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            className='pl-9'
                            placeholder='https://example.com'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Customer Type Field */}
                <FormField
                  control={form.control}
                  name='customerType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select account type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='POSTPAID'>Postpaid</SelectItem>
                          <SelectItem value='PREPAID'>Prepaid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Timezone Field */}
                <FormField
                  control={form.control}
                  name='timezone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select timezone' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {aryIanaTimeZones.map((timeZone:string) => (
                            <SelectItem key={timeZone} value={timeZone}>
                              {timeZone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* KYC File Upload */}
              </div>
            </div>

            {/* Submit Button */}
            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <Button type='submit' className=''>
                {customer ? 'Update Customer' : 'Add Customer'}
                <IconUserPlus className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </form>
        </Form>
      </Layout.Body>
    </Layout>
  )
}

export default AddEditCustomer
