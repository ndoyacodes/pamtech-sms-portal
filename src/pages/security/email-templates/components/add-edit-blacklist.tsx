import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

// Validation Schema
const formSchema = z.object({
  msisdn: z.string().nonempty({ message: 'Paste Numbers is required' }),
  reason: z.string().optional(),
})

// Delimiter Options
const delimiters = [
  { label: ', (Comma)', value: ',' },
  { label: '; (Semicolon)', value: ';' },
  { label: '| (Bar)', value: '|' },
  { label: 'Tab', value: '\t' },
  { label: 'New line', value: '\n' },
]

export const AddBlacklistForm = () => {
  const [selectedDelimiter, setSelectedDelimiter] = useState<string>(',')
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      msisdn: '',
      reason: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', { ...data, delimiter: selectedDelimiter })
    // Handle API submission here
  }

  const handleReset = () => {
    form.reset()
    setSelectedDelimiter(',')
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Numbers Field */}
            <FormField
              control={form.control}
              name="msisdn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paste Numbers *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your blacklist numbers here"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delimiter Options */}
            <div className="space-y-2">
              <FormLabel>Delimiter</FormLabel>
              <div className="flex flex-wrap gap-2">
                {delimiters.map((delim) => (
                  <Button
                    key={delim.value}
                    type="button"
                    variant={selectedDelimiter === delim.value ? 'default' : 'outline'}
                    onClick={() => setSelectedDelimiter(delim.value)}
                  >
                    {delim.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reason Field */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
      </Layout.Body>
    </Layout>
  )
}

export default AddBlacklistForm
