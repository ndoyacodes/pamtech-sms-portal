import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Layout } from '@/components/custom/layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { contactService } from '@/api/services/contacts/contacts.service'
import {
  AlertCircle,
  FileSpreadsheet,
  User,
  Calendar,
  Building,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/custom/button'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export const PhonebookView = () => {
  const { id } = useParams()

  const {
    data: phonebook,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['phonebook', id],
    queryFn: () => {
      //@ts-ignore
      const response: any = contactService.getPhoneBookById(id)

      return response
    },
  })

  if (isLoading) {
    return (
      <Layout>
        <Layout.Body>
          <div className='mx-auto max-w-6xl p-6'>
            <div className='flex h-64 items-center justify-center'>
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
            </div>
          </div>
        </Layout.Body>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Layout.Body>
          <Card className='mx-auto max-w-6xl p-6'>
            <div className='flex items-center justify-center space-x-2 text-destructive'>
              <AlertCircle size={20} />
              <p>Error loading phonebook details</p>
            </div>
          </Card>
        </Layout.Body>
      </Layout>
    )
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
        <div className=' max-w-6xl space-y-6 p-6'>
          {/* Header Section */}
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>{phonebook?.name}</h1>
              <p className='text-muted-foreground'>{phonebook?.description}</p>
            </div>
            <div className='flex space-x-2'>
              <Badge variant={phonebook?.active ? 'default' : 'secondary'}>
                {phonebook?.active ? 'Active' : 'Inactive'}
              </Badge>
              {phonebook?.deleted && (
                <Badge variant='destructive'>Deleted</Badge>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* phonebook? Details */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <FileSpreadsheet className='h-5 w-5' />
                  Phonebook Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Contact Count
                    </p>
                    <p className='text-lg font-medium'>
                      {phonebook?.count.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>File Name</p>
                    <p className='truncate text-sm font-medium'>
                      {phonebook?.fileName.split('/').pop()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Created At</p>
                    <p className='text-sm'>
                      {format(new Date(phonebook?.createdAt), 'PPp')}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Last Updated
                    </p>
                    <p className='text-sm'>
                      {format(new Date(phonebook?.updatedAt), 'PPp')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Building className='h-5 w-5' />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Company</p>
                    <p className='font-medium'>
                      {phonebook?.customer.companyName}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Customer Type
                    </p>
                    <Badge variant='outline'>
                      {phonebook?.customer.customerType}
                    </Badge>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Email</p>
                    <p className='text-sm'>{phonebook?.customer.email}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Timezone</p>
                    <p className='text-sm'>{phonebook?.customer.timezone}</p>
                  </div>
                  {phonebook?.customer.website && (
                    <div className='col-span-2'>
                      <p className='text-sm text-muted-foreground'>Website</p>
                      <a
                        href={phonebook?.customer.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1 text-sm text-primary hover:underline'
                      >
                        <Globe className='h-4 w-4' />
                        {phonebook?.customer.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Created By Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  Created By
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Name</p>
                    <p className='font-medium'>{`${phonebook?.createdBy.firstName} ${phonebook?.createdBy.lastName}`}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Role</p>
                    <Badge variant='outline'>{phonebook?.createdBy.role}</Badge>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Email</p>
                    <p className='text-sm'>{phonebook?.createdBy.email}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Phone</p>
                    <p className='text-sm'>
                      {phonebook?.createdBy.phoneNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>Created</p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(phonebook?.createdAt), 'PPp')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>Last Updated</p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(phonebook?.updatedAt), 'PPp')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end space-x-4'>
            <Button variant='outline'>Download Contacts</Button>
            <Button variant='outline'>Edit Phonebook</Button>
            {!phonebook?.deleted && (
              <Button variant='destructive'>Delete Phonebook</Button>
            )}
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default PhonebookView
