import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const CampaignDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const campaign = location.state?.campaign

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
        <div className='ml-auto flex items-center space-x-4'>
          <Button onClick={() => navigate('/automations')}>
            Back to Automations
          </Button>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='campaign-details'
          className='space-y-4'
        >
          <div className='mt-3 w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='campaign-details'>
                Campaign Details
              </TabsTrigger>
              <TabsTrigger value='logs'>Campaign history</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='campaign-details' className='space-y-4 '>
            <div className=' '>
              <h1 className='mb-6 text-3xl font-bold'>{campaign.name}</h1>

              {/* Campaign Details in 2x2 Grid */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                {/* Basic Information Card */}
                <div className='rounded-lg border p-6 shadow-sm'>
                  <h2 className='mb-4 text-xl font-semibold'>
                    Basic Information
                  </h2>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Description</p>
                      <p className='text-lg'>{campaign.description || 'N/A'}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Status</p>
                      <Badge
                        variant={campaign.active ? 'success' : 'destructive'}
                      >
                        {campaign.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Schedule Card */}
                <div className='rounded-lg border p-6 shadow-sm'>
                  <h2 className='mb-4 text-xl font-semibold'>Schedule</h2>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Start Date</p>
                      <p className='text-lg'>
                        {format(new Date(campaign.startDate), 'yyyy-MM-dd')}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>End Date</p>
                      <p className='text-lg'>
                        {format(new Date(campaign.endDate), 'yyyy-MM-dd')}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Recurring Period</p>
                      <p className='text-lg'>
                        {campaign.recurringPeriod || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sender and Message Card */}
                <div className='rounded-lg border p-6 shadow-sm'>
                  <h2 className='mb-4 text-xl font-semibold'>
                    Sender and Message
                  </h2>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Sender</p>
                      <p className='text-lg'>{campaign.sender || 'N/A'}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Message Template</p>
                      <p className='text-lg'>
                        {campaign.messageTemplate || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Information Card */}
                <div className='rounded-lg border p-6 shadow-sm'>
                  <h2 className='mb-4 text-xl font-semibold'>
                    Additional Information
                  </h2>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Next Run</p>
                      <p className='text-lg'>
                        {/*{campaign.nextRun ? format(new Date(campaign.nextRun), 'yyyy-MM-dd HH:mm') : 'N/A'}*/}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Recurring</p>
                      <p className='text-lg'>
                        {campaign.recurring ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='logs' className='space-y-4'>
            <h1 className='mb-6 text-3xl font-bold'>Campaign History</h1>
            {/* Campaign Logs Table */}
            <div className='overflow-x-auto'>
              {/* <DataTable columns={columns} data={data} /> */}
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table>
                <TableCaption>Showing 1 to 10 of 100 entries</TableCaption>
                <TableHead>
                  <TableRow>
                    <TableHeader>Event</TableHeader>
                    <TableHeader>Recipient</TableHeader>
                    <TableHeader>Message</TableHeader>
                    <TableHeader>Timestamp</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.event}</TableCell>
                    <TableCell>{row.recipient}</TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>{format(new Date(row.timestamp), 'yyyy-MM-dd HH:mm')}</TableCell>
                  </TableRow>
                ))} */}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

export default CampaignDetailsPage
