import React, { useState } from 'react';
import {
  Kanban,
  Table as TableIcon,
  Plus,
  Search,
  Phone,
  Building,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeadStage } from '../../types';
import { formatBDT, maskPhone, formatDate, toBanglaDigits } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { LeadDetailDrawer } from './LeadDetailDrawer';
import { QuickAddLeadModal } from './QuickAddLeadModal';

export const LeadsView: React.FC = () => {
  const {
    leads,
    setSelectedLead,
    setIsQuickAddLeadOpen,
    revealSensitiveData,
    projects,
    language,
    t,
  } = useApp();

  const isBn = language === 'bn';
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stages: { key: LeadStage; label: string }[] = [
    { key: 'new', label: t('newInquiries') },
    { key: 'contacted', label: t('contacted') },
    { key: 'visit_scheduled', label: t('visitScheduled') },
    { key: 'visited', label: t('siteVisited') },
    { key: 'negotiation', label: t('negotiation') },
    { key: 'booked', label: t('bookedWon') },
    { key: 'lost', label: t('lost') },
  ];

  const filteredLeads = leads
    .filter((l) => (projectFilter === 'all' ? true : l.interestedProjectId === projectFilter))
    .filter((l) => (sourceFilter === 'all' ? true : l.source === sourceFilter))
    .filter((l) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.interestedProjectName.toLowerCase().includes(q) ||
        l.agentName.toLowerCase().includes(q)
      );
    });

  return (
    <div className={`space-y-5 ${isBn ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">{t('leads')}</h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            {t('leadsSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              {isBn ? 'কানবান' : 'Kanban'}
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-black shadow-2xs' : 'text-black/60 hover:text-black'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              {isBn ? 'টেবিল' : 'Table'}
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsQuickAddLeadOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            {t('newLead')}
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-3 py-2 bg-[#EEEEEE] border border-transparent focus:border-black/20 rounded-xl text-xs text-black outline-none"
          />
        </div>

        {/* Project & Source filter */}
        <div className="flex items-center gap-2">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="text-xs font-medium bg-[#EEEEEE] border border-black/10 rounded-xl px-3 py-2 text-black outline-none cursor-pointer"
          >
            <option value="all">{t('allProjects')}</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-xs font-medium bg-[#EEEEEE] border border-black/10 rounded-xl px-3 py-2 text-black outline-none cursor-pointer"
          >
            <option value="all">{t('allSources')}</option>
            <option value="Facebook">{isBn ? 'ফেসবুক' : 'Facebook'}</option>
            <option value="Walk-in">{isBn ? 'সরাসরি সাইট পরিদর্শন' : 'Walk-in'}</option>
            <option value="Referral">{isBn ? 'রেফারেল' : 'Referral'}</option>
            <option value="Website">{isBn ? 'ওয়েবসাইট' : 'Website'}</option>
            <option value="Call">{isBn ? 'সরাসরি কল' : 'Call'}</option>
          </select>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
          {stages.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.key);

            return (
              <div
                key={stage.key}
                className="w-72 shrink-0 bg-[#EEEEEE]/70 rounded-2xl p-3 border border-black/10 flex flex-col max-h-[75vh]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-black">{stage.label}</span>
                  </div>
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-white text-black shadow-2xs">
                    {isBn ? toBanglaDigits(stageLeads.length) : stageLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3 bg-white rounded-xl border border-black/10 shadow-2xs hover:border-[#0038BD]/40 hover:shadow-xs transition-all duration-150 cursor-pointer space-y-2 group"
                    >
                      {/* Name & Source */}
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-black group-hover:text-[#0038BD] transition-colors leading-tight">
                          {lead.name}
                        </h4>
                        <span className="text-[10px] text-black/60 bg-[#EEEEEE] px-1.5 py-0.5 rounded">
                          {lead.source}
                        </span>
                      </div>

                      {/* Phone & Budget */}
                      <div className="text-[11px] text-black/70 space-y-0.5">
                        <div className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-black/50" />
                          <span>{maskPhone(lead.phone, revealSensitiveData)}</span>
                        </div>
                        <div className="text-black font-semibold font-mono">
                          {isBn ? 'বাজেট: ' : 'Budget: '}
                          {formatBDT(lead.budgetMax, true, language)}
                        </div>
                      </div>

                      {/* Project interest */}
                      <div className="flex items-center gap-1 text-[11px] text-black/80 font-medium">
                        <Building className="w-3 h-3 text-[#0038BD]" />
                        <span className="truncate">{lead.interestedProjectName}</span>
                      </div>

                      {/* Held unit if any */}
                      {lead.heldUnitNumber && (
                        <div className="text-[10px] font-bold bg-[#EF8E01] text-black px-2 py-0.5 rounded flex items-center justify-between font-mono">
                          <span>{isBn ? 'হোল্ড: ইউনিট ' : 'Hold: Unit '}{lead.heldUnitNumber}</span>
                          <span>{isBn ? '৪৮ঘণ্টা' : '48h'}</span>
                        </div>
                      )}

                      {/* Footer: Agent & Follow-up */}
                      <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-between text-[10px] text-black/60">
                        <span>{lead.agentName.split(' ')[0]}</span>
                        <span className="font-semibold text-black">
                          {isBn ? 'ফলো-আপ: ' : 'Next: '}{formatDate(lead.nextFollowUpDate, language)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="p-4 text-center text-xs text-black/40 italic">
                      {isBn ? 'এই ধাপে কোনো লিড নেই' : 'No leads in this stage'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                  <th className="py-3 px-3">{t('thLeadName')}</th>
                  <th className="py-3 px-3">{t('thPhone')}</th>
                  <th className="py-3 px-3">{t('thStage')}</th>
                  <th className="py-3 px-3">{t('thInterestedProject')}</th>
                  <th className="py-3 px-3">{t('thMaxBudget')}</th>
                  <th className="py-3 px-3">{t('thSource')}</th>
                  <th className="py-3 px-3">{t('thAgent')}</th>
                  <th className="py-3 px-3">{t('thNextFollowUp')}</th>
                  <th className="py-3 px-3 text-right">{t('thDetails')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE]">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-[#EEEEEE]/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3 font-bold text-black">{lead.name}</td>
                    <td className="py-3 px-3 font-mono text-black/80">
                      {maskPhone(lead.phone, revealSensitiveData)}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge type="lead" status={lead.stage} />
                    </td>
                    <td className="py-3 px-3 font-medium text-black">
                      {lead.interestedProjectName}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-black">
                      {formatBDT(lead.budgetMax, true, language)}
                    </td>
                    <td className="py-3 px-3 text-black/70">{lead.source}</td>
                    <td className="py-3 px-3 text-black/70">{lead.agentName}</td>
                    <td className="py-3 px-3 font-medium text-black">
                      {formatDate(lead.nextFollowUpDate, language)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[#0038BD] font-bold inline-flex items-center gap-1 hover:underline">
                        {t('open')} <ArrowRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <LeadDetailDrawer />
      <QuickAddLeadModal />
    </div>
  );
};
