import React from 'react';
import {
  LayoutDashboard,
  Users2,
  Building2,
  AlertTriangle,
  Menu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBanglaDigits } from '../../utils/formatters';

export const MobileNav: React.FC<{ onOpenMobileMenu: () => void }> = ({
  onOpenMobileMenu,
}) => {
  const { currentSection, setCurrentSection, installments, language, t } = useApp();
  const overdueCount = installments.filter((i) => i.status === 'overdue').length;
  const isBn = language === 'bn';

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EEEEEE] px-2 py-1.5 flex items-center justify-around shadow-lg ${isBn ? 'font-bangla' : ''}`}>
      <button
        onClick={() => setCurrentSection('dashboard')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-semibold min-w-[50px] min-h-[44px] ${
          currentSection === 'dashboard' ? 'text-[#0038BD]' : 'text-black/60'
        }`}
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        {isBn ? 'ড্যাশবোর্ড' : 'Home'}
      </button>

      <button
        onClick={() => setCurrentSection('leads')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-semibold min-w-[50px] min-h-[44px] ${
          currentSection === 'leads' ? 'text-[#0038BD]' : 'text-black/60'
        }`}
      >
        <Users2 className="w-5 h-5 mb-0.5" />
        {isBn ? 'লিডস' : 'Leads'}
      </button>

      <button
        onClick={() => setCurrentSection('overdue_dedicated')}
        className={`relative flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-bold min-w-[54px] min-h-[44px] ${
          currentSection === 'overdue_dedicated'
            ? 'text-[#EF8E01] font-bold'
            : 'text-black'
        }`}
      >
        <div className="relative">
          <AlertTriangle className="w-5 h-5 mb-0.5 text-[#EF8E01]" />
          {overdueCount > 0 && (
            <span className="absolute -top-1 -right-2 text-[9px] bg-[#EF8E01] text-black font-extrabold px-1 rounded-full font-mono">
              {isBn ? toBanglaDigits(overdueCount) : overdueCount}
            </span>
          )}
        </div>
        {isBn ? 'বকেয়া' : 'Overdue'}
      </button>

      <button
        onClick={() => setCurrentSection('inventory')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-semibold min-w-[50px] min-h-[44px] ${
          currentSection === 'inventory' ? 'text-[#0038BD]' : 'text-black/60'
        }`}
      >
        <Building2 className="w-5 h-5 mb-0.5" />
        {isBn ? 'ফ্ল্যাট' : 'Flats'}
      </button>

      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-semibold text-black/60 min-w-[50px] min-h-[44px]"
      >
        <Menu className="w-5 h-5 mb-0.5" />
        {isBn ? 'মেনু' : 'More'}
      </button>
    </div>
  );
};
