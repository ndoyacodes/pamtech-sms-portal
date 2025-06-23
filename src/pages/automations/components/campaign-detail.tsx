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
import { useQuery } from '@tanstack/react-query'
import { campaignService } from '@/api/services/campaign/campaign.service'
import moment from 'moment'
import { DataTable } from '@/pages/messages/all/components/data-table.tsx'
import { useState } from 'react'
import { messageService } from '@/api/services/message/message.service.ts'
import { columns } from '@/pages/messages/all/components/columns.tsx'

const CampaignDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const campaign = location.state?.campaign

  const { data: logs } = useQuery({
    queryKey: ['campaign-logs', campaign?.id],
    queryFn: async () => {
      const response: any = await  campaignService.getCampaignLogsById(campaign?.id);
     
      return response || [];
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [filterParams, setFilterParams] = useState({
    filters: [
      {
        "key": "campaign.id",
        "operator": "EQUAL",
        "field_type": "STRING",
        "value": campaign.id,
        "values": [
          campaign.id
        ]
      }
    ],
    sorts: [
      {
        key: "id",
        direction: "DESC"
      }
    ],
    page: 0,
    size: 10
  })

  const { data: allSms, isLoading, refetch } = useQuery({
    queryKey: ['all-sms', pagination.pageIndex, pagination.pageSize, filterParams],
    queryFn: async () => {
      const req = {
        ...filterParams,
        page: pagination.pageIndex,
        size: pagination.pageSize
      }

      const response: any = await messageService.getMessages({ ...req })
      return (
        response || {
          content: response.content || [],
          totalElements: response?.totalElements,
        }
      )
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  const handleFilterSubmit = (filterData: any) => {
    setFilterParams(filterData);
    setPagination({
      pageIndex: 0,
      pageSize: pagination.pageSize
    });
    return refetch();
  };


  return (
    <Layout>
      <Layout.Header sticky className='mt-4 sm:mt-4 md:mt-0 lg:mt-0'>
        {/* <Search /> */}
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
              <TabsTrigger value='campaign-details'>Campaign Details</TabsTrigger>
              <TabsTrigger value='messages'>Messages</TabsTrigger>
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
                  <div className='space-y-4'>45
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
                        { campaign?.startDate && format(new Date(campaign.startDate), 'yyyy-MM-dd')}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>End Date</p>
                      <p className='text-lg'>
                        { campaign?.endDate && format(new Date(campaign.endDate), 'yyyy-MM-dd')}
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
                        {campaign.nextRun ? moment(campaign.nextRun).format('yyyy-MM-DD HH:mm:ss') : 'N/A'}
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

          <TabsContent value='messages' className='space-y-4'>
            <h1 className='mb-6 text-3xl font-bold'>Sms Log</h1>
            {/* Campaign Logs Table */}
            <div className='overflow-x-auto'>
              {
                  <DataTable
                    data={allSms?.content}
                    columns={columns}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    totalElements={allSms?.totalElements || 0}
                    onFilterSubmit={handleFilterSubmit}
                  />
              }
              {/*<DataTable columns={columns} data={data} />*/}
            </div>
          </TabsContent>

          <TabsContent value='logs' className='space-y-4'>
            <h1 className='mb-6 text-3xl font-bold'>Campaign History</h1>
            {/* Campaign Logs Table */}
            <div className='overflow-x-auto'>
              {
                isLoading ? (
                  <div className='flex h-64 items-center justify-center'>
                    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
                  </div>
                ) : logs?.length === 0 ? (
                  <p className='text-lg text-gray-500'>No logs available</p>
                ) : (
                  <table className='w-full table-auto'>
                    <thead>
                      <tr>
                        <th className='px-4 py-2 text-left'>Date</th>
                        <th className='px-4 py-2 text-left'>Run Description</th>
                        <th className='px-4 py-2 text-left'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        logs.map((log: any) => {
                          console.log(log)
                        return <tr key={log.id}>
                          <td className='px-4 py-2'>
                            {moment(log.createdAt).format('yyyy-MM-DD HH:mm:ss')}
                          </td>
                          <td className='px-4 py-2'>{log.runDescription}</td>
                          <td className='px-4 py-2'>
                            <Badge
                              variant={
                                log.status === 'COMPLETED' ? 'success' : 'destructive'
                              }
                            >
                              {log.status}
                            </Badge>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                )
                 
              }
              {/*<DataTable columns={columns} data={data} />*/}
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

export default CampaignDetailsPage
