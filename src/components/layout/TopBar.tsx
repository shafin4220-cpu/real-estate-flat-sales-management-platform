import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Bell,
  Globe,
  Shield,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { toBanglaDigits } from '../../utils/formatters';
import { Button } from '../common/Button';

export const TopBar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    userRole,
    setUserRole,
    revealSensitiveData,
    toggleRevealSensitive,
    setIsQuickAddLeadOpen,
    setIsScheduleVisitOpen,
    setIsBookingWizardOpen,
    setIsRecordPaymentOpen,
    setIsCommandPaletteOpen,
    setCurrentSection,
    installments,
    units,
    siteVisits,
  } = useApp();

  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const newMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (newMenuRef.current && !newMenuRef.current.contains(e.target as Node)) {
        setIsNewMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const overdueCount = installments.filter((i) => i.status === 'overdue').length;
  const expiringHolds = units.filter((u) => u.status === 'hold').length;
  const visitsToday = siteVisits.filter((s) => s.status === 'scheduled').length;

  const roleLabels: Record<UserRole, { titleEn: string; titleBn: string; name: string }> = {
    sales_manager: { titleEn: 'Sales Manager', titleBn: 'সেলস ম্যানেজার', name: 'Sabrina Sultana' },
    sales_agent: { titleEn: 'Sales Agent', titleBn: 'সেলস এজেন্ট', name: 'Arifur Rahman' },
    accounts: { titleEn: 'Accounts Officer', titleBn: 'অ্যাকাউন্টস অফিসার', name: 'Mahmudur Rahman' },
    admin: { titleEn: 'System Admin / Owner', titleBn: 'সিস্টেম অ্যাডমিন / মালিক', name: 'Tariqul Islam' },
  };

  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#EEEEEE] px-4 md:px-6 flex items-center justify-between gap-3 shrink-0">
      {/* Search Bar / Command Palette Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-[#EEEEEE] hover:bg-black/5 text-black/60 rounded-xl text-xs font-normal transition-colors cursor-pointer border border-transparent hover:border-black/10"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-4 h-4 text-black/60 shrink-0" />
            <span className="truncate">{t('searchPlaceholder')}</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono bg-white text-black border border-black/15 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Sensitive Data Reveal Toggle */}
        <button
          onClick={toggleRevealSensitive}
          title={revealSensitiveData ? t('maskSensitive') : t('revealSensitive')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
            revealSensitiveData
              ? 'bg-[#EF8E01]/15 border-[#EF8E01] text-black font-semibold'
              : 'bg-white border-black/15 text-black/70 hover:bg-[#EEEEEE]'
          }`}
        >
          {revealSensitiveData ? (
            <>
              <Eye className="w-3.5 h-3.5 text-black" />
              <span className="hidden lg:inline">{t('sensitiveRevealed')}</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-black/60" />
              <span className="hidden lg:inline">{t('masked')}</span>
            </>
          )}
        </button>

        {/* Quick Add Menu */}
        <div className="relative" ref={newMenuRef}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
            icon={<Plus className="w-4 h-4" />}
          >
            <span className="hidden sm:inline">{t('new')}</span>
          </Button>

          {isNewMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-black/10 py-1.5 z-40">
              <button
                onClick={() => {
                  setIsQuickAddLeadOpen(true);
                  setIsNewMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-black hover:bg-[#EEEEEE] flex items-center gap-2"
              >
                <User className="w-4 h-4 text-[#0038BD]" />
                {t('newLead')}
              </button>
              <button
                onClick={() => {
                  setIsScheduleVisitOpen(true);
                  setIsNewMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-black hover:bg-[#EEEEEE] flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#0038BD]" />
                {t('scheduleVisit')}
              </button>
              <button
                onClick={() => {
                  setIsBookingWizardOpen(true);
                  setIsNewMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-black hover:bg-[#EEEEEE] flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#0038BD]" />
                {t('newBooking')}
              </button>
              <div className="h-px bg-[#EEEEEE] my-1" />
              <button
                onClick={() => {
                  setIsRecordPaymentOpen(true);
                  setIsNewMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-black hover:bg-[#EF8E01]/15 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#EF8E01]" />
                {t('recordPayment')}
              </button>
            </div>
          )}
        </div>

        {/* Notification Center */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-black hover:bg-[#EEEEEE] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {overdueCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#EF8E01] border-2 border-white" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-black/10 py-3 z-40">
              <div className="px-4 pb-2 border-b border-[#EEEEEE] flex items-center justify-between">
                <span className="text-xs font-bold text-black uppercase tracking-wider">
                  {t('operationalAlerts')}
                </span>
                <span className="text-[10px] font-semibold bg-[#EF8E01] text-black px-2 py-0.5 rounded-full">
                  {isBn ? toBanglaDigits(overdueCount) : overdueCount} {t('overdue')}
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#EEEEEE]">
                {overdueCount > 0 && (
                  <div
                    onClick={() => {
                      setCurrentSection('overdue_dedicated');
                      setIsNotifOpen(false);
                    }}
                    className="p-3 hover:bg-[#EF8E01]/10 transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#EF8E01] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-black">
                        {isBn ? toBanglaDigits(overdueCount) : overdueCount} {t('overdueAlertText')}
                      </p>
                      <p className="text-[11px] text-black/60 mt-0.5">
                        {isBn
                          ? 'সবচেয়ে পুরোনো ১১২ দিন বকেয়া (5B - মোঃ শহিদুল ইসলাম)।'
                          : 'Oldest is 112 days overdue (5B - Md. Shahidul Islam).'}
                      </p>
                    </div>
                  </div>
                )}

                {expiringHolds > 0 && (
                  <div
                    onClick={() => {
                      setCurrentSection('inventory');
                      setIsNotifOpen(false);
                    }}
                    className="p-3 hover:bg-[#EEEEEE] transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <Clock className="w-4 h-4 text-black/60 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-black">
                        {isBn ? toBanglaDigits(expiringHolds) : expiringHolds} {t('activeHoldsText')}
                      </p>
                      <p className="text-[11px] text-black/60 mt-0.5">
                        {isBn
                          ? 'ডাবল বুকিং প্রতিরোধে হোল্ড টাইমার পর্যবেক্ষণ করুন।'
                          : 'Check hold expiry timers to prevent double booking.'}
                      </p>
                    </div>
                  </div>
                )}

                {visitsToday > 0 && (
                  <div
                    onClick={() => {
                      setCurrentSection('site_visits');
                      setIsNotifOpen(false);
                    }}
                    className="p-3 hover:bg-[#EEEEEE] transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <Calendar className="w-4 h-4 text-[#0038BD] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-black">
                        {isBn ? toBanglaDigits(visitsToday) : visitsToday} {t('visitsTodayText')}
                      </p>
                      <p className="text-[11px] text-black/60 mt-0.5">
                        {isBn
                          ? 'নদিয়া চৌধুরী - বিকাল ৩:০০ টা (Pinnacle Grandeur 3B)।'
                          : 'Nadia Chowdhury at 3:00 PM (Pinnacle Grandeur 3B).'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Language Toggle: EN / বাংলা */}
        <div className="flex items-center bg-[#EEEEEE] rounded-xl p-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              language === 'en' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('bn')}
            className={`px-2 py-1 text-xs font-bangla font-semibold rounded-lg transition-colors cursor-pointer ${
              language === 'bn' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
            }`}
          >
            বাংলা
          </button>
        </div>

        {/* User Role Switcher Dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl hover:bg-[#EEEEEE] border border-black/10 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0038BD] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {roleLabels[userRole].name.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-black leading-tight">
                {roleLabels[userRole].name}
              </span>
              <span className="text-[10px] text-black/60 leading-tight">
                {isBn ? roleLabels[userRole].titleBn : roleLabels[userRole].titleEn}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-black/60" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-black/10 py-2 z-40">
              <div className="px-4 py-2 border-b border-[#EEEEEE]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/60 uppercase">
                  <Shield className="w-3.5 h-3.5 text-[#0038BD]" />
                  {t('switchActiveRole')}
                </div>
              </div>

              {(
                [
                  'sales_manager',
                  'sales_agent',
                  'accounts',
                  'admin',
                ] as UserRole[]
              ).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left flex items-start gap-2.5 hover:bg-[#EEEEEE] transition-colors ${
                    userRole === role ? 'bg-[#0038BD]/10' : ''
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      userRole === role ? 'bg-[#0038BD]' : 'bg-transparent'
                    }`}
                  />
                  <div>
                    <p className="text-xs font-bold text-black">{roleLabels[role].name}</p>
                    <p className="text-[11px] text-black/60">
                      {isBn ? roleLabels[role].titleBn : roleLabels[role].titleEn}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
