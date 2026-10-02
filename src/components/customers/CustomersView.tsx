import React, { useState } from 'react';
import {
  Search,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, maskPhone, maskNID, toBanglaDigits } from '../../utils/formatters';
import { CustomerDetailDrawer } from './CustomerDetailDrawer';

export const CustomersView: React.FC = () => {
  const {
    customers,
    setSelectedCustomer,
    revealSensitiveData,
    toggleRevealSensitive,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.flatsOwned.some(
        (f) =>
          f.unitNumber.toLowerCase().includes(q) ||
          f.projectName.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('customerDirectoryTitle')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('customerDirectorySubtitle')}
          </p>
        </div>

        {/* Security sensitivity toggle button */}
        <button
          onClick={toggleRevealSensitive}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
            revealSensitiveData
              ? 'bg-[#EF8E01]/15 border-[#EF8E01] text-black'
              : 'bg-white border-black/15 text-black hover:bg-[#EEEEEE]'
          }`}
        >
          {revealSensitiveData ? (
            <>
              <Eye className="w-3.5 h-3.5 text-black" />
              <span>{t('nidContactsRevealed')}</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-black/60" />
              <span>{t('nidPhoneMasked')}</span>
            </>
          )}
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'গ্রাহকের নাম, ফোন, বা ফ্ল্যাট খুঁজুন...' : 'Search customer by name, phone, flat...'}
            className="w-full pl-9 pr-3 py-2 bg-[#EEEEEE] border border-transparent focus:border-black/20 rounded-xl text-xs text-black outline-none"
          />
        </div>

        <div className="text-xs font-semibold text-black/70">
          {t('totalRegisteredOwners')}{' '}
          <strong className="text-black font-mono">
            {isBn ? `${toBanglaDigits(customers.length)} জন` : `${customers.length} Owners`}
          </strong>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                <th className="py-3 px-3">{t('thCustomer')}</th>
                <th className="py-3 px-3">{t('thNationalId')}</th>
                <th className="py-3 px-3">{t('thPhone')}</th>
                <th className="py-3 px-3">{t('thFlatsOwned')}</th>
                <th className="py-3 px-3 text-right">{t('thCommittedValue')}</th>
                <th className="py-3 px-3 text-right">{t('thTotalPaid')}</th>
                <th className="py-3 px-3 text-right">{t('thBalanceDue')}</th>
                <th className="py-3 px-3 text-right">{t('thProfile')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-[#EEEEEE]/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-black">{cust.name}</p>
                    <p className="text-[11px] text-black/60">{cust.profession}</p>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-black/80">
                    {maskNID(cust.nidMasked, revealSensitiveData)}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-black/80">
                    {maskPhone(cust.phone, revealSensitiveData)}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {cust.flatsOwned.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#0038BD]/10 text-[#0038BD] font-bold text-[11px] font-mono"
                        >
                          {f.unitNumber}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-semibold text-black">
                    {formatBDT(cust.totalCommitted, false, language)}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono text-[#0038BD] font-semibold">
                    {formatBDT(cust.totalPaid, false, language)}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-bold text-black tabular-nums">
                    {formatBDT(cust.totalDue, false, language)}
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <span className="text-[#0038BD] font-bold inline-flex items-center gap-1 hover:underline">
                      {t('viewProfile')} <ArrowRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerDetailDrawer />
    </div>
  );
};
