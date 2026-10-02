import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  UserRole,
  Language,
  Lead,
  Unit,
  Customer,
  Installment,
  PaymentRecord,
  SiteVisit,
  Agent,
  CommissionEntry,
  AuditLogItem,
  TaskReminder,
  Project,
  PaymentMethod,
  LeadStage,
} from '../types';
import {
  initialProjects,
  initialUnits,
  initialLeads,
  initialCustomers,
  initialInstallments,
  initialPayments,
  initialSiteVisits,
  initialAgents,
  initialCommissionLedger,
  initialAuditLogs,
  initialTasks,
} from '../data/mockData';

import {
  TranslationKey,
  t as translateKey,
  translateStatus,
  translatePaymentMethod,
} from '../utils/translations';

export type NavSection =
  | 'dashboard'
  | 'leads'
  | 'site_visits'
  | 'inventory'
  | 'bookings'
  | 'installments'
  | 'overdue_dedicated'
  | 'customers'
  | 'agents'
  | 'reminders'
  | 'reports'
  | 'settings';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'warning' | 'info';
}

interface AppContextType {
  // Navigation & Role
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string) => string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  revealSensitiveData: boolean;
  setRevealSensitiveData: (reveal: boolean) => void;
  toggleRevealSensitive: () => void;

  // Data Collections
  projects: Project[];
  units: Unit[];
  leads: Lead[];
  customers: Customer[];
  installments: Installment[];
  payments: PaymentRecord[];
  siteVisits: SiteVisit[];
  agents: Agent[];
  commissions: CommissionEntry[];
  auditLogs: AuditLogItem[];
  tasks: TaskReminder[];

  // Computed Values
  totalOverdueAmount: number;
  totalCollectedThisMonth: number;
  availableFlatsCount: number;
  newLeadsTodayCount: number;
  siteVisitsTodayCount: number;

  // Modals & Drawers state
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  selectedUnit: Unit | null;
  setSelectedUnit: (unit: Unit | null) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;

  isQuickAddLeadOpen: boolean;
  setIsQuickAddLeadOpen: (open: boolean) => void;
  isScheduleVisitOpen: boolean;
  setIsScheduleVisitOpen: (open: boolean) => void;
  isRecordPaymentOpen: boolean;
  setIsRecordPaymentOpen: (open: boolean) => void;
  paymentTargetInstallment: Installment | null;
  setPaymentTargetInstallment: (inst: Installment | null) => void;

  isBookingWizardOpen: boolean;
  setIsBookingWizardOpen: (open: boolean) => void;
  wizardSelectedUnit: Unit | null;
  setWizardSelectedUnit: (unit: Unit | null) => void;

  isReminderModalOpen: boolean;
  setIsReminderModalOpen: (open: boolean) => void;
  reminderTarget: {
    customerName: string;
    customerPhone: string;
    flatInfo: string;
    amount: number;
    dueDate: string;
    daysLate: number;
  } | null;
  setReminderTarget: (target: any) => void;

  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  receiptPayment: PaymentRecord | null;
  setReceiptPayment: (pay: PaymentRecord | null) => void;

  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Actions
  addLead: (newLead: Omit<Lead, 'id' | 'createdAt' | 'callLogs'>) => void;
  updateLeadStage: (leadId: string, stage: LeadStage) => void;
  holdUnit: (unitId: string, leadId?: string, leadName?: string) => void;
  releaseHold: (unitId: string) => void;
  recordPayment: (data: {
    installmentId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNo: string;
    bankName?: string;
    chequeNo?: string;
    notes?: string;
  }) => void;
  scheduleVisit: (data: {
    leadId: string;
    projectId: string;
    preferredUnit?: string;
    scheduledDate: string;
    scheduledTime: string;
    agentId: string;
  }) => void;
  completeVisit: (visitId: string, feedback: { interestLevel: 'High' | 'Medium' | 'Low'; notes: string; nextStep: string }) => void;
  createBooking: (data: {
    customerId: string;
    unitId: string;
    bookingMoney: number;
    paymentMethod: PaymentMethod;
    downPaymentPercent: number;
    installmentsCount: number;
  }) => void;
  approveCommission: (commId: string) => void;
  payCommission: (commId: string) => void;
  toggleTask: (taskId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('flatdesk_lang');
      return saved === 'bn' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('flatdesk_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey | string): string => {
    return translateKey(key, language);
  };

  const [userRole, setUserRole] = useState<UserRole>('sales_manager');
  const [revealSensitiveData, setRevealSensitiveData] = useState<boolean>(false);

  // Data states
  const [projects] = useState<Project[]>(initialProjects);
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [installments, setInstallments] = useState<Installment[]>(initialInstallments);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(initialSiteVisits);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [commissions, setCommissions] = useState<CommissionEntry[]>(initialCommissionLedger);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [tasks, setTasks] = useState<TaskReminder[]>(initialTasks);

  // Modals & Selection States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [isQuickAddLeadOpen, setIsQuickAddLeadOpen] = useState(false);
  const [isScheduleVisitOpen, setIsScheduleVisitOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentTargetInstallment, setPaymentTargetInstallment] = useState<Installment | null>(null);

  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [wizardSelectedUnit, setWizardSelectedUnit] = useState<Unit | null>(null);

  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderTarget, setReminderTarget] = useState<any>(null);

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptPayment, setReceiptPayment] = useState<PaymentRecord | null>(null);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toast notification system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleRevealSensitive = () => {
    const nextState = !revealSensitiveData;
    setRevealSensitiveData(nextState);
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      actorName: userRole === 'admin' ? 'Tariqul Islam' : userRole === 'sales_manager' ? 'Sabrina Sultana' : 'Current User',
      actorRole: userRole,
      action: nextState ? 'REVEAL_SENSITIVE_DATA' : 'HIDE_SENSITIVE_DATA',
      entityType: 'customer',
      entityId: 'ALL_RECORDS',
      details: `${nextState ? 'Unmasked' : 'Masked'} sensitive NID and contact details across lists.`,
      ip: '103.114.98.40',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    showToast(
      nextState ? 'Sensitive Data Revealed' : 'Sensitive Data Masked',
      'This access action was recorded in the security audit log.',
      'info'
    );
  };

  // Computed Metrics
  const totalOverdueAmount = useMemo(() => {
    return installments
      .filter((i) => i.status === 'overdue')
      .reduce((sum, item) => sum + item.balance, 0);
  }, [installments]);

  const totalCollectedThisMonth = useMemo(() => {
    return payments.reduce((sum, p) => sum + p.amount, 0);
  }, [payments]);

  const availableFlatsCount = useMemo(() => {
    return units.filter((u) => u.status === 'available').length;
  }, [units]);

  const newLeadsTodayCount = useMemo(() => {
    return leads.filter((l) => l.stage === 'new').length;
  }, [leads]);

  const siteVisitsTodayCount = useMemo(() => {
    return siteVisits.filter((s) => s.status === 'scheduled').length;
  }, [siteVisits]);

  // Actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'callLogs'>) => {
    const newId = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...leadData,
      id: newId,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      callLogs: [],
    };
    setLeads((prev) => [newLead, ...prev]);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actorName: 'Current User',
        actorRole: userRole,
        action: 'LEAD_CREATED',
        entityType: 'lead',
        entityId: newId,
        details: `Created new lead for ${newLead.name} (${newLead.phone}).`,
        ip: '103.114.98.40',
      },
      ...prev,
    ]);

    showToast('Lead Added Successfully', `${newLead.name} has been added to pipeline.`, 'success');
  };

  const updateLeadStage = (leadId: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage } : l))
    );
    showToast('Lead Stage Updated', `Lead moved to ${stage.replace('_', ' ')}.`, 'info');
  };

  const holdUnit = (unitId: string, leadId?: string, leadName?: string) => {
    const targetUnit = units.find((u) => u.id === unitId);
    if (!targetUnit) return;
    if (targetUnit.status !== 'available') {
      showToast('Cannot Hold Unit', `Unit ${targetUnit.unitNumber} is already ${targetUnit.status}.`, 'warning');
      return;
    }

    const now = new Date();
    const expires = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours

    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: 'hold',
              heldByLeadId: leadId || 'lead-guest',
              heldByLeadName: leadName || 'Reserved Prospect',
              heldAt: now.toISOString(),
              holdExpiresAt: expires.toISOString(),
            }
          : u
      )
    );

    if (leadId) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId
            ? { ...l, heldUnitId: unitId, heldUnitNumber: targetUnit.unitNumber, stage: 'negotiation' }
            : l
        )
      );
    }

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actorName: 'Current User',
        actorRole: userRole,
        action: 'HOLD_PLACED',
        entityType: 'unit',
        entityId: `${targetUnit.projectName} - ${targetUnit.unitNumber}`,
        details: `48-hour hold placed for ${leadName || 'prospect'}. Auto-expires in 48 hours.`,
        ip: '103.114.98.40',
      },
      ...prev,
    ]);

    showToast('Unit Held (48 Hours)', `Unit ${targetUnit.unitNumber} is held. Auto-expires in 48 hours.`, 'success');
  };

  const releaseHold = (unitId: string) => {
    const targetUnit = units.find((u) => u.id === unitId);
    if (!targetUnit) return;

    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: 'available',
              heldByLeadId: undefined,
              heldByLeadName: undefined,
              heldAt: undefined,
              holdExpiresAt: undefined,
            }
          : u
      )
    );

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actorName: 'Current User',
        actorRole: userRole,
        action: 'HOLD_RELEASED',
        entityType: 'unit',
        entityId: `${targetUnit.projectName} - ${targetUnit.unitNumber}`,
        details: `Hold released. Unit ${targetUnit.unitNumber} is now live and available.`,
        ip: '103.114.98.40',
      },
      ...prev,
    ]);

    showToast('Hold Released', `Unit ${targetUnit.unitNumber} is now marked Available.`, 'info');
  };

  const recordPayment = (data: {
    installmentId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNo: string;
    bankName?: string;
    chequeNo?: string;
    notes?: string;
  }) => {
    const inst = installments.find((i) => i.id === data.installmentId);
    if (!inst) return;

    const receiptNo = `MR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPaidAmount = inst.paidAmount + data.amount;
    const newBalance = Math.max(0, inst.amount - newPaidAmount);
    const newStatus = newBalance === 0 ? 'paid' : inst.status;

    setInstallments((prev) =>
      prev.map((i) =>
        i.id === data.installmentId
          ? {
              ...i,
              paidAmount: newPaidAmount,
              balance: newBalance,
              status: newStatus,
              paymentMethod: data.paymentMethod,
              paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              receiptNo: receiptNo,
            }
          : i
      )
    );

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      receiptNo,
      customerId: inst.customerId,
      customerName: inst.customerName,
      unitId: inst.unitId,
      unitNumber: inst.unitNumber,
      projectName: inst.projectName,
      installmentId: inst.id,
      installmentName: inst.installmentName,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      referenceNo: data.referenceNo,
      bankName: data.bankName,
      chequeNo: data.chequeNo,
      receivedBy: userRole === 'accounts' ? 'Accounts Department' : 'Sales Collection Counter',
      notes: data.notes,
    };

    setPayments((prev) => [newPayment, ...prev]);

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === inst.customerId
          ? {
              ...c,
              totalPaid: c.totalPaid + data.amount,
              totalDue: Math.max(0, c.totalDue - data.amount),
            }
          : c
      )
    );

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actorName: 'Current User',
        actorRole: userRole,
        action: 'PAYMENT_RECORDED',
        entityType: 'payment',
        entityId: receiptNo,
        details: `Recorded ${data.paymentMethod} payment of ৳ ${data.amount.toLocaleString()} for ${inst.customerName} (${inst.unitNumber}). Oldest overdue allocated.`,
        ip: '103.114.98.40',
      },
      ...prev,
    ]);

    setReceiptPayment(newPayment);
    setIsReceiptModalOpen(true);
    showToast('Payment Recorded!', `Receipt ${receiptNo} generated for ৳ ${data.amount.toLocaleString()}.`, 'success');
  };

  const scheduleVisit = (data: {
    leadId: string;
    projectId: string;
    preferredUnit?: string;
    scheduledDate: string;
    scheduledTime: string;
    agentId: string;
  }) => {
    const lead = leads.find((l) => l.id === data.leadId);
    const proj = projects.find((p) => p.id === data.projectId);
    const agent = agents.find((a) => a.id === data.agentId);

    const newVisit: SiteVisit = {
      id: `sv-${Date.now()}`,
      leadId: data.leadId,
      leadName: lead?.name || 'Prospect',
      leadPhone: lead?.phone || '',
      projectId: data.projectId,
      projectName: proj?.name || 'Project',
      preferredUnit: data.preferredUnit,
      agentId: data.agentId,
      agentName: agent?.name || 'Assigned Agent',
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      status: 'scheduled',
    };

    setSiteVisits((prev) => [newVisit, ...prev]);

    setLeads((prev) =>
      prev.map((l) =>
        l.id === data.leadId ? { ...l, stage: 'visit_scheduled' } : l
      )
    );

    showToast('Site Visit Scheduled', `Visit confirmed for ${newVisit.leadName} on ${data.scheduledDate}.`, 'success');
  };

  const completeVisit = (
    visitId: string,
    feedback: { interestLevel: 'High' | 'Medium' | 'Low'; notes: string; nextStep: string }
  ) => {
    setSiteVisits((prev) =>
      prev.map((v) =>
        v.id === visitId
          ? {
              ...v,
              status: 'completed',
              feedback,
            }
          : v
      )
    );

    showToast('Site Visit Completed', 'Feedback and next steps have been logged.', 'success');
  };

  const createBooking = (data: {
    customerId: string;
    unitId: string;
    bookingMoney: number;
    paymentMethod: PaymentMethod;
    downPaymentPercent: number;
    installmentsCount: number;
  }) => {
    const unit = units.find((u) => u.id === data.unitId);
    const cust = customers.find((c) => c.id === data.customerId);
    if (!unit || !cust) return;

    setUnits((prev) =>
      prev.map((u) =>
        u.id === data.unitId
          ? {
              ...u,
              status: 'booked',
              bookedCustomerId: cust.id,
              bookedCustomerName: cust.name,
              bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              heldByLeadId: undefined,
              heldByLeadName: undefined,
              heldAt: undefined,
              holdExpiresAt: undefined,
            }
          : u
      )
    );

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === data.customerId
          ? {
              ...c,
              flatsOwned: [
                ...c.flatsOwned,
                {
                  unitId: unit.id,
                  unitNumber: unit.unitNumber,
                  projectId: unit.projectId,
                  projectName: unit.projectName,
                  totalPrice: unit.totalPrice,
                  bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                },
              ],
              totalCommitted: c.totalCommitted + unit.totalPrice,
              totalPaid: c.totalPaid + data.bookingMoney,
              totalDue: c.totalDue + (unit.totalPrice - data.bookingMoney),
            }
          : c
      )
    );

    const receiptNo = `MR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      receiptNo,
      customerId: cust.id,
      customerName: cust.name,
      unitId: unit.id,
      unitNumber: unit.unitNumber,
      projectName: unit.projectName,
      installmentId: `inst-book-${Date.now()}`,
      installmentName: 'Booking Token Money',
      amount: data.bookingMoney,
      paymentMethod: data.paymentMethod,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      referenceNo: `BOOK-${unit.unitNumber}`,
      receivedBy: 'Booking Department',
      notes: 'Initial booking token money receipt.',
    };

    setPayments((prev) => [newPayment, ...prev]);

    const downPaymentAmount = Math.round(unit.totalPrice * (data.downPaymentPercent / 100));
    const downPaymentDue = Math.max(0, downPaymentAmount - data.bookingMoney);

    const newInstSchedule: Installment[] = [
      {
        id: `inst-bk-${Date.now()}-1`,
        customerId: cust.id,
        customerName: cust.name,
        customerPhone: cust.phone,
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        projectId: unit.projectId,
        projectName: unit.projectName,
        installmentName: 'Booking Token Money',
        installmentType: 'booking',
        dueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        amount: data.bookingMoney,
        paidAmount: data.bookingMoney,
        balance: 0,
        status: 'paid',
        daysLate: 0,
        paymentMethod: data.paymentMethod,
        receiptNo: receiptNo,
        agentName: 'Arifur Rahman',
        agentId: 'agent-1',
      },
      {
        id: `inst-dp-${Date.now()}-2`,
        customerId: cust.id,
        customerName: cust.name,
        customerPhone: cust.phone,
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        projectId: unit.projectId,
        projectName: unit.projectName,
        installmentName: `Down Payment (${data.downPaymentPercent}%) Balance`,
        installmentType: 'down_payment',
        dueDate: '30 Oct 2026',
        amount: downPaymentDue,
        paidAmount: 0,
        balance: downPaymentDue,
        status: 'upcoming',
        daysLate: 0,
        agentName: 'Arifur Rahman',
        agentId: 'agent-1',
      },
    ];

    setInstallments((prev) => [...newInstSchedule, ...prev]);

    const newCommission: CommissionEntry = {
      id: `comm-${Date.now()}`,
      agentId: 'agent-1',
      agentName: 'Arifur Rahman',
      customerName: cust.name,
      unitNumber: unit.unitNumber,
      projectName: unit.projectName,
      flatPrice: unit.totalPrice,
      commissionPercentage: 1.0,
      commissionAmount: Math.round(unit.totalPrice * 0.01),
      status: 'pending',
      milestoneTrigger: 'Down Payment Cleared',
      milestoneAchieved: false,
      bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setCommissions((prev) => [newCommission, ...prev]);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        actorName: 'Current User',
        actorRole: userRole,
        action: 'UNIT_BOOKED',
        entityType: 'booking',
        entityId: `${unit.projectName} - ${unit.unitNumber}`,
        details: `Confirmed booking for ${cust.name}. Total: ৳ ${unit.totalPrice.toLocaleString()}. Booking token ৳ ${data.bookingMoney.toLocaleString()}.`,
        ip: '103.114.98.40',
      },
      ...prev,
    ]);

    setReceiptPayment(newPayment);
    setIsReceiptModalOpen(true);
    showToast('Booking Confirmed!', `Unit ${unit.unitNumber} officially booked for ${cust.name}.`, 'success');
  };

  const approveCommission = (commId: string) => {
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === commId
          ? {
              ...c,
              status: 'approved',
              approvedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }
          : c
      )
    );
    showToast('Commission Approved', 'Commission moved to Approved ledger for payout.', 'success');
  };

  const payCommission = (commId: string) => {
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === commId
          ? {
              ...c,
              status: 'paid',
              paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }
          : c
      )
    );
    showToast('Commission Disbursed', 'Commission marked as Paid and disbursed.', 'success');
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        language,
        setLanguage,
        t,
        userRole,
        setUserRole,
        revealSensitiveData,
        setRevealSensitiveData,
        toggleRevealSensitive,

        projects,
        units,
        leads,
        customers,
        installments,
        payments,
        siteVisits,
        agents,
        commissions,
        auditLogs,
        tasks,

        totalOverdueAmount,
        totalCollectedThisMonth,
        availableFlatsCount,
        newLeadsTodayCount,
        siteVisitsTodayCount,

        selectedLead,
        setSelectedLead,
        selectedUnit,
        setSelectedUnit,
        selectedCustomer,
        setSelectedCustomer,

        isQuickAddLeadOpen,
        setIsQuickAddLeadOpen,
        isScheduleVisitOpen,
        setIsScheduleVisitOpen,
        isRecordPaymentOpen,
        setIsRecordPaymentOpen,
        paymentTargetInstallment,
        setPaymentTargetInstallment,

        isBookingWizardOpen,
        setIsBookingWizardOpen,
        wizardSelectedUnit,
        setWizardSelectedUnit,

        isReminderModalOpen,
        setIsReminderModalOpen,
        reminderTarget,
        setReminderTarget,

        isReceiptModalOpen,
        setIsReceiptModalOpen,
        receiptPayment,
        setReceiptPayment,

        isCommandPaletteOpen,
        setIsCommandPaletteOpen,

        addLead,
        updateLeadStage,
        holdUnit,
        releaseHold,
        recordPayment,
        scheduleVisit,
        completeVisit,
        createBooking,
        approveCommission,
        payCommission,
        toggleTask,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
