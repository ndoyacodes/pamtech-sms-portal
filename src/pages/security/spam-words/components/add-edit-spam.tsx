import React from 'react'
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
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Search } from '@/components/search'

// Validation schema
const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
})


export const TemplateTagForm: React.FC = () => {


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data)
    // Add your API call or further handling here
  }

  return (
    <Layout>
           <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      {/* ===== Page Title ===== */}
      <Layout.Header>
        <h1 className='text-2xl font-bold'>Add SPam Word</h1>
      </Layout.Header>

      {/* ===== Form ===== */}
      <Layout.Body>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
   
      <Form {...form} >
    
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
        >
        
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spam word *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tag name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      
          {/* Submit Button */}
          <div className="mt-3">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
      </div>
      </Layout.Body>
    </Layout>
  )
}

export default TemplateTagForm
