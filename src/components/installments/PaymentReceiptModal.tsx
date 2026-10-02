import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import { translatePaymentMethod } from '../../utils/translations';
import { Printer, ShieldCheck } from 'lucide-react';

export const PaymentReceiptModal: React.FC = () => {
  const { isReceiptModalOpen, setIsReceiptModalOpen, receiptPayment, language, t } = useApp();
  const isBn = language === 'bn';

  if (!receiptPayment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isReceiptModalOpen}
      onClose={() => setIsReceiptModalOpen(false)}
      title={t('receiptModalTitle')}
      subtitle={`${t('receiptNoLabel')} ${receiptPayment.receiptNo} · ${formatDate(receiptPayment.date, language)}`}
      maxWidth="2xl"
    >
      <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
        {/* Printable Voucher Paper */}
        <div className="p-6 rounded-2xl border-2 border-black/20 bg-white space-y-5 shadow-xs">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-black/15 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0038BD] text-white flex items-center justify-center font-bold text-xs">
                  FD
                </span>
                <span className="text-xl font-black text-black tracking-tight">
                  FLATDESK PROPERTIES LTD.
                </span>
              </div>
              <p className="text-[11px] text-black/60 mt-1">
                {isBn ? 'কর্পোরেট অফিস: লেভেল ১২, গুলশান সেন্টার পয়েন্ট, রোড ৯০, গুলশান-২, ঢাকা' : 'Corporate Office: Level 12, Gulshan Center Point, Road 90, Gulshan-2, Dhaka'}
              </p>
              <p className="text-[11px] text-black/60">
                RAJUK Reg. No: RAJUK/RED/2019/042 · Helpline: +880 9612-334455
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#0038BD] text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                {t('officialMoneyReceipt')}
              </span>
              <p className="text-xs font-mono font-bold text-black mt-2">
                {t('receiptNoLabel')} {receiptPayment.receiptNo}
              </p>
              <p className="text-[11px] text-black/70">{t('dateLabel')} {formatDate(receiptPayment.date, language)}</p>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#EEEEEE]/50 border border-black/10">
              <span className="text-[10px] text-black/50 uppercase font-bold block">
                {t('receivedFrom')}
              </span>
              <p className="text-sm font-bold text-black mt-0.5">{receiptPayment.customerName}</p>
              <p className="text-black/60 mt-1">
                {t('paymentFor')}{' '}
                <strong className="text-black">{receiptPayment.installmentName}</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#EEEEEE]/50 border border-black/10">
              <span className="text-[10px] text-black/50 uppercase font-bold block">
                {t('propertyUnitDetails')}
              </span>
              <p className="text-sm font-bold text-black mt-0.5">
                Unit {receiptPayment.unitNumber}
              </p>
              <p className="text-black/60 mt-1">{receiptPayment.projectName}</p>
            </div>
          </div>

          {/* Payment breakdown */}
          <div className="border border-black/15 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-[#EEEEEE] p-2.5 font-bold text-black">
              <span>{t('paymentChannel')}</span>
              <span>{t('chequeNumber')} / {t('trnxReferenceId')}</span>
              <span className="text-right">{t('amountReceived')}</span>
            </div>
            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-semibold text-black">
                {translatePaymentMethod(receiptPayment.paymentMethod, language)}{' '}
                {receiptPayment.bankName ? `(${receiptPayment.bankName})` : ''}
              </span>
              <span className="font-mono text-black/80">{receiptPayment.referenceNo}</span>
              <span className="text-right font-mono font-extrabold text-base text-black">
                {formatBDT(receiptPayment.amount, false, language)}
              </span>
            </div>
          </div>

          {/* In words conversion banner */}
          <div className="p-3 bg-[#0038BD]/10 rounded-xl border border-[#0038BD]/20 text-xs">
            <span className="text-[10px] font-bold text-[#0038BD] uppercase block">
              {t('inWordsTaka')}
            </span>
            <p className="font-semibold text-black mt-0.5 italic">
              {formatBDT(receiptPayment.amount, false, language)} ({t('inWordsNotice')})
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 flex justify-between items-end text-center text-xs text-black/70">
            <div>
              <div className="w-36 border-b border-black/40 pb-1 font-mono text-[11px]">
                {receiptPayment.customerName.split(' ')[0]}
              </div>
              <span className="text-[10px] uppercase mt-1 block">{t('customerSignature')}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#0038BD] text-[#0038BD] flex flex-col items-center justify-center text-[9px] font-bold rotate-[-12deg] mb-1">
                <span>FLATDESK</span>
                <span className="font-black text-[10px]">VERIFIED</span>
                <span>ACCOUNTS</span>
              </div>
              <span className="text-[10px] text-black/50">{t('digitalSeal')}</span>
            </div>

            <div>
              <div className="w-36 border-b border-black/40 pb-1 font-mono text-[11px]">
                {receiptPayment.receivedBy}
              </div>
              <span className="text-[10px] uppercase mt-1 block">{t('authorizedSignatory')}</span>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EEEEEE]">
          <span className="text-xs text-black/60 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0038BD]" />
            {t('systemCopyArchived')}
          </span>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsReceiptModalOpen(false)}>
              {t('close')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-4 h-4" />}
            >
              {t('printReceipt')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
