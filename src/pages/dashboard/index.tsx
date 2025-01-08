import { Layout } from '@/components/custom/layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
// import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { RecentSales } from './components/recent-sales'
import { Overview } from './components/overview'
import {  IconMessage, IconRosetteDiscountCheck, IconChecklist, IconBrandTelegram } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/api/services/dashboard/dashboard.service'

export default function Dashboard() {
  const { data: dashData, isLoading } = useQuery({
    queryKey: ['dashboard',],
    queryFn: async () => {
      const response: any = await dashboardService.getCustomerDashboardData()
      return response
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  console.log('dashData', dashData);
  


  if (isLoading) {
    return (
      <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
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
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              {/* <TabsTrigger value='reports'>Reports</TabsTrigger> */}
              {/* <TabsTrigger value='notifications'>Notifications</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Sms sent
                  </CardTitle>
                  <IconChecklist />

                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{dashData?.totalSmsSent}</div>
                  <p className='text-xs text-muted-foreground'>
                   total sms sent successfully
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2' >
                  <CardTitle className='text-sm font-medium'>
                    SMS balance
                  </CardTitle>
                   <IconMessage />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{dashData?.smsBalance}</div>
                  <p className='text-xs text-muted-foreground'>
                   account total sms balance
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Campaigns</CardTitle>
                  <IconBrandTelegram />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{dashData?.totalCampaigns}</div>
                  <p className='text-xs text-muted-foreground'>
                    total number of campaigns
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                  Active campaigns
                  </CardTitle>
                  <IconRosetteDiscountCheck />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{dashData?.activeCampaigns}</div>
                  <p className='text-xs text-muted-foreground'>
                    total number of active campaigns
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Custommer growth</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent sender ID requsts</CardTitle>
                  <CardDescription>
                    You made 190 sender Id this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
