import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { LeadSource } from '../../types';

export const QuickAddLeadModal: React.FC = () => {
  const { isQuickAddLeadOpen, setIsQuickAddLeadOpen, addLead, projects, agents, language, t } = useApp();
  const isBn = language === 'bn';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [budgetMin, setBudgetMin] = useState(20000000);
  const [budgetMax, setBudgetMax] = useState(25000000);
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-1');
  const [source, setSource] = useState<LeadSource>('Facebook');
  const [agentId, setAgentId] = useState(agents[0]?.id || 'agent-1');
  const [notes, setNotes] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('02 Oct 2026');

  if (!isQuickAddLeadOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedProj = projects.find((p) => p.id === projectId);
    const selectedAgent = agents.find((a) => a.id === agentId);

    addLead({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      profession: profession || (isBn ? 'ব্যবসায়ী / পেশাজীবী' : 'Business / Professional'),
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      interestedProjectId: projectId,
      interestedProjectName: selectedProj?.name || 'Pinnacle Grandeur',
      interestedSizeSqFt: 2150,
      source,
      stage: 'new',
      agentId,
      agentName: selectedAgent?.name || 'Arifur Rahman',
      notes,
      nextFollowUpDate,
    });

    setIsQuickAddLeadOpen(false);
    setName('');
    setPhone('');
    setNotes('');
  };

  return (
    <Modal
      isOpen={isQuickAddLeadOpen}
      onClose={() => setIsQuickAddLeadOpen(false)}
      title={t('quickAddLeadTitle')}
      subtitle={t('quickAddLeadSubtitle')}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className={`space-y-3.5 ${isBn ? 'font-bangla' : ''}`}>
        <div>
          <label className="block text-xs font-bold text-black mb-1">
            {t('buyerFullName')}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Engr. Shafiqul Alam"
            className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('phoneNumber')}
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01712-345678"
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('sourceChannel')}
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as LeadSource)}
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium cursor-pointer"
            >
              <option value="Facebook">{isBn ? 'ফেসবুক বিজ্ঞাপন' : 'Facebook Ads'}</option>
              <option value="Walk-in">{isBn ? 'সাইট অফিস সরাসরি' : 'Site Office Walk-in'}</option>
              <option value="Referral">{isBn ? 'রেফারেল / পুরাতন ক্রেতা' : 'Referral / Existing Buyer'}</option>
              <option value="Website">{isBn ? 'ওয়েবসাইট ফর্ম' : 'Website Form'}</option>
              <option value="Call">{isBn ? 'সরাসরি ফোন কল' : 'Direct Phone Call'}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('thInterestedProject')}
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.location.split(',')[0]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('assignedConsultant')}
            </label>
            <select
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-medium cursor-pointer"
            >
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('minBudget')}
            </label>
            <input
              type="number"
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              step={500000}
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              {t('maxBudget')}
            </label>
            <input
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              step={500000}
              className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-black mb-1">
            {t('requirementNotes')}
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('buyerNotesPlaceholder')}
            className="w-full text-xs p-2.5 bg-[#EEEEEE] border border-black/15 rounded-xl text-black outline-none font-sans"
          />
        </div>

        <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsQuickAddLeadOpen(false)}
          >
            {t('cancel')}
          </Button>
          <Button type="submit" variant="primary" size="sm" className="font-bold">
            {t('createLead')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
