import { Language } from '../types';

export const translations = {
  en: {
    // Brand
    appName: 'FlatDesk',
    promise: 'Lead theke handover porjonto, shob ek jaygay.',
    auditVerified: 'Audit Verified CRM',
    locationDhakaCtg: 'Dhaka & CTG Real Estate',
    allModules: 'All Modules',
    close: 'Close',

    // Nav
    dashboard: 'Dashboard',
    leads: 'Leads Pipeline',
    siteVisits: 'Site Visits',
    inventory: 'Inventory & Towers',
    bookings: 'Bookings',
    installments: 'Installments & Dues',
    overdueInstallments: 'Overdue Installments',
    customers: 'Customers',
    agents: 'Agents & Commission',
    reminders: 'Reminders & Tasks',
    reports: 'Reports & Analytics',
    settings: 'Settings & Security',

    // Subtitles
    dashboardSub: 'Real-time overview of flat collections, overdue accounts, and team sales pipeline.',
    leadsSub: 'Track potential buyers from initial inquiry to final flat booking conversion.',
    siteVisitsSub: 'Organize, schedule, and log customer feedback on project site visits.',
    inventorySub: 'Live tower and floor matrix preventing double-booking with 48h active hold control.',
    bookingsSub: 'Generate official flat booking agreements and instant money receipts.',
    installmentsSub: 'Milestone payment schedules, overdue collections, and multi-channel receipts.',
    overdueSub: 'Instant answer to "Which flats have overdue installments and how much?"',
    customersSub: 'Verified customer records, owned units, payment records, and deed drafts.',
    agentsSub: 'Agent sales performance tracking and milestone-based commission disbursement.',
    remindersSub: 'Automated and scheduled SMS/WhatsApp follow-ups for visits and payments.',
    reportsSub: 'Financial collections, aging debt analysis, and project inventory sales velocity.',
    settingsSub: 'User permissions matrix, company master data, and irreversible audit logs.',

    // Common actions & buttons
    new: '+ New',
    newLead: '+ New Lead',
    scheduleVisit: '+ Schedule Site Visit',
    newBooking: '+ New Flat Booking',
    recordPayment: '+ Record Payment',
    recordPay: 'Record Pay',
    holdFlat: 'Hold Flat (48h)',
    hold48h: 'Hold 48 Hours',
    bookNow: 'Book Now',
    sendReminder: 'Send Reminder',
    bulkSendReminder: 'Bulk Send Reminder',
    call: 'Call',
    whatsApp: 'WhatsApp',
    viewAll: 'View all',
    filter: 'Filter',
    search: 'Search',
    searchPlaceholder: 'Search customer, phone, flat (e.g. 5B), or project...',
    exportCsv: 'Export CSV',
    exportPdf: 'Export PDF',
    printReceipt: 'Print Money Receipt',
    save: 'Save Changes',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    nextStep: 'Next Step',
    open: 'Open',
    viewProfile: 'View Profile',
    releaseHold: 'Release Hold Immediately',
    disburse: 'Disburse ৳',
    approve: 'Approve',
    saveCallNote: 'Save Call Note',
    saveAndComplete: 'Save & Complete Visit',
    confirmVisitSlot: 'Confirm Visit Slot',
    createLead: 'Create Lead',
    generateSchedule: 'Generate & Attach Schedule',
    triggerSnapshot: 'Trigger Manual Snapshot Now',
    downloadJson: 'Download Full DB Dump (.JSON)',
    editFeedback: 'Edit Feedback',
    markDone: 'Mark Done',
    planBuilder: 'Plan Builder',
    applyPlan: 'Apply Plan to Unit',
    openRecoveryDesk: 'Open Recovery Desk',
    viewKanban: 'View Kanban',
    viewTable: 'View Table',
    details: 'Details',
    all: 'All',
    done: 'Done',
    copy: 'Copy',
    copied: 'Copied',

    // Sensitive data
    sensitiveRevealed: 'Sensitive Revealed',
    masked: 'Masked',
    revealSensitive: 'Reveal Sensitive Info',
    maskSensitive: 'Mask Sensitive Info',
    nidContactsRevealed: 'NID / Contacts Revealed',
    nidPhoneMasked: 'NID & Phone Masked',

    // Statuses - Flats
    status: 'Status',
    available: 'Available',
    hold: 'Hold (48h)',
    booked: 'Booked',
    sold: 'Sold',

    // Statuses - Installments
    paid: 'Paid',
    upcoming: 'Upcoming',
    dueSoon: 'Due Soon (7d)',
    overdue: 'Overdue',
    daysLate: 'days late',
    daysOverdue: 'days overdue',

    // Statuses - Lead Stages
    newInquiries: 'New Inquiries',
    contacted: 'Contacted',
    visitScheduled: 'Visit Scheduled',
    siteVisited: 'Site Visited',
    negotiation: 'Negotiation / Hold',
    bookedWon: 'Booked / Won',
    lost: 'Lost',

    // Statuses - Site visits
    scheduled: 'Scheduled',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
    noShow: 'No-Show',

    // Statuses - Commission
    pending: 'Pending',
    approved: 'Approved',
    disbursed: 'Disbursed',

    // Dashboard KPIs
    kpiCollectionMonth: 'Collection (This Month)',
    kpiVsLastMonth: '+14.2% vs last month',
    kpiOverdueAmount: 'Overdue Amount',
    kpiRequiresRecovery: 'Requires immediate recovery ➔',
    kpiFlatsAvailable: 'Flats Available',
    kpiUnits: 'Units',
    kpiAcross3Projects: 'Across 3 projects',
    kpiActiveNewLeads: 'Active New Leads',
    kpiReadyForCall: 'Ready for first call',
    kpiSiteVisitsToday: 'Site Visits Today',
    kpiCompletedThisWeek: '3 Completed this week',

    // Overdue Hook Card
    overdueCardTitle: 'Overdue Installments',
    unitsOverdueBadge: 'Units Overdue',
    overdueCardKicker: 'Instant answer to "Which flat\'s installment is overdue?" — sorted by oldest default.',
    totalOverdueDefault: 'Total Overdue Default:',
    pendingRecoveryAccounts: 'accounts pending recovery',
    overduePolicyNote: 'Overdue policy: Calls automated after 7 days; Legal reminder notice at 60+ days.',
    oldestDefaultLabel: 'Oldest Default',
    criticalOverdueLabel: 'Critical Overdue (>60d)',
    instantAction: 'Instant Action',
    showingTop6Overdue: 'Showing top 6 most overdue flats out of',
    goToFullRecovery: 'Go to Full Overdue Recovery Page',

    // Table Headers
    thCustomer: 'Customer',
    thFlatProject: 'Flat (Project - Unit)',
    thAmountDue: 'Amount Due',
    thDueDate: 'Due Date',
    thDaysLate: 'Days Late',
    thAgent: 'Assigned Agent',
    thLeadName: 'Lead Name',
    thPhone: 'Phone',
    thStage: 'Stage',
    thInterestedProject: 'Interested Project',
    thMaxBudget: 'Max Budget',
    thSource: 'Source',
    thNextFollowUp: 'Next Follow-Up',
    thDetails: 'Details',
    thMilestone: 'Milestone Installment',
    thLatenessAging: 'Lateness Aging',
    thAction: 'Action',
    thUnitProject: 'Unit & Project',
    thBuyer: 'Buyer / Customer',
    thBookingDate: 'Booking Date',
    thFlatPrice: 'Flat Package Total',
    thCommRate: 'Comm. Rate',
    thCommissionBdt: 'Commission (BDT)',
    thMilestoneStatus: 'Milestone Status',
    thPayoutStatus: 'Payout Status',
    thDisbursementAction: 'Disbursement Action',
    thTimestamp: 'Timestamp',
    thActorRole: 'Actor & Role',
    thActionType: 'Action Type',
    thTargetEntity: 'Target Entity',
    thOperationalDetails: 'Operational Details',
    thTerminalIp: 'Terminal IP',
    thNationalId: 'National ID (NID)',
    thFlatsOwned: 'Flats Owned',
    thCommittedValue: 'Committed Value',
    thTotalPaid: 'Total Paid',
    thBalanceDue: 'Balance Due',
    thProfile: 'Profile',
    thOfficialReceipt: 'Official Receipt',
    thPaidAmount: 'Paid',
    thBalance: 'Balance Due',
    thInstallmentAmount: 'Installment Amount',

    // Charts & Analytics
    monthlyCollectionVsTarget: 'Monthly Collection vs Target',
    monthlyCollectionSubtitle: 'Past 6 months performance across all 3 Dhaka projects (BDT)',
    collected: 'Collected',
    target: 'Target',
    targetAchievementRate: 'Target achievement rate this month:',
    aboveTarget: '+ ৳ 18 Lakh above target',
    salesPipelineFunnel: 'Sales Pipeline Funnel',
    funnelSubtitle: 'Live conversion from inquiry to flat booking',
    avgSalesCycle: 'Average sales conversion cycle:',
    healthyVelocity: 'Healthy velocity',
    upcomingDues7Days: 'Upcoming Dues (Next 7 Days)',
    upcomingDuesSubtitle: 'Proactive reminders before installments slip into overdue',
    totalDue7Days: 'Total due in next 7 days:',
    remindersScheduledCount: '3 Reminders scheduled',
    todaySiteVisits: "Today's Site Visits",
    todaySiteVisitsSubtitle: 'Prospective buyers inspecting project towers',
    siteEngineersNotified: 'Site engineers notified on location',
    topSalesPerformers: 'Top Sales Performers',
    topPerformersSubtitle: 'Sales volume and flat units sold this month',
    unitsClosed: 'units closed',
    activeLeads: 'active leads',
    earnedLabel: 'Earned:',
    teamCommRules: 'Team commission rules: 1.0% on Down Payment',
    activeConsultants: '6 Active Consultants',

    // Filters
    allProjects: 'All Projects',
    allAgents: 'All Agents',
    allSources: 'All Sources',
    allDays: 'All Days',
    allBeds: 'All Beds',
    beds3: '3 Bedrooms',
    beds4: '4 Bedrooms',
    beds5: '5 Bedrooms (Penthouse)',
    allVisits: 'All Visits',
    allTasks: 'All Tasks',

    // Lead Sources
    sourceFacebook: 'Facebook Ads',
    sourceWalkIn: 'Site Office Walk-in',
    sourceReferral: 'Referral / Existing Buyer',
    sourceWebsite: 'Website Form',
    sourceCall: 'Direct Phone Call',

    // Drawers & Modals
    pipelineStage: 'Pipeline Stage',
    requirementNotes: 'Requirement Notes',
    logPhoneCall: 'Log Phone Call',
    keyDiscussion: 'Key discussion points, objections, next action...',
    activityHistory: 'Activity History & Call Logs',
    noCallLogsYet: 'No previous calls logged yet.',
    loggedBy: 'Logged by:',
    duration: 'Duration:',
    totalPackagePrice: 'Total Package Price',
    activeHold48h: 'Active 48-Hour Temporary Hold',
    holdReservationNotice: 'Reserved for prospect. If token money is not received within this period, unit automatically releases back to Available inventory.',
    lockUnit: 'Lock Unit (Reserve / Book)',
    selectProspectiveLead: 'Select Prospective Lead...',
    startBookingProcess: 'Start Official Booking Process ➔',
    bookedCustomerLabel: 'Booked Customer',
    architecturalSpecs: 'Architectural Specifications',
    specSize: 'Size',
    specFacing: 'Facing',
    specBedrooms: 'Bedrooms',
    specBathrooms: 'Bathrooms',
    specBalconies: 'Balconies',
    specFloor: 'Floor',
    priceBreakdown: 'Price Breakdown (Line Items)',
    basePrice: 'Base Price',
    reservedParking: 'Reserved Car Parking Slot',
    utilityConnection: 'Utility & Substation Connection',
    grandTotalPackage: 'Grand Total Flat Package',
    currentlyHolding: 'Currently Holding:',
    profession: 'Profession',
    budgetRange: 'Budget Range',
    noNotes: 'No specific notes recorded.',
    callLogSaved: 'Call Log Saved',
    callLogSavedDesc: 'New call record added to customer timeline.',
    calling: 'Calling',
    initiatingCall: 'Initiating call to...',

    // Booking Wizard
    wizardTitle: 'Flat Booking Wizard',
    wizardSubtitle: '4-step official booking creation with instant token money receipt.',
    stepCustomer: 'Customer',
    stepFlat: 'Select Flat',
    stepPlan: 'Payment Plan',
    stepConfirm: 'Confirm',
    selectRegisteredBuyer: 'Select Registered Buyer / Customer',
    flatsOwnedCount: 'Flats Owned',
    bookingTokenMoney: 'Booking Token Money (৳)',
    downPaymentPercent: 'Down Payment %',
    monthlyInstallmentsTenure: 'Monthly Installments Tenure',
    months24: '24 Months',
    months36: '36 Months (3 Years)',
    months48: '48 Months (4 Years)',
    months60: '60 Months (5 Years)',
    estimatedMonthly: 'Estimated Monthly Installment:',
    reviewBookingSummary: 'Review Flat Booking Agreement Summary',
    buyerName: 'Buyer Name:',
    selectedUnitLabel: 'Selected Unit:',
    totalFlatPrice: 'Total Flat Price:',
    immediateToken: 'Immediate Token Money:',
    paymentChannel: 'Payment Channel:',
    confirmAndIssueReceipt: 'Confirm & Issue Money Receipt',
    totalPackageValue: 'Total Package Value:',
    downPaymentVal: 'Down Payment',

    // Record Payment Modal
    recordPaymentTitle: 'Record Flat Payment',
    recordPaymentSubtitle: 'Auto-allocates to target installment schedule and issues instant verified receipt.',
    targetInstallmentFlat: 'Target Installment / Flat',
    paymentAmountBdt: 'Payment Amount (BDT ৳)',
    outstandingBalance: 'Outstanding Balance:',
    paymentMethod: 'Payment Method',
    bankBranchName: 'Bank / Branch Name',
    chequeNumber: 'Cheque Number',
    trnxReferenceId: 'Transaction / Reference ID',
    mfsTrnxId: 'MFS Transaction ID (TrnxID)',
    accountsRemarks: 'Accounts Verification Remarks',
    depositSlipProof: 'Deposit Slip / Cheque Copy (Proof)',
    attachDepositSlip: 'Attach deposit slip or bank transaction voucher (PDF/JPG < 5MB)',
    paymentAuditNotice: 'Payment is recorded with permanent audit traceability. Cannot be hard-deleted, only reversed with managerial justification.',
    recordAndIssueReceipt: 'Record & Issue Money Receipt',

    // Money Receipt Preview Modal
    receiptModalTitle: 'Money Receipt / Booking Confirmation',
    officialMoneyReceipt: 'Official Money Receipt',
    dateLabel: 'Date:',
    receiptNoLabel: 'Receipt No:',
    receivedFrom: 'Received From',
    paymentFor: 'Payment For:',
    propertyUnitDetails: 'Property Unit Details',
    amountReceived: 'Amount Received',
    inWordsTaka: 'In Words (Taka)',
    inWordsNotice: 'Payment credited to developer account',
    customerSignature: 'Customer Signature',
    digitalSeal: 'Digital Seal',
    authorizedSignatory: 'Authorized Signatory',
    systemCopyArchived: 'Official system copy generated and archived in customer deed file.',

    // Send Reminder Modal
    sendReminderModalTitle: 'Send Payment Reminder Notice',
    messagePreview: 'Message Content Preview',
    copyText: 'Copy Text',
    copiedText: 'Copied to Clipboard',
    dynamicMergeFieldsNote: 'Variables dynamically merged: Customer Name, Flat/Project, Amount, Due Date.',
    sendViaWhatsApp: 'Send via WhatsApp',
    sendViaSms: 'Send via SMS Gateway',
    smsGateway: 'SMS Gateway',

    // Quick Add Lead Modal
    quickAddLeadTitle: 'Quick Add Lead',
    quickAddLeadSubtitle: 'Input basic buyer requirements in under 30 seconds.',
    buyerFullName: 'Buyer Full Name *',
    phoneNumber: 'Phone Number *',
    sourceChannel: 'Source Channel',
    assignedConsultant: 'Assigned Consultant',
    minBudget: 'Min Budget (৳)',
    maxBudget: 'Max Budget (৳)',
    buyerNotesPlaceholder: 'Looking for 4 bedrooms, south facing, duplex or high floor...',

    // Site Visits View
    scheduledVisitsLabel: 'Scheduled Visits',
    completedVisitsLabel: 'Completed Visits',
    dhakaCtgLive: 'Dhaka & CTG Site Offices Live',
    inspectionFeedback: 'Inspection Feedback:',
    nextStepLabel: 'Next Step:',
    logFeedbackAndComplete: 'Log Feedback & Complete',
    customerInterestLevel: 'Customer Interest Level',
    interestHigh: 'High Interest',
    interestMedium: 'Medium Interest',
    interestLow: 'Low Interest',
    feedbackRemarksLabel: 'Feedback & Customer Remarks',
    nextActionStepLabel: 'Next Action Step',
    logSiteVisitFeedback: 'Log Site Visit Feedback',
    scheduleSiteVisitModalTitle: 'Schedule Project Site Visit',
    scheduleSiteVisitModalSubtitle: 'Fast 3-field scheduling with calendar synchronization.',
    buyerLeadLabel: 'Buyer / Lead *',
    projectLocationLabel: 'Project Location *',
    preferredFlatUnitLabel: 'Preferred Flat/Unit',
    visitDateLabel: 'Visit Date *',
    visitTimeLabel: 'Visit Time *',
    notesSpecialRequests: 'Notes / Special Requests',

    // Customers View
    customerDirectoryTitle: 'Customer Directory',
    customerDirectorySubtitle: 'Verified buyer profiles, payment histories, NID verification, and deed drafts.',
    totalRegisteredOwners: 'Total Registered Flat Owners:',
    flatsOwnedInPortfolio: 'Flats Owned in Developer Portfolio',
    buyerKycLegalDocs: 'Buyer KYC & Legal Documents',
    noKycDocsYet: 'No KYC documents uploaded yet.',
    totalCommittedPortfolio: 'Total Committed Portfolio:',
    totalPaidCleared: 'Total Paid (Cleared)',
    downloadDeedDraft: 'Download Draft Deed of Agreement (DOCX)',
    paymentHistoryReceipts: 'Payment History & Issued Receipts',

    // Agents View
    agentsCommissionTitle: 'Agents & Commission',
    agentsCommissionSubtitle: 'Milestone-based sales commission disbursement and consultant performance tracking.',
    commissionLedgerTab: 'Commission Ledger',
    consultantsListTab: 'Consultants List',
    exportStatement: 'Export Statement',
    totalEarnedLabel: 'Total Earned',
    paidOutLabel: 'Paid Out',
    approvedForPayout: 'Approved For Payout',
    pendingMilestone: 'Pending Milestone',
    commLedgerHeading: 'Commission Disbursement Ledger',
    commRuleText: 'Rule: 1.0% of Flat Total is unlocked once buyer clears Down Payment (20%+).',
    autoAuditEnabled: 'Auto-Audit Enabled',
    consultantPerformanceHeading: 'Consultants Performance & Target Register',

    // Reminders View
    remindersTasksTitle: 'Reminders & Daily Tasks',
    remindersTasksSubtitle: 'Unified follow-up queue, cheque clearances, and automated multi-channel messaging templates.',
    addReminderTask: '+ Add Reminder Task',
    pendingTab: 'Pending',
    completedTab: 'Completed',
    dailyPriorityChecklist: 'Daily Priority Checklist',
    messagingTemplatesTitle: 'Messaging Templates',
    standardizedRemindersSub: 'Standardized customer reminders',
    useTemplate: 'Use Template ➔',
    overdueInstallmentTemplateTitle: 'Overdue Installment Notice',
    siteVisitTemplateTitle: 'Site Visit Confirmation',
    chequeClearanceTemplateTitle: 'Cheque Clearance Notification',

    // Reports View
    reportsTitle: 'Financial & Sales Reports',
    reportsSubtitle: 'Executive collections audit, overdue debt aging, and inventory revenue analytics.',
    exportAllCsv: 'Export All CSV',
    downloadFilteredCsv: 'Download Filtered CSV',
    liveLedgerRajuk: 'Live calculated ledger figures with RAJUK compliance breakdown.',
    overdueAgingBuckets: 'Overdue Debt Aging Buckets',
    collectionsByChannel: 'Collections by Payment Channel',
    absorptionVelocity: 'Absorption & Inventory Velocity',
    repCollectionTitle: 'Collection & Cash Inflow',
    repCollectionDesc: 'Monthly realized payments by bank transfer, cheque, pay order, and MFS.',
    repAgingTitle: 'Overdue Aging Debt Report',
    repAgingDesc: 'Accounts aging by 1-7 days, 8-30 days, 31-60 days, and critical 60+ days.',
    repProjectsTitle: 'Sales by Project',
    repProjectsDesc: 'Inventory absorption rate and square footage revenue across 3 projects.',
    repCommissionsTitle: 'Agent Commission Audit',
    repCommissionsDesc: 'Milestone-based sales bonuses, earned vs paid ledgers, and disputes.',
    repSourcesTitle: 'Lead Source ROI & Conversion',
    repSourcesDesc: 'Performance of Facebook ads vs walk-in site visits vs client referrals.',
    repInventoryTitle: 'Inventory & Floor Velocity',
    repInventoryDesc: 'Available units, hold durations, and average days on market by unit type.',

    // Settings View
    settingsTitle: 'Settings & Security Governance',
    settingsSubtitle: 'Role-based permissions matrix, security audit logging, and data backup status.',
    activeRoleLabel: 'Active Role:',
    tabRolesMatrix: 'Roles & Permissions Matrix',
    tabAuditTrail: 'Audit Trail Logs',
    tabCompanyData: 'Company & Master Data',
    tabBackupExport: 'Backup & Data Export',
    rbacHeading: 'Role-Based Access Control (RBAC) Matrix',
    rbacSubtitle: 'Strict functional boundaries ensuring financial integrity and sensitive customer data protection.',
    thSystemCapability: 'Action / System Capability',
    thOwnerAdmin: 'Owner / Admin',
    thSalesManager: 'Sales Manager',
    thSalesAgent: 'Sales Agent',
    thAccountsOfficer: 'Accounts Officer',
    immutableAuditTrail: 'Immutable Security & Action Audit Trail',
    auditTrailSubtitle: 'Every sensitive action (price revisions, hold placements, payment reversals, data unmasking) is cryptographically logged.',
    companyLegalProfile: 'Company Legal Profile',
    companyRegName: 'Company Registered Name',
    rajukLicense: 'RAJUK Developer License',
    headOfficeAddress: 'Head Office Address',
    corporateHotline: 'Corporate Hotline',
    autoCloudBackup: 'Automated Daily Cloud Backup',
    backupSubtitle: 'Encrypted snapshot taken daily at 02:00 AM (Dhaka Standard Time).',
    allSystemsNominal: 'All Systems Nominal',
    lastBackupSuccess: 'Last Backup Successful:',
    retentionPolicy: 'Backup Retention Policy:',
    dbIntegrityCheck: 'Database Integrity Check:',
    permViewLeads: 'View & Manage All Leads',
    permHoldFlat: 'Place 48h Flat Hold',
    permRecordPayments: 'Record & Issue Payments',
    permReversePayments: 'Reverse / Reallocate Payments',
    permChangePrice: 'Change Flat Price / Sq Ft Rate',
    permApproveCommission: 'Approve & Disburse Commission',
    permRevealSensitive: 'Reveal Masked NID & Phone Numbers',
    permExportDb: 'Export Full Database & Customer Lists',

    // Payment Plan Builder
    planBuilderTitle: 'Payment Plan Schedule Builder',
    planBuilderSubtitle: 'Configure milestone structure, special payments, and generate schedule.',
    presetTemplates: 'Preset Payment Plan Template',
    tmplStandard36: 'Standard (36 Months)',
    tmplStandard36Desc: '20% Down + 36 Monthly + Roof & Handover',
    tmplExtended48: 'Extended (48 Months)',
    tmplExtended48Desc: '15% Down + 48 Monthly + Milestones',
    tmplLuxury: 'Milestone Heavy',
    tmplLuxuryDesc: '30% Down + 24 Monthly + 2 Castings',
    scheduleBreakdownHeading: 'Milestone Schedule Breakdown',
    tokenStep: '1. Booking Token (Immediate):',
    downStep: '2. Down Payment Balance:',
    monthlyStep: '3. Monthly Installments:',
    roofStep: '4. Roof Casting Milestone:',
    handoverStep: '5. Final Handover Payment:',

    // Command palette
    cmdSearchPlaceholder: 'Type a lead name, flat (e.g. 5B), customer, or project...',
    cmdOverdueSection: 'Overdue Installments',
    cmdInventorySection: 'Inventory & Flats',
    cmdLeadsSection: 'Leads Pipeline',
    cmdCustomersSection: 'Customers',
    openLead: 'Open lead',

    // Notification center
    operationalAlerts: 'Operational Alerts',
    overdueAlertText: 'Flats have overdue installments',
    activeHoldsText: 'Active 48h Holds running',
    visitsTodayText: 'Site visits scheduled today',

    // Role switcher
    switchActiveRole: 'Switch Active Role (RBAC Demo)',
  },

  bn: {
    // Brand
    appName: 'ফ্ল্যাটডেস্ক',
    promise: 'লিড থেকে হ্যান্ডওভার পর্যন্ত, সব এক জায়গায়।',
    auditVerified: 'যাচাইকৃত অডিট সিআরএম',
    locationDhakaCtg: 'ঢাকা ও চট্টগ্রাম রিয়েল এস্টেট',
    allModules: 'সকল মডিউল',
    close: 'বন্ধ করুন',

    // Nav
    dashboard: 'ড্যাশবোর্ড',
    leads: 'লিডস পাইপলাইন',
    siteVisits: 'সাইট ভিজিট',
    inventory: 'ফ্ল্যাট ইনভেন্টরি ও টাওয়ার',
    bookings: 'বুকিং ও চুক্তি',
    installments: 'কিস্তি ও পেমেন্ট',
    overdueInstallments: 'বকেয়া কিস্তি',
    customers: 'গ্রাহক তালিকা',
    agents: 'এজেন্ট ও কমিশন',
    reminders: 'তাগিদ ও টাস্ক',
    reports: 'রিপোর্ট ও বিশ্লেষণ',
    settings: 'সেটিংস ও নিরাপত্তা',

    // Subtitles
    dashboardSub: 'ফ্ল্যাট বিক্রি, বকেয়া কিস্তির হিসাব এবং সেলস দলের সার্বিক অগ্রগতির ড্যাশবোর্ড।',
    leadsSub: 'প্রাথমিক আগ্রহ থেকে ফ্ল্যাট বুকিং পর্যন্ত সম্ভাব্য ক্রেতাদের ট্র্যাক করুন।',
    siteVisitsSub: 'প্রজেক্ট সাইট পরিদর্শনের সময়সূচি এবং গ্রাহকের মতামত সংরক্ষণ করুন।',
    inventorySub: 'লাইভ ফ্লোর ম্যাট্রিক্স এবং ৪৮ ঘণ্টার অটো-হোল্ড সুবিধা—যাতে ডাবল বুকিং না হয়।',
    bookingsSub: 'অফিসিয়াল বুকিং চুক্তিপত্র ও মানি রিসিট প্রস্তুতকরণ।',
    installmentsSub: 'কিস্তির সময়সূচি, বকেয়া আদায় ও বহুবিধ মাধ্যমে পেমেন্ট রিসিট।',
    overdueSub: 'এক নজরে দেখুন কোন ফ্ল্যাটের কত টাকা কিস্তি বকেয়া আছে।',
    customersSub: 'যাচাইকৃত গ্রাহক প্রোফাইল, মালিকানাধীন ফ্ল্যাট ও পেমেন্ট হিস্ট্রি।',
    agentsSub: 'বিক্রয় এজেন্টদের পারফরম্যান্স ও মাইলস্টোন অনুযায়ী কমিশন হিসাব।',
    remindersSub: 'এসএমএস ও হোয়াটসঅ্যাপের মাধ্যমে কিস্তির রিমাইন্ডার ও ফলো-আপ।',
    reportsSub: 'আদায়কৃত অর্থ, বকেয়ার বয়সভিত্তিক রিপোর্ট ও বিক্রয় বিশ্লেষণ।',
    settingsSub: 'ব্যবহারকারীদের রোল পারমিশন, প্রজেক্ট ডাটা ও অডিট লগ।',

    // Common actions & buttons
    new: '+ নতুন',
    newLead: '+ নতুন লিড',
    scheduleVisit: '+ সাইট ভিজিট শিডিউল',
    newBooking: '+ নতুন ফ্ল্যাট বুকিং',
    recordPayment: '+ পেমেন্ট এন্ট্রি',
    recordPay: 'পেমেন্ট নিন',
    holdFlat: 'ফ্ল্যাট হোল্ড (৪৮ ঘণ্টা)',
    hold48h: '৪৮ ঘণ্টা হোল্ড',
    bookNow: 'বুকিং করুন',
    sendReminder: 'তাগিদ পাঠান',
    bulkSendReminder: 'একসাথে তাগিদ পাঠান',
    call: 'কল',
    whatsApp: 'হোয়াটসঅ্যাপ',
    viewAll: 'সব দেখুন',
    filter: 'ফিল্টার',
    search: 'অনুসন্ধান',
    searchPlaceholder: 'গ্রাহক, ফোন, ফ্ল্যাট নম্বর (যেমন 5B), বা প্রজেক্ট খুঁজুন...',
    exportCsv: 'এক্সপোর্ট সিএসভি',
    exportPdf: 'এক্সপোর্ট পিডিএফ',
    printReceipt: 'মানি রিসিট প্রিন্ট',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    confirm: 'নিশ্চিত করুন',
    back: 'পেছনে',
    nextStep: 'পরবর্তী ধাপ',
    open: 'খুলুন',
    viewProfile: 'প্রোফাইল দেখুন',
    releaseHold: 'হোল্ড বাতিল করুন',
    disburse: 'কমিশন প্রদান ৳',
    approve: 'অনুমোদন দিন',
    saveCallNote: 'কল নোট সংরক্ষণ',
    saveAndComplete: 'সংরক্ষণ ও সম্পন্ন করুন',
    confirmVisitSlot: 'ভিজিট সময় নিশ্চিত করুন',
    createLead: 'লিড তৈরি করুন',
    generateSchedule: 'সময়সূচি প্রস্তুত ও সংযুক্ত',
    triggerSnapshot: 'ম্যানুয়াল স্ন্যাপশট নিন',
    downloadJson: 'সম্পূর্ণ ডেটা ডাউনলোড (.JSON)',
    editFeedback: 'মতামত সংশোধন',
    markDone: 'সম্পন্ন করুন',
    planBuilder: 'প্ল্যান বিল্ডার',
    applyPlan: 'প্ল্যান প্রয়োগ করুন',
    openRecoveryDesk: 'আদায় ডেস্কে যান',
    viewKanban: 'কানবান ভিউ',
    viewTable: 'টেবিল ভিউ',
    details: 'বিস্তারিত',
    all: 'সব',
    done: 'সম্পন্ন',
    copy: 'কপি',
    copied: 'কপি হয়েছে',

    // Sensitive data
    sensitiveRevealed: 'গোপনীয় তথ্য দৃশ্যমান',
    masked: 'লুকানো আছে',
    revealSensitive: 'গোপনীয় তথ্য দেখুন',
    maskSensitive: 'গোপনীয় তথ্য লুকান',
    nidContactsRevealed: 'এনআইডি ও যোগাযোগ দৃশ্যমান',
    nidPhoneMasked: 'এনআইডি ও ফোন লুকানো',

    // Statuses - Flats
    status: 'অবস্থা',
    available: 'খালি আছে',
    hold: 'হোল্ডে আছে (৪৮ঘ.)',
    booked: 'বুকিং হয়েছে',
    sold: 'বিক্রিত',

    // Statuses - Installments
    paid: 'পরিশোধিত',
    upcoming: 'আসন্ন',
    dueSoon: 'শীঘ্রই প্রদেয় (৭ দিন)',
    overdue: 'বকেয়া',
    daysLate: 'দিন বকেয়া',
    daysOverdue: 'দিন বকেয়া',

    // Statuses - Lead Stages
    newInquiries: 'নতুন অনুসন্ধান',
    contacted: 'যোগাযোগ হয়েছে',
    visitScheduled: 'ভিজিট নির্ধারিত',
    siteVisited: 'ভিজিট সম্পন্ন',
    negotiation: 'দরদাম / হোল্ড',
    bookedWon: 'বুকিং চূড়ান্ত',
    lost: 'বাতিল',

    // Statuses - Site visits
    scheduled: 'নির্ধারিত',
    completed: 'সম্পন্ন',
    rescheduled: 'পুনঃনির্ধারিত',
    noShow: 'অনুপস্থিত',

    // Statuses - Commission
    pending: 'অপেক্ষমাণ',
    approved: 'অনুমোদিত',
    disbursed: 'প্রদত্ত',

    // Dashboard KPIs
    kpiCollectionMonth: 'চলতি মাসের আদায়',
    kpiVsLastMonth: '+১৪.২% গত মাসের তুলনায়',
    kpiOverdueAmount: 'মোট বকেয়া কিস্তি',
    kpiRequiresRecovery: 'দ্রুত আদায় জরুরি ➔',
    kpiFlatsAvailable: 'অবিক্রিত ফ্ল্যাট',
    kpiUnits: 'টি ফ্ল্যাট',
    kpiAcross3Projects: '৩টি প্রজেক্টে সর্বমোট',
    kpiActiveNewLeads: 'সক্রিয় নতুন লিড',
    kpiReadyForCall: 'কল করার অপেক্ষায়',
    kpiSiteVisitsToday: 'আজকের সাইট ভিজিট',
    kpiCompletedThisWeek: 'এই সপ্তাহে ৩টি সম্পন্ন',

    // Overdue Hook Card
    overdueCardTitle: 'বকেয়া কিস্তি',
    unitsOverdueBadge: 'টি ফ্ল্যাটের কিস্তি বকেয়া',
    overdueCardKicker: 'এক নজরে জানুন "কোন ফ্ল্যাটের কিস্তি বকেয়া?" — সর্বোচ্চ দিন থেকে সাজানো।',
    totalOverdueDefault: 'সর্বমোট বকেয়ার পরিমাণ:',
    pendingRecoveryAccounts: 'টি গ্রাহকের কিস্তি বাকি',
    overduePolicyNote: 'বকেয়া নীতিমালা: ৭ দিন পর কল অটোমেশন; ৬০+ দিন পার হলে আইনি নোটিশ প্রেরণ।',
    oldestDefaultLabel: 'সর্বোচ্চ দিনের বকেয়া',
    criticalOverdueLabel: 'জরুরি বকেয়া (৬০+ দিন)',
    instantAction: 'তাৎক্ষণিক ব্যবস্থা',
    showingTop6Overdue: 'সর্বমোট বকেয়ার মধ্যে প্রথম ৬টি ফ্ল্যাট দেখানো হচ্ছে, মোট:',
    goToFullRecovery: 'সম্পূর্ণ বকেয়া আদায় পেইজে যান',

    // Table Headers
    thCustomer: 'গ্রাহক',
    thFlatProject: 'ফ্ল্যাট (প্রজেক্ট ও ইউনিট)',
    thAmountDue: 'বকেয়ার পরিমাণ',
    thDueDate: 'প্রদেয় তারিখ',
    thDaysLate: 'বিলম্বের দিন',
    thAgent: 'দায়িত্বপ্রাপ্ত এজেন্ট',
    thLeadName: 'ক্রেতার নাম',
    thPhone: 'মোবাইল নম্বর',
    thStage: 'ধাপ',
    thInterestedProject: 'আগ্রহী প্রজেক্ট',
    thMaxBudget: 'সর্বোচ্চ বাজেট',
    thSource: 'উৎস',
    thNextFollowUp: 'পরবর্তী ফলো-আপ',
    thDetails: 'বিস্তারিত',
    thMilestone: 'কিস্তির বিবরণ',
    thLatenessAging: 'বকেয়ার বয়স',
    thAction: 'পদক্ষেপ',
    thUnitProject: 'ইউনিট ও প্রজেক্ট',
    thBuyer: 'ক্রেতা / গ্রাহক',
    thBookingDate: 'বুকিংয়ের তারিখ',
    thFlatPrice: 'ফ্ল্যাটের মোট মূল্য',
    thCommRate: 'কমিশন হার',
    thCommissionBdt: 'কমিশন (টাকা)',
    thMilestoneStatus: 'মাইলস্টোন অবস্থা',
    thPayoutStatus: 'প্রদানের অবস্থা',
    thDisbursementAction: 'অর্থ প্রদান',
    thTimestamp: 'তারিখ ও সময়',
    thActorRole: 'ব্যবহারকারী ও রোল',
    thActionType: 'কাজের ধরন',
    thTargetEntity: 'লক্ষ্যবস্তু',
    thOperationalDetails: 'কাজের বিবরণ',
    thTerminalIp: 'আইপি ঠিকানা',
    thNationalId: 'জাতীয় পরিচয়পত্র (NID)',
    thFlatsOwned: 'মালিকানাধীন ফ্ল্যাট',
    thCommittedValue: 'চুক্তিবদ্ধ মোট মূল্য',
    thTotalPaid: 'পরিশোধিত অর্থ',
    thBalanceDue: 'অবশিষ্ট বকেয়া',
    thProfile: 'প্রোফাইল',
    thOfficialReceipt: 'অফিসিয়াল রিসিট',
    thPaidAmount: 'পরিশোধিত',
    thBalance: 'বকেয়া ব্যালেন্স',
    thInstallmentAmount: 'কিস্তির পরিমাণ',

    // Charts & Analytics
    monthlyCollectionVsTarget: 'মাসিক আদায় বনাম লক্ষ্যমাত্রা',
    monthlyCollectionSubtitle: 'ঢাকার ৩টি প্রজেক্টে গত ৬ মাসের আদায় বিবরণী (টাকায়)',
    collected: 'সংগৃহীত',
    target: 'লক্ষ্যমাত্রা',
    targetAchievementRate: 'চলতি মাসে লক্ষ্যমাত্রা অর্জন:',
    aboveTarget: '+ ৳ ১৮ লাখ লক্ষ্যমাত্রার উপরে',
    salesPipelineFunnel: 'বিক্রয় ফানেল অগ্রগতি',
    funnelSubtitle: 'অনুসন্ধান থেকে সরাসরি ফ্ল্যাট বুকিং রূপান্তর',
    avgSalesCycle: 'গড় বিক্রয় সময়কাল:',
    healthyVelocity: 'সন্তোষজনক গতি',
    upcomingDues7Days: 'আসন্ন কিস্তি (পরবর্তী ৭ দিন)',
    upcomingDuesSubtitle: 'বকেয়া হওয়ার পূর্বেই আগাম রিমাইন্ডার পাঠানোর তালিকা',
    totalDue7Days: 'পরবর্তী ৭ দিনে প্রদেয় মোট:',
    remindersScheduledCount: '৩টি তাগিদ শিডিউল করা আছে',
    todaySiteVisits: 'আজকের সাইট পরিদর্শন',
    todaySiteVisitsSubtitle: 'সম্ভাব্য ক্রেতাদের প্রজেক্ট টাওয়ার পরিদর্শন',
    siteEngineersNotified: 'সাইট ইঞ্জিনিয়ারদের অবগত করা হয়েছে',
    topSalesPerformers: 'সেরা বিক্রয়কর্মী (টপ পারফর্মার)',
    topPerformersSubtitle: 'চলতি মাসে বিক্রির পরিমাণ ও ফ্ল্যাটের সংখ্যা',
    unitsClosed: 'টি ফ্ল্যাট বিক্রিত',
    activeLeads: 'টি সক্রিয় লিড',
    earnedLabel: 'অর্জিত:',
    teamCommRules: 'কমিশন নিয়ম: ডাউন পেমেন্টে ১.০%',
    activeConsultants: '৬ জন প্রপার্টি অ্যাডভাইজার',

    // Filters
    allProjects: 'সব প্রজেক্ট',
    allAgents: 'সব এজেন্ট',
    allSources: 'সব উৎস',
    allDays: 'সব দিন',
    allBeds: 'সব বেড',
    beds3: '৩ বেডরুম',
    beds4: '৪ বেডরুম',
    beds5: '৫ বেডরুম (পেন্টহাউস)',
    allVisits: 'সব ভিজিট',
    allTasks: 'সব টাস্ক',

    // Lead Sources
    sourceFacebook: 'ফেসবুক বিজ্ঞাপন',
    sourceWalkIn: 'সাইট অফিস সরাসরি',
    sourceReferral: 'রেফারেল / পুরাতন ক্রেতা',
    sourceWebsite: 'ওয়েবসাইট ফর্ম',
    sourceCall: 'সরাসরি ফোন কল',

    // Drawers & Modals
    pipelineStage: 'পাইপলাইন ধাপ',
    requirementNotes: 'ক্রেতার চাহিদার বিবরণ',
    logPhoneCall: 'ফোন কলের তথ্য সংরক্ষণ',
    keyDiscussion: 'আলোচনার মূল বিষয়, গ্রাহকের প্রশ্ন ও পরবর্তী পদক্ষেপ...',
    activityHistory: 'পূর্ববর্তী কলের ইতিহাস ও টাইমলাইন',
    noCallLogsYet: 'পূর্বে কোনো কলের রেকর্ড নেই।',
    loggedBy: 'সংরক্ষণকারী:',
    duration: 'সময়কাল:',
    totalPackagePrice: 'মোট ফ্ল্যাট প্যাকেজ মূল্য',
    activeHold48h: 'সক্রিয় ৪৮ ঘণ্টার সাময়িক হোল্ড',
    holdReservationNotice: 'ক্রেতার জন্য সংরক্ষিত। নির্দিষ্ট সময়ের মধ্যে বায়না টাকা জমা না হলে ফ্ল্যাটটি পুনরায় খালি তালিকায় চলে যাবে।',
    lockUnit: 'ফ্ল্যাট লক করুন (হোল্ড / বুকিং)',
    selectProspectiveLead: 'সম্ভাব্য ক্রেতা নির্বাচন করুন...',
    startBookingProcess: 'অফিসিয়াল বুকিং শুরু করুন ➔',
    bookedCustomerLabel: 'বুকিংকারী গ্রাহক',
    architecturalSpecs: 'স্থাপত্য বিবরণী',
    specSize: 'আকার',
    specFacing: 'দিক',
    specBedrooms: 'বেডরুম',
    specBathrooms: 'বাথরুম',
    specBalconies: 'বারান্দা',
    specFloor: 'ফ্লোর',
    priceBreakdown: 'মূল্যের বিস্তারিত বিভাজন',
    basePrice: 'মূল ফ্ল্যাটের দাম',
    reservedParking: 'সংরক্ষিত কার পার্কিং স্পেস',
    utilityConnection: 'ইউটিলিটি ও সাবস্টেশন চার্জ',
    grandTotalPackage: 'সর্বমোট প্যাকেজ মূল্য',
    currentlyHolding: 'বর্তমান হোল্ডকৃত:',
    profession: 'পেশা',
    budgetRange: 'বাজেট সীমা',
    noNotes: 'কোনো মন্তব্য লেখা হয়নি।',
    callLogSaved: 'কল নোট সংরক্ষিত',
    callLogSavedDesc: 'গ্রাহক টাইমলাইনে নতুন ফোন কলের তথ্য যোগ হয়েছে।',
    calling: 'কল করা হচ্ছে',
    initiatingCall: 'সংযোগে কল পাঠানো হচ্ছে...',

    // Booking Wizard
    wizardTitle: 'ফ্ল্যাট বুকিং প্রক্রিয়া',
    wizardSubtitle: '৪ ধাপে অফিসিয়াল ফ্ল্যাট বুকিং ও তাৎক্ষণিক মানি রিসিট প্রস্তুত।',
    stepCustomer: 'গ্রাহক',
    stepFlat: 'ফ্ল্যাট নির্বাচন',
    stepPlan: 'পেমেন্ট প্ল্যান',
    stepConfirm: 'নিশ্চিতকরণ',
    selectRegisteredBuyer: 'নিবন্ধিত ক্রেতা নির্বাচন করুন',
    flatsOwnedCount: 'টি ফ্ল্যাট কেনা আছে',
    bookingTokenMoney: 'বুকিং বায়না টাকা (৳)',
    downPaymentPercent: 'ডাউন পেমেন্টের শতকরা হার',
    monthlyInstallmentsTenure: 'মাসিক কিস্তির মেয়াদকাল',
    months24: '২৪ মাস (২ বছর)',
    months36: '৩৬ মাস (৩ বছর)',
    months48: '৪৮ মাস (৪ বছর)',
    months60: '৬০ মাস (৫ বছর)',
    estimatedMonthly: 'আনুমানিক মাসিক কিস্তি:',
    reviewBookingSummary: 'বুকিং চুক্তিনামার সারসংক্ষেপ যাচাই করুন',
    buyerName: 'ক্রেতার নাম:',
    selectedUnitLabel: 'নির্বাচিত ফ্ল্যাট:',
    totalFlatPrice: 'ফ্ল্যাটের মোট মূল্য:',
    immediateToken: 'তাত্ক্ষণিক বায়না টাকা:',
    paymentChannel: 'পেমেন্টের মাধ্যম:',
    confirmAndIssueReceipt: 'নিশ্চিত করুন ও মানি রিসিট প্রস্তুত করুন',
    totalPackageValue: 'সর্বমোট প্যাকেজ মূল্য:',
    downPaymentVal: 'ডাউন পেমেন্ট',

    // Record Payment Modal
    recordPaymentTitle: 'পেমেন্ট এন্ট্রি',
    recordPaymentSubtitle: 'সরাসরি কিস্তির শিডিউলে জমা হবে এবং অফিসিয়াল মানি রিসিট তৈরি হবে।',
    targetInstallmentFlat: 'নির্দিষ্ট কিস্তি ও ফ্ল্যাট',
    paymentAmountBdt: 'জমার পরিমাণ (টাকা ৳)',
    outstandingBalance: 'মোট বকেয়া:',
    paymentMethod: 'পেমেন্ট মাধ্যম',
    bankBranchName: 'ব্যাংক ও শাখার নাম',
    chequeNumber: 'চেক নম্বর',
    trnxReferenceId: 'ট্রানজেকশন / রেফারেন্স আইডি',
    mfsTrnxId: 'এমএফএস ট্রানজেকশন আইডি (TrnxID)',
    accountsRemarks: 'অ্যাকাউন্টস ডিপার্টমেন্টের মন্তব্য',
    depositSlipProof: 'জমা স্লিপ বা চেকের কপি (প্রমাণক)',
    attachDepositSlip: 'ব্যাংক ডিপোজিট স্লিপ বা ভাউচার আপলোড করুন (PDF/JPG)',
    paymentAuditNotice: 'এই পেমেন্টটি স্থায়ীভাবে অডিট লগে সংরক্ষিত হবে। কোনো পেমেন্ট মুছে ফেলা যায় না, শুধুমাত্র অনুমোদিত কারণে রিভার্স করা যায়।',
    recordAndIssueReceipt: 'জমা সংরক্ষণ ও মানি রিসিট প্রিন্ট',

    // Money Receipt Preview Modal
    receiptModalTitle: 'অফিসিয়াল মানি রিসিট / বুকিং কনফার্মেশন',
    officialMoneyReceipt: 'অফিসিয়াল মানি রিসিট',
    dateLabel: 'তারিখ:',
    receiptNoLabel: 'রিসিট নম্বর:',
    receivedFrom: 'গ্রাহকের নাম',
    paymentFor: 'পেমেন্টের বিবরণ:',
    propertyUnitDetails: 'ফ্ল্যাটের বিবরণ',
    amountReceived: 'প্রাপ্ত অর্থের পরিমাণ',
    inWordsTaka: 'কথায় (টাকা)',
    inWordsNotice: 'ডেভেলপার কোম্পানির ব্যাংক হিসাবে অর্থ জমা হয়েছে',
    customerSignature: 'গ্রাহকের স্বাক্ষর',
    digitalSeal: 'ডিজিটাল সিল',
    authorizedSignatory: 'কর্তৃপক্ষের স্বাক্ষর',
    systemCopyArchived: 'অফিসিয়াল সিস্টেম কপি তৈরি হয়েছে এবং গ্রাহক ফাইলে সংরক্ষিত।',

    // Send Reminder Modal
    sendReminderModalTitle: 'পেমেন্ট রিমাইন্ডার ও বকেয়া তাগিদপত্র',
    messagePreview: 'বার্তার প্রিভিউ',
    copyText: 'লেখা কপি করুন',
    copiedText: 'ক্লিপবোর্ডে কপি হয়েছে',
    dynamicMergeFieldsNote: 'তথ্য স্বয়ংক্রিয়ভাবে সংযুক্ত হবে: গ্রাহকের নাম, ফ্ল্যাট/প্রজেক্ট, টাকার পরিমাণ, প্রদেয় তারিখ।',
    sendViaWhatsApp: 'হোয়াটসঅ্যাপে পাঠান',
    sendViaSms: 'এসএমএস গেটওয়েতে পাঠান',
    smsGateway: 'এসএমএস গেটওয়ে',

    // Quick Add Lead Modal
    quickAddLeadTitle: 'নতুন ক্রেতার তথ্য এন্ট্রি',
    quickAddLeadSubtitle: '৩০ সেকেন্ডে নতুন সম্ভাব্য ক্রেতার তথ্য যুক্ত করুন।',
    buyerFullName: 'ক্রেতার পুরো নাম *',
    phoneNumber: 'মোবাইল নম্বর *',
    sourceChannel: 'উৎস মাধ্যম',
    assignedConsultant: 'দায়িত্বপ্রাপ্ত সেলস অফিসার',
    minBudget: 'সর্বনিম্ন বাজেট (৳)',
    maxBudget: 'সর্বোচ্চ বাজেট (৳)',
    buyerNotesPlaceholder: '৪ বেডরুম, দক্ষিণমুখী, ডুপ্লেক্স বা উঁচু তলার ফ্ল্যাট পছন্দ...',

    // Site Visits View
    scheduledVisitsLabel: 'নির্ধারিত ভিজিট',
    completedVisitsLabel: 'সম্পন্ন ভিজিট',
    dhakaCtgLive: 'ঢাকা ও চট্টগ্রাম সাইট অফিস সরাসরি সংযুক্ত',
    inspectionFeedback: 'পরিদর্শন পরবর্তী মতামত:',
    nextStepLabel: 'পরবর্তী পদক্ষেপ:',
    logFeedbackAndComplete: 'মতামত সংরক্ষণ ও সমাপ্তি',
    customerInterestLevel: 'ক্রেতার আগ্রহের মাত্রা',
    interestHigh: 'উচ্চ আগ্রহ (High)',
    interestMedium: 'মাঝারি আগ্রহ (Medium)',
    interestLow: 'স্বল্প আগ্রহ (Low)',
    feedbackRemarksLabel: 'ক্রেতার মন্তব্য ও অভিমত',
    nextActionStepLabel: 'পরবর্তী করণীয়',
    logSiteVisitFeedback: 'সাইট পরিদর্শনের মতামত সংরক্ষণ',
    scheduleSiteVisitModalTitle: 'সাইট ভিজিট শিডিউল',
    scheduleSiteVisitModalSubtitle: 'ক্যালেন্ডার ও প্রজেক্ট অফিস সিঙ্কের সাথে দ্রুত ভিজিট শিডিউলিং।',
    buyerLeadLabel: 'সম্ভাব্য ক্রেতা / লিড *',
    projectLocationLabel: 'প্রজেক্ট লোকেশন *',
    preferredFlatUnitLabel: 'পছন্দের ফ্ল্যাট / ইউনিট',
    visitDateLabel: 'ভিজিটের তারিখ *',
    visitTimeLabel: 'ভিজিটের সময় *',
    notesSpecialRequests: 'বিশেষ চাহিদা / নোট',

    // Customers View
    customerDirectoryTitle: 'গ্রাহক ডিরেক্টরি',
    customerDirectorySubtitle: 'যাচাইকৃত ফ্ল্যাট ক্রেতাদের প্রোফাইল, পেমেন্ট বিবরণী, এনআইডি ও চুক্তিনামা।',
    totalRegisteredOwners: 'মোট নিবন্ধিত ফ্ল্যাট মালিক:',
    flatsOwnedInPortfolio: 'মালিকানাধীন ফ্ল্যাটসমূহ',
    buyerKycLegalDocs: 'কেওয়াইসি ও আইনি কাগজপত্র',
    noKycDocsYet: 'কোনো কেওয়াইসি ডকুমেন্ট আপলোড করা হয়নি।',
    totalCommittedPortfolio: 'মোট চুক্তিবদ্ধ মূল্য:',
    totalPaidCleared: 'মোট পরিশোধিত (ক্লিয়ারড)',
    downloadDeedDraft: 'চুক্তিপত্রের ড্রাফট ডাউনলোড (DOCX)',
    paymentHistoryReceipts: 'পেমেন্ট ইতিহাস ও ইস্যুকৃত রিসিট',

    // Agents View
    agentsCommissionTitle: 'সেলস এজেন্ট ও কমিশন হিসাব',
    agentsCommissionSubtitle: 'বিক্রয় লক্ষ্যমাত্রা, মাইলস্টোন ভিত্তিক কমিশন ও এজেন্ট পারফরম্যান্স।',
    commissionLedgerTab: 'কমিশন লেজার',
    consultantsListTab: 'পরামর্শক তালিকা',
    exportStatement: 'স্টেটমেন্ট এক্সপোর্ট',
    totalEarnedLabel: 'মোট অর্জিত কমিশন',
    paidOutLabel: 'প্রদত্ত কমিশন',
    approvedForPayout: 'প্রদানের জন্য অনুমোদিত',
    pendingMilestone: 'অপেক্ষমাণ কমিশন',
    commLedgerHeading: 'কমিশন প্রদান ও লেজার রেজিস্টার',
    commRuleText: 'নিয়ম: গ্রাহক ২০% বা ততোধিক ডাউন পেমেন্ট ক্লিয়ার করলে ১.০% কমিশন ছাড়যোগ্য হবে।',
    autoAuditEnabled: 'স্বয়ংক্রিয় অডিট সক্রিয়',
    consultantPerformanceHeading: 'পরামর্শকদের পারফরম্যান্স ও বিক্রয় হিসাব',

    // Reminders View
    remindersTasksTitle: 'তাগিদ ও দৈনন্দিন কাজের তালিকা',
    remindersTasksSubtitle: 'গ্রাহক ফলো-আপ, চেক ক্লিয়ারেন্স ও স্বয়ংক্রিয় বার্তা টেমপ্লেট।',
    addReminderTask: '+ নতুন তাগিদ যুক্ত করুন',
    pendingTab: 'বাকি আছে',
    completedTab: 'সম্পন্ন হয়েছে',
    dailyPriorityChecklist: 'দৈনন্দিন অগ্রাধিকার কাজের তালিকা',
    messagingTemplatesTitle: 'বার্তা টেমপ্লেটসমূহ',
    standardizedRemindersSub: 'গ্রাহকদের জন্য নির্ধারিত নোটিশ মেসেজ',
    useTemplate: 'টেমপ্লেট ব্যবহার করুন ➔',
    overdueInstallmentTemplateTitle: 'বকেয়া কিস্তি তাগিদ নোটিশ',
    siteVisitTemplateTitle: 'সাইট পরিদর্শন নিশ্চিতকরণ বার্তা',
    chequeClearanceTemplateTitle: 'ব্যাংক চেক ক্লিয়ারেন্স নোটিশ',

    // Reports View
    reportsTitle: 'আর্থিক ও বিক্রয় রিপোর্ট',
    reportsSubtitle: 'আদায়কৃত ক্যাশ ফ্লো, বয়সভিত্তিক বকেয়া ও প্রজেক্ট বিক্রয় বেগ বিশ্লেষণ।',
    exportAllCsv: 'সকল সিএসভি এক্সপোর্ট',
    downloadFilteredCsv: 'ফিল্টারকৃত সিএসভি ডাউনলোড',
    liveLedgerRajuk: 'রাজউক নিয়মানুযায়ী রিয়েল-টাইম ক্যালকুলেটেড লেজার।',
    overdueAgingBuckets: 'বকেয়ার বয়সভিত্তিক শ্রেণিবিভাগ',
    collectionsByChannel: 'পেমেন্ট মাধ্যম অনুযায়ী মোট আদায়',
    absorptionVelocity: 'প্রজেক্ট বিক্রয় বেগ ও গতিশীলতা',
    repCollectionTitle: 'আদায় ও নগদ প্রবাহ',
    repCollectionDesc: 'ব্যাংক ট্রান্সফার, চেক, পে-অর্ডার ও এমএফএসের মাধ্যমে মাসিক আদায় বিবরণী।',
    repAgingTitle: 'বয়সভিত্তিক বকেয়া ঋণ রিপোর্ট',
    repAgingDesc: '১-৭ দিন, ৮-৩০ দিন, ৩১-৬০ দিন এবং জরুরি ৬০+ দিন অনুযায়ী বকেয়ার হিসাব।',
    repProjectsTitle: 'প্রজেক্টভিত্তিক বিক্রয় ও ইনভেন্টরি',
    repProjectsDesc: 'ঢাকার ৩টি প্রজেক্টে ফ্ল্যাট বিক্রির গতি ও বর্গফুটভিত্তিক আয়ের চিত্র।',
    repCommissionsTitle: 'এজেন্ট কমিশন অডিট রিপোর্ট',
    repCommissionsDesc: 'মাইলস্টোন অনুযায়ী সেলস বোনাস, অর্জিত বনাম প্রদত্ত কমিশন লেজার।',
    repSourcesTitle: 'লিড সোর্স আরওআই ও রূপান্তর হার',
    repSourcesDesc: 'ফেসবুক বিজ্ঞাপন বনাম সরাসরি সাইট ভিজিট বনাম রেফারেলের কার্যকারিতা।',
    repInventoryTitle: 'ফ্ল্যাট ইনভেন্টরি ও ফ্লোর ভেলোসিটি',
    repInventoryDesc: 'খালি ফ্ল্যাটের সংখ্যা, হোল্ডের মেয়াদ এবং বাজারে ফ্ল্যাটের গড় অবস্থানকাল।',

    // Settings View
    settingsTitle: 'সেটিংস ও নিরাপত্তা ব্যবস্থা',
    settingsSubtitle: 'ব্যবহারকারীদের রোল পারমিশন, অ্যাকশন অডিট লগ ও ক্লাউড ব্যাকআপ।',
    activeRoleLabel: 'সক্রিয় রোল:',
    tabRolesMatrix: 'রোল ও পারমিশন ম্যাট্রিক্স',
    tabAuditTrail: 'অডিট ট্রেইল লগ',
    tabCompanyData: 'কোম্পানি ও মাস্টার ডেটা',
    tabBackupExport: 'ব্যাকআপ ও ডেটা এক্সপোর্ট',
    rbacHeading: 'রোল ভিত্তিক প্রবেশাধিকার (RBAC) ম্যাট্রিক্স',
    rbacSubtitle: 'আর্থিক স্বচ্ছতা এবং গ্রাহকের সংবেদনশীল তথ্য সুরক্ষায় সুনির্দিষ্ট পারমিশন।',
    thSystemCapability: 'সিস্টেমের কার্যক্রম ও অনুমতি',
    thOwnerAdmin: 'মালিক / অ্যাডমিন',
    thSalesManager: 'সেলস ম্যানেজার',
    thSalesAgent: 'সেলস এজেন্ট',
    thAccountsOfficer: 'অ্যাকাউন্টস অফিসার',
    immutableAuditTrail: 'অপরিবর্তনযোগ্য সিকিউরিটি অডিট ট্রেইল',
    auditTrailSubtitle: 'মূল্য পরিবর্তন, ফ্ল্যাট হোল্ড, পেমেন্ট এন্ট্রি বা গোপনীয় তথ্য দেখার প্রতিটি ঘটনা সময়ের সাথে লিপিবদ্ধ হয়।',
    companyLegalProfile: 'কোম্পানির অফিসিয়াল পরিচয়',
    companyRegName: 'কোম্পানির নিবন্ধিত নাম',
    rajukLicense: 'রাজউক ডেভেলপার লাইসেন্স',
    headOfficeAddress: 'প্রধান কার্যালয়ের ঠিকানা',
    corporateHotline: 'কর্পোরেট হটলাইন',
    autoCloudBackup: 'দৈনিক স্বয়ংক্রিয় ক্লাউড ব্যাকআপ',
    backupSubtitle: 'প্রতিদিন রাত ০২:০০ টায় এনক্রিপ্টেড ব্যাকআপ নেওয়া হয় (বাংলাদেশ সময়)।',
    allSystemsNominal: 'সব সিস্টেম স্বাভাবিক',
    lastBackupSuccess: 'সর্বশেষ সফল ব্যাকআপ:',
    retentionPolicy: 'ব্যাকআপ সংরক্ষণের মেয়াদ:',
    dbIntegrityCheck: 'ডেটাবেজ সুরক্ষা যাচাই:',
    permViewLeads: 'সকল লিড দেখা ও পরিচালনা',
    permHoldFlat: '৪৮ ঘণ্টা ফ্ল্যাট হোল্ড করা',
    permRecordPayments: 'পেমেন্ট গ্রহণ ও রিসিট প্রদান',
    permReversePayments: 'পেমেন্ট রিভার্স বা স্থানান্তর',
    permChangePrice: 'ফ্ল্যাটের মূল্য / স্কয়ারফুট রেট পরিবর্তন',
    permApproveCommission: 'কমিশন অনুমোদন ও বিতরণ',
    permRevealSensitive: 'এনআইডি ও ফোন নম্বর দৃশ্যমান করা',
    permExportDb: 'সম্পূর্ণ ডেটাবেজ ও গ্রাহক তালিকা এক্সপোর্ট',

    // Payment Plan Builder
    planBuilderTitle: 'কিস্তি সময়সূচি ক্যালকুলেটর',
    planBuilderSubtitle: 'মাইলস্টোন কাঠামো, বিশেষ পেমেন্ট কনফিগারেশন ও শিডিউল তৈরি।',
    presetTemplates: 'পূর্বনির্ধারিত কিস্তি প্ল্যান টেমপ্লেট',
    tmplStandard36: 'স্ট্যান্ডার্ড (৩৬ মাস)',
    tmplStandard36Desc: '২০% ডাউন + ৩৬টি মাসিক কিস্তি + ছাদ ঢালাই ও হ্যান্ডওভার',
    tmplExtended48: 'দীর্ঘমেয়াদী (৪৮ মাস)',
    tmplExtended48Desc: '১৫% ডাউন + ৪৮টি মাসিক কিস্তি + মাইলস্টোন পেমেন্ট',
    tmplLuxury: 'মাইলস্টোন প্রধান',
    tmplLuxuryDesc: '৩০% ডাউন + ২৪টি মাসিক কিস্তি + ২টি বড় ঢালাই পেমেন্ট',
    scheduleBreakdownHeading: 'কিস্তি সময়সূচির বিভাজন',
    tokenStep: '১. বুকিং বায়না টাকা (তাত্ক্ষণিক):',
    downStep: '২. অবশিষ্ট ডাউন পেমেন্ট:',
    monthlyStep: '৩. মাসিক কিস্তি:',
    roofStep: '৪. ছাদ ঢালাই মাইলস্টোন:',
    handoverStep: '৫. চাবি হস্তান্তর পেমেন্ট:',

    // Command palette
    cmdSearchPlaceholder: 'গ্রাহকের নাম, ফ্ল্যাট (যেমন 5B), বা প্রজেক্ট খুঁজুন...',
    cmdOverdueSection: 'বকেয়া কিস্তির তালিকা',
    cmdInventorySection: 'ফ্ল্যাট ও টাওয়ার ইনভেন্টরি',
    cmdLeadsSection: 'সম্ভাব্য ক্রেতার তালিকা (লিডস)',
    cmdCustomersSection: 'গ্রাহক প্রোফাইল',
    openLead: 'লিড খুলুন',

    // Notification center
    operationalAlerts: 'জরুরি নোটিশসমূহ',
    overdueAlertText: 'টি ফ্ল্যাটের কিস্তি বকেয়া হয়েছে',
    activeHoldsText: 'টি ৪৮ ঘণ্টার হোল্ড চলমান রয়েছে',
    visitsTodayText: 'টি সাইট পরিদর্শন আজ নির্ধারিত',

    // Role switcher
    switchActiveRole: 'রোল পরিবর্তন করুন (RBAC ডেমো)',
  },
};

export type TranslationKey = keyof typeof translations['en'];

export function t(key: string, lang: Language): string {
  const dict = translations[lang] || translations['en'];
  return (dict as any)[key] || (translations['en'] as any)[key] || key;
}

// Helper to translate status codes dynamically
export function translateStatus(status: string, lang: Language): string {
  if (lang !== 'bn') {
    switch (status) {
      case 'available':
        return 'Available';
      case 'hold':
        return 'Hold (48h)';
      case 'booked':
        return 'Booked';
      case 'sold':
        return 'Sold';
      case 'paid':
        return 'Paid';
      case 'upcoming':
        return 'Upcoming';
      case 'due_soon':
        return 'Due Soon (7d)';
      case 'overdue':
        return 'Overdue';
      case 'new':
        return 'New Inquiries';
      case 'contacted':
        return 'Contacted';
      case 'visit_scheduled':
        return 'Visit Scheduled';
      case 'visited':
        return 'Site Visited';
      case 'negotiation':
        return 'Negotiation / Hold';
      case 'lost':
        return 'Lost';
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'disbursed':
        return 'Disbursed';
      default:
        return status;
    }
  }

  // Bangla translations
  switch (status) {
    case 'available':
      return 'খালি আছে';
    case 'hold':
      return 'হোল্ডে আছে (৪৮ঘ.)';
    case 'booked':
      return 'বুকিং হয়েছে';
    case 'sold':
      return 'বিক্রিত';
    case 'paid':
      return 'পরিশোধিত';
    case 'upcoming':
      return 'আসন্ন';
    case 'due_soon':
      return 'শীঘ্রই প্রদেয় (৭ দিন)';
    case 'overdue':
      return 'বকেয়া';
    case 'new':
      return 'নতুন অনুসন্ধান';
    case 'contacted':
      return 'যোগাযোগ হয়েছে';
    case 'visit_scheduled':
      return 'ভিজিট নির্ধারিত';
    case 'visited':
      return 'ভিজিট সম্পন্ন';
    case 'negotiation':
      return 'দরদাম / হোল্ড';
    case 'lost':
      return 'বাতিল';
    case 'scheduled':
      return 'নির্ধারিত';
    case 'completed':
      return 'সম্পন্ন';
    case 'pending':
      return 'অপেক্ষমাণ';
    case 'approved':
      return 'অনুমোদিত';
    case 'disbursed':
      return 'প্রদত্ত';
    default:
      return status;
  }
}

export function translatePaymentMethod(method: string, lang: Language): string {
  if (lang !== 'bn') return method;
  switch (method) {
    case 'Bank Transfer':
      return 'ব্যাংক ট্রান্সফার';
    case 'Cheque':
      return 'চেক';
    case 'Pay Order':
      return 'পে-অর্ডার';
    case 'Cash':
      return 'ক্যাশ (নগদ)';
    case 'bKash':
      return 'বিকাশ';
    case 'Nagad':
      return 'নগদ (এমএফএস)';
    case 'Rocket':
      return 'রকেট';
    case 'Card':
      return 'কার্ড';
    default:
      return method;
  }
}
