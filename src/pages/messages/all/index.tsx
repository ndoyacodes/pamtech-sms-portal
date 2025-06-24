import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
// import { useAuthStore } from '@/hooks/use-auth-store'
import { useQuery } from '@tanstack/react-query'
import { messageService } from '@/api/services/message/message.service'
import { useState } from 'react'

export default function FarmersPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  // Add state for filter parameters
  const [filterParams, setFilterParams] = useState({
    filters: [],
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
      <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>All messages</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of all messages
            </p>
          </div>
        </div>
        {isLoading ? (
          <div className='flex h-64 items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
          </div>
        ) : (
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable
              data={allSms?.content}
              columns={columns}
              pagination={pagination}
              onPaginationChange={setPagination}
              totalElements={allSms?.totalElements || 0}
              onFilterSubmit={handleFilterSubmit}
            />
          </div>
        )}
      </Layout.Body>
    </Layout>
  )
}