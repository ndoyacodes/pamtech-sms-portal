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
import {  IconUserCog, IconMessage, IconRosetteDiscountCheck, IconChecklist } from '@tabler/icons-react'
// import useIsAuthenticated from '@/hooks/use-is-authenticated'
// import useAuthentication from '@/hooks/use-authentication'
import useToken from '@/hooks/use-token'

export default function Dashboard() {
  // const navigate = useNavigate();

  const [token, setToken] = useToken('jwtToken', null);

  // const [isAuthenteticated] = useIsAuthenticated()

  // useEffect(() => {
  //   console.log(isAuthenteticated);
  //   if (isAuthenteticated == "Test") {
  //     navigate("/sign-in")
  //   }
  // }, [isAuthenteticated]);
 
  // console.log("Acessing token dasboard",jwtToken);
  // useEffect(() => {
  //   console.log("Jwt Token" + jwtToken);
  //   if (token == "") {
  //     navigate("/sign-in")
  //   }
  // });

  if(token==null){
    setToken("test")
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
                    Total Customers
                  </CardTitle>
                  <IconUserCog />

                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>10,231</div>
                  <p className='text-xs text-muted-foreground'>
                    +20.1 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Plan
                  </CardTitle>
                  < IconChecklist/>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>2,350</div>
                  <p className='text-xs text-muted-foreground'>
                    +180 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>SMS sent</CardTitle>
                  <IconMessage />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>78966700</div>
                  <p className='text-xs text-muted-foreground'>
                    +2% from start
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                  Campaigns sent
                  </CardTitle>
                  <IconRosetteDiscountCheck />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>2300</div>
                  <p className='text-xs text-muted-foreground'>
                    +3 from start
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
