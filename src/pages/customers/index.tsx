import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/api/services/customers/customer.service'
import { useState } from 'react'

export default function FarmersPage() {
   const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
    })
    // const { user} = useAuthStore();
  const {
    data: customers,
    isLoading,
  } = useQuery({
    queryKey: ['customers', pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const response:any = await customerService.getCustomers(
        {
          page: pagination.pageIndex,
          size: pagination.pageSize,
        }
      );
      return response || [];
    },
    retry: 2,
    staleTime: 5 * 60 * 1000
  });

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Customers</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your farmers
            </p>
          </div>
        </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
         <DataTable
                      data={customers || []}
                      columns={columns}
                      pagination={pagination}
                      onPaginationChange={setPagination}
                      totalElements={customers?.totalElements || 0}
                    />
        </div>
      )}
      </Layout.Body>
    </Layout>
  )
}
