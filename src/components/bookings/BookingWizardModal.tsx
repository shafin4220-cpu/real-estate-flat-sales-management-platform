import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatSqFt, toBanglaDigits } from '../../utils/formatters';
import { PaymentMethod } from '../../types';
import { translatePaymentMethod } from '../../utils/translations';
import { Check, ChevronRight, User, Building, CreditCard, FileCheck } from 'lucide-react';

export const BookingWizardModal: React.FC = () => {
  const {
    isBookingWizardOpen,
    setIsBookingWizardOpen,
    wizardSelectedUnit,
    units,
    customers,
    createBooking,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [step, setStep] = useState<number>(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || 'cust-1');
  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    wizardSelectedUnit?.id || units.find((u) => u.status === 'available')?.id || ''
  );
  const [bookingMoney, setBookingMoney] = useState<number>(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [installmentsCount, setInstallmentsCount] = useState<number>(36);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Bank Transfer');

  if (!isBookingWizardOpen) return null;

  const currentUnit =
    units.find((u) => u.id === selectedUnitId) || wizardSelectedUnit || units[0];
  const currentCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const downPaymentAmount = Math.round(currentUnit.totalPrice * (downPaymentPercent / 100));
  const remainingForInstallments = currentUnit.totalPrice - downPaymentAmount;
  const monthlyInstallment = Math.round(remainingForInstallments / installmentsCount);

  const handleFinishBooking = () => {
    createBooking({
      customerId: selectedCustomerId,
      unitId: selectedUnitId,
      bookingMoney: Number(bookingMoney),
      paymentMethod,
      downPaymentPercent,
      installmentsCount,
    });
    setIsBookingWizardOpen(false);
    setStep(1);
  };

  const steps = [
    { num: 1, title: t('stepCustomer'), icon: <User className="w-3.5 h-3.5" /> },
    { num: 2, title: t('stepFlat'), icon: <Building className="w-3.5 h-3.5" /> },
    { num: 3, title: t('stepPlan'), icon: <CreditCard className="w-3.5 h-3.5" /> },
    { num: 4, title: t('stepConfirm'), icon: <FileCheck className="w-3.5 h-3.5" /> },
  ];

  const facingMapBn: Record<string, string> = {
    South: 'দক্ষিণমুখী',
    'South-East': 'দক্ষিণ-পূর্বমুখী',
    'North-East': 'উত্তর-পূর্বমুখী',
    East: 'পূর্বমুখী',
    West: 'পশ্চিমমুখী',
    North: 'উত্তরমুখী',
  };

  return (
    <Modal
      isOpen={isBookingWizardOpen}
      onClose={() => setIsBookingWizardOpen(false)}
      title={t('wizardTitle')}
      subtitle={t('wizardSubtitle')}
      maxWidth="xl"
    >
      <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
          {steps.map((st) => (
            <div key={st.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === st.num
                    ? 'bg-[#0038BD] text-white'
                    : step > st.num
                    ? 'bg-[#0038BD]/20 text-[#0038BD]'
                    : 'bg-[#EEEEEE] text-black/40'
                }`}
              >
                {step > st.num ? <Check className="w-4 h-4" /> : isBn ? toBanglaDigits(st.num) : st.num}
              </div>
              <span
                className={`text-xs font-bold hidden sm:inline ${
                  step === st.num ? 'text-black' : 'text-black/50'
                }`}
              >
                {st.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Customer */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-black">{t('selectRegisteredBuyer')}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {customers.map((cust) => (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${
                    selectedCustomerId === cust.id
                      ? 'bg-[#0038BD]/10 border-[#0038BD]'
                      : 'bg-white border-black/15 hover:bg-[#EEEEEE]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-black">{cust.name}</p>
                    <p className="text-[11px] text-black/60 font-mono mt-0.5">{cust.phone}</p>
                    <p className="text-[11px] text-black/60">{cust.profession}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-black">
                      {isBn ? `${toBanglaDigits(cust.flatsOwned.length)}টি ফ্ল্যাট কেনা আছে` : `${cust.flatsOwned.length} Flats Owned`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Unit */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-black">{t('stepFlat')}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {units
                .filter((u) => u.status === 'available' || u.status === 'hold')
                .map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedUnitId(unit.id)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${
                      selectedUnitId === unit.id
                        ? 'bg-[#0038BD]/10 border-[#0038BD]'
                        : 'bg-white border-black/15 hover:bg-[#EEEEEE]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-black">
                        Unit {unit.unitNumber} ({unit.projectName})
                      </p>
                      <p className="text-[11px] text-black/60">
                        {isBn ? `লেভেল ${toBanglaDigits(unit.floor)}` : `Floor ${unit.floor}`} · {formatSqFt(unit.sizeSqFt, language)} · {isBn ? facingMapBn[unit.facing] || unit.facing : unit.facing} · {isBn ? `${toBanglaDigits(unit.bedrooms)}টি বেড` : `${unit.bedrooms} Bed`}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-black block">
                        {formatBDT(unit.totalPrice, false, language)}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#0038BD]">
                        {unit.status === 'hold' ? t('hold') : t('available')}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 3: Payment Plan */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-black">{t('stepPlan')}</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-black mb-1">
                  {t('bookingTokenMoney')}
                </label>
                <input
                  type="number"
                  value={bookingMoney}
                  onChange={(e) => setBookingMoney(Number(e.target.value))}
                  step={50000}
                  className="w-full p-2.5 bg-white border border-black/20 rounded-xl text-black font-mono font-bold outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-black mb-1">
                  {t('paymentMethod')}
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
                >
                  {(['Bank Transfer', 'Cheque', 'Pay Order', 'Cash', 'bKash'] as PaymentMethod[]).map((m) => (
                    <option key={m} value={m}>
                      {translatePaymentMethod(m, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-black mb-1">
                  {t('downPaymentPercent')}
                </label>
                <select
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
                >
                  <option value={15}>{isBn ? '১৫% ডাউন পেমেন্ট' : '15% Down Payment'}</option>
                  <option value={20}>{isBn ? '২০% ডাউন পেমেন্ট (স্ট্যান্ডার্ড)' : '20% Down Payment (Standard)'}</option>
                  <option value={25}>{isBn ? '২৫% ডাউন পেমেন্ট' : '25% Down Payment'}</option>
                  <option value={30}>{isBn ? '৩০% ডাউন পেমেন্ট' : '30% Down Payment'}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-black mb-1">
                  {t('monthlyInstallmentsTenure')}
                </label>
                <select
                  value={installmentsCount}
                  onChange={(e) => setInstallmentsCount(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
                >
                  <option value={24}>{t('months24')}</option>
                  <option value={36}>{t('months36')}</option>
                  <option value={48}>{t('months48')}</option>
                  <option value={60}>{t('months60')}</option>
                </select>
              </div>
            </div>

            {/* Plan Calculation Breakdown */}
            <div className="p-3 rounded-xl bg-[#EEEEEE] border border-black/10 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-black/60">{t('totalPackageValue')}</span>
                <span className="font-mono font-bold text-black">{formatBDT(currentUnit.totalPrice, false, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">{t('downPaymentVal')} ({isBn ? toBanglaDigits(downPaymentPercent) : downPaymentPercent}%):</span>
                <span className="font-mono font-semibold text-black">{formatBDT(downPaymentAmount, false, language)}</span>
              </div>
              <div className="flex justify-between text-[#0038BD] font-bold">
                <span>{t('estimatedMonthly')} ({isBn ? `${toBanglaDigits(installmentsCount)} মাস` : `${installmentsCount} mos`}):</span>
                <span className="font-mono">{formatBDT(monthlyInstallment, false, language)} {isBn ? '/ মাস' : '/ mo'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review and Confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-black">{t('reviewBookingSummary')}</h3>

            <div className="p-4 rounded-xl border border-black/20 bg-white space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#EEEEEE] pb-2">
                <span className="text-black/60">{t('buyerName')}</span>
                <span className="font-bold text-black">{currentCustomer.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#EEEEEE] pb-2">
                <span className="text-black/60">{t('selectedUnitLabel')}</span>
                <span className="font-bold text-black">
                  Unit {currentUnit.unitNumber} ({currentUnit.projectName})
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EEEEEE] pb-2">
                <span className="text-black/60">{t('totalFlatPrice')}</span>
                <span className="font-mono font-bold text-black">
                  {formatBDT(currentUnit.totalPrice, false, language)}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EEEEEE] pb-2">
                <span className="text-black/60">{t('immediateToken')}</span>
                <span className="font-mono font-bold text-black">{formatBDT(bookingMoney, false, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">{t('paymentChannel')}</span>
                <span className="font-semibold text-black">{translatePaymentMethod(paymentMethod, language)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => (step === 1 ? setIsBookingWizardOpen(false) : setStep(step - 1))}
          >
            {step === 1 ? t('cancel') : t('back')}
          </Button>

          {step < 4 ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setStep(step + 1)}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
              className="font-bold"
            >
              {t('nextStep')}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleFinishBooking}
              className="font-bold"
            >
              {t('confirmAndIssueReceipt')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
