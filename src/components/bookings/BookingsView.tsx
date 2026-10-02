import React, { useState } from 'react';
import {
  Plus,
  Search,
  Printer,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatDate, toBanglaDigits, formatSqFt } from '../../utils/formatters';
import { Button } from '../common/Button';
import { BookingWizardModal } from './BookingWizardModal';

export const BookingsView: React.FC = () => {
  const {
    units,
    setIsBookingWizardOpen,
    payments,
    setReceiptPayment,
    setIsReceiptModalOpen,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [searchQuery, setSearchQuery] = useState('');

  // Collect booked units
  const bookedUnits = units.filter((u) => u.status === 'booked' || u.status === 'sold');

  const filtered = bookedUnits.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      u.unitNumber.toLowerCase().includes(q) ||
      u.projectName.toLowerCase().includes(q) ||
      (u.bookedCustomerName && u.bookedCustomerName.toLowerCase().includes(q))
    );
  });

  const handlePrintBookingReceipt = (unit: any) => {
    const relatedPayment = payments.find((p) => p.unitId === unit.id) || payments[0];
    setReceiptPayment(relatedPayment);
    setIsReceiptModalOpen(true);
  };

  const facingMapBn: Record<string, string> = {
    South: 'দক্ষিণমুখী',
    'South-East': 'দক্ষিণ-পূর্বমুখী',
    'North-East': 'উত্তর-পূর্বমুখী',
    East: 'পূর্বমুখী',
    West: 'পশ্চিমমুখী',
    North: 'উত্তরমুখী',
  };

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('bookings')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('bookingsSub')}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsBookingWizardOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="font-bold"
        >
          {t('newBooking')}
        </Button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'ফ্ল্যাট, গ্রাহক বা প্রজেক্ট খুঁজুন...' : 'Search booking by unit, customer, or project...'}
            className="w-full pl-9 pr-3 py-2 bg-[#EEEEEE] border border-transparent focus:border-black/20 rounded-xl text-xs text-black outline-none"
          />
        </div>

        <div className="text-xs font-semibold text-black/70">
          {isBn ? 'মোট বুকিং ও বিক্রিত: ' : 'Total Booked & Sold: '}
          <strong className="text-black font-mono">
            {isBn ? toBanglaDigits(bookedUnits.length) : bookedUnits.length} {t('kpiUnits')}
          </strong>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                <th className="py-3 px-3">{t('thUnitProject')}</th>
                <th className="py-3 px-3">{t('thBuyer')}</th>
                <th className="py-3 px-3">{t('thBookingDate')}</th>
                <th className="py-3 px-3 text-right">{t('thFlatPrice')}</th>
                <th className="py-3 px-3">{t('status')}</th>
                <th className="py-3 px-3 text-right">{t('thOfficialReceipt')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((unit) => (
                <tr key={unit.id} className="hover:bg-[#EEEEEE]/50 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#0038BD]/10 text-[#0038BD] font-bold font-mono">
                        Unit {unit.unitNumber}
                      </span>
                      <div>
                        <p className="font-bold text-black">{unit.projectName}</p>
                        <p className="text-[11px] text-black/60">
                          {isBn ? `লেভেল ${toBanglaDigits(unit.floor)}` : `Floor ${unit.floor}`} · {formatSqFt(unit.sizeSqFt, language)} · {isBn ? facingMapBn[unit.facing] || unit.facing : unit.facing}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <p className="font-bold text-black">{unit.bookedCustomerName || (isBn ? 'নিবন্ধিত ক্রেতা' : 'Registered Buyer')}</p>
                    <p className="text-[11px] text-black/60">{isBn ? 'চুক্তি সম্পাদিত' : 'Agreement executed'}</p>
                  </td>

                  <td className="py-3.5 px-3 text-black font-medium">{formatDate(unit.bookingDate || '15 Feb 2025', language)}</td>

                  <td className="py-3.5 px-3 text-right font-mono font-bold text-black tabular-nums">
                    {formatBDT(unit.totalPrice, false, language)}
                  </td>

                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase ${
                        unit.status === 'sold'
                          ? 'bg-[#0038BD] text-white'
                          : 'bg-[#EF8E01] text-black'
                      }`}
                    >
                      {unit.status === 'sold' ? t('sold') : t('booked')}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrintBookingReceipt(unit)}
                      icon={<Printer className="w-3.5 h-3.5 text-[#0038BD]" />}
                      className="text-xs h-[30px]"
                    >
                      {t('printReceipt')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BookingWizardModal />
    </div>
  );
};
