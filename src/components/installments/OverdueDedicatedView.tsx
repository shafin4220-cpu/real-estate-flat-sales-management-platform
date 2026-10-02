import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Phone,
  MessageSquare,
  Send,
  CreditCard,
  Building,
  CheckSquare,
  Square,
  Clock,
  Filter,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Installment } from '../../types';
import { formatBDT, maskPhone, formatDaysLate, formatDate, toBanglaDigits } from '../../utils/formatters';
import { Button } from '../common/Button';

export const OverdueDedicatedView: React.FC = () => {
  const {
    installments,
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
  const [daysLateFilter, setDaysLateFilter] = useState<'all' | '1-7' | '8-30' | '31-60' | '60+'>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter logic
  const filteredOverdue = installments
    .filter((i) => i.status === 'overdue')
    .filter((i) => {
      if (daysLateFilter === '1-7') return i.daysLate >= 1 && i.daysLate <= 7;
      if (daysLateFilter === '8-30') return i.daysLate >= 8 && i.daysLate <= 30;
      if (daysLateFilter === '31-60') return i.daysLate >= 31 && i.daysLate <= 60;
      if (daysLateFilter === '60+') return i.daysLate > 60;
      return true;
    })
    .filter((i) => (projectFilter === 'all' ? true : i.projectId === projectFilter))
    .filter((i) => (agentFilter === 'all' ? true : i.agentId === agentFilter))
    .filter((i) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        i.customerName.toLowerCase().includes(q) ||
        i.unitNumber.toLowerCase().includes(q) ||
        i.customerPhone.includes(q) ||
        i.projectName.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.daysLate - a.daysLate);

  const totalFilteredOverdue = filteredOverdue.reduce((sum, item) => sum + item.balance, 0);

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredOverdue.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOverdue.map((i) => i.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkReminders = () => {
    if (selectedIds.length === 0) {
      showToast(
        isBn ? 'গ্রাহক নির্বাচন করুন' : 'Select Customers',
        isBn ? 'বাল্ক রিমাইন্ডার পাঠাতে অনুগ্রহ করে অন্তত একজন গ্রাহক নির্বাচন করুন।' : 'Please select at least one customer to send bulk reminders.',
        'warning'
      );
      return;
    }
    const count = selectedIds.length;
    showToast(
      isBn ? 'বাল্ক তাগিদ সফল' : 'Bulk Reminders Queued',
      isBn
        ? `${toBanglaDigits(count)} জন ফ্ল্যাট ক্রেতার মোবাইলে এসএমএস ও হোয়াটসঅ্যাপ তাগিদপত্র পাঠানো হয়েছে।`
        : `Sent payment reminder SMS & WhatsApp notices to ${count} flat owners.`,
      'success'
    );
    setSelectedIds([]);
  };

  const handleCall = (inst: Installment) => {
    showToast(
      isBn ? `${inst.customerName}-কে কল করা হচ্ছে` : `Calling ${inst.customerName}`,
      isBn ? `${inst.customerPhone}-এ ডায়াল করা হচ্ছে...` : `Dialing ${inst.customerPhone}...`,
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
          )} টাকা বকেয়া আছে (${toBanglaDigits(inst.daysLate)} দিন বিলম্ব)। অনুগ্রহপূর্বক অতিসত্বর পরিশোধ নিশ্চিত করুন।`
        : `Assalamu Alaikum ${inst.customerName} Bhai/Apa, FlatDesk accounts desk: installment of ${formatBDT(
            inst.balance
          )} for ${inst.projectName} (Unit ${inst.unitNumber}) is overdue by ${inst.daysLate} days. Please clear the payment at the earliest.`
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

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-black tracking-tight">
              {t('overdueCardTitle')}
            </h1>
            <span className="text-xs font-bold bg-[#EF8E01] text-black px-2.5 py-0.5 rounded-full font-mono">
              {isBn ? toBanglaDigits(filteredOverdue.length) : filteredOverdue.length}{' '}
              {t('unitsOverdueBadge')}
            </span>
          </div>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('overdueSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <Button
              variant="accent"
              size="sm"
              onClick={handleBulkReminders}
              icon={<Send className="w-3.5 h-3.5" />}
              className="font-bold"
            >
              {t('bulkSendReminder')} ({isBn ? toBanglaDigits(selectedIds.length) : selectedIds.length})
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              showToast(
                isBn ? 'সিএসভি তৈরি হয়েছে' : 'Export Generated',
                isBn ? 'বকেয়া কিস্তির রিপোর্ট সিএসভি ডাউনলোড হয়েছে।' : 'Exported Overdue Installments CSV to Downloads folder.',
                'success'
              )
            }
            icon={<Download className="w-3.5 h-3.5" />}
          >
            {t('exportCsv')}
          </Button>
        </div>
      </div>

      {/* Metrics Header Banner */}
      <div className="bg-[#EF8E01]/10 border-2 border-[#EF8E01] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EF8E01] text-black flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-black/70">{t('totalOverdueDefault')}</span>
            <div className="text-2xl font-black text-black font-mono tabular-nums">
              {formatBDT(totalFilteredOverdue, false, language)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-black">
          <div>
            <span className="text-black/60 block">{t('oldestDefaultLabel')}</span>
            <strong className="text-sm font-bold text-black">
              {isBn ? '১১২ দিন' : '112 Days'}
            </strong>{' '}
            (5B - Md. Shahidul)
          </div>
          <div className="h-8 w-px bg-black/15 hidden sm:block" />
          <div>
            <span className="text-black/60 block">{t('criticalOverdueLabel')}</span>
            <strong className="text-sm font-bold text-black font-mono">
              {isBn ? '৩টি ফ্ল্যাট' : '3 Flats'}
            </strong>{' '}
            ({formatBDT(2850000, true, language)})
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-black/10 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-3 py-2 bg-[#EEEEEE] border border-transparent focus:border-black/20 rounded-xl text-xs text-black outline-none"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Days late range tabs */}
            <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs font-medium">
              {[
                { id: 'all', label: isBn ? 'সব দিন' : 'All Days' },
                { id: '1-7', label: isBn ? '১-৭ দিন' : '1-7d' },
                { id: '8-30', label: isBn ? '৮-৩০ দিন' : '8-30d' },
                { id: '31-60', label: isBn ? '৩১-৬০ দিন' : '31-60d' },
                { id: '60+', label: isBn ? '৬০+ দিন বকেয়া' : '60+d Late' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDaysLateFilter(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    daysLateFilter === tab.id
                      ? 'bg-white text-black shadow-2xs'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Project Filter */}
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

            {/* Agent Filter */}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-xs font-medium bg-[#EEEEEE] border border-black/10 rounded-xl px-3 py-2 text-black outline-none cursor-pointer"
            >
              <option value="all">{t('allAgents')}</option>
              <option value="agent-1">Arifur Rahman</option>
              <option value="agent-2">Sabrina Sultana</option>
              <option value="agent-3">Rakibul Hasan</option>
              <option value="agent-4">Nazmul Haque</option>
              <option value="agent-5">Mehreen Khan</option>
              <option value="agent-6">Imran Hossain</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Overdue Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                <th className="py-3 px-3 w-10 text-center">
                  <button
                    onClick={handleSelectAll}
                    className="p-1 rounded text-black/70 hover:text-black cursor-pointer"
                  >
                    {selectedIds.length === filteredOverdue.length && filteredOverdue.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#0038BD]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3">{t('thCustomer')}</th>
                <th className="py-3 px-3">{t('thFlatProject')}</th>
                <th className="py-3 px-3">{t('thMilestone')}</th>
                <th className="py-3 px-3 text-right">{t('thAmountDue')}</th>
                <th className="py-3 px-3">{t('thDueDate')}</th>
                <th className="py-3 px-3">{t('thLatenessAging')}</th>
                <th className="py-3 px-3">{t('thAgent')}</th>
                <th className="py-3 px-3 text-right">{t('thAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {filteredOverdue.map((inst) => {
                const isSelected = selectedIds.includes(inst.id);

                return (
                  <tr
                    key={inst.id}
                    className={`hover:bg-[#EF8E01]/5 transition-colors ${
                      isSelected ? 'bg-[#EF8E01]/10' : ''
                    }`}
                  >
                    {/* Select box */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleToggleSelect(inst.id)}
                        className="p-1 rounded text-black/70 hover:text-black cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#0038BD]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-black">{inst.customerName}</p>
                        <p className="text-[11px] text-black/60 font-mono mt-0.5">
                          {maskPhone(inst.customerPhone, revealSensitiveData)}
                        </p>
                      </div>
                    </td>

                    {/* Flat & Project */}
                    <td className="py-3 px-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-[#0038BD]/10 text-[#0038BD] font-bold rounded text-[11px]">
                          Unit {inst.unitNumber}
                        </span>
                        <p className="text-[11px] text-black/70 mt-0.5">{inst.projectName}</p>
                      </div>
                    </td>

                    {/* Installment Name */}
                    <td className="py-3 px-3 font-medium text-black">
                      {inst.installmentName}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-black tabular-nums text-sm">
                      {formatBDT(inst.balance, false, language)}
                    </td>

                    {/* Due Date */}
                    <td className="py-3 px-3 text-black/70">
                      {formatDate(inst.dueDate, language)}
                    </td>

                    {/* Lateness Aging */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-0.5 rounded-md font-mono ${
                          inst.daysLate > 60
                            ? 'bg-[#EF8E01] text-black'
                            : inst.daysLate > 30
                            ? 'bg-[#EF8E01]/25 text-black border border-[#EF8E01]'
                            : 'bg-[#EEEEEE] text-black border border-black/15'
                        }`}
                      >
                        <Clock className="w-3 h-3 text-black" />
                        {formatDaysLate(inst.daysLate, language)}
                      </span>
                    </td>

                    {/* Agent */}
                    <td className="py-3 px-3 text-black/70">{inst.agentName}</td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleCall(inst)}
                          title={t('call')}
                          className="p-1.5 rounded-lg border border-black/10 text-black hover:bg-[#EEEEEE] cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleWhatsApp(inst)}
                          title={t('whatsApp')}
                          className="p-1.5 rounded-lg border border-black/10 text-black hover:bg-[#EEEEEE] cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenReminder(inst)}
                          title={t('sendReminder')}
                          className="p-1.5 rounded-lg border border-black/10 text-black hover:bg-[#EEEEEE] cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <Button
                          variant="primary"
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#EEEEEE] bg-[#EEEEEE]/30 flex flex-wrap items-center justify-between text-xs text-black/60">
          <span>
            {isBn
              ? `মোট ${toBanglaDigits(filteredOverdue.length)}টি বকেয়া একাউন্ট প্রদর্শিত (আদায় মনিটরিং ডেক্স)`
              : `Showing ${filteredOverdue.length} overdue accounts (Default recovery desk)`}
          </span>
          <span className="font-semibold text-black">
            {isBn ? 'স্বয়ংক্রিয় তাগিদ সক্রিয়: ৩ দিন গ্রেস পিরিয়ড' : 'Automated reminder rules active: 3-day grace period'}
          </span>
        </div>
      </div>
    </div>
  );
};
