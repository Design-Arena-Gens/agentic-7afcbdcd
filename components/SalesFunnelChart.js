"use client";
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';

export default function SalesFunnelChart({ data }) {
  const colors = ['#60a5fa', '#34d399', '#22c55e', '#a78bfa', '#f87171'];
  return (
    <section className="container-page" aria-label="Sales funnel">
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Sales Funnel</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', color: '#e5e7eb' }} />
              <Funnel dataKey="value" data={data} isAnimationActive>
                <LabelList position="right" fill="#e5e7eb" stroke="none" dataKey="stage" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
