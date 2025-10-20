"use client";
import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import KPIGrid from '../components/KPIGrid';
import TrendLineChart from '../components/TrendLineChart';
import SalesFunnelChart from '../components/SalesFunnelChart';
import GeoSalesMap from '../components/GeoSalesMap';
import SalesLeaderboard from '../components/SalesLeaderboard';
import { generateMockDeals, aggregateKPIs, aggregateFunnel, aggregateMonthlyTrend, aggregateGeo, aggregateLeaderboard } from '../lib/data';
import { subDays, formatISO } from 'date-fns';

export default function Page() {
  const todayISO = formatISO(new Date(), { representation: 'date' });
  const [filters, setFilters] = useState({
    startDate: formatISO(subDays(new Date(), 180), { representation: 'date' }),
    endDate: todayISO,
    role: 'Manager'
  });

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const generated = generateMockDeals(filters.startDate, filters.endDate);
    setDeals(generated);
  }, [filters.startDate, filters.endDate]);

  const kpi = useMemo(() => {
    const base = aggregateKPIs(deals);
    // naive trend calculation vs previous equal interval
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    const diff = Math.max(1, Math.round((end - start) / (1000*3600*24)));
    const prevStart = formatISO(new Date(start.getTime() - diff*24*3600*1000), { representation: 'date' });
    const prevEnd = formatISO(new Date(start.getTime() - 24*3600*1000), { representation: 'date' });
    const prevDeals = generateMockDeals(prevStart, prevEnd);
    const prev = aggregateKPIs(prevDeals);
    const pct = (curr, prev) => prev === 0 ? 0 : ((curr - prev) / prev) * 100;
    return {
      ...base,
      trendSales: pct(base.totalSales, prev.totalSales),
      trendConversion: pct(base.conversionRate, prev.conversionRate),
      trendAvgDeal: pct(base.avgDealSize, prev.avgDealSize),
      trendDeals: pct(base.totalDeals, prev.totalDeals)
    };
  }, [deals, filters.startDate, filters.endDate]);

  const funnel = useMemo(() => aggregateFunnel(deals), [deals]);
  const trend = useMemo(() => aggregateMonthlyTrend(deals), [deals]);
  const geo = useMemo(() => aggregateGeo(deals), [deals]);
  const leaderboard = useMemo(() => aggregateLeaderboard(deals), [deals]);

  const onChange = (patch) => setFilters(prev => ({ ...prev, ...patch }));

  return (
    <main className="space-y-6 pb-12">
      <Header startDate={filters.startDate} endDate={filters.endDate} role={filters.role} onChange={onChange} />
      <KPIGrid kpis={kpi} />

      <div className="grid container-page gap-4 grid-cols-1 lg:grid-cols-2">
        <SalesFunnelChart data={funnel} />
        <TrendLineChart data={trend} />
      </div>

      <GeoSalesMap data={geo} />

      <SalesLeaderboard rows={leaderboard} />

      {filters.role === 'Rep' && (
        <div className="container-page no-print">
          <div className="mt-2 text-sm text-slate-300">Some analytics may be limited for Rep role.</div>
        </div>
      )}
    </main>
  );
}
