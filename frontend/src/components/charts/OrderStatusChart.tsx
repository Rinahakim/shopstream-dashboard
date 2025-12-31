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

  const chartData = data.map((item) => ({
    ...item,
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
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="count"
                nameKey="status"
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [value ?? 0, 'Orders']}
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

