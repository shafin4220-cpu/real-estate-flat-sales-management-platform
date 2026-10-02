import React, { useState } from 'react';
import {
  Download,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatDate, toBanglaDigits } from '../../utils/formatters';
import { Button } from '../common/Button';

export const AgentsView: React.FC = () => {
  const {
    agents,
    commissions,
    payCommission,
    language,
    t,
    showToast,
  } = useApp();

  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'agents' | 'ledger'>('ledger');

  const totalEarned = commissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalApproved = commissions
    .filter((c) => c.status === 'approved')
    .reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalPaid = commissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalPending = commissions
    .filter((c) => c.status === 'pending')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('agentsCommissionTitle')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('agentsCommissionSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab toggle */}
          <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'ledger' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              {t('commissionLedgerTab')}
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'agents' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              {t('consultantsListTab')}
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              showToast(
                isBn ? 'স্টেটমেন্ট এক্সপোর্ট হয়েছে' : 'Commission Statement Exported',
                isBn ? 'এজেন্টদের কমিশন পেআউট লেজার সিএসভি ডাউনলোড সম্পন্ন।' : 'Downloaded complete agent payout ledger CSV.',
                'success'
              )
            }
            icon={<Download className="w-3.5 h-3.5" />}
          >
            {t('exportStatement')}
          </Button>
        </div>
      </div>

      {/* KPI Cards for Commission */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-black/10 shadow-2xs">
          <span className="text-[11px] font-bold text-black/60 uppercase">{t('totalEarnedLabel')}</span>
          <div className="text-xl font-extrabold text-black font-mono mt-1">
            {formatBDT(totalEarned, false, language)}
          </div>
          <span className="text-[10px] text-black/50">{isBn ? 'সকল বুকিংয়ের উপর' : 'Across all bookings'}</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-black/10 shadow-2xs">
          <span className="text-[11px] font-bold text-[#0038BD] uppercase">{t('paidOutLabel')}</span>
          <div className="text-xl font-extrabold text-[#0038BD] font-mono mt-1">
            {formatBDT(totalPaid, false, language)}
          </div>
          <span className="text-[10px] text-black/50">{isBn ? 'ব্যাংক ট্রান্সফার সম্পন্ন' : 'Bank transferred'}</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-black/10 shadow-2xs">
          <span className="text-[11px] font-bold text-[#EF8E01] uppercase">{t('approvedForPayout')}</span>
          <div className="text-xl font-extrabold text-black font-mono mt-1">
            {formatBDT(totalApproved, false, language)}
          </div>
          <span className="text-[10px] text-black/50">{isBn ? 'অ্যাকাউন্টস ক্লিয়ারেন্স রেডি' : 'Accounts clearance ready'}</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-black/10 shadow-2xs">
          <span className="text-[11px] font-bold text-black/60 uppercase">{t('pendingMilestone')}</span>
          <div className="text-xl font-extrabold text-black font-mono mt-1">
            {formatBDT(totalPending, false, language)}
          </div>
          <span className="text-[10px] text-black/50">{isBn ? 'ডাউন পেমেন্টের অপেক্ষায়' : 'Awaiting down payments'}</span>
        </div>
      </div>

      {/* Tab 1: Commission Ledger */}
      {activeTab === 'ledger' && (
        <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#EEEEEE] flex items-center justify-between">
            <h3 className="text-sm font-bold text-black">{t('commLedgerHeading')}</h3>
            <p className="text-xs text-black/60 hidden sm:block">
              {t('commRuleText')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                  <th className="py-3 px-3">{t('thAgent')}</th>
                  <th className="py-3 px-3">{t('thUnitProject')}</th>
                  <th className="py-3 px-3">{t('thBuyer')}</th>
                  <th className="py-3 px-3 text-right">{t('thFlatPrice')}</th>
                  <th className="py-3 px-3">{t('thCommRate')}</th>
                  <th className="py-3 px-3 text-right">{t('thCommissionBdt')}</th>
                  <th className="py-3 px-3">{t('thMilestoneStatus')}</th>
                  <th className="py-3 px-3">{t('thPayoutStatus')}</th>
                  <th className="py-3 px-3 text-right">{t('thDisbursementAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE]">
                {commissions.map((comm) => (
                  <tr key={comm.id} className="hover:bg-[#EEEEEE]/50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-black">{comm.agentName}</td>

                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#0038BD]/10 text-[#0038BD] inline-block mr-1">
                        Unit {comm.unitNumber}
                      </span>
                      <span className="text-black/70">{comm.projectName}</span>
                    </td>

                    <td className="py-3.5 px-3 font-medium text-black">{comm.customerName}</td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-black">
                      {formatBDT(comm.flatTotalPrice, true, language)}
                    </td>

                    <td className="py-3.5 px-3 font-mono text-black font-semibold">
                      {isBn ? `${toBanglaDigits(comm.ratePercent)}%` : `${comm.ratePercent}%`}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-black">
                      {formatBDT(comm.commissionAmount, false, language)}
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          comm.milestoneCleared
                            ? 'bg-[#0038BD]/10 text-[#0038BD]'
                            : 'bg-[#EEEEEE] text-black/60'
                        }`}
                      >
                        {comm.milestoneCleared
                          ? isBn ? 'ডাউন পেমেন্ট ক্লিয়ারড' : 'Down Payment Cleared'
                          : isBn ? 'মাইলস্টোন অপেক্ষমাণ' : 'Pending DP'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                          comm.status === 'paid'
                            ? 'bg-[#0038BD] text-white'
                            : comm.status === 'approved'
                            ? 'bg-[#EF8E01] text-black'
                            : 'bg-[#EEEEEE] text-black/70'
                        }`}
                      >
                        {comm.status === 'paid'
                          ? t('disbursed')
                          : comm.status === 'approved'
                          ? t('approved')
                          : t('pending')}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      {comm.status === 'approved' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => payCommission(comm.id)}
                          className="text-[11px] py-1 px-2.5 h-[28px]"
                        >
                          {t('disburse')}
                        </Button>
                      )}
                      {comm.status === 'paid' && (
                        <span className="text-[11px] text-[#0038BD] font-bold">
                          ✓ {t('disbursed')}
                        </span>
                      )}
                      {comm.status === 'pending' && (
                        <span className="text-[11px] text-black/40 italic">
                          {isBn ? 'লক করা' : 'Locked'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Consultants List */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white p-5 rounded-2xl border border-black/10 shadow-2xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black">{agent.name}</h3>
                  <p className="text-xs text-black/60 mt-0.5">{agent.role}</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#0038BD] bg-[#0038BD]/10 px-2 py-0.5 rounded">
                  {isBn ? `${toBanglaDigits(agent.unitsSold)}টি বিক্রিত` : `${agent.unitsSold} Sold`}
                </span>
              </div>

              <div className="p-3 bg-[#EEEEEE]/50 rounded-xl border border-black/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-black/60">{isBn ? 'মোট বিক্রয় ভলিউম:' : 'Total Sales Volume:'}</span>
                  <span className="font-mono font-bold text-black">
                    {formatBDT(agent.totalSalesVolume, true, language)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">{isBn ? 'অর্জিত মোট কমিশন:' : 'Total Commission Earned:'}</span>
                  <span className="font-mono font-bold text-[#0038BD]">
                    {formatBDT(agent.earnedCommission, false, language)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">{isBn ? 'সক্রিয় লিড হ্যান্ডলিং:' : 'Active Leads Pipeline:'}</span>
                  <span className="font-mono font-semibold text-black">
                    {isBn ? `${toBanglaDigits(agent.activeLeadsCount)} জন` : `${agent.activeLeadsCount} Leads`}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-between text-xs">
                <span className="text-black/60">{isBn ? 'যোগদান: ' : 'Joined: '}{formatDate(agent.joinedDate, language)}</span>
                <span className="text-xs font-bold text-[#0038BD]">{agent.commissionRate}% {isBn ? 'কমিশন' : 'Comm'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
