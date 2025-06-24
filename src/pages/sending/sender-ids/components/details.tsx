import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
// import { format } from 'date-fns'
import { Layout } from '@/components/custom/layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { senderIdService } from '@/api/services/customers/senderid.services'
import {
    AlertCircle,
    Building,
    User,
    Tag,
} from 'lucide-react'
import { Button } from '@/components/custom/button'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useState } from 'react'
import DeleteDialog from './delete'

export const SenderIdDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [deleteSenderId, setDeleteSenderId] = useState(false)

    const {
        data: senderId,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['senderId', id],
        queryFn: async () => {
            const res: any = await senderIdService.getSenderIdById(id)
            return res
        }
    })

    if (isLoading) {
        return (
            <Layout>
                     <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
                {/* <Search /> */}
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

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
                     <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
                {/* <Search /> */}
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>
                <Layout.Body>
                    <Card className='mx-auto max-w-6xl p-6'>
                        <div className='flex items-center justify-center space-x-2 text-destructive'>
                            <AlertCircle size={20} />
                            <p>Error loading sender ID details</p>
                        </div>
                    </Card>
                </Layout.Body>
            </Layout>
        )
    }

    return (
        <Layout>
               <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
                {/* <Search /> */}
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className='max-w-6xl space-y-6 p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-2xl font-bold'>{senderId?.senderId}</h1>
                            <div className='flex space-x-2'>
                                <Badge variant={senderId?.status ? 'default' : 'secondary'}>
                                    {senderId?.status ? 'Active' : 'Inactive'}
                                </Badge>
                                <Badge variant={senderId?.approvalStatus === 'APPROVED' ? 'success' : 'destructive'}>
                                    {senderId?.approvalStatus}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <Tag className='h-5 w-5' />
                                    Sender ID Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Billing Cycle</p>
                                        <Badge variant='outline'>{senderId?.billingCycle}</Badge>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Price</p>
                                        <p className='text-sm'>{senderId?.price.toFixed(2)} USD</p>
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
                                        <p className='text-sm'>{senderId?.customer.companyName}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Website</p>
                                        <p className='text-sm'>{senderId?.customer.website}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Customer Type</p>
                                        <Badge variant='outline'>{senderId?.customer.customerType}</Badge>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>SMS Balance</p>
                                        <p className='text-sm'>{senderId?.customer.smsBalance}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <User className='h-5 w-5' />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Name</p>
                                        <p className='text-sm'>{`${senderId?.customer.firstName} ${senderId?.customer.lastName}`}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Email</p>
                                        <p className='text-sm'>{senderId?.customer.email}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>Timezone</p>
                                        <p className='text-sm'>{senderId?.customer.timezone}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className='flex justify-end space-x-4'>
                        <Button 
                            variant='outline'
                            onClick={() =>  navigate(`/sender-ids/add/`, { state: { record: senderId } })}
                        >
                            Edit Sender ID
                        </Button>
                        <Button 
                            variant='destructive'
                            onClick={() => setDeleteSenderId(true)}
                        >
                            Delete Sender ID
                        </Button>
                    </div>
                </div>

                {deleteSenderId && (
                    <DeleteDialog 
                        id={senderId?.id} 
                        name={senderId?.senderId} 
                        onClose={() => setDeleteSenderId(false)}
                    />
                )}
            </Layout.Body>
        </Layout>
    )
}

export default SenderIdDetails;