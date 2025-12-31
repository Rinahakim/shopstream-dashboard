'use client';

import { useTranslations } from 'next-intl';
import { DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react';
import { Header } from '@/components/layout';
import { MetricCard } from '@/components/dashboard';
import { RevenueTrendChart, OrderStatusChart } from '@/components/charts';
import { MetricCardSkeleton, ChartSkeleton } from '@/components/ui';
import { useMetrics, useRevenueTrend, useOrderStatus } from '@/hooks';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tMetrics = useTranslations('dashboard.metrics');

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useMetrics();
  const { data: revenueTrend, isLoading: revenueLoading, error: revenueError } = useRevenueTrend();
  const { data: orderStatus, isLoading: statusLoading, error: statusError } = useOrderStatus();

  return (
    <div className="animate-fadeIn">
      <Header title={t('title')} subtitle={t('subtitle')} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricsLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : metricsError ? (
          <div className="col-span-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            Failed to load metrics
          </div>
        ) : metrics ? (
          <>
            <MetricCard
              title={tMetrics('total_revenue')}
              value={formatCurrency(metrics.totalRevenue)}
              icon={<DollarSign className="w-6 h-6 text-indigo-600" />}
            />
            <MetricCard
              title={tMetrics('total_orders')}
              value={metrics.totalOrders.toLocaleString()}
              icon={<ShoppingCart className="w-6 h-6 text-indigo-600" />}
            />
            <MetricCard
              title={tMetrics('avg_order_value')}
              value={formatCurrency(metrics.avgOrderValue)}
              icon={<TrendingUp className="w-6 h-6 text-indigo-600" />}
            />
            <MetricCard
              title={tMetrics('total_products')}
              value={metrics.totalProducts.toLocaleString()}
              icon={<Package className="w-6 h-6 text-indigo-600" />}
            />
          </>
        ) : null}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {revenueLoading ? (
            <ChartSkeleton />
          ) : revenueError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              Failed to load revenue trend
            </div>
          ) : revenueTrend ? (
            <RevenueTrendChart data={revenueTrend} />
          ) : null}
        </div>
        <div>
          {statusLoading ? (
            <ChartSkeleton />
          ) : statusError ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              Failed to load order status
            </div>
          ) : orderStatus ? (
            <OrderStatusChart data={orderStatus} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

