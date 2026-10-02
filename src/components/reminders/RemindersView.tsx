import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Clock,
  Send,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDate, toBanglaDigits } from '../../utils/formatters';
import { Button } from '../common/Button';

export const RemindersView: React.FC = () => {
  const {
    tasks,
    toggleTask,
    setIsReminderModalOpen,
    setReminderTarget,
    language,
    t,
    showToast,
  } = useApp();

  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [activeLang, setActiveLang] = useState<'en' | 'bn'>(language === 'bn' ? 'bn' : 'en');

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'pending') return !t.completed;
    if (activeTab === 'completed') return t.completed;
    return true;
  });

  const templates = {
    installment_reminder: {
      title: t('overdueInstallmentTemplateTitle'),
      en: 'Dear {customer_name}, gentle reminder from FlatDesk accounts desk: Your flat installment of {amount} for {flat} was due on {due_date}. Kindly arrange payment or share deposit slip.',
      bn: 'শ্রদ্ধেয় {customer_name}, ফ্ল্যাটডেস্ক অ্যাকাউন্টস থেকে বিনীত তাগিদ: আপনার {flat}-এর কিস্তি বাবদ {amount} টাকা গত {due_date}-এ প্রদেয় ছিল। অতিসত্বর ব্যাংক ট্রান্সফার বা চেক জমা নিশ্চিত করুন।',
    },
    site_visit_reminder: {
      title: t('siteVisitTemplateTitle'),
      en: 'Assalamu Alaikum {customer_name}, confirming your scheduled flat inspection for {flat} on {due_date}. Our resident engineer will receive you at project site.',
      bn: 'আসসালামু আলাইকুম {customer_name}, আপনার {flat} সাইট পরিদর্শনের সময়সূচি আগামী {due_date}-এ নির্ধারিত রয়েছে। আমাদের প্রজেক্ট ইঞ্জিনিয়ার আপনাকে অভ্যর্থনা জানাবেন।',
    },
    cheque_clearance: {
      title: t('chequeClearanceTemplateTitle'),
      en: 'Dear {customer_name}, your bank cheque for {amount} against {flat} has been deposited to Eastern Bank PLC and will clear within 24 hours.',
      bn: 'শ্রদ্ধেয় {customer_name}, আপনার {flat} বাবদ {amount} টাকার চেক ব্যাংকে জমা করা হয়েছে। আগামী ২৪ ঘণ্টার মধ্যে ক্লিয়ার হবে। ধন্যবাদ।',
    },
  };

  return (
    <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('remindersTasksTitle')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('remindersTasksSubtitle')}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => showToast(
            isBn ? 'নতুন তাগিদ টাস্ক তৈরি হয়েছে' : 'New Task Added',
            isBn ? 'আগামীকালের জন্য নতুন ফলো-আপ টাস্ক তালিকায় যুক্ত হয়েছে।' : 'Created task reminder for tomorrow morning.',
            'success'
          )}
          icon={<Plus className="w-4 h-4" />}
          className="font-bold"
        >
          {t('addReminderTask')}
        </Button>
      </div>

      {/* Main Grid: Tasks on Left, Templates on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Task List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex items-center justify-between">
            <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs font-semibold">
              {[
                { id: 'all', label: `${isBn ? 'সব' : 'All Tasks'} (${isBn ? toBanglaDigits(tasks.length) : tasks.length})` },
                { id: 'pending', label: `${t('pendingTab')} (${isBn ? toBanglaDigits(tasks.filter((t) => !t.completed).length) : tasks.filter((t) => !t.completed).length})` },
                { id: 'completed', label: `${t('completedTab')} (${isBn ? toBanglaDigits(tasks.filter((t) => t.completed).length) : tasks.filter((t) => t.completed).length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-black shadow-2xs'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-black/60 font-medium hidden sm:inline">
              {t('dailyPriorityChecklist')}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 shadow-2xs divide-y divide-[#EEEEEE] overflow-hidden">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 flex items-start justify-between gap-3 hover:bg-[#EEEEEE]/40 transition-colors ${
                  task.completed ? 'opacity-60 bg-[#EEEEEE]/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-black hover:text-[#0038BD] transition-colors cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-[#0038BD]" />
                    ) : (
                      <Square className="w-4 h-4 text-black/40" />
                    )}
                  </button>

                  <div>
                    <p
                      className={`text-xs font-bold text-black ${
                        task.completed ? 'line-through text-black/50' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-[11px] text-black/60 mt-0.5">{task.details}</p>

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-black/50">
                      <span className="flex items-center gap-1 font-semibold text-black/70">
                        <Clock className="w-3 h-3" /> {formatDate(task.dueDate, language)}
                      </span>
                      {task.customerPhone && (
                        <span>{isBn ? 'মোবাইল: ' : 'Phone: '}{task.customerPhone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {task.type === 'overdue_payment' && !task.completed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReminderTarget({
                          customerName: task.customerName || 'Valued Buyer',
                          customerPhone: task.customerPhone || '01712-345678',
                          flatInfo: 'Pinnacle Grandeur - 5B',
                          amount: 650000,
                          dueDate: '30 Sep 2026',
                          daysLate: 14,
                        });
                        setIsReminderModalOpen(true);
                      }}
                      icon={<Send className="w-3.5 h-3.5" />}
                      className="text-xs h-[28px]"
                    >
                      {t('sendReminder')}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: SMS & WhatsApp Previews */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <div>
                <h3 className="text-sm font-bold text-black">{t('messagingTemplatesTitle')}</h3>
                <p className="text-[11px] text-black/60">{t('standardizedRemindersSub')}</p>
              </div>

              {/* Language toggle for templates */}
              <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-lg text-[10px]">
                <button
                  onClick={() => setActiveLang('bn')}
                  className={`px-2 py-1 rounded font-bold transition-colors cursor-pointer ${
                    activeLang === 'bn' ? 'bg-white text-black shadow-2xs' : 'text-black/60'
                  }`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => setActiveLang('en')}
                  className={`px-2 py-1 rounded font-bold transition-colors cursor-pointer ${
                    activeLang === 'en' ? 'bg-white text-black shadow-2xs' : 'text-black/60'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              {Object.entries(templates).map(([key, tmpl]) => (
                <div
                  key={key}
                  className="p-3.5 rounded-xl border border-black/15 bg-[#EEEEEE]/30 space-y-2 hover:bg-[#EEEEEE]/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">{tmpl.title}</span>
                    <button
                      onClick={() => {
                        const sampleText = tmpl[activeLang]
                          .replace('{customer_name}', 'মোঃ রফিকুল ইসলাম')
                          .replace('{amount}', '৳ ৬,৫০,০০০')
                          .replace('{flat}', 'Pinnacle Grandeur 5B')
                          .replace('{due_date}', '৩০ সেপ্টেম্বর ২০২৬');
                        navigator.clipboard.writeText(sampleText);
                        showToast(t('copiedText'), isBn ? 'টেমপ্লেট টেক্সট কপি হয়েছে।' : 'Template copied.', 'info');
                      }}
                      className="text-xs text-[#0038BD] font-bold hover:underline cursor-pointer"
                    >
                      {t('copy')}
                    </button>
                  </div>
                  <p className={`text-black/75 leading-relaxed text-[11px] ${activeLang === 'bn' ? 'font-bangla' : 'font-sans'}`}>
                    {tmpl[activeLang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
