import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/formatters';

export const ScheduleVisitModal: React.FC = () => {
  const {
    isScheduleVisitOpen,
    setIsScheduleVisitOpen,
    scheduleVisit,
    leads,
    projects,
    agents,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [leadId, setLeadId] = useState(leads[0]?.id || '');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-1');
  const [preferredUnit, setPreferredUnit] = useState('4A');
  const [scheduledDate, setScheduledDate] = useState('02 Oct 2026');
  const [scheduledTime, setScheduledTime] = useState('11:00 AM');
  const [agentId, setAgentId] = useState(agents[0]?.id || 'agent-1');

  if (!isScheduleVisitOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleVisit({
      leadId,
      projectId,
      preferredUnit,
      scheduledDate,
      scheduledTime,
      agentId,
    });
    setIsScheduleVisitOpen(false);
  };

  return (
    <Modal
      isOpen={isScheduleVisitOpen}
      onClose={() => setIsScheduleVisitOpen(false)}
      title={t('scheduleSiteVisitModalTitle')}
      subtitle={t('scheduleSiteVisitModalSubtitle')}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className={`space-y-4 text-xs ${isBn ? 'font-bangla' : ''}`}>
        <div>
          <label className="block font-bold text-black mb-1">
            {t('buyerLeadLabel')}
          </label>
          <select
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            required
            className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
          >
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.phone}) · {isBn ? 'আগ্রহী: ' : 'Interested in '}{l.interestedProjectName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-black mb-1">
              {t('projectLocationLabel')}
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-black mb-1">
              {t('preferredFlatUnitLabel')}
            </label>
            <input
              type="text"
              value={preferredUnit}
              onChange={(e) => setPreferredUnit(e.target.value)}
              placeholder={isBn ? 'যেমন: 4A, 6B, বা ডুপ্লেক্স' : 'e.g. 4A, 6B, or Duplex'}
              className="w-full p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-black mb-1">
              {t('visitDateLabel')}
            </label>
            <input
              type="text"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              placeholder="02 Oct 2026"
              className="w-full p-2.5 bg-white border border-black/20 rounded-xl text-black outline-none font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-black mb-1">
              {t('visitTimeLabel')}
            </label>
            <select
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
            >
              <option value="10:00 AM">{formatDate('10:00 AM', language)}</option>
              <option value="11:30 AM">{formatDate('11:30 AM', language)}</option>
              <option value="03:00 PM">{formatDate('03:00 PM', language)}</option>
              <option value="04:30 PM">{formatDate('04:30 PM', language)}</option>
              <option value="05:30 PM">{formatDate('05:30 PM', language)}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-black mb-1">
            {t('assignedConsultant')}
          </label>
          <select
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black font-medium outline-none cursor-pointer"
          >
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.role})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsScheduleVisitOpen(false)}
          >
            {t('cancel')}
          </Button>
          <Button type="submit" variant="primary" size="sm" className="font-bold">
            {t('confirmVisitSlot')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
