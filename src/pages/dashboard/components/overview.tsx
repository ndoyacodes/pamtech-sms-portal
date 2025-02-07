import { dashboardService } from '@/api/services/dashboard/dashboard.service';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';


export function Overview() {
  const { user } = useAuthStore();
  const [period, setPeriod] = useState('Monthly');

  const { data: dashData, isLoading, isError } = useQuery({
    queryKey: ['dashboard-chat-overview', period],
    queryFn: async ({ queryKey }) => {
      const [, currentPeriod] = queryKey;
      
      if (user?.customer) {
        const response = await dashboardService.getDashbordCustomerChat({
          period: currentPeriod
        });
        
        return Object.entries(response).map(([name, total]) => ({
          name,
          total: Number(total)
        }));
      }

      // Handle non-customer case
      // const response = await dashboardService.getDashbordCustomerChat();
      // return transformNonCustomerData(response);
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
    enabled: !!user, 
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
            <div className='flex h-64 items-center justify-center'>
                    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white'></div>
                  </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        Failed to load chart data
      </div>
    );
  }

  if (!dashData?.length) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={dashData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}