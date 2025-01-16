import {
  User,
  Building2,
  Mail,
  Globe,
  Phone,
  Languages,
  Clock,
  Shield,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/custom/button';
import { Layout } from '@/components/custom/layout';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { customerService } from '@/api/services/customers/customer.service';

// Mock customer data (replace with API call in a real application)
const mockCustomer = {
  id: '12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1 (555) 123-4567',
  companyName: 'Tech Corp Ltd.',
  website: 'https://techcorp.com',
  customerType: 'POSTPAID',
  timezone: 'UTC+3',
  language: 'English',
  countryCode: '+1',
  status: 'Active',
  kycFile: 'kyc_document.pdf',
};

const CustomerDetails = () => {
  const { id } = useParams();


  const {
    data: data,
    isLoading,
  } = useQuery({
    queryKey: ['customer-details', id],
    queryFn: () => {
      //@ts-ignore
      const response: any = customerService.getCustomerById(id)
      console.log(response);
    
      return response
    },
  })

  console.log(data);

  const customer = mockCustomer;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Customer Details</h2>
            <p className='text-muted-foreground'>
              View and manage customer information
            </p>
          </div>
          <Button variant='outline'>Edit Customer</Button>
        </div>

        <Card>
          <CardHeader>
            <h3 className='text-xl font-semibold'>
              {customer.firstName} {customer.lastName}
            </h3>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Left Column */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <User className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>First Name</p>
                  <p className='font-medium'>{customer.firstName}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <User className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Last Name</p>
                  <p className='font-medium'>{customer.lastName}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Mail className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Email</p>
                  <p className='font-medium'>{customer.email}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Phone className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Phone Number</p>
                  <p className='font-medium'>{customer.phoneNumber}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Globe className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Country Code</p>
                  <p className='font-medium'>{customer.countryCode}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <Building2 className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Company Name</p>
                  <p className='font-medium'>{customer.companyName}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Globe className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Website</p>
                  <p className='font-medium'>{customer.website}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Shield className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Account Type</p>
                  <p className='font-medium'>{customer.customerType}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Clock className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Timezone</p>
                  <p className='font-medium'>{customer.timezone}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <Languages className='h-5 w-5 text-gray-500' />
                <div>
                  <p className='text-sm text-gray-500'>Language</p>
                  <p className='font-medium'>{customer.language}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='border-t p-6'>
            <div className='flex items-center space-x-4'>
              <p className='text-sm text-gray-500'>KYC Document:</p>
              <a
                href={customer.kycFile}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                Download
              </a>
            </div>
          </CardFooter>
        </Card>
      </Layout.Body>
    </Layout>
  );
};

export default CustomerDetails;