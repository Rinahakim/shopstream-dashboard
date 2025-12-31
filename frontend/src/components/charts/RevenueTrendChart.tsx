'use client';

import { useTranslations, useLocale } from 'next-intl';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { formatShortDate, formatCurrency } from '@/lib/utils';
import type { RevenueTrendItem } from '@/types';

interface RevenueTrendChartProps {
  data: RevenueTrendItem[];
}

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  const t = useTranslations('dashboard.charts');
  const locale = useLocale();

  const formattedData = data.map((item) => ({
    ...item,
    dateLabel: formatShortDate(item.date, locale),
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('revenue_trend_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="dateLabel" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value, name) => {
                  const numValue = typeof value === 'number' ? value : 0;
                  const isRevenue = name === t('revenue');
                  return [
                    isRevenue ? formatCurrency(numValue) : numValue,
                    isRevenue ? t('revenue') : t('orders'),
                  ];
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name={t('revenue')}
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name={t('orders')}
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

