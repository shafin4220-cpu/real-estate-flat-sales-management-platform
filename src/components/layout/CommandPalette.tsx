import React, { useState, useEffect } from 'react';
import {
  Search,
  User,
  Building,
  CreditCard,
  Calendar,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatDaysLate } from '../../utils/formatters';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    leads,
    units,
    customers,
    installments,
    setSelectedLead,
    setSelectedUnit,
    setSelectedCustomer,
    setCurrentSection,
    setIsRecordPaymentOpen,
    setPaymentTargetInstallment,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedLeads = q
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.interestedProjectName.toLowerCase().includes(q)
      )
    : leads.slice(0, 3);

  const matchedUnits = q
    ? units.filter(
        (u) =>
          u.unitNumber.toLowerCase().includes(q) ||
          u.projectName.toLowerCase().includes(q)
      )
    : units.slice(0, 3);

  const matchedCustomers = q
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.flatsOwned.some((f) => f.unitNumber.toLowerCase().includes(q))
      )
    : customers.slice(0, 3);

  const matchedOverdue = installments.filter(
    (i) =>
      i.status === 'overdue' &&
      (i.customerName.toLowerCase().includes(q) ||
        i.unitNumber.toLowerCase().includes(q) ||
        i.projectName.toLowerCase().includes(q))
  );

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs ${isBn ? 'font-bangla' : ''}`}>
      <div
        className="fixed inset-0"
        onClick={() => setIsCommandPaletteOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-black/15 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Input Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#EEEEEE] bg-white">
          <Search className="w-5 h-5 text-black/60 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('cmdSearchPlaceholder')}
            className="w-full text-sm font-medium text-black placeholder:text-black/40 bg-transparent outline-none"
            autoFocus
          />
          <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEEEEE] text-black/60 border border-black/10">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 space-y-4">
          {/* Overdue Hook Quick Jump */}
          {matchedOverdue.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-bold text-[#EF8E01] uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t('cmdOverdueSection')}
              </div>
              <div className="mt-1 space-y-1">
                {matchedOverdue.slice(0, 3).map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => {
                      setPaymentTargetInstallment(inst);
                      setIsRecordPaymentOpen(true);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#EF8E01]/10 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-black">
                        {inst.unitNumber} - {inst.customerName}
                      </p>
                      <p className="text-[11px] text-black/60">
                        {inst.projectName} · {formatDaysLate(inst.daysLate, language)} · {isBn ? 'বকেয়া: ' : 'Balance: '}
                        {formatBDT(inst.balance, false, language)}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-black bg-[#EF8E01] px-2 py-0.5 rounded-md">
                      {t('recordPay')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flats / Units */}
          {matchedUnits.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-bold text-black/60 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#0038BD]" />
                {t('cmdInventorySection')}
              </div>
              <div className="mt-1 space-y-1">
                {matchedUnits.map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => {
                      setSelectedUnit(unit);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#EEEEEE] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-black">
                        Unit {unit.unitNumber} ({unit.projectName})
                      </p>
                      <p className="text-[11px] text-black/60">
                        {isBn ? `লেভেল ${unit.floor}` : `Floor ${unit.floor}`} · {unit.sizeSqFt} sq ft · {unit.bedrooms} Bed ·{' '}
                        {formatBDT(unit.totalPrice, true, language)}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-black/70 flex items-center gap-1">
                      {t('thDetails')} <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leads */}
          {matchedLeads.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-bold text-black/60 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0038BD]" />
                {t('cmdLeadsSection')}
              </div>
              <div className="mt-1 space-y-1">
                {matchedLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#EEEEEE] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-black">{lead.name}</p>
                      <p className="text-[11px] text-black/60">
                        {lead.phone} · {lead.interestedProjectName}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-black/70 flex items-center gap-1">
                      {t('openLead')} <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customers */}
          {matchedCustomers.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-bold text-black/60 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#0038BD]" />
                {t('cmdCustomersSection')}
              </div>
              <div className="mt-1 space-y-1">
                {matchedCustomers.map((cust) => (
                  <button
                    key={cust.id}
                    onClick={() => {
                      setSelectedCustomer(cust);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#EEEEEE] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-black">{cust.name}</p>
                      <p className="text-[11px] text-black/60">
                        {cust.flatsOwned.map((f) => f.unitNumber).join(', ')} ·{' '}
                        {isBn ? 'বকেয়া: ' : 'Total Due: '}
                        {formatBDT(cust.totalDue, true, language)}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-black/70 flex items-center gap-1">
                      {t('viewProfile')} <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
