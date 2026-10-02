import React from 'react';
import { Clock, Send, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatDate } from '../../utils/formatters';
import { Button } from '../common/Button';

export const UpcomingDuesCard: React.FC = () => {
  const {
    installments,
    setCurrentSection,
    setIsReminderModalOpen,
    setReminderTarget,
    setIsRecordPaymentOpen,
    setPaymentTargetInstallment,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const dueSoonList = installments.filter((i) => i.status === 'due_soon');

  return (
    <div className={`bg-white p-5 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between ${isBn ? 'font-bangla' : ''}`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EF8E01]/15 text-black flex items-center justify-center font-bold">
            <Clock className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black tracking-tight">{t('upcomingDues7Days')}</h3>
            <p className="text-[11px] text-black/60">{t('upcomingDuesSubtitle')}</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentSection('installments')}
          className="text-xs font-bold text-[#0038BD] hover:underline cursor-pointer"
        >
          {t('viewAll')}
        </button>
      </div>

      <div className="divide-y divide-[#EEEEEE] my-2">
        {dueSoonList.map((inst) => (
          <div key={inst.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-black">{inst.customerName}</p>
              <p className="text-[11px] text-black/60">
                {inst.projectName} · Unit <strong className="text-black">{inst.unitNumber}</strong> · {isBn ? 'প্রদেয় ' : 'Due '}
                <span className="font-semibold text-black">{formatDate(inst.dueDate, language)}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="font-mono font-bold text-black block tabular-nums">
                  {formatBDT(inst.balance, false, language)}
                </span>
                <span className="text-[10px] text-black/60">{inst.installmentName}</span>
              </div>

              <button
                onClick={() => {
                  setReminderTarget({
                    customerName: inst.customerName,
                    customerPhone: inst.customerPhone,
                    flatInfo: `${inst.projectName} - ${inst.unitNumber}`,
                    amount: inst.balance,
                    dueDate: inst.dueDate,
                    daysLate: 0,
                  });
                  setIsReminderModalOpen(true);
                }}
                title={t('sendReminder')}
                className="p-1.5 rounded-lg border border-black/15 text-black hover:bg-[#EEEEEE] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPaymentTargetInstallment(inst);
                  setIsRecordPaymentOpen(true);
                }}
                className="text-[11px] py-1 px-2.5 h-[28px]"
              >
                {t('recordPay')}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between text-[11px] text-black/60">
        <span>
          {t('totalDue7Days')}{' '}
          <strong className="text-black font-mono">{formatBDT(2870000, false, language)}</strong>
        </span>
        <span className="text-black font-medium">{t('remindersScheduledCount')}</span>
      </div>
    </div>
  );
};
