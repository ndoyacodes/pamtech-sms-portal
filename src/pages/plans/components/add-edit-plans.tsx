import React, { useState } from 'react'
import { FormSchema, formSchema } from '../data/plans-form-schema'
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
import { IconUserPlus } from '@tabler/icons-react'
import { Checkbox } from '@/components/ui/checkbox'

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
            <h2 className='text-2xl font-bold tracking-tight'>Add New Plan</h2>
            <p className='text-muted-foreground'>
              Fill in the form below to create new plan
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
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl >
                    <Input placeholder="Enter plan name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                {/* Price Input Field */}
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                {/* Billing Cycle Select Field */}
                <FormField
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

                {/* Boolean Fields */}
                <div className='space-y-4'>
                  <FormField
                  control={form.control}
                  name='showInCustomer'
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                    <FormControl>
                    <Checkbox id="terms"  checked={field.value}
                      onChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Show in Customer Portal</FormLabel>
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name='billingInfoRequired'
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                    <FormControl>
                    <Checkbox id="terms"  checked={field.value}
                      onChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>Billing Info Required</FormLabel>
                     
                    </FormItem>
                  )}
                  />
                  <p>Ask for tax billing information when subscribing to the plan</p>

                  <FormField
                  control={form.control}
                  name='isPopular'
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                    <FormControl>
                    <Checkbox id="terms"  checked={field.value}
                      onChange={field.onChange}/>
                  
                    </FormControl>
                    <FormLabel>Mark as Popular Plan</FormLabel>
                    </FormItem>
                  )}
                  />
                </div>

                {/* Submit Button */}
                <div className='mt-4'>
                  <Button type='submit' className='btn-primary w-full'>
                  Create Plan
                  <IconUserPlus className='ml-2 h-4 w-4' />
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
