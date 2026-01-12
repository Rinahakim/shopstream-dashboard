'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) { // skeleton for the components - the components are loading
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200 rounded',
        className
      )}
    />
  );
}

export function MetricCardSkeleton() { // skeleton for the metrics cards - Revenue, Orders, Avg. Order Value, Total Products
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function ChartSkeleton() { // skeleton for the cake graph and the revenue trend graph
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <Skeleton className="h-6 w-48 mb-6" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function TableRowSkeleton() { // skeleton for the table rows - Product Name, Description, Price, Cost, Margin
  return (
    <tr>
      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
    </tr>
  );
}

