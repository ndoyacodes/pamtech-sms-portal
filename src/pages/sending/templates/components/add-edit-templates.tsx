import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { formSchema, FormSchema } from '../data/template-form-schema'
import { useAuthStore } from '@/hooks/use-auth-store'
import { useSmsTemplate } from '@/hooks/api-hooks/message/template-hook'
import { useLocation, useNavigate } from 'react-router-dom'


const AddTemplateForm = () => {
  const [charCount, setCharCount] = useState(0);
  const location =  useLocation();
  const template =  location?.state?.record;
  const maxChars = 160
  const {user} =  useAuthStore();
  const {createTemplate, updateTemplate} = useSmsTemplate();
  const navigate =  useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: template || {
      message:'',
      messageType: "static",
      name: ""
    }
  })

  const onSubmit = (data: FormSchema) => {
    console.log('Form Submitted:', data)
    const finalData = {
      ...data,
      customerId: user?.customer?.id,
      id: template?.id
    }
    if (template) {
      updateTemplate.mutate({ id: template?.id, data: finalData })
    } else {
      createTemplate.mutate({ data: finalData })
    }
  }

  const handleNavigate = () => {
    navigate('/templates')
  }

  const isLoading = createTemplate.isPending || updateTemplate.isPending

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
        <h1 className='text-2xl font-bold'>
          {template ? 'Edit' : 'Add'} Template
        </h1>
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

        

            {/* ===== Tag ===== */}
            <FormField
              control={form.control}
              name='messageType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Tag</FormLabel>
                  <FormControl>
                      <Select
                      className="my-react-select-container"
                        classNamePrefix="my-react-select"
                      defaultValue={{ value: 'static', label: 'static' }}
                      options={[
                        { value: 'dynamic', label: 'dynamic' },
                        { value: 'static', label: 'static' },
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
            <div className='flex justify-end gap-4'>
              <Button type='submit' className='btn-primary'
                loading={isLoading}
                disabled={isLoading}
              >
                Save
              </Button>
              <Button type="button" variant="outline" onClick={handleNavigate}>
                Cancel
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
