import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatBDT, toBanglaDigits } from '../../utils/formatters';

export const PaymentPlanBuilderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { units, language, t, showToast } = useApp();
  const isBn = language === 'bn';

  const [selectedUnitId, setSelectedUnitId] = useState(units[0]?.id || '');
  const [template, setTemplate] = useState<'standard_36' | 'flexible_48' | 'luxury_penthouse'>('standard_36');
  const [downPercent] = useState<number>(20);

  if (!isOpen) return null;

  const unit = units.find((u) => u.id === selectedUnitId) || units[0];

  const downPayment = Math.round(unit.totalPrice * (downPercent / 100));
  const roofSpecial = Math.round(unit.totalPrice * 0.1); // 10% on roof casting
  const handoverFinal = Math.round(unit.totalPrice * 0.05); // 5% on handover
  const remainingForMonthly = unit.totalPrice - (downPayment + roofSpecial + handoverFinal);
  const monthlyMonths = template === 'flexible_48' ? 48 : 36;
  const monthlyAmount = Math.round(remainingForMonthly / monthlyMonths);

  const handleApplyPlan = () => {
    showToast(
      isBn ? 'কিস্তি প্ল্যান প্রস্তুত' : 'Payment Plan Generated',
      isBn ? `ইউনিট ${unit.unitNumber}-এর জন্য পূর্ণাঙ্গ মাইলস্টোন কিস্তি তৈরি হয়েছে।` : `Calculated full milestone schedule for Unit ${unit.unitNumber}.`,
      'success'
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('planBuilderTitle')}
      subtitle={t('planBuilderSubtitle')}
      maxWidth="lg"
    >
      <div className={`space-y-4 text-xs ${isBn ? 'font-bangla' : ''}`}>
        <div>
          <label className="block font-bold text-black mb-1">{t('preferredFlatUnitLabel')}</label>
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value)}
            className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                Unit {u.unitNumber} ({u.projectName}) — {isBn ? 'মোট: ' : 'Total: '}{formatBDT(u.totalPrice, false, language)}
              </option>
            ))}
          </select>
        </div>

        {/* Template Selectors */}
        <div>
          <label className="block font-bold text-black mb-1.5">{t('presetTemplates')}</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'standard_36', title: t('tmplStandard36'), desc: t('tmplStandard36Desc') },
              { id: 'flexible_48', title: t('tmplExtended48'), desc: t('tmplExtended48Desc') },
              { id: 'luxury_penthouse', title: t('tmplLuxury'), desc: t('tmplLuxuryDesc') },
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setTemplate(tmpl.id as any)}
                className={`p-3 text-left rounded-xl border transition-colors cursor-pointer ${
                  template === tmpl.id
                    ? 'bg-[#0038BD]/10 border-[#0038BD]'
                    : 'bg-white border-black/15 hover:bg-[#EEEEEE]'
                }`}
              >
                <p className="font-bold text-black text-xs leading-tight">{tmpl.title}</p>
                <p className="text-[10px] text-black/60 mt-1 leading-normal">{tmpl.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown Simulation */}
        <div className="p-4 rounded-xl bg-[#EEEEEE] border border-black/10 space-y-2">
          <h4 className="font-bold text-black flex items-center justify-between text-xs">
            <span>{t('scheduleBreakdownHeading')}</span>
            <span className="font-mono text-black font-extrabold">{formatBDT(unit.totalPrice, false, language)}</span>
          </h4>

          <div className="divide-y divide-black/10 text-xs">
            <div className="py-1.5 flex justify-between">
              <span>{t('tokenStep')}</span>
              <strong className="font-mono">{formatBDT(500000, false, language)}</strong>
            </div>
            <div className="py-1.5 flex justify-between">
              <span>{t('downStep')} ({isBn ? toBanglaDigits(downPercent) : downPercent}%):</span>
              <strong className="font-mono">{formatBDT(downPayment - 500000, false, language)}</strong>
            </div>
            <div className="py-1.5 flex justify-between">
              <span>{t('monthlyStep')} ({isBn ? `${toBanglaDigits(monthlyMonths)}টি কিস্তি` : `${monthlyMonths} months`}):</span>
              <strong className="font-mono text-[#0038BD]">
                {formatBDT(monthlyAmount, false, language)} {isBn ? '/ মাস' : '/ mo'}
              </strong>
            </div>
            <div className="py-1.5 flex justify-between">
              <span>{t('roofStep')} (10%):</span>
              <strong className="font-mono">{formatBDT(roofSpecial, false, language)}</strong>
            </div>
            <div className="py-1.5 flex justify-between">
              <span>{t('handoverStep')} (5%):</span>
              <strong className="font-mono">{formatBDT(handoverFinal, false, language)}</strong>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={handleApplyPlan} className="font-bold">
            {t('applyPlan')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
