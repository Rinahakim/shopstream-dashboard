'use client';

import { useTranslations } from 'next-intl';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import type { OrderStatusItem } from '@/types';

interface OrderStatusChartProps {
  data: OrderStatusItem[];
}

const COLORS = {
  'Processed': '#f59e0b',
  'In Delivery': '#3b82f6',
  'Delivered': '#10b981',
};

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  const t = useTranslations('dashboard.charts');
  const tStatus = useTranslations('orders.filter');

  // Map status to translation key
  const getStatusTranslation = (status: string) => {
    const statusMap: Record<string, string> = {
      'Processed': 'processed',
      'In Delivery': 'in_delivery',
      'Delivered': 'delivered',
    };
    return tStatus(statusMap[status] || status);
  };

  const chartData = data.map((item) => ({ 
    ...item,
    translatedStatus: getStatusTranslation(item.status),
    fill: COLORS[item.status] || '#64748b',
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('order_status_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart> 
              <Pie // the cake chart - the chart is a circle and the slices are the statuses
                data={chartData} // the data for the chart cake
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="count" // show the number of orders in the chart cake
                nameKey="translatedStatus" // show the name of the status in the chart cake
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`} // show the percentage(%) of the status in the chart cake
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} /> // color the slices of the chart cake
                ))}
              </Pie>
              <Tooltip // style for the card in pointer hover a point in the chart cake
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [value ?? 0, t('orders')]} // show the number of orders in the chart cake
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

