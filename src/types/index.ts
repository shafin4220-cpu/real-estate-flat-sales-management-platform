export type UserRole = 'sales_manager' | 'sales_agent' | 'accounts' | 'admin';

export type Language = 'en' | 'bn';

export type FlatStatus = 'available' | 'hold' | 'booked' | 'sold';

export type InstallmentStatus = 'paid' | 'upcoming' | 'due_soon' | 'overdue';

export type LeadStage =
  | 'new'
  | 'contacted'
  | 'visit_scheduled'
  | 'visited'
  | 'negotiation'
  | 'booked'
  | 'lost';

export type PaymentMethod =
  | 'Cash'
  | 'Bank Transfer'
  | 'Cheque'
  | 'Pay Order'
  | 'bKash'
  | 'Nagad'
  | 'Rocket'
  | 'Card';

export type LeadSource =
  | 'Facebook'
  | 'Walk-in'
  | 'Referral'
  | 'Website'
  | 'Call';

export interface Project {
  id: string;
  name: string;
  location: string;
  totalFloors: number;
  totalUnits: number;
  availableUnits: number;
  bookedUnits: number;
  soldUnits: number;
  heldUnits: number;
  handoverDate: string;
  description: string;
  rajukApprovalNo: string;
  landAreaKatha: number;
}

export interface Unit {
  id: string;
  projectId: string;
  projectName: string;
  building: string;
  floor: number;
  unitNumber: string; // e.g. "5B", "10A"
  sizeSqFt: number;
  facing: 'South' | 'South-East' | 'North-East' | 'East' | 'West' | 'North';
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  pricePerSqFt: number;
  basePrice: number;
  parkingPrice: number;
  utilityCharges: number;
  totalPrice: number;
  status: FlatStatus;
  heldByLeadId?: string;
  heldByLeadName?: string;
  heldAt?: string;
  holdExpiresAt?: string; // ISO string
  bookedCustomerId?: string;
  bookedCustomerName?: string;
  bookingDate?: string;
}

export interface CallLog {
  id: string;
  date: string;
  agentName: string;
  durationMinutes: number;
  outcome: string;
  notes: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  profession: string;
  budgetMin: number;
  budgetMax: number;
  interestedProjectId: string;
  interestedProjectName: string;
  interestedSizeSqFt: number;
  source: LeadSource;
  stage: LeadStage;
  agentId: string;
  agentName: string;
  notes: string;
  nextFollowUpDate: string;
  createdAt: string;
  callLogs: CallLog[];
  heldUnitId?: string;
  heldUnitNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  nidMasked: string;
  address: string;
  profession: string;
  flatsOwned: {
    unitId: string;
    unitNumber: string;
    projectId: string;
    projectName: string;
    totalPrice: number;
    bookingDate: string;
  }[];
  totalCommitted: number;
  totalPaid: number;
  totalDue: number;
  documents: {
    id: string;
    name: string;
    type: 'NID' | 'TIN' | 'Passport Photo' | 'Nominee NID' | 'Deed Draft';
    uploadedAt: string;
    size: string;
  }[];
}

export interface Installment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  unitId: string;
  unitNumber: string;
  projectId: string;
  projectName: string;
  installmentName: string; // e.g. "Booking Money", "Down Payment 20%", "Monthly Installment 06/36", "Roof Casting Lump-Sum"
  installmentType: 'booking' | 'down_payment' | 'monthly' | 'special_roof' | 'handover';
  dueDate: string; // DD MMM YYYY
  amount: number;
  paidAmount: number;
  balance: number;
  status: InstallmentStatus;
  daysLate: number; // 0 if not overdue
  paymentMethod?: PaymentMethod;
  paidDate?: string;
  receiptNo?: string;
  agentName: string;
  agentId: string;
}

export interface PaymentRecord {
  id: string;
  receiptNo: string;
  customerId: string;
  customerName: string;
  unitId: string;
  unitNumber: string;
  projectName: string;
  installmentId: string;
  installmentName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  date: string;
  referenceNo: string;
  bankName?: string;
  chequeNo?: string;
  chequeDate?: string;
  receivedBy: string;
  proofFileName?: string;
  notes?: string;
}

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  projectId: string;
  projectName: string;
  preferredUnit?: string;
  agentId: string;
  agentName: string;
  scheduledDate: string; // DD MMM YYYY
  scheduledTime: string; // e.g. "11:30 AM"
  status: 'scheduled' | 'completed' | 'no_show' | 'rescheduled';
  feedback?: {
    interestLevel: 'High' | 'Medium' | 'Low';
    notes: string;
    nextStep: string;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  activeLeadsCount: number;
  unitsSold: number;
  totalSalesVolume: number; // in BDT
  earnedCommission: number;
  approvedCommission: number;
  paidCommission: number;
  pendingCommission: number;
  targetMonthly: number;
}

export interface CommissionEntry {
  id: string;
  agentId: string;
  agentName: string;
  customerName: string;
  unitNumber: string;
  projectName: string;
  flatPrice: number;
  commissionPercentage: number;
  commissionAmount: number;
  status: 'pending' | 'approved' | 'paid';
  milestoneTrigger: string; // e.g. "Down Payment Cleared"
  milestoneAchieved: boolean;
  bookingDate: string;
  approvedDate?: string;
  paidDate?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: 'lead' | 'unit' | 'payment' | 'booking' | 'customer' | 'export';
  entityId: string;
  details: string;
  ip: string;
}

export interface TaskReminder {
  id: string;
  title: string;
  type: 'follow_up' | 'installment_reminder' | 'cheque_clearance' | 'document_collection';
  dueDate: string;
  time?: string;
  targetName: string;
  phone: string;
  flatInfo: string;
  amount?: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'normal';
}
