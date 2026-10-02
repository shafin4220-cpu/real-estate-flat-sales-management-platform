import React, { useState } from 'react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatBDT, maskPhone, formatDate, toBanglaDigits } from '../../utils/formatters';
import {
  Phone,
  Mail,
  Briefcase,
  Building,
  Calendar,
  Clock,
} from 'lucide-react';
import { LeadStage } from '../../types';

export const LeadDetailDrawer: React.FC = () => {
  const {
    selectedLead,
    setSelectedLead,
    revealSensitiveData,
    updateLeadStage,
    setIsScheduleVisitOpen,
    setCurrentSection,
    language,
    t,
    showToast,
  } = useApp();

  const isBn = language === 'bn';
  const [callNotes, setCallNotes] = useState('');
  const [callOutcome, setCallOutcome] = useState('Interested');

  if (!selectedLead) return null;

  const handleAddCallLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callNotes.trim()) return;

    selectedLead.callLogs.unshift({
      id: `cl-${Date.now()}`,
      date: isBn ? 'আজ, ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) : 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      agentName: selectedLead.agentName,
      durationMinutes: 5,
      outcome: callOutcome,
      notes: callNotes,
    });

    setCallNotes('');
    showToast(
      isBn ? 'কল নোট সংরক্ষিত' : 'Call Log Saved',
      isBn ? 'গ্রাহক টাইমলাইনে নতুন ফোন কলের তথ্য যোগ হয়েছে।' : 'New call record added to customer timeline.',
      'success'
    );
  };

  const stages: { key: LeadStage; label: string }[] = [
    { key: 'new', label: t('newInquiries') },
    { key: 'contacted', label: t('contacted') },
    { key: 'visit_scheduled', label: t('visitScheduled') },
    { key: 'visited', label: t('siteVisited') },
    { key: 'negotiation', label: t('negotiation') },
    { key: 'booked', label: t('bookedWon') },
    { key: 'lost', label: t('lost') },
  ];

  return (
    <Drawer
      isOpen={!!selectedLead}
      onClose={() => setSelectedLead(null)}
      title={selectedLead.name}
      subtitle={`${isBn ? 'যোগ করা হয়েছে: ' : 'Created on '}${formatDate(selectedLead.createdAt, language)} · ${t('thSource')}: ${selectedLead.source}`}
      width="lg"
    >
      <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
        {/* Stage Selector Bar */}
        <div>
          <label className="text-xs font-bold text-black block mb-1.5">
            {t('pipelineStage')}
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {stages.map((st) => (
              <button
                key={st.key}
                onClick={() => updateLeadStage(selectedLead.id, st.key)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer ${
                  selectedLead.stage === st.key
                    ? 'bg-[#0038BD] text-white'
                    : 'bg-[#EEEEEE] text-black/70 hover:text-black hover:bg-black/10'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsScheduleVisitOpen(true);
            }}
            icon={<Calendar className="w-3.5 h-3.5 text-[#0038BD]" />}
          >
            {t('scheduleVisit')}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setCurrentSection('inventory');
              setSelectedLead(null);
            }}
            icon={<Building className="w-3.5 h-3.5" />}
          >
            {t('holdFlat')}
          </Button>
        </div>

        {/* Contact & Profile Info */}
        <div className="p-4 rounded-xl bg-[#EEEEEE]/50 border border-black/10 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> {t('thPhone')}
            </span>
            <span className="font-mono font-bold text-black">
              {maskPhone(selectedLead.phone, revealSensitiveData)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email
            </span>
            <span className="text-black font-medium">{selectedLead.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> {isBn ? 'পেশা' : 'Profession'}
            </span>
            <span className="text-black font-medium">{selectedLead.profession}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" /> {t('thInterestedProject')}
            </span>
            <span className="text-black font-bold">{selectedLead.interestedProjectName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60">{isBn ? 'বাজেট সীমা' : 'Budget Range'}</span>
            <span className="font-mono font-bold text-black">
              {formatBDT(selectedLead.budgetMin, true, language)} - {formatBDT(selectedLead.budgetMax, true, language)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60">{t('thAgent')}</span>
            <span className="font-semibold text-black">{selectedLead.agentName}</span>
          </div>

          {selectedLead.heldUnitNumber && (
            <div className="pt-2 border-t border-black/10 flex items-center justify-between">
              <span className="text-black/70 font-bold">{isBn ? 'বর্তমান হোল্ডকৃত:' : 'Currently Holding:'}</span>
              <span className="bg-[#EF8E01] text-black font-bold px-2 py-0.5 rounded text-xs font-mono">
                Unit {selectedLead.heldUnitNumber}
              </span>
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-xs font-bold text-black mb-1">{t('requirementNotes')}</h4>
          <div className="p-3 rounded-xl bg-white border border-black/15 text-xs text-black/80 leading-relaxed">
            {selectedLead.notes || (isBn ? 'কোনো মন্তব্য লেখা হয়নি।' : 'No specific notes recorded.')}
          </div>
        </div>

        {/* Add Call Log Box */}
        <form onSubmit={handleAddCallLog} className="space-y-2 p-3.5 rounded-xl bg-[#EEEEEE] border border-black/10">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-black flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0038BD]" /> {t('logPhoneCall')}
            </h4>
            <select
              value={callOutcome}
              onChange={(e) => setCallOutcome(e.target.value)}
              className="text-[11px] bg-white border border-black/15 rounded-lg px-2 py-1 font-medium text-black outline-none cursor-pointer"
            >
              <option value="Interested">{isBn ? 'আগ্রহী / ফলো আপ' : 'Interested / Follow up'}</option>
              <option value="Scheduled Visit">{isBn ? 'সাইট ভিজিট নির্ধারিত' : 'Scheduled Visit'}</option>
              <option value="Busy / Call Later">{isBn ? 'ব্যস্ত / পরে কল করবেন' : 'Busy / Call Later'}</option>
              <option value="Not Interested">{isBn ? 'আগ্রহী নন' : 'Not Interested'}</option>
            </select>
          </div>
          <textarea
            rows={2}
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
            placeholder={t('keyDiscussion')}
            className="w-full text-xs p-2.5 bg-white border border-black/15 rounded-lg text-black outline-none font-sans"
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm" className="h-[28px] text-[11px]">
              {t('saveCallNote')}
            </Button>
          </div>
        </form>

        {/* Call Logs & Timeline */}
        <div>
          <h4 className="text-xs font-bold text-black mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0038BD]" /> {t('activityHistory')}
          </h4>

          {selectedLead.callLogs && selectedLead.callLogs.length > 0 ? (
            <div className="space-y-2.5 border-l-2 border-[#0038BD]/30 pl-3 ml-2">
              {selectedLead.callLogs.map((log) => (
                <div key={log.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">{log.outcome}</span>
                    <span className="text-[10px] text-black/50">{formatDate(log.date, language)}</span>
                  </div>
                  <p className="text-black/70 text-[11px]">{log.notes}</p>
                  <p className="text-[10px] text-black/50">{t('loggedBy')} {log.agentName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-black/50 italic">{t('noCallLogsYet')}</p>
          )}
        </div>
      </div>
    </Drawer>
  );
};
