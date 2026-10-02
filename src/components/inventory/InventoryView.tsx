import React, { useState } from 'react';
import {
  Building2,
  Check,
  Clock,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlatStatus } from '../../types';
import { formatBDT, formatSqFt, formatDate, toBanglaDigits } from '../../utils/formatters';
import { UnitDetailDrawer } from './UnitDetailDrawer';

export const InventoryView: React.FC = () => {
  const { projects, units, setSelectedUnit, language, t } = useApp();
  const isBn = language === 'bn';

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'proj-1');
  const [statusFilter, setStatusFilter] = useState<'all' | FlatStatus>('all');
  const [bedroomFilter, setBedroomFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const projectUnits = units.filter((u) => u.projectId === activeProjectId);

  const filteredUnits = projectUnits
    .filter((u) => (statusFilter === 'all' ? true : u.status === statusFilter))
    .filter((u) => (bedroomFilter === 'all' ? true : u.bedrooms.toString() === bedroomFilter))
    .filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        u.unitNumber.toLowerCase().includes(q) ||
        u.floor.toString().includes(q) ||
        (u.bookedCustomerName && u.bookedCustomerName.toLowerCase().includes(q)) ||
        (u.heldByLeadName && u.heldByLeadName.toLowerCase().includes(q))
      );
    });

  const availableCount = projectUnits.filter((u) => u.status === 'available').length;
  const holdCount = projectUnits.filter((u) => u.status === 'hold').length;
  const bookedCount = projectUnits.filter((u) => u.status === 'booked').length;
  const soldCount = projectUnits.filter((u) => u.status === 'sold').length;

  const floorNumbers = Array.from(new Set(projectUnits.map((u) => u.floor))).sort((a, b) => b - a);

  const facingMapBn: Record<string, string> = {
    South: 'দক্ষিণমুখী',
    'South-East': 'দক্ষিণ-পূর্বমুখী',
    'North-East': 'উত্তর-পূর্বমুখী',
    East: 'পূর্বমুখী',
    West: 'পশ্চিমমুখী',
    North: 'উত্তরমুখী',
  };

  return (
    <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('inventory')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('inventorySub')}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 bg-white px-3 py-2 rounded-xl border border-black/10 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm border-2 border-[#0038BD] bg-white" />
            <span className="text-black font-semibold">{t('available')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#EEEEEE] border border-black/20" />
            <span className="text-black font-medium">{t('hold')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#EF8E01]/25 border border-[#EF8E01]" />
            <span className="text-black font-semibold">{t('booked')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#0038BD]" />
            <span className="text-black font-semibold">{t('sold')}</span>
          </div>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {projects.map((proj) => {
          const isSelected = proj.id === activeProjectId;
          const pUnits = units.filter((u) => u.projectId === proj.id);
          const pSold = pUnits.filter((u) => u.status === 'sold' || u.status === 'booked').length;
          const pPercent = Math.round((pSold / pUnits.length) * 100) || 0;

          return (
            <button
              key={proj.id}
              onClick={() => setActiveProjectId(proj.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#0038BD] shadow-sm ring-1 ring-[#0038BD]'
                  : 'bg-white border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black">{proj.name}</h3>
                  <p className="text-[11px] text-black/60 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#0038BD]" /> {proj.location}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-black bg-[#EEEEEE] px-2 py-0.5 rounded-md">
                  {isBn ? toBanglaDigits(proj.totalFloors) : proj.totalFloors} {isBn ? 'তলা' : 'Floors'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[11px] text-black/70">
                  <span>
                    {isBn ? 'বিক্রিত / বুকড: ' : 'Sold / Booked: '}
                    {isBn ? `${toBanglaDigits(pSold)}/${toBanglaDigits(pUnits.length)}` : `${pSold}/${pUnits.length}`}
                  </span>
                  <span className="font-bold font-mono">
                    {isBn ? toBanglaDigits(pPercent) : pPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#EEEEEE] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0038BD] h-full rounded-full transition-all"
                    style={{ width: `${pPercent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Status filter tabs */}
        <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs">
          {[
            { id: 'all', label: `${isBn ? 'সব' : 'All'} (${isBn ? toBanglaDigits(projectUnits.length) : projectUnits.length})` },
            { id: 'available', label: `${t('available')} (${isBn ? toBanglaDigits(availableCount) : availableCount})` },
            { id: 'hold', label: `${isBn ? 'হোল্ড' : 'Hold'} (${isBn ? toBanglaDigits(holdCount) : holdCount})` },
            { id: 'booked', label: `${t('booked')} (${isBn ? toBanglaDigits(bookedCount) : bookedCount})` },
            { id: 'sold', label: `${t('sold')} (${isBn ? toBanglaDigits(soldCount) : soldCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-white text-black shadow-2xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bedroom & Search filter */}
        <div className="flex items-center gap-2">
          <select
            value={bedroomFilter}
            onChange={(e) => setBedroomFilter(e.target.value)}
            className="text-xs font-medium bg-[#EEEEEE] border border-black/10 rounded-xl px-3 py-2 text-black outline-none cursor-pointer"
          >
            <option value="all">{t('allBeds')}</option>
            <option value="3">{t('beds3')}</option>
            <option value="4">{t('beds4')}</option>
            <option value="5">{t('beds5')}</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'ফ্ল্যাট নম্বর লিখুন (যেমন 5B)...' : 'Search unit (e.g. 5B)...'}
            className="text-xs px-3 py-2 bg-[#EEEEEE] border border-transparent focus:border-black/20 rounded-xl text-black outline-none w-36 sm:w-48"
          />
        </div>
      </div>

      {/* Interactive Tower View / Floor Matrix */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xs p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-[#EEEEEE] mb-4">
          <div>
            <h3 className="text-base font-bold text-black flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0038BD]" />
              {currentProject.name} — {isBn ? 'ফ্লোর অনুযায়ী টাওয়ার ভিউ' : 'Architectural Tower Grid'}
            </h3>
            <p className="text-xs text-black/60 mt-0.5">
              {isBn
                ? 'আবাসিক ফ্লোরভিত্তিক ভিউ। বিস্তারিত দেখতে, ৪৮ ঘণ্টা হোল্ড করতে বা বুকিং করতে ফ্ল্যাট টাইলসে ক্লিক করুন।'
                : 'Top-down elevation matrix. Click any unit tile to inspect blueprints, hold 48h, or start booking.'}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-black/60">{isBn ? 'সম্ভাব্য হ্যান্ডওভার:' : 'Estimated Handover:'}</span>
            <span className="text-xs font-bold text-black block">{formatDate(currentProject.handoverDate, language)}</span>
          </div>
        </div>

        {/* Tower Floor by Floor Stack */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {floorNumbers.map((floorNum) => {
            const unitsOnThisFloor = filteredUnits.filter((u) => u.floor === floorNum);

            return (
              <div key={floorNum} className="flex items-center gap-3">
                {/* Floor Label Badge */}
                <div className="w-20 shrink-0 text-right pr-2">
                  <span className="text-xs font-mono font-bold text-black/70 block">
                    {isBn ? `ফ্লোর ${toBanglaDigits(floorNum)}` : `Floor ${floorNum}`}
                  </span>
                  <span className="text-[10px] text-black/40">
                    {isBn ? `লেভেল ${toBanglaDigits(floorNum)}` : `Level ${floorNum}`}
                  </span>
                </div>

                {/* Units on Floor */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {unitsOnThisFloor.map((unit) => {
                    const isAvailable = unit.status === 'available';
                    const isHold = unit.status === 'hold';
                    const isBooked = unit.status === 'booked';
                    const isSold = unit.status === 'sold';

                    return (
                      <div
                        key={unit.id}
                        onClick={() => setSelectedUnit(unit)}
                        className={`p-3.5 rounded-xl transition-all duration-150 cursor-pointer shadow-2xs select-none ${
                          isAvailable
                            ? 'bg-white border-2 border-[#0038BD] hover:bg-[#0038BD]/5 text-black'
                            : isHold
                            ? 'bg-[#EEEEEE] border border-black/25 text-black hover:bg-black/10'
                            : isBooked
                            ? 'bg-[#EF8E01]/20 border border-[#EF8E01] text-black hover:bg-[#EF8E01]/30'
                            : 'bg-[#0038BD] text-white hover:bg-[#002FA0]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-sm font-black font-mono tracking-tight block">
                              Unit {unit.unitNumber}
                            </span>
                            <span
                              className={`text-[11px] font-medium block mt-0.5 ${
                                isSold ? 'text-white/80' : 'text-black/60'
                              }`}
                            >
                              {formatSqFt(unit.sizeSqFt, language)} · {isBn ? facingMapBn[unit.facing] || unit.facing : unit.facing}
                            </span>
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-xs font-mono font-bold block ${
                                isSold ? 'text-white' : 'text-black'
                              }`}
                            >
                              {formatBDT(unit.totalPrice, true, language)}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold inline-flex items-center gap-1 ${
                                isSold
                                  ? 'text-white'
                                  : isHold
                                  ? 'text-black font-bold'
                                  : isBooked
                                  ? 'text-black font-bold'
                                  : 'text-[#0038BD]'
                              }`}
                            >
                              {isHold && <Clock className="w-3 h-3 text-black" />}
                              {isBooked && <CheckCircle2 className="w-3 h-3 text-black" />}
                              {isSold && <Check className="w-3 h-3 text-white" />}
                              {isAvailable
                                ? t('available')
                                : isHold
                                ? t('hold')
                                : isBooked
                                ? t('booked')
                                : t('sold')}
                            </span>
                          </div>
                        </div>

                        {/* Additional Holder / Buyer info if active */}
                        {isHold && unit.heldByLeadName && (
                          <div className="mt-2 pt-1.5 border-t border-black/15 text-[10px] text-black font-semibold flex items-center justify-between">
                            <span>{isBn ? 'হোল্ড: ' : 'Hold: '}{unit.heldByLeadName.split(' ')[0]}</span>
                            <span className="bg-[#EF8E01] text-black px-1.5 py-0.2 rounded font-bold font-mono">
                              {isBn ? '৪৮ঘ' : '48h'}
                            </span>
                          </div>
                        )}

                        {isBooked && unit.bookedCustomerName && (
                          <div className="mt-2 pt-1.5 border-t border-[#EF8E01]/40 text-[10px] text-black font-semibold truncate">
                            {isBn ? 'বুকিংকারী: ' : 'Booked: '}{unit.bookedCustomerName}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      <UnitDetailDrawer />
    </div>
  );
};
