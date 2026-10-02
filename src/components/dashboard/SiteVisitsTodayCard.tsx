import React from 'react';
import { Calendar, Phone, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { maskPhone, formatDate } from '../../utils/formatters';
import { Button } from '../common/Button';

export const SiteVisitsTodayCard: React.FC = () => {
  const {
    siteVisits,
    revealSensitiveData,
    setCurrentSection,
    setIsScheduleVisitOpen,
    completeVisit,
    language,
    t,
    showToast,
  } = useApp();

  const isBn = language === 'bn';
  const todayVisits = siteVisits.filter((s) => s.scheduledDate === '30 Sep 2026' || s.status === 'scheduled');

  const handleCall = (phone: string, name: string) => {
    showToast(
      isBn ? `${name}-কে কল করা হচ্ছে` : `Calling ${name}`,
      isBn ? `${phone}-এ সংযোগ করা হচ্ছে...` : `Initiating call to ${phone}...`,
      'info'
    );
  };

  return (
    <div className={`bg-white p-5 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between ${isBn ? 'font-bangla' : ''}`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0038BD]/10 text-[#0038BD] flex items-center justify-center font-bold">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black tracking-tight">{t('todaySiteVisits')}</h3>
            <p className="text-[11px] text-black/60">{t('todaySiteVisitsSubtitle')}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsScheduleVisitOpen(true)}
          className="text-xs h-[30px]"
        >
          {t('scheduleVisit')}
        </Button>
      </div>

      <div className="divide-y divide-[#EEEEEE] my-2">
        {todayVisits.slice(0, 3).map((visit) => (
          <div key={visit.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-black">{visit.leadName}</span>
                <span className="text-[10px] bg-[#0038BD]/10 text-[#0038BD] font-semibold px-2 py-0.5 rounded">
                  {formatDate(visit.scheduledTime, language)}
                </span>
              </div>
              <p className="text-[11px] text-black/60 mt-0.5">
                {visit.projectName} {visit.preferredUnit ? `(Unit ${visit.preferredUnit})` : ''} · {isBn ? 'এজেন্ট: ' : 'Agent: '}{visit.agentName}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCall(visit.leadPhone, visit.leadName)}
                title={t('call')}
                className="p-1.5 rounded-lg border border-black/15 text-black hover:bg-[#EEEEEE] cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>

              {visit.status === 'scheduled' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    completeVisit(visit.id, {
                      interestLevel: 'High',
                      notes: isBn ? 'সাইট পরিদর্শন সফলভাবে সম্পন্ন হয়েছে।' : 'Site visit completed smoothly. Customer liked the layout.',
                      nextStep: isBn ? 'মূল্য প্রস্তাব পাঠানো হবে।' : 'Send price proposal.',
                    })
                  }
                  className="text-[11px] py-1 px-2.5 h-[28px]"
                >
                  {isBn ? 'সম্পন্ন করুন' : 'Mark Done'}
                </Button>
              ) : (
                <span className="text-[11px] font-semibold text-[#0038BD] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {isBn ? 'সম্পন্ন' : 'Completed'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between text-[11px] text-black/60">
        <span>{t('siteEngineersNotified')}</span>
        <button
          onClick={() => setCurrentSection('site_visits')}
          className="text-[#0038BD] font-bold hover:underline cursor-pointer"
        >
          {t('viewAll')} ➔
        </button>
      </div>
    </div>
  );
};
