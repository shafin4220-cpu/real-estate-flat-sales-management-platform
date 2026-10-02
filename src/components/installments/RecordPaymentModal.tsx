import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { formatBDT, toBanglaDigits } from '../../utils/formatters';
import { translatePaymentMethod } from '../../utils/translations';
import { Upload, Shield } from 'lucide-react';

export const RecordPaymentModal: React.FC = () => {
  const {
    isRecordPaymentOpen,
    setIsRecordPaymentOpen,
    paymentTargetInstallment,
    installments,
    recordPayment,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';

  // If no preselected installment, find the oldest overdue one
  const defaultTarget =
    paymentTargetInstallment ||
    installments.find((i) => i.status === 'overdue') ||
    installments[0];

  const [selectedInstId, setSelectedInstId] = useState<string>(defaultTarget?.id || '');
  const [amount, setAmount] = useState<number>(defaultTarget?.balance || 500000);
  const [method, setMethod] = useState<PaymentMethod>('Bank Transfer');
  const [referenceNo, setReferenceNo] = useState<string>('SCB-FT-' + Math.floor(100000 + Math.random() * 900000));
  const [bankName, setBankName] = useState<string>('Standard Chartered Bank');
  const [chequeNo, setChequeNo] = useState<string>('');
  const [notes, setNotes] = useState<string>('Payment received via verified banking channel.');

  useEffect(() => {
    if (paymentTargetInstallment) {
      setSelectedInstId(paymentTargetInstallment.id);
      setAmount(paymentTargetInstallment.balance);
    }
  }, [paymentTargetInstallment]);

  if (!isRecordPaymentOpen) return null;

  const activeTarget = installments.find((i) => i.id === selectedInstId) || defaultTarget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTarget) return;

    recordPayment({
      installmentId: activeTarget.id,
      amount: Number(amount),
      paymentMethod: method,
      referenceNo: referenceNo || `REF-${Date.now()}`,
      bankName: ['Bank Transfer', 'Cheque', 'Pay Order'].includes(method) ? bankName : undefined,
      chequeNo: method === 'Cheque' ? chequeNo : undefined,
      notes,
    });

    setIsRecordPaymentOpen(false);
  };

  const paymentMethods: PaymentMethod[] = [
    'Bank Transfer',
    'Cheque',
    'Pay Order',
    'Cash',
    'bKash',
    'Nagad',
    'Rocket',
    'Card',
  ];

  return (
    <Modal
      isOpen={isRecordPaymentOpen}
      onClose={() => setIsRecordPaymentOpen(false)}
      title={t('recordPaymentTitle')}
      subtitle={t('recordPaymentSubtitle')}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className={`space-y-4 ${isBn ? 'font-bangla' : ''}`}>
        {/* Target selection */}
        <div>
          <label className="block text-xs font-bold text-black mb-1">
            {t('targetInstallmentFlat')}
          </label>
          <select
            value={selectedInstId}
            onChange={(e) => {
              setSelectedInstId(e.target.value);
              const found = installments.find((i) => i.id === e.target.value);
              if (found) setAmount(found.balance);
            }}
            className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium cursor-pointer"
          >
            {installments
              .filter((i) => i.status !== 'paid')
              .map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.unitNumber} - {inst.customerName} ({inst.projectName}) — {isBn ? 'বকেয়া: ' : 'Due: '}{formatBDT(inst.balance, false, language)} ({isBn ? `${toBanglaDigits(inst.daysLate)} দিন বিলম্ব` : `${inst.daysLate}d late`})
                </option>
              ))}
          </select>
        </div>

        {/* Amount to pay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('paymentAmountBdt')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              min={1000}
              className="w-full text-sm font-bold font-mono p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none"
            />
            {activeTarget && (
              <span className="text-[11px] text-black/60 mt-1 block">
                {t('outstandingBalance')} <strong>{formatBDT(activeTarget.balance, false, language)}</strong>
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('paymentMethod')}
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethod)}
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium cursor-pointer"
            >
              {paymentMethods.map((m) => (
                <option key={m} value={m}>
                  {translatePaymentMethod(m, language)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Method-specific fields */}
        {['Bank Transfer', 'Cheque', 'Pay Order'].includes(method) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                {t('bankBranchName')}
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. Standard Chartered Bank, Gulshan"
                className="w-full text-xs p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                {method === 'Cheque' ? t('chequeNumber') : t('trnxReferenceId')}
              </label>
              <input
                type="text"
                value={method === 'Cheque' ? chequeNo : referenceNo}
                onChange={(e) =>
                  method === 'Cheque' ? setChequeNo(e.target.value) : setReferenceNo(e.target.value)
                }
                placeholder={method === 'Cheque' ? 'e.g. 7489201' : 'e.g. SCB-FT-84920'}
                className="w-full text-xs p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none font-mono"
              />
            </div>
          </div>
        )}

        {/* MFS (bKash/Nagad/Rocket) */}
        {['bKash', 'Nagad', 'Rocket'].includes(method) && (
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('mfsTrnxId')}
            </label>
            <input
              type="text"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              placeholder="e.g. 9B84XA109"
              className="w-full text-xs p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none font-mono uppercase"
            />
          </div>
        )}

        {/* Notes / Remarks */}
        <div>
          <label className="block text-xs font-bold text-black mb-1">
            {t('accountsRemarks')}
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none"
          />
        </div>

        {/* Upload proof dummy */}
        <div>
          <label className="block text-xs font-bold text-black mb-1">
            {t('depositSlipProof')}
          </label>
          <div className="border border-dashed border-black/25 rounded-xl p-3 text-center bg-[#EEEEEE]/50 hover:bg-[#EEEEEE] transition-colors cursor-pointer flex items-center justify-center gap-2">
            <Upload className="w-4 h-4 text-black/60" />
            <span className="text-xs text-black/70">
              {t('attachDepositSlip')}
            </span>
          </div>
        </div>

        {/* Security badge note */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#EEEEEE] text-[11px] text-black/70">
          <Shield className="w-4 h-4 text-[#0038BD] shrink-0" />
          <span>
            {t('paymentAuditNotice')}
          </span>
        </div>

        {/* Form Actions */}
        <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsRecordPaymentOpen(false)}
          >
            {t('cancel')}
          </Button>
          <Button type="submit" variant="primary" size="sm" className="font-bold">
            {t('recordAndIssueReceipt')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
