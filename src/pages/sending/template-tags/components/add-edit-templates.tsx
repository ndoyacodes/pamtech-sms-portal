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
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Search } from '@/components/search'

// Validation schema
const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  type: z.string().nonempty({ message: 'Type is required' }),
  required: z.string().nonempty({ message: 'Required field is needed' }),
  description: z.string().optional(),
})

// Dropdown options
const typeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'date', label: 'Date' },
]

const requiredOptions = [
  { value: 'Mandatory', label: 'Mandatory' },
  { value: 'Optional', label: 'Optional' },
]

export const TemplateTagForm: React.FC = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [selectedRequired, setSelectedRequired] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      required: '',
      description: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data)
    // Add your API call or further handling here
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
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
   
      <Form {...form} >
    
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=""
        >
            <p>
        OPES SMS provides certain <b>template variables or tags</b> that you can use to personalize message content. The most
        commonly used variables include <i>first_name</i>, <i>last_name</i>, and <i>email</i>.
      </p>
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tag name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type Dropdown */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type *</FormLabel>
                <FormControl>
                  <Select
                    options={typeOptions}
                       className="my-react-select-container"
                        classNamePrefix="my-react-select"
                    placeholder="Select Type"
                    value={typeOptions.find((opt) => opt.value === field.value)}
                    onChange={(e:any) => {
                      field.onChange(e?.value)
                      setSelectedType(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Required Dropdown */}
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required *</FormLabel>
                <FormControl>
                  <Select
                    options={requiredOptions}

                       className="my-react-select-container"
                        classNamePrefix="my-react-select"
                    placeholder="Select Required Option"
                    value={requiredOptions.find(
                      (opt) => opt.value === field.value
                    )}
                    onChange={(e:any) => {
                      field.onChange(e?.value)
                      setSelectedRequired(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description (optional)"
                    {...field}
                  />
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
