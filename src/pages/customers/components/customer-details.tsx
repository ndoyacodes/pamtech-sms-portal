import {
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Languages,
  Mail,
  Shield,
  Wallet,
} from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/api/services/customers/customer.service'
import { format } from 'date-fns'
import { Search } from '@/components/search'
import { useState } from 'react'
import CustomerApprovalModal from './cusstomer-approval-modal'
import PDFViewerModal from './kyc-view-doc'
import GenerateInvoice from './generate-invoice'

const CustomerDetails = () => {
  const { id } = useParams()
  const [approveModal, setApproveModal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [openKycFile, setOpenKycFile] = useState(false)
  const [invoiceModal, setInvoiceModal] = useState(false)
  const navigate = useNavigate()

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer-details', id],
    queryFn: () => customerService.getCustomerById(id),
  })

  const handleCloseApprovalModal = () => {
    setApproveModal(false)
  }

  const handleCloseRejectModal = () => {
    setRejectModal(false)
  }

  if (isLoading) {
    return (
      <Layout>
        <Layout.Header sticky className='mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body>
          <div className='flex h-64 items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
          </div>
        </Layout.Body>
      </Layout>
    )
  }

  return (
    <Layout>
      <Layout.Header sticky className='mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Customer Details
            </h2>
            <p className='text-muted-foreground'>
              View and manage customer information
            </p>
          </div>
          <div className='flex gap-2'>
            {(customer?.approvalStatus !== 'PENDING' && customer?.customerType === 'POSTPAID') &&
              <>
                <Button variant="default" onClick={() => setInvoiceModal(true)}
                >Generate Invoice</Button>
              </>
          }

            <Button variant='outline'
              onClick={() => {
                navigate(`/customers/add`, { state: { record: customer } })
              }}
            >Edit Customer</Button>

            {customer?.approvalStatus === 'PENDING' && (
              <>
                <Button variant='default' onClick={() => setApproveModal(true)}>
                  Approve
                </Button>
                <Button
                  onClick={() => setRejectModal(true)}
                  variant={'destructive'}
                >
                  Reject
                </Button>
              </>
            )}
            {customer?.approvalStatus === 'PENDING' && (
              <>
                <Button
                  variant='destructive'
                  onClick={() => setRejectModal(true)}
                >
                  Revoke
                </Button>
              </>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-semibold'>
                {customer?.firstName} {customer?.lastName}
              </h3>
              <div className='flex items-center gap-2'>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    customer?.status
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {customer?.status ? 'Active' : 'Inactive'}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-sm ${
                    customer?.approvalStatus === 'APPROVED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {customer?.approvalStatus}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Personal Information */}
            <div className='space-y-4'>
              <h4 className='mb-4 font-semibold'>Personal Information</h4>
              <div className='flex items-center space-x-4'>
                <Mail className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Email</p>
                  <p className='font-medium'>{customer?.email}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Building2 className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Company Name</p>
                  <p className='font-medium'>{customer?.companyName}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Globe className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Website</p>
                  <p className='font-medium'>{customer?.website}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Languages className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Language</p>
                  <p className='font-medium'>
                    {customer?.language?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Clock className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Timezone</p>
                  <p className='font-medium'>{customer?.timezone}</p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className='space-y-4'>
              <h4 className='mb-4 font-semibold'>Account Information</h4>
              <div className='flex items-center space-x-4'>
                <Shield className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Customer Type</p>
                  <p className='font-medium'>
                    {customer?.customerType || 'Not specified'}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Wallet className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>SMS Balance</p>
                  <p className='font-medium'>{customer?.smsBalance}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <CheckCircle className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Pending SMS</p>
                  <p className='font-medium'>
                    {customer?.hasPendingSMS ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Calendar className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Created At</p>
                  <p className='font-medium'>
                    {format(new Date(customer?.createdAt), 'PPpp')}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Calendar className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Last Updated</p>
                  <p className='font-medium'>
                    {format(new Date(customer?.updatedAt), 'PPpp')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='border-t p-6'>
            <div className='flex items-center space-x-4'>
              <FileText className='h-5 w-5 text-gray-500' />
              <p className='text-sm text-gray-500'>KYC Document:</p>
              <div
                onClick={() => setOpenKycFile(true)}
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                Open
              </div>
            </div>

            {customer?.remarks && (
              <div className='mt-4'>
                <p className='text-sm text-gray-500'>Remarks:</p>
                <p className='mt-1'>{customer?.remarks}</p>
              </div>
            )}
          </CardFooter>
        </Card>
      </Layout.Body>
      {approveModal && (
        <CustomerApprovalModal
          customerId={customer?.id}
          onClose={() => setApproveModal(false)}
          actionType={'APPROVE'}
        />
      )}
      {approveModal && (
        <CustomerApprovalModal
          customerId={customer?.id}
          actionType={'APPROVE'}
          onClose={handleCloseApprovalModal}
        />
      )}
      {rejectModal && (
        <CustomerApprovalModal
          customerId={customer?.id}
          actionType={'REJECT'}
          onClose={handleCloseRejectModal}
        />
      )}

      {openKycFile && (
        <PDFViewerModal
          isOpen={openKycFile}
          onClose={() => setOpenKycFile(false)}
          title={customer?.firstName}
        />
      )}

      {invoiceModal && (
        <GenerateInvoice
          isOpen={invoiceModal}
          onClose={() => setInvoiceModal(false)}
          title={ `Generate invoice for ${customer?.firstName}` }
          customer={customer}
        />
      )}
    </Layout>
  )
}

export default CustomerDetails
