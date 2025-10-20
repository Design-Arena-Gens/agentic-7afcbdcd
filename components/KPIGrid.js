"use client";
import KPICard from './KPICard';

export default function KPIGrid({ kpis }) {
  return (
    <section className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key performance indicators">
      <KPICard label="Total Sales" value={kpis.totalSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} trend={kpis.trendSales} />
      <KPICard label="Conversion Rate" value={(kpis.conversionRate * 100).toFixed(1)} suffix="%" trend={kpis.trendConversion} />
      <KPICard label="Avg Deal Size" value={kpis.avgDealSize.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} trend={kpis.trendAvgDeal} />
      <KPICard label="Total Deals" value={kpis.totalDeals} trend={kpis.trendDeals} />
    </section>
  );
}
