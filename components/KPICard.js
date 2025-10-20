"use client";
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function KPICard({ label, value, suffix = '', trend = 0 }) {
  const isUp = trend >= 0;
  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
  const trendClass = isUp ? 'kpi-up' : 'kpi-down';

  return (
    <div className="card p-4 focus:ring-2 card-focus" tabIndex={0} role="group" aria-label={`${label} card`}>
      <div className="text-sm text-slate-300">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}{suffix}</div>
      <div className={`mt-2 inline-flex items-center gap-1 ${trendClass}`} aria-label={`Trend ${isUp ? 'up' : 'down'} ${Math.abs(trend)}%`}>
        <TrendIcon className="w-4 h-4" aria-hidden />
        <span>{Math.abs(trend).toFixed(1)}%</span>
      </div>
    </div>
  );
}
