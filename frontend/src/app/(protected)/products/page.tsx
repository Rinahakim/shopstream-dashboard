'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout';
import { Badge, TableRowSkeleton } from '@/components/ui';
import { useProducts } from '@/hooks';
import { formatCurrency } from '@/lib/utils';

const getStockBadgeVariant = (stock: number) => {
  if (stock === 0) return 'danger';
  if (stock < 10) return 'warning';
  return 'success';
};

const getStockLabel = (stock: number, t: (key: string) => string) => {
  if (stock === 0) return t('out_of_stock');
  if (stock < 10) return t('low_stock');
  return t('in_stock');
};

export default function ProductsPage() {
  const t = useTranslations('products');
  const tTable = useTranslations('products.table');
  const locale = useLocale();
  const isRTL = locale === 'he';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="animate-fadeIn">
      <Header title={t('title')} subtitle={t('subtitle')} />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('name')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('description')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('price')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('cost')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('margin')}
                </th>
                <th className={`px-6 py-4 ${textAlign} text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                  {tTable('stock')}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-red-600">
                    {t('error_loading')}
                  </td>
                </tr>
              ) : products && products.length > 0 ? (
                products.map((product) => {
                  const margin = ((product.price - product.cost) / product.price) * 100;
                  
                  return (
                    <tr 
                      key={product.id} 
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatCurrency(product.cost)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${margin >= 40 ? 'text-emerald-600' : margin >= 20 ? 'text-amber-600' : 'text-red-600'}`}>
                          {margin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">{product.stock}</span>
                          <Badge variant={getStockBadgeVariant(product.stock)}>
                            {getStockLabel(product.stock, t)}
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    {t('empty')}
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

