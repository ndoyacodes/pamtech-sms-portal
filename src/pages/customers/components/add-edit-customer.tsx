import React, { useState } from 'react'
import { FormSchema, formSchema } from '../data/customer-form-schema'
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

const AddEditCustomer = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const mode = 'add'
  const handleImageChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        setImageBase64(reader.result.toString())
      }
    }
    reader.readAsDataURL(file)
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(data: FormSchema) {
    const finalData = {
      ...data,
      image: imageBase64,
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
            <h2 className='text-2xl font-bold tracking-tight'>Add customer</h2>
            <p className='text-muted-foreground'>
              Fill in the form below to add a new customer
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
                {/* {imageBase64 && <img src={imageBase64} alt="Uploaded" style={{ marginTop: 10, maxWidth: '100%'  }} />} */}
                {/* First Name Field */}
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter First Name' {...field} />
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
                        <Input placeholder='Enter Last Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Email' {...field} />
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
                        <Input placeholder='Enter Phone Number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sex Select Field */}
                <FormField
                  control={form.control}
                  name='language'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: any) =>
                            form.setValue('language', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select Language' />
                          </SelectTrigger>
                          <SelectContent defaultValue={'English'}>
                            <SelectItem value='English'>English</SelectItem>
                            <SelectItem value='Swahili'>Swahili</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder='********' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder='********' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Input
                          placeholder='Enter First Name'
                          type='file'
                          onChange={(e) =>
                            //@ts-ignore
                            handleImageChange(e?.target?.files[0])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ID Type Select Field */}
                <FormField
                  control={form.control}
                  name='timezone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: any) =>
                            form.setValue('timezone', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select Timezone' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='UTC' defaultChecked>UTC</SelectItem>
                            <SelectItem value='UTC+3'>
                              UTC+3 (East Africa Time)
                            </SelectItem>
                            <SelectItem value='UTC+1'>
                              UTC+1 (Central European Time)
                            </SelectItem>
                            <SelectItem value='UTC+2'>
                              UTC+2 (Eastern European Time)
                            </SelectItem>
                            <SelectItem value='UTC-5'>
                              UTC-5 (Eastern Time)
                            </SelectItem>
                            <SelectItem value='UTC-8'>
                              UTC-8 (Pacific Time)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='sendEmail'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <input
                          type='checkbox'
                          checked={field.value}
                          onChange={field.onChange}
                          className='h-4 w-4 rounded border-gray-300'
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>Send Email</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

             
              </div>
                 {/* Submit Button */}
                 <div className='mt-4'>
                  <Button type='submit' className='btn-primary w-full'>
                
                    Add Customer
                    <IconUserPlus className='ml-2 h-4 w-4' />
                  </Button>
                </div>
            </div>
          </form>
        </Form>
      </Layout.Body>
    </Layout>
  )
}

export default AddEditCustomer
