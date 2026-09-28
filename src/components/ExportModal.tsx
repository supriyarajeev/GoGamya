import React, { useState } from 'react';
import { JAPAN_JOURNEY, SURVIVING_ALTERNATIVES } from '../data/candidateJourneys';
import { INITIAL_PROFILE, INITIAL_GOALS } from '../data/mockData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sheets' | 'drive' | 'csv'>('sheets');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generate clean CSV representation of the decision matrix
  const generateCSV = () => {
    const headers = [
      'Candidate',
      'Destination',
      'Optimal Window',
      'Cost Band',
      'Goal Impact (w=0.35)',
      'Urgency (w=0.20)',
      'Timing (w=0.15)',
      'Preference (w=0.15)',
      'Budget (w=0.15)',
      'Penalty',
      'Composite MCDA Score',
      'Pareto Tier',
    ];

    const rows = [
      [
        JAPAN_JOURNEY.title,
        JAPAN_JOURNEY.destination,
        JAPAN_JOURNEY.window,
        `$${JAPAN_JOURNEY.estimatedCostMin}-$${JAPAN_JOURNEY.estimatedCostMax}`,
        JAPAN_JOURNEY.factors.goalImpact.score,
        JAPAN_JOURNEY.factors.urgencyFit.score,
        JAPAN_JOURNEY.factors.timingFit.score,
        JAPAN_JOURNEY.factors.preferenceFit.score,
        JAPAN_JOURNEY.factors.budgetFit.score,
        JAPAN_JOURNEY.factors.tradeoffPenalty.deduction,
        JAPAN_JOURNEY.mcdaScore,
        'Frontier Dominant',
      ],
      ...SURVIVING_ALTERNATIVES.map((alt) => [
        alt.title,
        alt.destination,
        alt.window,
        `$${alt.estimatedCostMin}-$${alt.estimatedCostMax}`,
        alt.factors.goalImpact.score,
        alt.factors.urgencyFit.score,
        alt.factors.timingFit.score,
        alt.factors.preferenceFit.score,
        alt.factors.budgetFit.score,
        alt.factors.tradeoffPenalty.deduction,
        alt.mcdaScore,
        'Pareto Frontier Candidate',
      ]),
    ];

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  };

  const handleCopyCSV = () => {
    const csv = generateCSV();
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GoGamya_MCDA_Run14_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoogleSheetsExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess('Created "GoGamya_MCDA_Matrix_Run14" spreadsheet with formulas and charts ready.');
    }, 1200);
  };

  const handleGoogleDriveSave = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess('Saved travel portfolio snapshot and audit trail to Google Drive /GoGamya/Run14/.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#fdf8f5] rounded-xl shadow-2xl border border-[#dcc1b9] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#f8f3ef] border-b border-[#e6e2de] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#893417] text-[22px]">
              ios_share
            </span>
            <div>
              <h3 className="font-serif-headline text-[18px] font-semibold text-[#1c1b19]">
                Export Decision Portfolio
              </h3>
              <p className="font-sans-body text-[12px] text-[#56423d]">
                Run #14 • Supriya Rajeev Family Milestone • Deterministic MCDA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#56423d] hover:bg-[#ece7e3] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Export Tabs */}
        <div className="flex border-b border-[#e6e2de] bg-[#f2ede9] px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-4 py-2.5 rounded-t-lg font-sans-body text-[13px] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'sheets'
                ? 'bg-[#fdf8f5] text-[#893417] border-[#893417]'
                : 'text-[#56423d] border-transparent hover:text-[#1c1b19]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#4a6455]">
              table_chart
            </span>
            Google Sheets
          </button>
          <button
            onClick={() => setActiveTab('drive')}
            className={`px-4 py-2.5 rounded-t-lg font-sans-body text-[13px] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'drive'
                ? 'bg-[#fdf8f5] text-[#893417] border-[#893417]'
                : 'text-[#56423d] border-transparent hover:text-[#1c1b19]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#826300]">
              add_to_drive
            </span>
            Google Drive
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-4 py-2.5 rounded-t-lg font-sans-body text-[13px] font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'csv'
                ? 'bg-[#fdf8f5] text-[#893417] border-[#893417]'
                : 'text-[#56423d] border-transparent hover:text-[#1c1b19]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#893417]">
              download
            </span>
            CSV & JSON
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {exportSuccess && (
            <div className="p-3 bg-[#ccead6] text-[#334c3e] rounded-lg text-[13px] font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{exportSuccess}</span>
            </div>
          )}

          {activeTab === 'sheets' && (
            <div className="space-y-4">
              <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e6e2de] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-sans-body text-[15px] font-semibold text-[#1c1b19]">
                      Export to Google Sheets
                    </h4>
                    <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                      Exports multi-criteria weight vectors, factor matrices, and Pareto frontier coordinates with dynamic spreadsheet formulas.
                    </p>
                  </div>
                  <span className="bg-[#ccead6] text-[#334c3e] font-mono-data text-[10px] px-2 py-0.5 rounded font-bold">
                    MCDA v0.1
                  </span>
                </div>

                <div className="bg-[#f8f3ef] p-3 rounded-lg font-mono-data text-[11px] text-[#1c1b19] space-y-1 overflow-x-auto">
                  <div className="text-[#893417] font-semibold">Sheets Formula Preview:</div>
                  <div className="text-[#56423d]">
                    =SUMPRODUCT(Factors!B2:G2, Weights!B2:G2) - Penalty!B2
                  </div>
                  <div className="text-[#4a6455]">
                    Japan (Tokyo & Kyoto) = 0.35(0.56) + 0.20(0.50) + 0.15(0.80) + 0.15(0.90) + 0.15(0.32) - 0.02 = 0.58
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={handleGoogleSheetsExport}
                    disabled={isExporting}
                    className="flex-1 bg-[#4a6455] hover:bg-[#334c3e] text-white px-4 py-2.5 rounded-lg font-sans-body text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    <span>{isExporting ? 'Syncing to Sheets...' : 'Create Google Sheet'}</span>
                  </button>
                  <button
                    onClick={handleCopyCSV}
                    className="bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1c1b19] px-4 py-2.5 rounded-lg font-sans-body text-[13px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>{copied ? 'Copied Tabular Data!' : 'Copy Data'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drive' && (
            <div className="space-y-4">
              <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e6e2de] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-sans-body text-[15px] font-semibold text-[#1c1b19]">
                      Save to Google Drive
                    </h4>
                    <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                      Archives the complete profile state (v1.4), 5 prioritized goals, and decision trace into your Google Drive travel folder.
                    </p>
                  </div>
                  <span className="bg-[#ffdf98] text-[#644c00] font-mono-data text-[10px] px-2 py-0.5 rounded font-bold">
                    Immutable Backup
                  </span>
                </div>

                <div className="p-3 bg-[#f8f3ef] rounded-lg text-[12px] space-y-1.5 text-[#56423d]">
                  <div className="flex items-center gap-2 text-[#1c1b19] font-medium">
                    <span className="material-symbols-outlined text-[16px] text-[#826300]">folder</span>
                    <span>Drive Path: /GoGamya Decisions/Run_14_Family_Milestone.json</span>
                  </div>
                  <div className="text-[11px] font-mono-data text-[#89726b]">
                    Includes: Goal graph weights, 4 surviving Pareto trajectories, AST filter predicates.
                  </div>
                </div>

                <button
                  onClick={handleGoogleDriveSave}
                  disabled={isExporting}
                  className="w-full bg-[#826300] hover:bg-[#644c00] text-white px-4 py-2.5 rounded-lg font-sans-body text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>{isExporting ? 'Saving to Drive...' : 'Save to Google Drive'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e6e2de] space-y-3">
                <div>
                  <h4 className="font-sans-body text-[15px] font-semibold text-[#1c1b19]">
                    Raw Data Downloads
                  </h4>
                  <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                    Download standard CSV for Excel or numbers, or export full JSON state.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={handleDownloadCSV}
                    className="flex-1 bg-[#893417] hover:bg-[#a84b2c] text-white px-4 py-2.5 rounded-lg font-sans-body text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                    <span>Download Matrix CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
                        profile: INITIAL_PROFILE,
                        goals: INITIAL_GOALS,
                        recommendation: JAPAN_JOURNEY,
                        alternatives: SURVIVING_ALTERNATIVES
                      }, null, 2));
                      const dlAnchor = document.createElement('a');
                      dlAnchor.setAttribute("href", dataStr);
                      dlAnchor.setAttribute("download", "GoGamya_Profile_Run14.json");
                      document.body.appendChild(dlAnchor);
                      dlAnchor.click();
                      dlAnchor.remove();
                    }}
                    className="flex-1 bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1c1b19] px-4 py-2.5 rounded-lg font-sans-body text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">data_object</span>
                    <span>Download JSON Spec</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#f8f3ef] border-t border-[#e6e2de] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#e6e2de] hover:bg-[#ded9d5] text-[#1c1b19] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
