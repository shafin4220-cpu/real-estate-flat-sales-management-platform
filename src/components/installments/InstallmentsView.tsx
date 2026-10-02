import React, { useState } from 'react';
import {
  Plus,
  Search,
  AlertTriangle,
  Printer,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Installment, InstallmentStatus } from '../../types';
import { formatBDT, maskPhone, formatDate, toBanglaDigits } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { PaymentPlanBuilderModal } from './PaymentPlanBuilderModal';

export const InstallmentsView: React.FC = () => {
  const {
    installments,
    setCurrentSection,
    setIsRecordPaymentOpen,
    setPaymentTargetInstallment,
    setIsReminderModalOpen,
    setReminderTarget,
    revealSensitiveData,
    payments,
    setReceiptPayment,
    setIsReceiptModalOpen,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [statusFilter, setStatusFilter] = useState<'all' | InstallmentStatus>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlanBuilderOpen, setIsPlanBuilderOpen] = useState(false);

  const overdueCount = installments.filter((i) => i.status === 'overdue').length;

  const filtered = installments
    .filter((i) => (statusFilter === 'all' ? true : i.status === statusFilter))
    .filter((i) => (projectFilter === 'all' ? true : i.projectId === projectFilter))
    .filter((i) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        i.customerName.toLowerCase().includes(q) ||
        i.unitNumber.toLowerCase().includes(q) ||
        i.installmentName.toLowerCase().includes(q) ||
        i.projectName.toLowerCase().includes(q)
      );
    });

  const handlePay = (inst: Installment) => {
    setPaymentTargetInstallment(inst);
    setIsRecordPaymentOpen(true);
  };

  const handleReminder = (inst: Installment) => {
    setReminderTarget({
      customerName: inst.customerName,
      customerPhone: inst.customerPhone,
      flatInfo: `${inst.projectName} - Unit ${inst.unitNumber}`,
      amount: inst.balance,
      dueDate: inst.dueDate,
      daysLate: inst.daysLate,
    });
    setIsReminderModalOpen(true);
  };

  const handlePrintReceipt = (inst: Installment) => {
    const pay = payments.find((p) => p.installmentId === inst.id) || payments[0];
    setReceiptPayment(pay);
    setIsReceiptModalOpen(true);
  };

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('installments')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('installmentsSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlanBuilderOpen(true)}
            icon={<Calculator className="w-4 h-4 text-[#0038BD]" />}
          >
            {t('planBuilder')}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsRecordPaymentOpen(true)}
            icon={<Plus className="w-4 h-4" />}
            className="font-bold"
          >
            {t('recordPayment')}
          </Button>
        </div>
      </div>

      {/* Overdue Hook Quick Alert Callout */}
      {overdueCount > 0 && (
        <div
          onClick={() => setCurrentSection('overdue_dedicated')}
          className="p-4 rounded-2xl bg-[#EF8E01]/15 border-2 border-[#EF8E01] flex items-center justify-between cursor-pointer hover:bg-[#EF8E01]/25 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EF8E01] text-black flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs font-bold text-black">
                {isBn
                  ? `${toBanglaDigits(overdueCount)}টি ফ্ল্যাটের কিস্তি বকেয়া আছে (আদায় মনিটরিং)`
                  : `${overdueCount} Flats have overdue installments pending recovery`}
              </p>
              <p className="text-[11px] text-black/70">
                {isBn
                  ? 'বকেয়া পেইজে গিয়ে বিলম্বের দিন অনুযায়ী সাজানো তালিকা ও বাল্ক তাগিদ পাঠান।'
                  : 'Click to open the dedicated Overdue Installments page sorted by days late with bulk WhatsApp notice dispatch.'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-black flex items-center gap-1">
            {t('openRecoveryDesk')} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Status filters */}
        <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs font-semibold">
          {[
            { id: 'all', label: `${isBn ? 'সব' : 'All'} (${isBn ? toBanglaDigits(installments.length) : installments.length})` },
            { id: 'overdue', label: `${t('overdue')} (${isBn ? toBanglaDigits(overdueCount) : overdueCount})` },
            {
              id: 'due_soon',
              label: `${t('dueSoon')} (${isBn ? toBanglaDigits(installments.filter((i) => i.status === 'due_soon').length) : installments.filter((i) => i.status === 'due_soon').length})`,
            },
            {
              id: 'upcoming',
              label: `${t('upcoming')} (${isBn ? toBanglaDigits(installments.filter((i) => i.status === 'upcoming').length) : installments.filter((i) => i.status === 'upcoming').length})`,
            },
            {
              id: 'paid',
              label: `${t('paid')} (${isBn ? toBanglaDigits(installments.filter((i) => i.status === 'paid').length) : installments.filter((i) => i.status === 'paid').length})`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-white text-black shadow-2xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project & Search */}
        <div className="flex items-center gap-2">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="text-xs font-medium bg-[#EEEEEE] border border-black/10 rounded-xl px-3 py-2 text-black outline-none cursor-pointer"
          >
            <option value="all">{t('allProjects')}</option>
            <option value="proj-1">Pinnacle Grandeur</option>
            <option value="proj-2">Lakeview Elegance</option>
            <option value="proj-3">Green Horizon Heights</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'গ্রাহক বা ফ্ল্যাট খুঁজুন...' : 'Search customer, flat...'}
            className="text-xs px-3 py-2 bg-[#EEEEEE] border border-transparent focus:border-black/20 rounded-xl text-black outline-none w-36 sm:w-48"
          />
        </div>
      </div>

      {/* Main Schedule Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                <th className="py-3 px-3">{t('thFlatProject')}</th>
                <th className="py-3 px-3">{t('thCustomer')}</th>
                <th className="py-3 px-3">{t('thMilestone')}</th>
                <th className="py-3 px-3">{t('thDueDate')}</th>
                <th className="py-3 px-3 text-right">{t('thInstallmentAmount')}</th>
                <th className="py-3 px-3 text-right">{t('thPaidAmount')}</th>
                <th className="py-3 px-3 text-right">{t('thBalance')}</th>
                <th className="py-3 px-3">{t('status')}</th>
                <th className="py-3 px-3 text-right">{t('thAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filtered.map((inst) => {
                const isOverdue = inst.status === 'overdue';
                const isPaid = inst.status === 'paid';

                return (
                  <tr
                    key={inst.id}
                    className={`hover:bg-[#EEEEEE]/50 transition-colors ${
                      isOverdue ? 'bg-[#EF8E01]/5' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#0038BD]/10 text-[#0038BD]">
                        Unit {inst.unitNumber}
                      </span>
                      <p className="text-[11px] text-black/60 mt-0.5">{inst.projectName}</p>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="font-bold text-black">{inst.customerName}</p>
                      <p className="text-[11px] text-black/60 font-mono mt-0.5">
                        {maskPhone(inst.customerPhone, revealSensitiveData)}
                      </p>
                    </td>

                    <td className="py-3.5 px-3 font-medium text-black">
                      {inst.installmentName}
                    </td>

                    <td className="py-3.5 px-3 text-black/80">{formatDate(inst.dueDate, language)}</td>

                    <td className="py-3.5 px-3 text-right font-mono font-semibold text-black">
                      {formatBDT(inst.amount, false, language)}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono text-black/70">
                      {formatBDT(inst.paidAmount, false, language)}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-black tabular-nums">
                      {formatBDT(inst.balance, false, language)}
                    </td>

                    <td className="py-3.5 px-3">
                      <StatusBadge
                        type="installment"
                        status={inst.status}
                        daysLate={inst.daysLate}
                      />
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isPaid ? (
                          <>
                            <button
                              onClick={() => handleReminder(inst)}
                              className="px-2 py-1 text-[11px] font-semibold text-black hover:bg-[#EEEEEE] border border-black/15 rounded-md cursor-pointer"
                            >
                              {t('sendReminder')}
                            </button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handlePay(inst)}
                              className="text-[11px] py-1 px-2.5 h-[28px]"
                            >
                              {t('recordPay')}
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrintReceipt(inst)}
                            icon={<Printer className="w-3.5 h-3.5 text-[#0038BD]" />}
                            className="text-[11px] py-1 px-2.5 h-[28px]"
                          >
                            {t('printReceipt')}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <PaymentPlanBuilderModal
        isOpen={isPlanBuilderOpen}
        onClose={() => setIsPlanBuilderOpen(false)}
      />
    </div>
  );
};
