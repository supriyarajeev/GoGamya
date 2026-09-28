import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f8f3ef] border-t border-[#e6e2de]/60 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#4a6455] text-[20px]">
            verified_user
          </span>
          <p className="font-sans-body text-[13px] text-[#56423d] max-w-3xl leading-relaxed">
            GoGamya is an independent decision layer. We sell no travel inventory, take zero affiliate commissions, and rank trips strictly through deterministic multi-criteria decision analysis (MCDA). Curated Catalog v0.1.
          </p>
        </div>
        <div className="shrink-0 font-mono-data text-[11px] text-[#89726b] uppercase tracking-wider">
          Deterministic Neutrality Verified
        </div>
      </div>
    </footer>
  );
};
