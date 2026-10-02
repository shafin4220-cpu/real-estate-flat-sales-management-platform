import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  Wallet,
  AlertTriangle,
  Building,
  Award,
  Users2,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT } from '../../utils/formatters';
import { Button } from '../common/Button';

export const ReportsView: React.FC = () => {
  const {
    totalCollectedThisMonth,
    totalOverdueAmount,
    projects,
    installments,
    leads,
    agents,
    units,
    showToast,
  } = useApp();

  const [activeReport, setActiveReport] = useState<string>('collection');

  const reportCards = [
    {
      id: 'collection',
      title: 'Collection & Cash Inflow',
      desc: 'Monthly realized payments by bank transfer, cheque, pay order, and MFS.',
      metric: formatBDT(totalCollectedThisMonth, true),
      icon: <Wallet className="w-5 h-5 text-[#0038BD]" />,
    },
    {
      id: 'aging',
      title: 'Overdue Aging Debt Report',
      desc: 'Accounts aging by 1-7 days, 8-30 days, 31-60 days, and critical 60+ days.',
      metric: formatBDT(totalOverdueAmount, true),
      icon: <AlertTriangle className="w-5 h-5 text-[#EF8E01]" />,
    },
    {
      id: 'projects',
      title: 'Sales by Project',
      desc: 'Inventory absorption rate and square footage revenue across 3 projects.',
      metric: '3 Projects',
      icon: <Building className="w-5 h-5 text-[#0038BD]" />,
    },
    {
      id: 'commissions',
      title: 'Agent Commission Audit',
      desc: 'Milestone-based sales bonuses, earned vs paid ledgers, and disputes.',
      metric: formatBDT(1954000, true),
      icon: <Award className="w-5 h-5 text-[#0038BD]" />,
    },
    {
      id: 'sources',
      title: 'Lead Source ROI & Conversion',
      desc: 'Performance of Facebook ads vs walk-in site visits vs client referrals.',
      metric: '40 Inquiries',
      icon: <Users2 className="w-5 h-5 text-[#0038BD]" />,
    },
    {
      id: 'inventory',
      title: 'Inventory & Floor Velocity',
      desc: 'Available units, hold durations, and average days on market by unit type.',
      metric: `${units.filter((u) => u.status === 'available').length} Available`,
      icon: <FileSpreadsheet className="w-5 h-5 text-[#0038BD]" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            Financial & Sales Reports (রিপোর্ট ও অ্যানালিটিক্স)
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            Executive collections audit, overdue debt aging, and inventory revenue analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Exporting Report', 'Generating printable PDF audit statement...', 'info')}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('CSV Downloaded', 'Exported comprehensive raw dataset CSV.', 'success')}
            icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
            className="font-bold"
          >
            Export All CSV
          </Button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((rc) => {
          const isSelected = activeReport === rc.id;

          return (
            <div
              key={rc.id}
              onClick={() => setActiveReport(rc.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#0038BD] ring-2 ring-[#0038BD]/20 shadow-md'
                  : 'bg-white border-black/10 hover:border-black/25 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EEEEEE] flex items-center justify-center mb-3">
                    {rc.icon}
                  </div>
                  <span className="text-sm font-black font-mono text-black">{rc.metric}</span>
                </div>
                <h3 className="text-sm font-bold text-black">{rc.title}</h3>
                <p className="text-xs text-black/60 mt-1 leading-relaxed">{rc.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EEEEEE] flex justify-between items-center text-xs">
                <span className="text-[11px] text-black/50">Updated today</span>
                <span className={`font-bold ${isSelected ? 'text-[#0038BD]' : 'text-black/70'}`}>
                  {isSelected ? 'Viewing' : 'Select'} ➔
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Report Interactive View */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEEEEE]">
          <div>
            <h3 className="text-base font-bold text-black">
              {reportCards.find((r) => r.id === activeReport)?.title}
            </h3>
            <p className="text-xs text-black/60">
              Live calculated ledger figures with RAJUK compliance breakdown.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              showToast('CSV Exported', `Downloaded ${activeReport}_report.csv`, 'success')
            }
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Download Filtered CSV
          </Button>
        </div>

        {/* Dynamic content per selected report */}
        {activeReport === 'aging' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-black">Overdue Debt Aging Buckets</h4>
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#EEEEEE] border border-black/10">
                <span className="text-black/60 block">1 - 7 Days</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 13,70,000
                </strong>
                <span className="text-[10px] text-black/60">3 Accounts</span>
              </div>

              <div className="p-3 rounded-xl bg-[#EEEEEE] border border-black/10">
                <span className="text-black/60 block">8 - 30 Days</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 23,00,000
                </strong>
                <span className="text-[10px] text-black/60">3 Accounts</span>
              </div>

              <div className="p-3 rounded-xl bg-[#EF8E01]/20 border border-[#EF8E01]">
                <span className="text-black font-semibold block">31 - 60 Days</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 27,50,000
                </strong>
                <span className="text-[10px] text-black">3 Accounts (Warning)</span>
              </div>

              <div className="p-3 rounded-xl bg-[#EF8E01] text-black font-bold">
                <span className="block">60+ Days (Critical)</span>
                <strong className="text-sm font-mono block mt-1">৳ 28,50,000</strong>
                <span className="text-[10px]">3 Accounts (Legal Notice)</span>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'collection' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-black">Collections by Payment Channel</h4>
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-black/15">
                <span className="text-black/60 block">Bank Transfer (RTGS/BEFTN)</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 98,50,000
                </strong>
                <span className="text-[10px] text-[#0038BD] font-semibold">66% of Total</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-black/15">
                <span className="text-black/60 block">Cheque / Pay Order</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 42,00,000
                </strong>
                <span className="text-[10px] text-black/60">28% of Total</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-black/15">
                <span className="text-black/60 block">Cash Counter</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 5,50,000
                </strong>
                <span className="text-[10px] text-black/60">Token moneys</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-black/15">
                <span className="text-black/60 block">bKash / Nagad MFS</span>
                <strong className="text-sm font-mono block mt-1 font-bold text-black">
                  ৳ 2,50,000
                </strong>
                <span className="text-[10px] text-black/60">Booking tokens</span>
              </div>
            </div>
          </div>
        )}

        {activeReport === 'projects' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-black">Absorption & Inventory Velocity</h4>
            <div className="divide-y divide-[#EEEEEE] text-xs">
              {projects.map((p) => {
                const pUnits = units.filter((u) => u.projectId === p.id);
                const sold = pUnits.filter((u) => u.status === 'sold' || u.status === 'booked').length;
                const percent = Math.round((sold / pUnits.length) * 100);

                return (
                  <div key={p.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-black">{p.name}</span>
                      <span className="text-black/60 block text-[11px]">{p.location}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-black">
                        {sold} / {pUnits.length} Units ({percent}%)
                      </span>
                      <span className="text-[11px] text-black/60 block">
                        Handover: {p.handoverDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Fallback for other reports */}
        {['commissions', 'sources', 'inventory'].includes(activeReport) && (
          <div className="p-4 bg-[#EEEEEE]/50 rounded-xl border border-black/10 text-xs space-y-2">
            <p className="font-bold text-black">Detailed Ledger Audit Data Ready</p>
            <p className="text-black/70">
              All records have been verified against active database schemas with multi-role access
              permissions. Click "Download Filtered CSV" to generate Excel export with full formulas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
