import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  UserCheck,
  Eye,
  AlertTriangle,
  Search,
  Check,
  X
} from 'lucide-react';
import { FarmerProfile, User, LanguageCode } from '../types';
import { translations } from '../data/translations';
import { StorageService } from '../services/storage';

interface AdminVerificationProps {
  user: User;
  farmers: FarmerProfile[];
  onRefreshData: () => void;
  language: LanguageCode;
}

export const AdminVerification: React.FC<AdminVerificationProps> = ({
  user,
  farmers,
  onRefreshData,
  language
}) => {
  const t = translations[language];

  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(
    farmers.find((f) => f.verificationStatus === 'pending')?.id || (farmers[0] ? farmers[0].id : '')
  );
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectPrompt, setShowRejectPrompt] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredFarmers = farmers.filter((f) => {
    if (filterStatus === 'all') return true;
    return f.verificationStatus === filterStatus;
  });

  const selectedFarmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];

  const handleApprove = (farmerId: string) => {
    StorageService.reviewFarmerApplication(
      farmerId,
      'approved',
      user.name || 'Admin Verification Desk'
    );
    setActionNotice(`Farmer "${selectedFarmer?.farmerName}" approved and verified badge granted!`);
    onRefreshData();
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = (farmerId: string) => {
    if (!rejectReason.trim()) {
      alert('Please specify the reason for rejection so the farmer can re-upload.');
      return;
    }
    StorageService.reviewFarmerApplication(
      farmerId,
      'rejected',
      user.name || 'Admin Verification Desk',
      rejectReason
    );
    setShowRejectPrompt(false);
    setRejectReason('');
    setActionNotice(`Application marked as rejected with feedback sent to farmer.`);
    onRefreshData();
    setTimeout(() => setActionNotice(null), 4000);
  };

  const pendingCount = farmers.filter((f) => f.verificationStatus === 'pending').length;
  const verifiedCount = farmers.filter((f) => f.verificationStatus === 'verified').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Official Land & Producer Audit
          </span>
          <h2 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
            Farmer Verification & Compliance Desk
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Review land records, Kisan registration cards, and organic certifications before conferring the marketplace verified badge.
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-amber-800 font-bold font-numeric">{pendingCount}</span>
            <span className="text-amber-700 ml-1">Pending Audit</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-emerald-800 font-bold font-numeric">{verifiedCount}</span>
            <span className="text-emerald-700 ml-1">Verified Badged</span>
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-950 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main 2-Column Review Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Applications List */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900">Farmer Applications</h3>
            <span className="text-xs text-stone-400 font-numeric">{filteredFarmers.length} total</span>
          </div>

          {/* Filter Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex-1 py-1 text-center font-medium rounded ${
                filterStatus === 'all' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`flex-1 py-1 text-center font-medium rounded ${
                filterStatus === 'pending' ? 'bg-white shadow-xs text-amber-800 font-bold' : 'text-stone-500'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`flex-1 py-1 text-center font-medium rounded ${
                filterStatus === 'verified' ? 'bg-white shadow-xs text-emerald-800 font-bold' : 'text-stone-500'
              }`}
            >
              Verified
            </button>
          </div>

          {/* List of Applications */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredFarmers.map((f) => {
              const isSelected = f.id === selectedFarmer?.id;

              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFarmerId(f.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors space-y-1.5 ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-stone-200 hover:bg-stone-50 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-stone-900 block">{f.farmerName}</span>
                      <span className="text-[11px] text-stone-500 block truncate max-w-[170px]">
                        {f.farmName}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        f.verificationStatus === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : f.verificationStatus === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {f.verificationStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200/60">
                    <span>{f.village}, {f.state}</span>
                    <span className="font-numeric">{f.documents.length} docs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Application Dossier */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
          {selectedFarmer ? (
            <>
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-stone-900 font-serif-display">
                      {selectedFarmer.farmName}
                    </h3>
                    {selectedFarmer.verificationStatus === 'verified' && (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        Verified Badge Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Farmer Contact: <strong className="text-stone-800">{selectedFarmer.farmerName}</strong> ({selectedFarmer.email} · {selectedFarmer.phone})
                  </p>
                  <p className="text-xs text-stone-500">
                    Location: {selectedFarmer.village}, {selectedFarmer.district}, {selectedFarmer.state} - {selectedFarmer.pincode}
                  </p>
                </div>

                {/* Audit Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {selectedFarmer.verificationStatus !== 'verified' ? (
                    <button
                      onClick={() => handleApprove(selectedFarmer.id)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Grant Badge</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Approved by {selectedFarmer.reviewedBy || 'Admin Desk'}
                    </span>
                  )}

                  {selectedFarmer.verificationStatus !== 'rejected' && (
                    <button
                      onClick={() => setShowRejectPrompt(true)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Reject Feedback Reason Dialog */}
              {showRejectPrompt && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-3">
                  <span className="font-bold text-rose-900 block">
                    Specify Rejection Notice to {selectedFarmer.farmerName}:
                  </span>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="e.g. Scanned copy of Land Passbook page 2 is blurred. Please re-upload with clear survey number."
                    className="w-full p-2.5 bg-white border border-rose-300 rounded-lg text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowRejectPrompt(false)}
                      className="px-3 py-1 text-xs text-stone-600 hover:bg-rose-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReject(selectedFarmer.id)}
                      className="px-3 py-1 bg-rose-700 text-white text-xs font-bold rounded"
                    >
                      Send Rejection Notice
                    </button>
                  </div>
                </div>
              )}

              {/* Farm Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Land Acreage</span>
                  <span className="font-bold text-stone-900 font-numeric">{selectedFarmer.landAcreage} Acres</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Soil Composition</span>
                  <span className="font-bold text-stone-900">{selectedFarmer.soilType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Settlement UPI</span>
                  <span className="font-bold text-stone-900 font-mono text-[11px] truncate block">
                    {selectedFarmer.bankAccount.upiId}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Primary Crops</span>
                  <span className="font-bold text-stone-900">{selectedFarmer.primaryCrops.length} Registered</span>
                </div>
              </div>

              {/* Submitted Documentation Dossier */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Official Verification Documents ({selectedFarmer.documents.length})
                  </h4>
                  <span className="text-[11px] text-stone-400">Click to view document authenticity dossier</span>
                </div>

                <div className="space-y-3">
                  {selectedFarmer.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-stone-900 block">{doc.title}</span>
                          <span className="text-stone-500 font-mono text-[11px] block">
                            Govt Registration Ref: {doc.documentNumber}
                          </span>
                          <span className="text-stone-400 text-[10px] block mt-0.5">
                            File: {doc.fileName} ({doc.fileSize}) · Uploaded on {doc.uploadedAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                          {doc.status}
                        </span>
                        <button
                          onClick={() => alert(`Inspecting verified document scan: ${doc.fileName}\nDocument Number: ${doc.documentNumber}\nIntegrity check: SHA-256 Validated.`)}
                          className="px-2.5 py-1 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-100 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-stone-400">
              Select an application from the left panel to review documents.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
