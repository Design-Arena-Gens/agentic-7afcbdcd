"use client";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function TrendLineChart({ data }) {
  return (
    <section className="container-page" aria-label="Monthly sales trend">
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Monthly Sales Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', color: '#e5e7eb' }} formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
