import React from 'react';
import { ScreenId } from '../types/decision';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenExport: () => void;
  onRecompute: () => void;
  isRecomputing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenExport,
  onRecompute,
  isRecomputing,
}) => {
  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'travel-goals', label: '1. Travel Goals' },
    { id: 'travel-reality', label: '2. Travel Reality' },
    { id: 'next-journey', label: '3. Next Journey' },
    { id: 'what-if-replanning', label: '4. What-If Replanning' },
    { id: 'progress-history', label: '5. Progress & History' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f5]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Primary Bar */}
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer"
          onClick={() => onNavigate('travel-goals')}
        >
          <img
            alt="GoGamya Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Ubvs4rEsVrH2AI1MhmkhLbS5A0PoMMnxarLnrdCvqUNAJyDSgyFRa4WHhUu4B8DCa7OcAiERwvFg8UNqfjjVAclUQ0QpSiqCWwxFCQHmOj5KWqXugAgJ1U8HRgpwBWbARMJzIkC3G6mKJuPtdAr3bBPO_ZeZ_iPndpjc-sh5363HNj7bc2J7T5qxJ8GFhUNhT9QezzQZgopcgc1mdGOuHteBo5qnW_-d7t2Sh5zxoOSJTuvLRi7YeqVY6K"
          />
          <div className="flex flex-col">
            <span className="font-serif-headline text-[22px] font-semibold text-[#893417] leading-none tracking-tight">
              GoGamya
            </span>
            <span className="font-mono-data text-[10px] text-[#56423d] uppercase tracking-widest mt-0.5">
              MCDA Decision Engine
            </span>
          </div>
        </div>

        {/* 5-Step Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-[#f2ede9] rounded-lg">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-[13px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#893417] text-white font-semibold shadow-sm'
                    : 'text-[#56423d] hover:text-[#1c1b19] hover:bg-[#ece7e3]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden 2xl:flex items-center gap-1.5 bg-[#ccead6] px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#4a6455] shrink-0 animate-pulse"></span>
            <span className="font-mono-data text-[10px] text-[#334c3e] font-semibold">
              Engine v0.1 • Deterministic MCDA
            </span>
          </div>

          <div className="hidden lg:flex flex-col text-right">
            <span className="font-sans-body text-[14px] font-semibold text-[#1c1b19] leading-tight">
              Supriya Rajeev
            </span>
            <span className="font-mono-data text-[10px] text-[#56423d]">
              Family Milestone • 4 Travelers
            </span>
          </div>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1c1b19] px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors shadow-xs cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            <span>Export Summary</span>
          </button>

          <img
            alt="Supriya Rajeev profile"
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-[#893417]/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC53Aqq-iEvtuvvasTk_-E8Fb8DDqYDchSL_8THF5cIPCgnsrFk0_vNHmxgyXkJhZ8i5Q5ZfjBjA5frKXmPmgZWuwjA61kgy5tsTEaY6JWvRn1YP1EqbDU4PilvSWgthWfvwY9y-V200YShB1N6o6uE0RJFHgynr8-m2CsgB1EGa13lcHodbSMGUtPfqtZcvST0xYVp_JoAI6sS_wF52e2qwaVR7BwQw0mTA-eM6vrLa2komY6n8Jgp1A"
          />
        </div>
      </div>

      {/* Sub-Header Analytical Status Ribbon */}
      <div className="h-11 w-full px-4 sm:px-6 lg:px-8 bg-[#f8f3ef] border-t border-[#e6e2de]/60 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-mono-data text-[11px] uppercase text-[#893417] font-bold">
            Run #14
          </span>
          <span className="text-[#dcc1b9] font-mono-data text-[11px]">•</span>
          <span className="font-mono-data text-[11px] text-[#56423d] truncate">
            Profile State: v1.4 (SFO • $14K Budget • 20 PTO Days • March & Dec Windows)
          </span>
          <span className="text-[#dcc1b9] font-mono-data text-[11px] hidden sm:inline">•</span>
          <span className="font-mono-data text-[11px] text-[#4a6455] font-semibold hidden sm:inline">
            5 Active Goals
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRecompute}
            disabled={isRecomputing}
            className="inline-flex items-center gap-1 font-mono-data text-[11px] text-[#56423d] hover:text-[#893417] transition-colors cursor-pointer disabled:opacity-50"
            type="button"
          >
            <span className={`material-symbols-outlined text-[15px] ${isRecomputing ? 'animate-spin text-[#893417]' : ''}`}>
              restart_alt
            </span>
            <span>{isRecomputing ? 'Recomputing...' : 'Recompute Matrix'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
