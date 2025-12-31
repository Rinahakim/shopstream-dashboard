'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout';
import { Select, Badge, TableRowSkeleton } from '@/components/ui';
import { useOrders } from '@/hooks';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'Processed', label: 'Processed' },
  { value: 'In Delivery', label: 'In Delivery' },
  { value: 'Delivered', label: 'Delivered' },
];

const getStatusBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'In Delivery':
      return 'info';
    case 'Processed':
      return 'warning';
    default:
      return 'default';
  }
};

const translateStatus = (status: OrderStatus, tFilter: (key: string) => string): string => {
  switch (status) {
    case 'Processed': return tFilter('processed');
    case 'In Delivery': return tFilter('in_delivery');
    case 'Delivered': return tFilter('delivered');
    default: return status;
  }
};

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(undefined);
  const t = useTranslations('orders');
  const tTable = useTranslations('orders.table');
  const tFilter = useTranslations('orders.filter');
  const locale = useLocale();
  const isRTL = locale === 'he';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  const { data: orders, isLoading, error } = useOrders(statusFilter);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatusFilter(value ? (value as OrderStatus) : undefined);
  };

  // Translate status options
  const translatedOptions = STATUS_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.value === '' 
      ? tFilter('all_statuses')
      : opt.value === 'Processed' 
        ? tFilter('processed')
        : opt.value === 'In Delivery'
          ? tFilter('in_delivery')
          : tFilter('delivered'),
  }));

  return (
    <div className="animate-fadeIn">
      <Header
        title={t('title')}
        subtitle={t('subtitle')}
        actions={
          <Select
            options={translatedOptions}
            value={statusFilter || ''}
            onChange={handleFilterChange}
            className="w-48"
          />
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('order_id')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('customer')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('product')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('quantity')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('amount')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('status')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('date')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-red-600">
                    {t('error_loading')}
                  </td>
                </tr>
              ) : orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-slate-600">
                      #{order.id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {translateStatus(order.status, tFilter)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(order.createdAt, locale)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    {statusFilter ? t('empty_filtered') : t('empty')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

