import { dashboardService } from '@/api/services/dashboard/dashboard.service'
import { useAuthStore } from '@/hooks/use-auth-store'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props

  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const InteractivePieChart = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { user } = useAuthStore()

  const {
    data: dashData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['dashboard-chat-pie'],
    queryFn: async () => {
      if (user?.customer) {
        const response = await dashboardService.getDashbordCustomerPieData()
        const transformedData = response?.map(([status, count]) => {
          return {
            name: status,
            value: count,
          }
        })
        return transformedData
      }

    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
  })

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index)
  }

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='flex h-64 items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex h-64 items-center justify-center text-red-500'>
        Failed to load chart data
      </div>
    )
  }

  if (!dashData?.length) {
    return (
      <div className='flex h-64 items-center justify-center text-gray-500'>
        No data available
      </div>
    )
  }

  return (
    <div className='h-96 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={dashData}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InteractivePieChart
