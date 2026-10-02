import React from 'react';
import { KPIBanner } from './KPIBanner';
import { OverdueInstallmentHookCard } from './OverdueInstallmentHookCard';
import { MonthlyTargetChart } from './MonthlyTargetChart';
import { SalesFunnelCard } from './SalesFunnelCard';
import { UpcomingDuesCard } from './UpcomingDuesCard';
import { SiteVisitsTodayCard } from './SiteVisitsTodayCard';
import { TopAgentsCard } from './TopAgentsCard';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const { language, t } = useApp();
  const isBn = language === 'bn';

  return (
    <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
      {/* Title & Section Helper */}
      <div>
        <h1 className="text-2xl font-black text-black tracking-tight">
          {t('dashboard')}
        </h1>
        <p className="text-xs text-black/60 mt-1 font-medium">
          {t('dashboardSub')}
        </p>
      </div>

      {/* 1. Top row KPI cards */}
      <KPIBanner />

      {/* 2. THE HOOK: Overdue Installments Card (First thing user notices!) */}
      <OverdueInstallmentHookCard />

      {/* 3. Operational & Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyTargetChart />
        <SalesFunnelCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <UpcomingDuesCard />
        <SiteVisitsTodayCard />
        <TopAgentsCard />
      </div>
    </div>
  );
};
