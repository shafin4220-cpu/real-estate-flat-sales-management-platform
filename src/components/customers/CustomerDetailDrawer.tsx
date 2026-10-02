import React from 'react';
import { Drawer } from '../common/Drawer';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatBDT, maskPhone, maskNID, formatDate } from '../../utils/formatters';
import {
  Phone,
  Mail,
  Building,
  CreditCard,
  FileText,
  Shield,
  Download,
} from 'lucide-react';

export const CustomerDetailDrawer: React.FC = () => {
  const {
    selectedCustomer,
    setSelectedCustomer,
    revealSensitiveData,
    payments,
    setReceiptPayment,
    setIsReceiptModalOpen,
    language,
    t,
    showToast,
  } = useApp();

  const isBn = language === 'bn';

  if (!selectedCustomer) return null;

  const customerPayments = payments.filter((p) => p.customerId === selectedCustomer.id);

  return (
    <Drawer
      isOpen={!!selectedCustomer}
      onClose={() => setSelectedCustomer(null)}
      title={selectedCustomer.name}
      subtitle={`${isBn ? 'গ্রাহক আইডি: ' : 'Customer ID: '}${selectedCustomer.id} · ${isBn ? 'যাচাইকৃত ফ্ল্যাট ক্রেতা' : 'Verified Flat Owner'}`}
      width="lg"
    >
      <div className={`space-y-6 ${isBn ? 'font-bangla' : ''}`}>
        {/* Financial Summary Card */}
        <div className="p-4 rounded-2xl bg-white border border-black/15 shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-black/60">{t('totalCommittedPortfolio')}</span>
            <span className="font-mono font-bold text-black text-sm">
              {formatBDT(selectedCustomer.totalCommitted, false, language)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EEEEEE] text-xs">
            <div className="p-2.5 rounded-xl bg-[#0038BD]/10 text-black">
              <span className="text-[10px] text-[#0038BD] font-bold block uppercase">
                {t('totalPaidCleared')}
              </span>
              <span className="font-mono font-bold text-sm text-[#0038BD]">
                {formatBDT(selectedCustomer.totalPaid, false, language)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#EEEEEE] text-black">
              <span className="text-[10px] text-black/60 font-bold block uppercase">
                {t('thBalanceDue')}
              </span>
              <span className="font-mono font-bold text-sm text-black">
                {formatBDT(selectedCustomer.totalDue, false, language)}
              </span>
            </div>
          </div>
        </div>

        {/* Profile and Verification Info */}
        <div className="p-4 rounded-xl bg-[#EEEEEE]/60 border border-black/10 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> {t('thPhone')}
            </span>
            <span className="font-mono font-bold text-black">
              {maskPhone(selectedCustomer.phone, revealSensitiveData)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email
            </span>
            <span className="text-black font-medium">{selectedCustomer.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#0038BD]" /> {t('thNationalId')}
            </span>
            <span className="font-mono font-bold text-black">
              {maskNID(selectedCustomer.nidMasked, revealSensitiveData)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-black/60">{t('profession')}</span>
            <span className="text-black font-semibold">{selectedCustomer.profession}</span>
          </div>
        </div>

        {/* Flats Owned in Developer Portfolio */}
        <div>
          <h4 className="text-xs font-bold text-black mb-2 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#0038BD]" />
            {t('flatsOwnedInPortfolio')}
          </h4>

          <div className="space-y-2">
            {selectedCustomer.flatsOwned.map((flat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white border border-black/15 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-sm px-2 py-0.5 rounded bg-[#0038BD]/10 text-[#0038BD] inline-block mb-1">
                    Unit {flat.unitNumber}
                  </span>
                  <p className="font-bold text-black">{flat.projectName}</p>
                  <p className="text-[11px] text-black/60">
                    {t('thBookingDate')}: {formatDate(flat.bookingDate, language)}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-black block">
                    {formatBDT(flat.price, false, language)}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#0038BD] bg-[#0038BD]/10 px-2 py-0.5 rounded">
                    {t('booked')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History & Issued Receipts */}
        <div>
          <h4 className="text-xs font-bold text-black mb-2 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-[#0038BD]" />
            {t('paymentHistoryReceipts')}
          </h4>

          <div className="divide-y divide-[#EEEEEE] rounded-xl border border-black/15 bg-white text-xs">
            {customerPayments.length > 0 ? (
              customerPayments.map((p) => (
                <div key={p.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-black">{p.installmentName}</p>
                    <p className="text-[11px] text-black/60">
                      {formatDate(p.date, language)} · {p.paymentMethod} ({p.referenceNo})
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-black">
                      {formatBDT(p.amount, false, language)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReceiptPayment(p);
                        setIsReceiptModalOpen(true);
                      }}
                      className="text-[11px] py-1 px-2.5 h-[28px]"
                    >
                      {t('printReceipt')}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-black/40 italic">
                {isBn ? 'কোনো পূর্ববর্তী পেমেন্ট রিসিট পাওয়া যায়নি।' : 'No payment records found.'}
              </div>
            )}
          </div>
        </div>

        {/* Legal & KYC Document Verification */}
        <div>
          <h4 className="text-xs font-bold text-black mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#0038BD]" />
            {t('buyerKycLegalDocs')}
          </h4>

          <div className="p-3 rounded-xl bg-[#EEEEEE] border border-black/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-black/60" />
              <div>
                <p className="font-bold text-black">Deed_of_Agreement_Unit_5B.docx</p>
                <p className="text-[10px] text-black/50">{isBn ? 'আইনি ড্রাফট প্রস্তুত · ২.৪ মেগাবাইট' : 'Legal draft ready · 2.4 MB'}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                showToast(
                  isBn ? 'চুক্তিনামা ডাউনলোড হচ্ছে' : 'Downloading Agreement',
                  isBn ? 'গ্রাহক ডিড ড্রাফট ডাউনলোড সম্পন্ন।' : 'Deed of agreement downloaded for printing.',
                  'success'
                )
              }
              icon={<Download className="w-3.5 h-3.5" />}
              className="text-xs bg-white"
            >
              {t('downloadDeedDraft')}
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
