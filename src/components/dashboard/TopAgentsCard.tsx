import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, toBanglaDigits } from '../../utils/formatters';

export const TopAgentsCard: React.FC = () => {
  const { agents, setCurrentSection, language, t } = useApp();
  const isBn = language === 'bn';

  const sortedAgents = [...agents].sort((a, b) => b.totalSalesVolume - a.totalSalesVolume);

  return (
    <div className={`bg-white p-5 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between ${isBn ? 'font-bangla' : ''}`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0038BD]/10 text-[#0038BD] flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black tracking-tight">{t('topSalesPerformers')}</h3>
            <p className="text-[11px] text-black/60">{t('topPerformersSubtitle')}</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentSection('agents')}
          className="text-xs font-bold text-[#0038BD] hover:underline flex items-center gap-1 cursor-pointer"
        >
          {isBn ? 'লেজার' : 'Ledger'} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-[#EEEEEE] my-2">
        {sortedAgents.slice(0, 4).map((agent, idx) => (
          <div key={agent.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-5 text-center font-bold text-black/60 font-mono">
                #{isBn ? toBanglaDigits(idx + 1) : idx + 1}
              </span>
              <div>
                <p className="font-bold text-black">{agent.name}</p>
                <p className="text-[11px] text-black/60">
                  {isBn ? toBanglaDigits(agent.unitsSold) : agent.unitsSold} {t('unitsClosed')} ·{' '}
                  {isBn ? toBanglaDigits(agent.activeLeadsCount) : agent.activeLeadsCount} {t('activeLeads')}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono font-bold text-black block tabular-nums">
                {formatBDT(agent.totalSalesVolume, true, language)}
              </span>
              <span className="text-[10px] text-[#0038BD] font-semibold">
                {t('earnedLabel')} {formatBDT(agent.earnedCommission, true, language)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between text-[11px] text-black/60">
        <span>{t('teamCommRules')}</span>
        <span className="text-black font-semibold">{t('activeConsultants')}</span>
      </div>
    </div>
  );
};
