import React from 'react';
import {
  LayoutDashboard,
  Users2,
  CalendarCheck2,
  Building2,
  FileCheck2,
  CreditCard,
  AlertTriangle,
  UserSquare2,
  Award,
  ListTodo,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp, NavSection } from '../../context/AppContext';
import { TranslationKey } from '../../utils/translations';
import { toBanglaDigits } from '../../utils/formatters';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { currentSection, setCurrentSection, language, t, installments } = useApp();
  const isBn = language === 'bn';

  const overdueCount = installments.filter((i) => i.status === 'overdue').length;

  const navItems: { id: NavSection; labelKey: TranslationKey; icon: React.ReactNode; badge?: number; isHook?: boolean }[] = [
    { id: 'dashboard', labelKey: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'leads', labelKey: 'leads', icon: <Users2 className="w-4 h-4" /> },
    { id: 'site_visits', labelKey: 'siteVisits', icon: <CalendarCheck2 className="w-4 h-4" /> },
    { id: 'inventory', labelKey: 'inventory', icon: <Building2 className="w-4 h-4" /> },
    { id: 'bookings', labelKey: 'bookings', icon: <FileCheck2 className="w-4 h-4" /> },
    {
      id: 'overdue_dedicated',
      labelKey: 'overdueInstallments',
      icon: <AlertTriangle className="w-4 h-4 text-[#EF8E01]" />,
      badge: overdueCount,
      isHook: true,
    },
    { id: 'installments', labelKey: 'installments', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'customers', labelKey: 'customers', icon: <UserSquare2 className="w-4 h-4" /> },
    { id: 'agents', labelKey: 'agents', icon: <Award className="w-4 h-4" /> },
    { id: 'reminders', labelKey: 'reminders', icon: <ListTodo className="w-4 h-4" /> },
    { id: 'reports', labelKey: 'reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', labelKey: 'settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`relative z-20 bg-white border-r border-[#EEEEEE] flex flex-col transition-all duration-200 shrink-0 ${
        collapsed ? 'w-18' : 'w-64'
      } ${isBn ? 'font-bangla' : ''}`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#EEEEEE]">
        {!collapsed ? (
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#0038BD] text-white flex items-center justify-center font-bold text-xs shrink-0">
                FD
              </span>
              <span className="font-extrabold text-lg text-black tracking-tight font-sans">
                {t('appName')}
              </span>
            </div>
            <p className="text-[10px] text-black/60 truncate mt-0.5 font-medium">
              {t('promise')}
            </p>
          </div>
        ) : (
          <div className="mx-auto w-8 h-8 rounded-lg bg-[#0038BD] text-white flex items-center justify-center font-bold text-sm">
            FD
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1 rounded-lg text-black/60 hover:text-black hover:bg-[#EEEEEE] transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          const isOverdueHook = item.isHook;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#0038BD] text-white shadow-xs'
                  : isOverdueHook
                  ? 'bg-[#EF8E01]/15 text-black hover:bg-[#EF8E01]/25 border border-[#EF8E01]/30 font-bold'
                  : 'text-black/80 hover:bg-[#EEEEEE] hover:text-black'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? t(item.labelKey) : undefined}
            >
              <span className={`shrink-0 ${isActive ? 'text-white' : ''}`}>{item.icon}</span>

              {!collapsed && (
                <span className="truncate flex-1 text-left">
                  {t(item.labelKey)}
                </span>
              )}

              {!collapsed && item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 font-mono ${
                    isActive
                      ? 'bg-white text-[#0038BD]'
                      : 'bg-[#EF8E01] text-black'
                  }`}
                >
                  {isBn ? toBanglaDigits(item.badge) : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Trust & Local Context Marker */}
      {!collapsed && (
        <div className="p-3 border-t border-[#EEEEEE] bg-[#EEEEEE]/50">
          <div className="flex items-center gap-2 text-[11px] text-black/70 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#0038BD] shrink-0" />
            <div className="leading-tight">
              <p className="font-semibold text-black">{t('auditVerified')}</p>
              <p className="text-[10px] text-black/60">{t('locationDhakaCtg')}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
