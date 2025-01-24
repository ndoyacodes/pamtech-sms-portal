import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Layout } from '@/components/custom/layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { templateService } from '@/api/services/message/template.service'
import {
  AlertCircle,
  MessageSquare,
  Calendar,
  Tag,
  Building
} from 'lucide-react'
import { Button } from '@/components/custom/button'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useState } from 'react'
import DeleteDialog from '../../sender-ids/components/delete'

export const TemplateView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
const [deleteTemplate, setDeleteTemplate] = useState(false);

  const {
    data: template,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['template', id],
    queryFn: async() => {
        
        const res:any = await templateService.getTemplateById(id)


       return res;
    }
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
              <p>Error loading template details</p>
            </div>
          </Card>
        </Layout.Body>
      </Layout>
    )
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

      <Layout.Body>
        <div className='max-w-6xl space-y-6 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>{template?.name}</h1>
              <Badge variant={template?.active ? 'default' : 'secondary'}>
                {template?.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Tag className='h-5 w-5' />
                  Template Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Message Type</p>
                    <Badge variant='outline'>{template?.messageType}</Badge>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Created At</p>
                    <p className='text-sm'>
                      {format(new Date(template?.createdAt), 'PPp')}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Last Updated</p>
                    <p className='text-sm'>
                      {format(new Date(template?.updatedAt), 'PPp')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5' />
                  Message Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='whitespace-pre-wrap rounded-lg border p-4'>
                  {template?.message}
                </p>
              </CardContent>
            </Card>

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
                        {format(new Date(template?.createdAt), 'PPp')}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>Last Updated</p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(template?.updatedAt), 'PPp')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                                        <p className='text-sm text-muted-foreground'>Company Name</p>
                                        <p className='text-sm'>{template?.customer.companyName}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Name</p>
                                        <p className='text-sm'>{template?.customer.firstName} {template?.customer.lastName}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Customer Type</p>
                                        <Badge variant='outline'>{template?.customer.customerType}</Badge>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>SMS Balance</p>
                                        <p className='text-sm'>{template?.customer.smsBalance}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
          </div>

          <div className='flex justify-end space-x-4'>
            <Button 
              variant='outline'
              onClick={() => navigate(`/templates/add`, {state: {record: template}})}
            >
              Edit Template
            </Button>
            <Button variant='destructive'
            onClick={() => setDeleteTemplate(true)}
            >Delete Template</Button>
          </div>
        </div>

        {deleteTemplate && <DeleteDialog id={template?.id} name={template?.name} onClose={() =>  setDeleteTemplate(false)}/>}
      </Layout.Body>
    </Layout>
  )
}

export default TemplateView