/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { LeadsView } from './components/leads/LeadsView';
import { SiteVisitsView } from './components/sitevisits/SiteVisitsView';
import { InventoryView } from './components/inventory/InventoryView';
import { BookingsView } from './components/bookings/BookingsView';
import { InstallmentsView } from './components/installments/InstallmentsView';
import { OverdueDedicatedView } from './components/installments/OverdueDedicatedView';
import { CustomersView } from './components/customers/CustomersView';
import { AgentsView } from './components/agents/AgentsView';
import { RemindersView } from './components/reminders/RemindersView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';

// Global Modals
import { RecordPaymentModal } from './components/installments/RecordPaymentModal';
import { PaymentReceiptModal } from './components/installments/PaymentReceiptModal';
import { SendReminderModal } from './components/installments/SendReminderModal';

const AppContent: React.FC = () => {
  const { currentSection, setCurrentSection, language, t } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isBn = language === 'bn';

  const renderActiveView = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardView />;
      case 'leads':
        return <LeadsView />;
      case 'site_visits':
        return <SiteVisitsView />;
      case 'inventory':
        return <InventoryView />;
      case 'bookings':
        return <BookingsView />;
      case 'overdue_dedicated':
        return <OverdueDedicatedView />;
      case 'installments':
        return <InstallmentsView />;
      case 'customers':
        return <CustomersView />;
      case 'agents':
        return <AgentsView />;
      case 'reminders':
        return <RemindersView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden bg-[#EEEEEE] text-black ${isBn ? 'font-bangla' : ''}`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <TopBar />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">{renderActiveView()}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer Menu (When 'More' clicked on mobile) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div
            className="fixed inset-0"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 bg-white h-full p-4 space-y-2 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <span className="font-bold text-sm text-black">{t('allModules')}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-black/60 p-1"
              >
                {t('close')} ✕
              </button>
            </div>
            {[
              { id: 'dashboard', label: t('dashboard') },
              { id: 'leads', label: t('leads') },
              { id: 'site_visits', label: t('siteVisits') },
              { id: 'inventory', label: t('inventory') },
              { id: 'bookings', label: t('bookings') },
              { id: 'overdue_dedicated', label: t('overdueInstallments') },
              { id: 'installments', label: t('installments') },
              { id: 'customers', label: t('customers') },
              { id: 'agents', label: t('agents') },
              { id: 'reminders', label: t('reminders') },
              { id: 'reports', label: t('reports') },
              { id: 'settings', label: t('settings') },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setCurrentSection(m.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold ${
                  currentSection === m.id
                    ? 'bg-[#0038BD] text-white'
                    : m.id === 'overdue_dedicated'
                    ? 'bg-[#EF8E01] text-black font-bold'
                    : 'hover:bg-[#EEEEEE] text-black'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Global Modals & Notifications */}
      <ToastContainer />
      <CommandPalette />
      <RecordPaymentModal />
      <PaymentReceiptModal />
      <SendReminderModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
