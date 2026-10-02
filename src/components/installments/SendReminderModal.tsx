import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatDate, toBanglaDigits } from '../../utils/formatters';
import { MessageSquare, Smartphone, Copy, Check } from 'lucide-react';

export const SendReminderModal: React.FC = () => {
  const { isReminderModalOpen, setIsReminderModalOpen, reminderTarget, language, t, showToast } = useApp();
  const isBn = language === 'bn';

  const [channel, setChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [templateLang, setTemplateLang] = useState<'en' | 'bn'>(language === 'bn' ? 'bn' : 'en');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTemplateLang(language === 'bn' ? 'bn' : 'en');
  }, [language]);

  if (!reminderTarget) return null;

  const englishMessage = `Dear ${reminderTarget.customerName}, gentle reminder from FlatDesk accounts desk: Your flat installment of ${formatBDT(
    reminderTarget.amount,
    false,
    'en'
  )} for ${reminderTarget.flatInfo} was due on ${reminderTarget.dueDate} (${reminderTarget.daysLate} days overdue). Kindly clear the balance or share transaction slip. For assistance call 01711-209841.`;

  const banglaMessage = `শ্রদ্ধেয় ${reminderTarget.customerName}, ফ্ল্যাটডেস্ক অ্যাকাউন্টস থেকে বিনীত তাগিদ: আপনার ${reminderTarget.flatInfo}-এর কিস্তি বাবদ ${formatBDT(
    reminderTarget.amount,
    false,
    'bn'
  )} টাকা গত ${formatDate(reminderTarget.dueDate, 'bn')}-এ প্রদেয় ছিল (${toBanglaDigits(reminderTarget.daysLate)} দিন বকেয়া)। অনুরোধ করা যাচ্ছে অতিসত্বর ব্যাংক ট্রান্সফার/চেক জমা প্রদান করুন। প্রয়োজনে কল: ০১৭১১-২০৯৮৪১।`;

  const activeMessage = templateLang === 'bn' ? banglaMessage : englishMessage;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast(t('copiedText'), isBn ? 'তাগিদ নোটিশের টেক্সট কপি হয়েছে।' : 'Reminder template copied.', 'info');
  };

  const handleSend = () => {
    if (channel === 'whatsapp') {
      const cleanPhone = reminderTarget.customerPhone.replace(/[^0-9]/g, '');
      const encoded = encodeURIComponent(activeMessage);
      window.open(`https://wa.me/88${cleanPhone}?text=${encoded}`, '_blank');
      showToast(
        isBn ? 'হোয়াটসঅ্যাপ খোলা হয়েছে' : 'WhatsApp Opened',
        isBn ? `${reminderTarget.customerName}-কে বার্তা পাঠানো হচ্ছে।` : `Drafted message to ${reminderTarget.customerName}.`,
        'success'
      );
    } else {
      showToast(
        isBn ? 'এসএমএস সফলভাবে প্রেরিত' : 'SMS Dispatched',
        isBn ? `${reminderTarget.customerPhone} নম্বরে টেলকো গেটওয়ে মারফত বার্তা পাঠানো হয়েছে।` : `SMS successfully delivered to ${reminderTarget.customerPhone} via Telco gateway.`,
        'success'
      );
    }
    setIsReminderModalOpen(false);
  };

  return (
    <Modal
      isOpen={isReminderModalOpen}
      onClose={() => setIsReminderModalOpen(false)}
      title={t('sendReminderModalTitle')}
      subtitle={`${t('thCustomer')}: ${reminderTarget.customerName} · ${t('thFlatProject')}: ${reminderTarget.flatInfo}`}
      maxWidth="lg"
    >
      <div className={`space-y-4 ${isBn ? 'font-bangla' : ''}`}>
        {/* Recipient summary card */}
        <div className="p-3 rounded-xl bg-[#EEEEEE] border border-black/10 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-black">{reminderTarget.customerName}</p>
            <p className="text-black/60 font-mono mt-0.5">{reminderTarget.customerPhone}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-black font-mono text-sm block">
              {formatBDT(reminderTarget.amount, false, language)}
            </span>
            <span className="text-[10px] bg-[#EF8E01] text-black font-bold px-2 py-0.5 rounded">
              {isBn ? `${toBanglaDigits(reminderTarget.daysLate)} দিন বকেয়া` : `${reminderTarget.daysLate} days late`}
            </span>
          </div>
        </div>

        {/* Channel & Language Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Channel */}
          <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs">
            <button
              onClick={() => setChannel('whatsapp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                channel === 'whatsapp' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <button
              onClick={() => setChannel('sms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                channel === 'sms' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              {t('smsGateway')}
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs">
            <button
              onClick={() => setTemplateLang('bn')}
              className={`px-3 py-1.5 rounded-lg font-semibold font-bangla cursor-pointer ${
                templateLang === 'bn' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              বাংলা বার্তা
            </button>
            <button
              onClick={() => setTemplateLang('en')}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                templateLang === 'en' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              English Notice
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-black">{t('messagePreview')}</label>
            <button
              onClick={handleCopy}
              className="text-xs font-semibold text-[#0038BD] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#0038BD]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t('copied') : t('copyText')}
            </button>
          </div>

          <div
            className={`p-3.5 rounded-xl bg-white border border-black/15 text-xs text-black leading-relaxed whitespace-pre-wrap ${
              templateLang === 'bn' ? 'font-bangla' : 'font-sans'
            }`}
          >
            {activeMessage}
          </div>
          <p className="text-[10px] text-black/50 mt-1">
            {t('dynamicMergeFieldsNote')}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsReminderModalOpen(false)}>
            {t('cancel')}
          </Button>

          {channel === 'whatsapp' ? (
            <Button
              variant="accent"
              size="sm"
              onClick={handleSend}
              icon={<MessageSquare className="w-3.5 h-3.5 text-black" />}
              className="font-bold text-black"
            >
              {t('sendViaWhatsApp')}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSend}
              icon={<Smartphone className="w-3.5 h-3.5" />}
              className="font-bold"
            >
              {t('sendViaSms')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
