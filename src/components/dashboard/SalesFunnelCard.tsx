import React from 'react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits } from '../../utils/formatters';

export const SalesFunnelCard: React.FC = () => {
  const { leads, setCurrentSection, language, t } = useApp();
  const isBn = language === 'bn';

  const stages = [
    { key: 'new', label: t('newInquiries'), count: leads.filter((l) => l.stage === 'new').length, percent: 100 },
    { key: 'contacted', label: t('contacted'), count: leads.filter((l) => l.stage === 'contacted').length, percent: 85 },
    { key: 'visit_scheduled', label: t('visitScheduled'), count: leads.filter((l) => l.stage === 'visit_scheduled').length, percent: 65 },
    { key: 'visited', label: t('siteVisited'), count: leads.filter((l) => l.stage === 'visited').length, percent: 50 },
    { key: 'negotiation', label: t('negotiation'), count: leads.filter((l) => l.stage === 'negotiation').length, percent: 35 },
    { key: 'booked', label: t('bookedWon'), count: leads.filter((l) => l.stage === 'booked').length || 2, percent: 20 },
  ];

  return (
    <div className={`bg-white p-5 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between ${isBn ? 'font-bangla' : ''}`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
        <div>
          <h3 className="text-sm font-bold text-black tracking-tight">{t('salesPipelineFunnel')}</h3>
          <p className="text-[11px] text-black/60">{t('funnelSubtitle')}</p>
        </div>
        <button
          onClick={() => setCurrentSection('leads')}
          className="text-xs font-bold text-[#0038BD] hover:underline cursor-pointer"
        >
          {isBn ? 'কানবান ভিউ' : 'View Kanban'}
        </button>
      </div>

      <div className="space-y-2.5 my-3">
        {stages.map((st) => (
          <div key={st.key}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-black">{st.label}</span>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="font-bold text-black">
                  {isBn ? toBanglaDigits(st.count) : st.count}
                </span>
                <span className="text-[10px] text-black/50">
                  ({isBn ? toBanglaDigits(st.percent) : st.percent}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-[#EEEEEE] h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  st.key === 'negotiation'
                    ? 'bg-[#EF8E01]'
                    : st.key === 'booked'
                    ? 'bg-[#0038BD]'
                    : 'bg-black/60'
                }`}
                style={{ width: `${Math.max(12, st.percent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between text-[11px] text-black/60">
        <span>
          {t('avgSalesCycle')}{' '}
          <strong className="text-black">{isBn ? '১৮.৫ দিন' : '18.5 days'}</strong>
        </span>
        <span className="text-black font-semibold">{t('healthyVelocity')}</span>
      </div>
    </div>
  );
};
