import React, { useState } from 'react';
import {
  Settings,
  Shield,
  ShieldCheck,
  Lock,
  Database,
  Building,
  Users,
  FileText,
  Clock,
  Check,
  X,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Button } from '../common/Button';

export const SettingsView: React.FC = () => {
  const { auditLogs, userRole, showToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'roles' | 'audit' | 'company' | 'backup'>('roles');

  const permissionsMatrix = [
    {
      feature: 'View & Manage All Leads',
      admin: true,
      sales_manager: true,
      sales_agent: false, // only assigned leads
      accounts: false,
    },
    {
      feature: 'Place 48h Flat Hold',
      admin: true,
      sales_manager: true,
      sales_agent: true,
      accounts: false,
    },
    {
      feature: 'Record & Issue Payments',
      admin: true,
      sales_manager: false,
      sales_agent: false,
      accounts: true,
    },
    {
      feature: 'Reverse / Reallocate Payments',
      admin: true,
      sales_manager: false,
      sales_agent: false,
      accounts: true, // with managerial audit trail
    },
    {
      feature: 'Change Flat Price / Sq Ft Rate',
      admin: true,
      sales_manager: false,
      sales_agent: false,
      accounts: false,
    },
    {
      feature: 'Approve & Disburse Commission',
      admin: true,
      sales_manager: true,
      sales_agent: false,
      accounts: true,
    },
    {
      feature: 'Reveal Masked NID & Phone Numbers',
      admin: true,
      sales_manager: true,
      sales_agent: false,
      accounts: true,
    },
    {
      feature: 'Export Full Database & Customer Lists',
      admin: true,
      sales_manager: false,
      sales_agent: false,
      accounts: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tight">
            Settings & Security Governance (সেটিংস ও নিরাপত্তা)
          </h1>
          <p className="text-xs text-black/60 mt-1 font-medium">
            Role-based permissions matrix, security audit logging, and data backup status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/15 text-xs font-semibold text-black">
            <ShieldCheck className="w-4 h-4 text-[#0038BD]" />
            <span>Active Role: <strong className="uppercase">{userRole}</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-3.5 rounded-2xl border border-black/10 shadow-2xs flex items-center justify-between">
        <div className="flex items-center bg-[#EEEEEE] p-0.5 rounded-xl text-xs font-semibold overflow-x-auto">
          {[
            { id: 'roles', label: 'Roles & Permissions Matrix' },
            { id: 'audit', label: `Audit Trail Logs (${auditLogs.length})` },
            { id: 'company', label: 'Company & Master Data' },
            { id: 'backup', label: 'Backup & Data Export' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-white text-black shadow-2xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Roles & Permissions Matrix */}
      {activeSubTab === 'roles' && (
        <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#EEEEEE]">
            <h3 className="text-sm font-bold text-black">
              Role-Based Access Control (RBAC) Matrix
            </h3>
            <p className="text-xs text-black/60 mt-0.5">
              Strict functional boundaries ensuring financial integrity and sensitive customer data protection.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                  <th className="py-3 px-4">Action / System Capability</th>
                  <th className="py-3 px-3 text-center">Owner / Admin</th>
                  <th className="py-3 px-3 text-center">Sales Manager</th>
                  <th className="py-3 px-3 text-center">Sales Agent</th>
                  <th className="py-3 px-3 text-center">Accounts Officer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE]">
                {permissionsMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#EEEEEE]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-black">{item.feature}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0038BD]/10 text-[#0038BD]">
                        <Check className="w-4 h-4" />
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {item.sales_manager ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0038BD]/10 text-[#0038BD]">
                          <Check className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EEEEEE] text-black/30">
                          <X className="w-4 h-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {item.sales_agent ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0038BD]/10 text-[#0038BD]">
                          <Check className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EEEEEE] text-black/30">
                          <X className="w-4 h-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {item.accounts ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0038BD]/10 text-[#0038BD]">
                          <Check className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EEEEEE] text-black/30">
                          <X className="w-4 h-4" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Audit Logs */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-black/10 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#EEEEEE] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-black">Immutable Security & Action Audit Trail</h3>
              <p className="text-xs text-black/60 mt-0.5">
                Every sensitive action (price revisions, hold placements, payment reversals, data unmasking) is cryptographically logged.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Audit Logs Exported', 'Downloaded complete immutable audit trail.', 'success')}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export Trail
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#EEEEEE]/60 border-b border-[#EEEEEE] text-[11px] font-bold text-black/60 uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-3">Actor & Role</th>
                  <th className="py-3 px-3">Action Type</th>
                  <th className="py-3 px-3">Target Entity</th>
                  <th className="py-3 px-4">Operational Details</th>
                  <th className="py-3 px-3">Terminal IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#EEEEEE]/50 transition-colors">
                    <td className="py-3 px-4 text-black font-mono font-medium whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-black block">{log.actorName}</span>
                      <span className="text-[10px] text-black/60 uppercase">{log.actorRole}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#EEEEEE] text-black">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-black">{log.entityId}</td>
                    <td className="py-3 px-4 text-black/80 max-w-md">{log.details}</td>
                    <td className="py-3 px-3 font-mono text-[10px] text-black/50">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Company Master Data */}
      {activeSubTab === 'company' && (
        <div className="bg-white rounded-2xl border border-black/10 shadow-2xs p-5 space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-black">Company Legal Profile</h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-black mb-1">Company Registered Name</label>
              <input
                type="text"
                readOnly
                value="FlatDesk Properties Ltd."
                className="w-full p-2.5 bg-[#EEEEEE] rounded-xl text-black font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-black mb-1">RAJUK Developer License</label>
              <input
                type="text"
                readOnly
                value="RAJUK/RED/2019/042"
                className="w-full p-2.5 bg-[#EEEEEE] rounded-xl text-black font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-black mb-1">Head Office Address</label>
              <input
                type="text"
                readOnly
                value="Level 12, Gulshan Center Point, Road 90, Gulshan-2, Dhaka"
                className="w-full p-2.5 bg-[#EEEEEE] rounded-xl text-black"
              />
            </div>

            <div>
              <label className="block font-bold text-black mb-1">Corporate Hotline</label>
              <input
                type="text"
                readOnly
                value="+880 9612-334455"
                className="w-full p-2.5 bg-[#EEEEEE] rounded-xl text-black font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Backup & Data Export */}
      {activeSubTab === 'backup' && (
        <div className="bg-white rounded-2xl border border-black/10 shadow-2xs p-5 space-y-4 max-w-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-black">Automated Daily Cloud Backup</h3>
              <p className="text-xs text-black/60 mt-0.5">
                Encrypted snapshot taken daily at 02:00 AM (Dhaka Standard Time).
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0038BD]/10 text-[#0038BD]">
              <Database className="w-3.5 h-3.5" /> All Systems Nominal
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#EEEEEE]/60 border border-black/10 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-black/60">Last Backup Successful:</span>
              <strong className="text-black">Today, 02:00 AM (Snapshot ID: BKP-94821)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-black/60">Backup Retention Policy:</span>
              <strong className="text-black">90 Days Offsite Cold Storage</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-black/60">Database Integrity Check:</span>
              <strong className="text-[#0038BD]">100% Invariants Verified</strong>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Backup Triggered', 'Manual cloud database snapshot initiated.', 'info')}
            >
              Trigger Manual Snapshot Now
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Database Exported', 'Downloaded encrypted schema and JSON records.', 'success')}
              className="font-bold"
            >
              Download Full DB Dump (.JSON)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
