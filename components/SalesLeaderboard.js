"use client";
import { useMemo, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function SalesLeaderboard({ rows }) {
  const [sort, setSort] = useState({ key: 'revenue', dir: 'desc' });

  const sorted = useMemo(() => {
    const list = [...rows];
    list.sort((a,b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      if (a[sort.key] < b[sort.key]) return -1 * dir;
      if (a[sort.key] > b[sort.key]) return 1 * dir;
      return 0;
    });
    return list;
  }, [rows, sort]);

  const setSortKey = (key) => setSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));

  const th = (key, label) => (
    <th scope="col" className="px-4 py-2 text-left">
      <button
        className="inline-flex items-center gap-1 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        onClick={() => setSortKey(key)}
        aria-sort={sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        {label}
        <ArrowUpDown className="w-4 h-4" aria-hidden />
      </button>
    </th>
  );

  return (
    <section className="container-page" aria-label="Sales leaderboard">
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Sales Leaderboard</h2>
        <div className="overflow-x-auto" role="region" aria-label="Scrollable leaderboard">
          <table className="min-w-full text-sm">
            <thead className="text-slate-300">
              <tr>
                {th('repName','Rep')}
                {th('revenue','Revenue')}
                {th('deals','Deals')}
                {th('won','Won')}
                {th('conversion','Conversion')}
                {th('avgDeal','Avg Deal')}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, idx) => (
                <tr key={r.repId} className={idx % 2 ? 'bg-slate-900/40' : ''}>
                  <th scope="row" className="px-4 py-2 text-slate-100 font-semibold">{r.repName}</th>
                  <td className="px-4 py-2">{r.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                  <td className="px-4 py-2">{r.deals}</td>
                  <td className="px-4 py-2">{r.won}</td>
                  <td className="px-4 py-2">{(r.conversion*100).toFixed(1)}%</td>
                  <td className="px-4 py-2">{r.avgDeal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
