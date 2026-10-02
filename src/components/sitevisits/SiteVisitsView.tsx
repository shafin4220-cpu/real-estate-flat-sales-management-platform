import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { ScheduleVisitModal } from './ScheduleVisitModal';
import { maskPhone, formatDate, toBanglaDigits } from '../../utils/formatters';

export const SiteVisitsView: React.FC = () => {
  const { siteVisits, setIsScheduleVisitOpen, completeVisit, revealSensitiveData, language, t, showToast } =
    useApp();

  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [feedbackVisitId, setFeedbackVisitId] = useState<string | null>(null);
  const [interestLevel, setInterestLevel] = useState<'High' | 'Medium' | 'Low'>('High');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [nextStep, setNextStep] = useState('');

  const filteredVisits = siteVisits.filter((s) => {
    if (activeTab === 'scheduled') return s.status === 'scheduled';
    if (activeTab === 'completed') return s.status === 'completed';
    return true;
  });

  const handleOpenFeedback = (v: any) => {
    setFeedbackVisitId(v.id);
    setFeedbackNotes(v.feedback?.notes || '');
    setNextStep(v.feedback?.nextStep || '');
    setInterestLevel(v.feedback?.interestLevel || 'High');
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackVisitId) return;

    completeVisit(feedbackVisitId, {
      interestLevel,
      notes: feedbackNotes || (isBn ? 'গ্রাহক প্রজেক্টের অবস্থান ও ফ্ল্যাট প্ল্যান দেখে সন্তোষ প্রকাশ করেছেন।' : 'Client was satisfied with site presentation and layout.'),
      nextStep: nextStep || (isBn ? 'চূড়ান্ত মূল্য প্রস্তাব ও পেমেন্ট শিডিউল পাঠানো হবে।' : 'Send final price quote and payment plan.'),
    });

    setFeedbackVisitId(null);
  };

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            {t('siteVisits')}
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('siteVisitsSub')}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsScheduleVisitOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="font-bold"
        >
          {t('scheduleVisit')}
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex items-center justify-between">
        <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs font-semibold">
          {[
            { id: 'all', label: `${isBn ? 'সব' : 'All'} (${isBn ? toBanglaDigits(siteVisits.length) : siteVisits.length})` },
            {
              id: 'scheduled',
              label: `${t('scheduled')} (${isBn ? toBanglaDigits(siteVisits.filter((s) => s.status === 'scheduled').length) : siteVisits.filter((s) => s.status === 'scheduled').length})`,
            },
            {
              id: 'completed',
              label: `${t('completed')} (${isBn ? toBanglaDigits(siteVisits.filter((s) => s.status === 'completed').length) : siteVisits.filter((s) => s.status === 'completed').length})`,
            },
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

        <span className="text-xs font-semibold text-black/60 hidden sm:inline">
          {t('dhakaCtgLive')}
        </span>
      </div>

      {/* Site Visits Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVisits.map((visit) => {
          const isDone = visit.status === 'completed';

          return (
            <div
              key={visit.id}
              className="bg-white p-5 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between space-y-4 hover:border-black/25 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-black">{visit.leadName}</h3>
                    <p className="text-xs text-black/60 font-mono mt-0.5">
                      {maskPhone(visit.leadPhone, revealSensitiveData)}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      isDone
                        ? 'bg-[#0038BD]/10 text-[#0038BD]'
                        : 'bg-[#EF8E01]/20 text-black border border-[#EF8E01]'
                    }`}
                  >
                    {isDone ? t('completed') : t('scheduled')}
                  </span>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[#EEEEEE]/50 border border-black/10 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-black font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#0038BD]" />
                    {visit.projectName} {visit.preferredUnit ? `(Unit ${visit.preferredUnit})` : ''}
                  </div>
                  <div className="flex items-center justify-between text-black/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-black/50" /> {formatDate(visit.scheduledDate, language)} {isBn ? 'সময়: ' : 'at '}
                      {formatDate(visit.scheduledTime, language)}
                    </span>
                    <span>{isBn ? 'এজেন্ট: ' : 'Agent: '}{visit.agentName}</span>
                  </div>
                </div>

                {/* Feedback preview if completed */}
                {visit.feedback && (
                  <div className="mt-3 p-3 rounded-xl bg-[#0038BD]/5 border border-[#0038BD]/15 text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-black">
                      <span>{t('inspectionFeedback')}</span>
                      <span className="text-[#0038BD]">
                        {isBn ? 'আগ্রহ: ' : 'Interest: '}
                        {visit.feedback.interestLevel === 'High' ? t('interestHigh') : visit.feedback.interestLevel === 'Medium' ? t('interestMedium') : t('interestLow')}
                      </span>
                    </div>
                    <p className="text-black/80">{visit.feedback.notes}</p>
                    <p className="text-[11px] text-black/60 font-semibold">
                      {t('nextStepLabel')} {visit.feedback.nextStep}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      showToast(
                        isBn ? `${visit.leadName}-কে কল করা হচ্ছে` : `Calling ${visit.leadName}`,
                        isBn ? `${visit.leadPhone}-এ ডায়াল করা হচ্ছে...` : `Dialing ${visit.leadPhone}...`,
                        'info'
                      )
                    }
                    className="p-1.5 rounded-lg border border-black/15 text-black hover:bg-[#EEEEEE] cursor-pointer"
                    title={t('call')}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        isBn
                          ? `আসসালামু আলাইকুম ${visit.leadName}, আপনার ${visit.projectName} প্রজেক্টের সাইট পরিদর্শন আগামী ${formatDate(visit.scheduledDate, 'bn')} তারিখ ${formatDate(visit.scheduledTime, 'bn')}-এ নির্ধারিত রয়েছে। আমাদের প্রজেক্ট ইঞ্জিনিয়ার আপনাকে অভ্যর্থনা জানাবেন।`
                          : `Assalamu Alaikum ${visit.leadName}, confirming your site visit for ${visit.projectName} on ${visit.scheduledDate} at ${visit.scheduledTime}. Our project engineer will receive you.`
                      );
                      window.open(
                        `https://wa.me/88${visit.leadPhone.replace(/[^0-9]/g, '')}?text=${text}`,
                        '_blank'
                      );
                    }}
                    className="p-1.5 rounded-lg border border-black/15 text-black hover:bg-[#EEEEEE] cursor-pointer"
                    title={t('whatsApp')}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>

                {!isDone ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenFeedback(visit)}
                    className="text-xs h-[30px]"
                  >
                    {t('logFeedbackAndComplete')}
                  </Button>
                ) : (
                  <button
                    onClick={() => handleOpenFeedback(visit)}
                    className="text-xs text-[#0038BD] font-bold hover:underline cursor-pointer"
                  >
                    {t('editFeedback')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Feedback Modal */}
      {feedbackVisitId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-black/10 p-5 space-y-4">
            <h3 className="text-sm font-bold text-black">{t('logSiteVisitFeedback')}</h3>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                {t('customerInterestLevel')}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['High', 'Medium', 'Low'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setInterestLevel(lvl)}
                    className={`py-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      interestLevel === lvl
                        ? 'bg-[#0038BD] text-white border-[#0038BD]'
                        : 'bg-[#EEEEEE] text-black border-transparent hover:bg-black/10'
                    }`}
                  >
                    {lvl === 'High' ? t('interestHigh') : lvl === 'Medium' ? t('interestMedium') : t('interestLow')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                {t('feedbackRemarksLabel')}
              </label>
              <textarea
                rows={3}
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                placeholder={isBn ? 'গ্রাহক ফ্ল্যাটের লেআউট, তলার উচ্চতা, পার্কিং বা মূল্য সম্পর্কে কী বলেছেন...' : 'What did the customer say about layout, floor level, parking, pricing...'}
                className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">{t('nextActionStepLabel')}</label>
              <input
                type="text"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                placeholder={isBn ? 'যেমন: ইউনিট 4A হোল্ড করুন, পরিবারের সাথে দ্বিতীয় ভিজিট, সংশোধিত শিডিউল প্রেরণ...' : 'e.g. Hold Unit 4A, arrange family visit, send revised schedule...'}
                className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#EEEEEE]">
              <Button variant="outline" size="sm" onClick={() => setFeedbackVisitId(null)}>
                {t('cancel')}
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveFeedback} className="font-bold">
                {t('saveAndComplete')}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ScheduleVisitModal />
    </div>
  );
};
