'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  className?: string;
}

export function MetricCard({ title, value, icon, trend, className }: MetricCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm border border-slate-100 p-6',
      'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className={cn(
                'w-4 h-4',
                trend >= 0 ? 'text-emerald-500' : 'text-red-500 rotate-180'
              )} />
              <span className={cn(
                'text-sm font-medium',
                trend >= 0 ? 'text-emerald-600' : 'text-red-600'
              )}>
                {Math.abs(trend)}%
              </span>
              <span className="text-sm text-slate-400">vs last week</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

