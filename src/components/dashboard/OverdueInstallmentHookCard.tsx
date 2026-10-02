import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Phone,
  MessageSquare,
  CreditCard,
  Send,
  Building,
  User,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Installment } from '../../types';
import { formatBDT, maskPhone, formatDaysLate, formatDate, toBanglaDigits } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';

export const OverdueInstallmentHookCard: React.FC = () => {
  const {
    installments,
    setCurrentSection,
    revealSensitiveData,
    setIsRecordPaymentOpen,
    setPaymentTargetInstallment,
    setIsReminderModalOpen,
    setReminderTarget,
    language,
    t,
    showToast,
  } = useApp();

  const isBn = language === 'bn';
  const [projectFilter, setProjectFilter] = useState<string>('all');

  // Filter & sort overdue installments by most days late
  const overdueList = installments
    .filter((i) => i.status === 'overdue')
    .filter((i) => (projectFilter === 'all' ? true : i.projectId === projectFilter))
    .sort((a, b) => b.daysLate - a.daysLate);

  const totalOverdue = overdueList.reduce((sum, item) => sum + item.balance, 0);

  const handleCall = (inst: Installment) => {
    showToast(
      isBn ? `${inst.customerName}-কে কল করা হচ্ছে` : `Calling ${inst.customerName}`,
      isBn ? `${inst.customerPhone}-এ ডায়াল করা হচ্ছে...` : `Initiating call to ${inst.customerPhone}...`,
      'info'
    );
  };

  const handleWhatsApp = (inst: Installment) => {
    const text = encodeURIComponent(
      isBn
        ? `আসসালামু আলাইকুম ${inst.customerName} ভাই/আপা, ফ্ল্যাটডেস্ক অ্যাকাউন্টস থেকে বিনীত তাগিদ: আপনার ${inst.projectName} (ইউনিট ${inst.unitNumber})-এর কিস্তি বাবদ ${formatBDT(
            inst.balance,
            false,
            'bn'
          )} টাকা গত ${formatDate(inst.dueDate, 'bn')}-এ প্রদেয় ছিল (${toBanglaDigits(inst.daysLate)} দিন বকেয়া)। অনুরোধ করা যাচ্ছে অতিসত্বর পরিশোধ বা চেক কপি প্রদান করুন।`
        : `Assalamu Alaikum ${inst.customerName} Bhai/Apa, FlatDesk accounts desk notice: your installment of ${formatBDT(
            inst.balance
          )} for ${inst.projectName} (Unit ${inst.unitNumber}) was due on ${inst.dueDate} (${inst.daysLate} days late). Please arrange payment or send cheque copy.`
    );
    window.open(`https://wa.me/88${inst.customerPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleOpenReminder = (inst: Installment) => {
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

  const handleRecordPay = (inst: Installment) => {
    setPaymentTargetInstallment(inst);
    setIsRecordPaymentOpen(true);
  };

  return (
    <div className={`bg-white rounded-2xl border-2 border-[#EF8E01] shadow-md p-5 overflow-hidden transition-all ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EF8E01] text-black flex items-center justify-center font-bold shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-black tracking-tight">
                {t('overdueCardTitle')}
              </h2>
              <span className="text-xs font-bold bg-[#EF8E01] text-black px-2.5 py-0.5 rounded-full font-mono">
                {isBn ? toBanglaDigits(overdueList.length) : overdueList.length} {t('unitsOverdueBadge')}
              </span>
            </div>
            <p className="text-xs text-black/60 mt-0.5">
              {t('overdueCardKicker')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Project Filter */}
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="text-xs font-medium bg-[#EEEEEE] border border-black/10 rounded-lg px-2.5 py-1.5 text-black outline-none cursor-pointer"
          >
            <option value="all">{t('allProjects')}</option>
            <option value="proj-1">Pinnacle Grandeur</option>
            <option value="proj-2">Lakeview Elegance</option>
            <option value="proj-3">Green Horizon Heights</option>
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentSection('overdue_dedicated')}
            className="text-xs font-bold text-black flex items-center gap-1 hover:bg-[#EF8E01]/15"
          >
            {t('viewAll')} ({isBn ? toBanglaDigits(overdueList.length) : overdueList.length}){' '}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Summary Highlight Strip */}
      <div className="my-3.5 p-3 rounded-xl bg-[#EF8E01]/10 border border-[#EF8E01]/30 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">{t('totalOverdueDefault')}</span>
          <span className="text-sm font-bold text-black font-mono tabular-nums">
            {formatBDT(totalOverdue, false, language)}
          </span>
          <span className="text-[11px] text-black/60 hidden sm:inline">
            ({isBn ? toBanglaDigits(overdueList.length) : overdueList.length} {t('pendingRecoveryAccounts')})
          </span>
        </div>
        <div className="text-[11px] text-black/70">
          {t('overduePolicyNote')}
        </div>
      </div>

      {/* Overdue Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
              <th className="py-2.5 px-3">{t('thCustomer')}</th>
              <th className="py-2.5 px-3">{t('thFlatProject')}</th>
              <th className="py-2.5 px-3 text-right">{t('thAmountDue')}</th>
              <th className="py-2.5 px-3">{t('thDueDate')}</th>
              <th className="py-2.5 px-3">{t('thDaysLate')}</th>
              <th className="py-2.5 px-3">{t('thAgent')}</th>
              <th className="py-2.5 px-3 text-right">{t('instantAction')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEEEE]">
            {overdueList.slice(0, 6).map((inst) => (
              <tr
                key={inst.id}
                className="hover:bg-[#EF8E01]/5 transition-colors duration-100 group"
              >
                {/* Customer */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#EEEEEE] text-black flex items-center justify-center font-bold text-[11px] shrink-0">
                      {inst.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-black leading-tight">
                        {inst.customerName}
                      </p>
                      <p className="text-[11px] text-black/60 font-mono mt-0.5">
                        {maskPhone(inst.customerPhone, revealSensitiveData)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Flat & Project */}
                <td className="py-3 px-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[#0038BD]/10 text-[#0038BD] font-bold rounded text-[11px]">
                      Unit {inst.unitNumber}
                    </span>
                    <p className="text-[11px] text-black/70 mt-0.5 truncate max-w-[140px]">
                      {inst.projectName}
                    </p>
                  </div>
                </td>

                {/* Amount Due */}
                <td className="py-3 px-3 text-right font-mono font-bold text-black tabular-nums">
                  {formatBDT(inst.balance, false, language)}
                </td>

                {/* Due Date */}
                <td className="py-3 px-3 text-black/80 font-medium">
                  {formatDate(inst.dueDate, language)}
                </td>

                {/* Days Late */}
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 font-bold text-[11px] bg-[#EF8E01] text-black px-2 py-0.5 rounded-md shadow-2xs font-mono">
                    <Clock className="w-3 h-3 text-black" />
                    {formatDaysLate(inst.daysLate, language)}
                  </span>
                </td>

                {/* Agent */}
                <td className="py-3 px-3 text-black/70 font-medium">
                  {inst.agentName}
                </td>

                {/* Actions */}
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleCall(inst)}
                      title={t('call')}
                      className="p-1.5 rounded-lg text-black/70 hover:text-black hover:bg-[#EEEEEE] transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleWhatsApp(inst)}
                      title={t('whatsApp')}
                      className="p-1.5 rounded-lg text-black/70 hover:text-black hover:bg-[#EEEEEE] transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenReminder(inst)}
                      title={t('sendReminder')}
                      className="p-1.5 rounded-lg text-black/70 hover:text-black hover:bg-[#EEEEEE] transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleRecordPay(inst)}
                      className="text-[11px] py-1 px-2.5 ml-1 h-[28px]"
                    >
                      {t('recordPay')}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer link */}
      {overdueList.length > 6 && (
        <div className="pt-3 border-t border-[#EEEEEE] flex justify-between items-center text-xs text-black/60">
          <span>
            {t('showingTop6Overdue')}{' '}
            <strong className="text-black font-mono">
              {isBn ? toBanglaDigits(overdueList.length) : overdueList.length}
            </strong>
          </span>
          <button
            onClick={() => setCurrentSection('overdue_dedicated')}
            className="text-xs font-bold text-[#0038BD] hover:underline cursor-pointer flex items-center gap-1"
          >
            {t('goToFullRecovery')} ({isBn ? toBanglaDigits(overdueList.length) : overdueList.length}){' '}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
