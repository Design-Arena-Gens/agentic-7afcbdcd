"use client";
import { useId } from 'react';
import { formatISO, parseISO } from 'date-fns';
import { ShieldCheck, Printer } from "lucide-react";

export default function Header({ startDate, endDate, role, onChange }) {
  const startId = useId();
  const endId = useId();
  const roleId = useId();

  return (
    <header className="container-page py-6 no-print" role="banner">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sales Performance Dashboard</h1>
          <p className="text-slate-300 mt-1">Track KPIs, trends, and team performance</p>
        </div>
        <div className="flex items-center gap-2" aria-live="polite">
          <span className="badge" aria-label={`Current role ${role}`}><ShieldCheck className="w-4 h-4" aria-hidden /> {role}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" role="group" aria-label="Filters">
        <div className="flex flex-col gap-1">
          <label htmlFor={startId} className="label">Start date</label>
          <input id={startId} className="input" type="date" value={startDate} onChange={e => onChange({ startDate: e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={endId} className="label">End date</label>
          <input id={endId} className="input" type="date" value={endDate} onChange={e => onChange({ endDate: e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={roleId} className="label">Role</label>
          <select id={roleId} className="select" value={role} onChange={e => onChange({ role: e.target.value })} aria-describedby="role-help">
            <option>Admin</option>
            <option>Manager</option>
            <option>Rep</option>
          </select>
          <span id="role-help" className="sr-only">Changes visible indicators and access hints</span>
        </div>
        <div className="flex items-end">
          <button type="button" className="btn btn-secondary w-full" onClick={() => window.print()} aria-label="Print report">
            <Printer className="w-4 h-4 mr-2" aria-hidden /> Print report
          </button>
        </div>
      </div>
    </header>
  );
}
