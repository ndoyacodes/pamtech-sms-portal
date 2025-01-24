import { useState } from 'react'
import { FormSchema, formSchema } from '../data/subscription-form-schema'
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

const AddEditCustomer = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null)
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
      image: imageBase64,
    }
    console.log(finalData)
    setImageBase64(null);
  }

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
            <h2 className='text-2xl font-bold tracking-tight'>New Subscription</h2>
            <p className='text-muted-foreground'>
              Fill in the form below to create new subscription
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
                {/* Customer Select Field */}
                <FormField
                  control={form.control}
                  name='customer'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <FormControl>
                          <Select
                          value={field.value}
                          onValueChange={(value: any) =>
                            form.setValue('customer', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select Customer' />
                          </SelectTrigger>
                          <SelectContent defaultValue={'customer1'}>
                            <SelectItem value='customer1'>Customer 1</SelectItem>
                            <SelectItem value='customer2'>Customer 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Plan Select Field */}
                <FormField
                  control={form.control}
                  name='plan'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <FormControl>
                          <Select
                          value={field.value}
                          onValueChange={(value: string) =>
                            form.setValue('plan', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select Plan' />
                          </SelectTrigger>
                          <SelectContent defaultValue={'basic'}>
                            <SelectItem value='basic'>Basic Plan</SelectItem>
                            <SelectItem value='premium'>Premium Plan</SelectItem>
                            <SelectItem value='pro'>Pro Plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notification Days Input Field */}
                <FormField
                  control={form.control}
                  name='notificationNumberOfDays'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Send notification (x) number of days before expiration *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                          defaultValue={10}
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                    {/* Submit Button */}
               <div className='mt-4'>
                  <Button type='submit' className='btn-primary w-full'>
                
                    Create subscription
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
