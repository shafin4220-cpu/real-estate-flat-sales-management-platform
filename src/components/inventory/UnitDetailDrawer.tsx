import React, { useState, useEffect } from 'react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatSqFt, getTimeRemaining, toBanglaDigits } from '../../utils/formatters';
import {
  Building,
  Maximize2,
  Compass,
  Bed,
  Bath,
  Sun,
  Car,
  Zap,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const UnitDetailDrawer: React.FC = () => {
  const {
    selectedUnit,
    setSelectedUnit,
    holdUnit,
    releaseHold,
    setIsBookingWizardOpen,
    setWizardSelectedUnit,
    leads,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [timerText, setTimerText] = useState<string>('');
  const [isHoldExpired, setIsHoldExpired] = useState<boolean>(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');

  useEffect(() => {
    if (!selectedUnit || selectedUnit.status !== 'hold' || !selectedUnit.holdExpiresAt) {
      setTimerText('');
      return;
    }

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(selectedUnit.holdExpiresAt!, language);
      setTimerText(remaining.formatted);
      setIsHoldExpired(remaining.expired);
      if (remaining.expired) {
        releaseHold(selectedUnit.id);
      }
    }, 1000);

    const initial = getTimeRemaining(selectedUnit.holdExpiresAt, language);
    setTimerText(initial.formatted);
    setIsHoldExpired(initial.expired);

    return () => clearInterval(interval);
  }, [selectedUnit, releaseHold, language]);

  if (!selectedUnit) return null;

  const handleHoldClick = () => {
    const lead = leads.find((l) => l.id === selectedLeadId);
    holdUnit(selectedUnit.id, lead?.id, lead?.name);
  };

  const handleBookNow = () => {
    setWizardSelectedUnit(selectedUnit);
    setIsBookingWizardOpen(true);
    setSelectedUnit(null);
  };

  const facingMapBn: Record<string, string> = {
    South: 'দক্ষিণমুখী',
    'South-East': 'দক্ষিণ-পূর্বমুখী',
    'North-East': 'উত্তর-পূর্বমুখী',
    East: 'পূর্বমুখী',
    West: 'পশ্চিমমুখী',
    North: 'উত্তরমুখী',
  };

  const unitFacing = isBn ? facingMapBn[selectedUnit.facing] || selectedUnit.facing : selectedUnit.facing;

  return (
    <Drawer
      isOpen={!!selectedUnit}
      onClose={() => setSelectedUnit(null)}
      title={`Unit ${selectedUnit.unitNumber} · ${selectedUnit.projectName}`}
      subtitle={`${isBn ? 'লেভেল ' + toBanglaDigits(selectedUnit.floor) : 'Floor ' + selectedUnit.floor} · ${selectedUnit.building}`}
      width="lg"
    >
      <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
        {/* Status & Price Banner */}
        <div className="p-4 rounded-2xl bg-white border border-black/15 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-black/60 uppercase font-bold tracking-wider block">
              {t('totalPackagePrice')}
            </span>
            <span className="text-2xl font-black text-black font-mono tabular-nums">
              {formatBDT(selectedUnit.totalPrice, false, language)}
            </span>
            <span className="text-xs text-black/60 block mt-0.5">
              @ ৳ {isBn ? toBanglaDigits(selectedUnit.pricePerSqFt.toLocaleString()) : selectedUnit.pricePerSqFt.toLocaleString()} / {isBn ? 'বর্গফুট' : 'sq ft'}
            </span>
          </div>

          <div>
            <StatusBadge type="flat" status={selectedUnit.status} />
          </div>
        </div>

        {/* 48-Hour Hold Countdown Box (Anti-Double Booking Feature) */}
        {selectedUnit.status === 'hold' && (
          <div className="p-4 rounded-2xl bg-[#EF8E01]/15 border-2 border-[#EF8E01] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-black" />
                {t('activeHold48h')}
              </span>
              <span className="text-xs font-mono font-bold bg-[#EF8E01] text-black px-2 py-0.5 rounded">
                {timerText || (isBn ? 'সক্রিয় হোল্ড' : 'Active Hold')}
              </span>
            </div>
            <p className="text-xs text-black/80">
              {isBn
                ? `${selectedUnit.heldByLeadName}-এর জন্য সংরক্ষিত। নির্ধারিত সময়ের মধ্যে বায়না টাকা জমা না হলে ফ্ল্যাটটি স্বয়ংক্রিয়ভাবে পুনরায় খালি তালিকায় চলে যাবে।`
                : `Reserved for ${selectedUnit.heldByLeadName}. If token money is not received within this period, unit automatically releases back to Available inventory.`}
            </p>
            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => releaseHold(selectedUnit.id)}
                className="text-xs bg-white"
              >
                {t('releaseHold')}
              </Button>
            </div>
          </div>
        )}

        {/* Hold or Book Actions */}
        {selectedUnit.status === 'available' && (
          <div className="p-4 rounded-2xl bg-[#EEEEEE] border border-black/10 space-y-3">
            <h4 className="text-xs font-bold text-black">{t('lockUnit')}</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="text-xs p-2 bg-white border border-black/15 rounded-xl text-black outline-none flex-1 font-medium cursor-pointer"
              >
                <option value="">{t('selectProspectiveLead')}</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.phone})
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleHoldClick}
                icon={<Clock className="w-3.5 h-3.5 text-black" />}
                className="whitespace-nowrap"
              >
                {t('hold48h')}
              </Button>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleBookNow}
              className="w-full font-bold shadow-xs"
            >
              {t('startBookingProcess')}
            </Button>
          </div>
        )}

        {selectedUnit.status === 'booked' && (
          <div className="p-4 rounded-xl bg-[#0038BD]/10 border border-[#0038BD]/30 text-xs space-y-1">
            <span className="font-bold text-[#0038BD] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {t('bookedCustomerLabel')}
            </span>
            <p className="text-sm font-bold text-black">{selectedUnit.bookedCustomerName}</p>
            <p className="text-black/60">{isBn ? 'বুকিংয়ের তারিখ: ' : 'Booking Date: '}{formatDate(selectedUnit.bookingDate, language)}</p>
          </div>
        )}

        {/* Flat Specifications Grid */}
        <div>
          <h4 className="text-xs font-bold text-black mb-2">{t('architecturalSpecs')}</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
              <Maximize2 className="w-4 h-4 mx-auto text-[#0038BD] mb-1" />
              <span className="text-[10px] text-black/50 uppercase block">{t('specSize')}</span>
              <span className="font-bold text-black">{formatSqFt(selectedUnit.sizeSqFt, language)}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
              <Compass className="w-4 h-4 mx-auto text-[#0038BD] mb-1" />
              <span className="text-[10px] text-black/50 uppercase block">{t('specFacing')}</span>
              <span className="font-bold text-black">{unitFacing}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
              <Bed className="w-4 h-4 mx-auto text-[#0038BD] mb-1" />
              <span className="text-[10px] text-black/50 uppercase block">{t('specBedrooms')}</span>
              <span className="font-bold text-black">
                {isBn ? `${toBanglaDigits(selectedUnit.bedrooms)}টি বেড` : `${selectedUnit.bedrooms} Beds`}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
              <Bath className="w-4 h-4 mx-auto text-[#0038BD] mb-1" />
              <span className="text-[10px] text-black/50 uppercase block">{t('specBathrooms')}</span>
              <span className="font-bold text-black">
                {isBn ? `${toBanglaDigits(selectedUnit.bathrooms)}টি বাথ` : `${selectedUnit.bathrooms} Baths`}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
              <Sun className="w-4 h-4 mx-auto text-[#0038BD] mb-1" />
              <span className="text-[10px] text-black/50 uppercase block">{t('specBalconies')}</span>
              <span className="font-bold text-black">
                {isBn ? `${toBanglaDigits(selectedUnit.balconies)}টি বারান্দা` : `${selectedUnit.balconies} Verandas`}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
              <Building className="w-4 h-4 mx-auto text-[#0038BD] mb-1" />
              <span className="text-[10px] text-black/50 uppercase block">{t('specFloor')}</span>
              <span className="font-bold text-black">
                {isBn ? `লেভেল ${toBanglaDigits(selectedUnit.floor)}` : `Level ${selectedUnit.floor}`}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Price Breakdown */}
        <div>
          <h4 className="text-xs font-bold text-black mb-2">{t('priceBreakdown')}</h4>
          <div className="rounded-xl border border-black/15 bg-white divide-y divide-[#EEEEEE] text-xs">
            <div className="p-2.5 flex justify-between">
              <span className="text-black/70">
                {t('basePrice')} ({formatSqFt(selectedUnit.sizeSqFt, language)} × ৳ {isBn ? toBanglaDigits(selectedUnit.pricePerSqFt.toLocaleString()) : selectedUnit.pricePerSqFt.toLocaleString()})
              </span>
              <span className="font-mono font-bold text-black">
                {formatBDT(selectedUnit.basePrice, false, language)}
              </span>
            </div>

            <div className="p-2.5 flex justify-between">
              <span className="text-black/70 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-black/50" /> {t('reservedParking')}
              </span>
              <span className="font-mono font-bold text-black">
                {formatBDT(selectedUnit.parkingPrice, false, language)}
              </span>
            </div>

            <div className="p-2.5 flex justify-between">
              <span className="text-black/70 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-black/50" /> {t('utilityConnection')}
              </span>
              <span className="font-mono font-bold text-black">
                {formatBDT(selectedUnit.utilityCharges, false, language)}
              </span>
            </div>

            <div className="p-3 flex justify-between bg-[#EEEEEE]/50 font-bold text-sm">
              <span className="text-black">{t('grandTotalPackage')}</span>
              <span className="font-mono text-black">{formatBDT(selectedUnit.totalPrice, false, language)}</span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
