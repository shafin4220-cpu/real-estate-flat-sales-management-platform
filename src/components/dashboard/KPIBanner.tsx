import React from 'react';
import {
  Wallet,
  AlertTriangle,
  Building,
  UserPlus,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, toBanglaDigits } from '../../utils/formatters';

export const KPIBanner: React.FC = () => {
  const {
    totalCollectedThisMonth,
    totalOverdueAmount,
    availableFlatsCount,
    newLeadsTodayCount,
    siteVisitsTodayCount,
    setCurrentSection,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 ${isBn ? 'font-bangla' : ''}`}>
      {/* 1. Total Collection This Month */}
      <div className="bg-white p-4 rounded-2xl border border-black/10 flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between text-black/60 mb-2">
          <span className="text-xs font-semibold text-black/70">{t('kpiCollectionMonth')}</span>
          <div className="w-8 h-8 rounded-lg bg-[#0038BD]/10 text-[#0038BD] flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-black font-mono tabular-nums">
            {formatBDT(totalCollectedThisMonth, true, language)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#0038BD] font-semibold mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{t('kpiVsLastMonth')}</span>
          </div>
        </div>
      </div>

      {/* 2. OVERDUE AMOUNT (THE HOOK - Highlighted with Accent Orange) */}
      <div
        onClick={() => setCurrentSection('overdue_dedicated')}
        className="bg-[#EF8E01]/10 p-4 rounded-2xl border-2 border-[#EF8E01] flex flex-col justify-between shadow-2xs cursor-pointer hover:bg-[#EF8E01]/15 transition-colors"
      >
        <div className="flex items-center justify-between text-black mb-2">
          <span className="text-xs font-extrabold text-black flex items-center gap-1">
            {t('kpiOverdueAmount')} <span className="w-2 h-2 rounded-full bg-[#EF8E01] animate-pulse" />
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#EF8E01] text-black flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-black font-mono tabular-nums">
            {formatBDT(totalOverdueAmount, true, language)}
          </div>
          <div className="text-[11px] text-black font-bold mt-1">
            {t('kpiRequiresRecovery')}
          </div>
        </div>
      </div>

      {/* 3. Flats Available */}
      <div
        onClick={() => setCurrentSection('inventory')}
        className="bg-white p-4 rounded-2xl border border-black/10 flex flex-col justify-between shadow-2xs cursor-pointer hover:bg-[#EEEEEE]/50 transition-colors"
      >
        <div className="flex items-center justify-between text-black/60 mb-2">
          <span className="text-xs font-semibold text-black/70">{t('kpiFlatsAvailable')}</span>
          <div className="w-8 h-8 rounded-lg bg-[#0038BD]/10 text-[#0038BD] flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-black font-mono tabular-nums">
            {isBn ? toBanglaDigits(availableFlatsCount) : availableFlatsCount}{' '}
            <span className="text-xs font-normal text-black/60 font-sans">{t('kpiUnits')}</span>
          </div>
          <div className="text-[11px] text-black/60 mt-1">{t('kpiAcross3Projects')}</div>
        </div>
      </div>

      {/* 4. New Leads Today */}
      <div
        onClick={() => setCurrentSection('leads')}
        className="bg-white p-4 rounded-2xl border border-black/10 flex flex-col justify-between shadow-2xs cursor-pointer hover:bg-[#EEEEEE]/50 transition-colors"
      >
        <div className="flex items-center justify-between text-black/60 mb-2">
          <span className="text-xs font-semibold text-black/70">{t('kpiActiveNewLeads')}</span>
          <div className="w-8 h-8 rounded-lg bg-[#EEEEEE] text-black flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-black font-mono tabular-nums">
            {isBn ? toBanglaDigits(newLeadsTodayCount) : newLeadsTodayCount}
          </div>
          <div className="text-[11px] text-black/60 mt-1">{t('kpiReadyForCall')}</div>
        </div>
      </div>

      {/* 5. Site Visits Today */}
      <div
        onClick={() => setCurrentSection('site_visits')}
        className="bg-white p-4 rounded-2xl border border-black/10 flex flex-col justify-between shadow-2xs cursor-pointer hover:bg-[#EEEEEE]/50 transition-colors"
      >
        <div className="flex items-center justify-between text-black/60 mb-2">
          <span className="text-xs font-semibold text-black/70">{t('kpiSiteVisitsToday')}</span>
          <div className="w-8 h-8 rounded-lg bg-[#0038BD]/10 text-[#0038BD] flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-black font-mono tabular-nums">
            {isBn ? toBanglaDigits(siteVisitsTodayCount) : siteVisitsTodayCount}{' '}
            <span className="text-xs font-normal text-black/60 font-sans">{isBn ? 'নির্ধারিত' : 'Scheduled'}</span>
          </div>
          <div className="text-[11px] text-black/60 mt-1">{t('kpiCompletedThisWeek')}</div>
        </div>
      </div>
    </div>
  );
};
