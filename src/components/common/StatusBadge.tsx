import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  UserCheck,
  PhoneCall,
  Eye,
  Handshake,
  Check,
  XCircle,
  Building,
} from 'lucide-react';
import { FlatStatus, InstallmentStatus, LeadStage } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatDaysLate } from '../../utils/formatters';

interface StatusBadgeProps {
  type: 'flat' | 'installment' | 'lead';
  status: string;
  daysLate?: number;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  status,
  daysLate,
  className = '',
}) => {
  const { language, t } = useApp();
  const isBn = language === 'bn';

  if (type === 'flat') {
    const s = status as FlatStatus;
    switch (s) {
      case 'available':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white border-2 border-[#0038BD] text-black ${className}`}
          >
            <Building className="w-3.5 h-3.5 text-[#0038BD]" />
            {t('available')}
          </span>
        );
      case 'hold':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#EEEEEE] border border-black/20 text-black ${className}`}
          >
            <Clock className="w-3.5 h-3.5 text-black/70" />
            {t('hold')}
          </span>
        );
      case 'booked':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EF8E01]/20 border border-[#EF8E01] text-black ${className}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
            {t('booked')}
          </span>
        );
      case 'sold':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0038BD] text-white ${className}`}
          >
            <Check className="w-3.5 h-3.5 text-white" />
            {t('sold')}
          </span>
        );
      default:
        return null;
    }
  }

  if (type === 'installment') {
    const s = status as InstallmentStatus;
    switch (s) {
      case 'paid':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0038BD]/10 border border-[#0038BD]/30 text-[#0038BD] ${className}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0038BD]" />
            {t('paid')}
          </span>
        );
      case 'upcoming':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-normal bg-[#EEEEEE] text-black/70 ${className}`}
          >
            <Calendar className="w-3.5 h-3.5 text-black/50" />
            {t('upcoming')}
          </span>
        );
      case 'due_soon':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border-2 border-[#EF8E01] bg-[#EF8E01]/10 text-black ${className}`}
          >
            <Clock className="w-3.5 h-3.5 text-black" />
            {t('dueSoon')}
          </span>
        );
      case 'overdue':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#EF8E01] text-black shadow-xs ${className}`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            {t('overdue')}{' '}
            {daysLate !== undefined && daysLate > 0
              ? `(${formatDaysLate(daysLate, language)})`
              : ''}
          </span>
        );
      default:
        return null;
    }
  }

  if (type === 'lead') {
    const s = status as LeadStage;
    switch (s) {
      case 'new':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0038BD]/10 text-[#0038BD] border border-[#0038BD]/20 ${className}`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#0038BD]" />
            {t('newInquiries')}
          </span>
        );
      case 'contacted':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#EEEEEE] text-black ${className}`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-black/60" />
            {t('contacted')}
          </span>
        );
      case 'visit_scheduled':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EF8E01]/15 border border-[#EF8E01]/40 text-black ${className}`}
          >
            <Calendar className="w-3.5 h-3.5 text-black" />
            {t('visitScheduled')}
          </span>
        );
      case 'visited':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-black/10 text-black ${className}`}
          >
            <Eye className="w-3.5 h-3.5 text-black" />
            {t('siteVisited')}
          </span>
        );
      case 'negotiation':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#EF8E01] text-black ${className}`}
          >
            <Handshake className="w-3.5 h-3.5 text-black" />
            {t('negotiation')}
          </span>
        );
      case 'booked':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0038BD] text-white ${className}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            {t('bookedWon')}
          </span>
        );
      case 'lost':
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-normal bg-[#EEEEEE] text-black/60 line-through ${className}`}
          >
            <XCircle className="w-3.5 h-3.5 text-black/40" />
            {t('lost')}
          </span>
        );
      default:
        return null;
    }
  }

  return null;
};
