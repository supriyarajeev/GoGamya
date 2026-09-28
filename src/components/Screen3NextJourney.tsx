import React, { useState } from 'react';
import { ScreenId } from '../types/decision';
import { JAPAN_JOURNEY, SURVIVING_ALTERNATIVES } from '../data/candidateJourneys';
import { REJECTED_CANDIDATES } from '../data/mockData';
import { apiGenerateRationale } from '../services/clientApi';

interface Screen3Props {
  onNavigate: (screen: ScreenId) => void;
  onSetWhatIfQuery: (q: string) => void;
  onSaveToHistory: () => void;
}

export const Screen3NextJourney: React.FC<Screen3Props> = ({
  onNavigate,
  onSetWhatIfQuery,
  onSaveToHistory,
}) => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [showRejectionLog, setShowRejectionLog] = useState<boolean>(false);
  const [quickPrompt, setQuickPrompt] = useState<string>('');
  const [aiRationale, setAiRationale] = useState<string>(
    `Your #1 highest-priority goal (Japan Cherry Blossoms, Priority 5) faces an urgent family deadline: only 3 spring windows remain before your eldest child matriculates to college. Late March is one of your two available travel windows. This 9-day journey simultaneously advances Cherry Blossoms (100% completion) and advances your 50-Countries collection from 32 to 33/50, while fully satisfying your $14,000 budget, 20 PTO days, and teen-appropriate moderate pace.`
  );
  const [isRegeneratingAi, setIsRegeneratingAi] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleLockJourney = () => {
    setIsLocked(true);
    onSaveToHistory();
  };

  const handleRegenerateRationale = async () => {
    setIsRegeneratingAi(true);
    try {
      const res = await apiGenerateRationale(JAPAN_JOURNEY, []);
      setAiRationale(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegeneratingAi(false);
    }
  };

  const handleWhatIfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = quickPrompt || 'What if I can only travel in December?';
    onSetWhatIfQuery(query);
    onNavigate('what-if-replanning');
  };

  const setPromptValue = (val: string) => {
    setQuickPrompt(val);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Top Recommendation Header & Primary Showcase Hero */}
        <section className="flex flex-col bg-[#ffffff] rounded-xl shadow-xs border border-[#e6e2de] overflow-hidden">
          {/* Engine Status Ribbon */}
          <div className="bg-[#ccead6]/60 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#b1cdbb]/60">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#4a6455] text-white text-xs">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
              </span>
              <span className="font-mono-data text-[11px] text-[#334c3e] font-bold tracking-wide uppercase">
                Decision Engine Primary Recommendation
              </span>
              <span className="hidden md:inline text-[#4a6455] font-mono-data text-[11px]">•</span>
              <span className="font-mono-data text-[11px] text-[#4a6455] font-semibold">
                Clear Lead (+0.22 score delta over Alternative 1: Norway)
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#f8f3ef] px-2.5 py-0.5 rounded border border-[#e6e2de]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#893417] animate-pulse"></span>
              <span className="font-mono-data text-[10px] text-[#56423d] font-semibold">
                Deterministic MCDA v0.1 • 10/10 Reproducible
              </span>
            </div>
          </div>

          {/* Core Journey Presentation Grid */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editorial Narrative & Main Title (Cols 1-8) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-1.5 text-[#56423d] font-mono-data text-[11px]">
                <span>RUN ID: #14-2027</span>
                <span>/</span>
                <span className="text-[#893417] font-bold">RECOMMENDATION #1</span>
                <span>/</span>
                <span>RANK 1 OF 6 EVALUATED</span>
              </div>

              <h1 className="font-serif-headline text-[32px] sm:text-[40px] text-[#1c1b19] font-bold tracking-tight leading-tight">
                {JAPAN_JOURNEY.title}
              </h1>

              {/* Crisp Trip Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-data text-[12px]">
                <div className="inline-flex items-center gap-1.5 bg-[#ece7e3] px-3 py-1 rounded text-[#1c1b19] border border-[#dcc1b9]">
                  <span className="material-symbols-outlined text-[16px] text-[#893417]">calendar_today</span>
                  <span className="font-bold">{JAPAN_JOURNEY.window}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#ece7e3] px-3 py-1 rounded text-[#1c1b19] border border-[#dcc1b9]">
                  <span className="material-symbols-outlined text-[16px] text-[#4a6455]">group</span>
                  <span>4 Travelers (2 Adults, 2 Teens: 12 & 15)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#ece7e3] px-3 py-1 rounded text-[#1c1b19] border border-[#dcc1b9]">
                  <span className="material-symbols-outlined text-[16px] text-[#56423d]">flight_takeoff</span>
                  <span>Departing SFO</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#ccead6]/50 text-[#062014] px-3 py-1 rounded border border-[#b1cdbb]">
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                  <span className="font-bold">Est. $8,500 – $10,500</span>
                  <span className="text-[#334c3e]">($14K Cap)</span>
                </div>
              </div>

              {/* Editorial Visual Collage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {JAPAN_JOURNEY.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhoto(img.url)}
                    className="relative rounded-lg overflow-hidden h-44 shadow-xs group cursor-pointer border border-[#e6e2de]"
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={img.url}
                      alt={img.alt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-white font-mono-data text-[11px] font-semibold">
                        {img.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytical Score Pod & Deterministic Actions (Cols 9-12) */}
            <div className="lg:col-span-4 flex flex-col bg-[#f8f3ef] p-6 rounded-xl border border-[#e6e2de] gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-data text-[11px] uppercase tracking-wider text-[#56423d] font-bold">
                  Engine MCDA Score
                </span>
                <span className="px-2 py-0.5 rounded font-mono-data text-[10px] bg-[#ccead6] text-[#062014] font-bold tracking-tight">
                  TOP ADVANTAGE
                </span>
              </div>

              {/* Big Monospace Numerical Metric */}
              <div className="flex items-baseline gap-2">
                <span className="font-serif-headline text-[60px] leading-none text-[#893417] font-bold">
                  0.58
                </span>
                <span className="font-mono-data text-[15px] text-[#89726b] font-semibold">/ 1.00</span>
              </div>

              {/* Score Distribution Progress Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="w-full bg-[#e6e2de] h-3 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#893417] h-full rounded-full transition-all duration-700"
                    style={{ width: '58%' }}
                  ></div>
                </div>
                <div className="flex justify-between font-mono-data text-[10px] text-[#56423d]">
                  <span>Threshold: 0.30</span>
                  <span className="text-[#893417] font-bold">Runner-up: 0.36</span>
                  <span>Max: 1.00</span>
                </div>
              </div>

              <div className="bg-[#ffffff] p-3 rounded-lg flex flex-col gap-1.5 shadow-xs border border-[#e6e2de] font-mono-data text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#1c1b19] font-medium">Pareto Optimality Tier</span>
                  <span className="text-[#4a6455] font-bold">Frontier Dominant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#1c1b19] font-medium">Deterministic Margin</span>
                  <span className="text-[#893417] font-bold">+61.1% vs Alts</span>
                </div>
              </div>

              {/* Primary Actions Stack */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleLockJourney}
                  className={`w-full h-11 text-white font-sans-body text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                    isLocked ? 'bg-[#4a6455]' : 'bg-[#a84b2c] hover:bg-[#893417]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isLocked ? 'check_circle' : 'verified'}
                  </span>
                  <span>{isLocked ? 'Journey Locked & Committed' : 'Accept & Lock Journey'}</span>
                </button>

                <button
                  onClick={() => onNavigate('what-if-replanning')}
                  className="w-full h-11 bg-[#ffffff] hover:bg-[#f2ede9] text-[#4a6455] border border-[#dcc1b9] font-sans-body text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Test What-If Scenarios</span>
                </button>

                <button
                  onClick={onSaveToHistory}
                  className="w-full h-9 bg-transparent hover:bg-[#ece7e3] text-[#56423d] font-mono-data text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark</span>
                  <span>Save Decision to History</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grounded "Why Now?" AI Explanation Card */}
        <section className="bg-[#f8f3ef] rounded-xl p-6 shadow-xs border border-[#e6e2de] flex flex-col md:flex-row gap-5 items-start relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#ccead6]/30 blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#a84b2c] text-white shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[26px]">insights</span>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono-data text-[10px] uppercase px-2 py-0.5 rounded bg-[#e6e2de] text-[#893417] font-bold tracking-wider">
                  Grounded AI Rationale (gemini-3.5-flash)
                </span>
                <span className="font-mono-data text-[11px] text-[#56423d]">
                  Traced directly to Goal Graph & Curated Catalog v0.1
                </span>
              </div>
              <button
                onClick={handleRegenerateRationale}
                disabled={isRegeneratingAi}
                className="font-mono-data text-[10px] text-[#893417] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[14px] ${isRegeneratingAi ? 'animate-spin' : ''}`}>
                  refresh
                </span>
                <span>{isRegeneratingAi ? 'Analyzing...' : 'Regenerate Analysis'}</span>
              </button>
            </div>

            <h2 className="font-serif-headline text-[22px] font-semibold text-[#1c1b19]">
              Why Now? Critical Urgency & Family Window Convergence
            </h2>

            <p className="font-sans-body text-[15px] text-[#1c1b19] leading-relaxed max-w-4xl">
              {aiRationale}
            </p>

            {/* Timing Risk Callout Box */}
            <div className="mt-1 bg-[#ffffff] p-3.5 rounded-lg flex items-start gap-2.5 shadow-xs border border-[#e6e2de]">
              <span className="material-symbols-outlined text-[#826300] text-[20px] shrink-0 mt-0.5">
                warning_amber
              </span>
              <div className="flex flex-col">
                <span className="font-sans-body text-[13px] text-[#644c00] font-bold">
                  Catalog Timing Sensitivity Assessment
                </span>
                <p className="font-sans-body text-[12px] text-[#56423d] leading-normal mt-0.5">
                  Bloom peak dates vary ~7 days year-to-year based on regional temperature forecasts. Timing fit is scored at <strong className="font-mono-data text-[#1c1b19]">0.80</strong> as late March reliably captures opening bloom to early full bloom across the Tokyo–Kyoto high-speed Shinkansen corridor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factor Breakdown Matrix (6 Factors PRD Section 21.4) */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="font-mono-data text-[11px] text-[#893417] uppercase font-bold tracking-wider">
                Multi-Criteria Decision Breakdown
              </span>
              <h2 className="font-serif-headline text-[24px] font-semibold text-[#1c1b19]">
                Factor Breakdown & Weighted Contributions
              </h2>
            </div>
            <div className="font-mono-data text-[11px] text-[#56423d] bg-[#ece7e3] px-3 py-1 rounded border border-[#dcc1b9]">
              Factor Bands: <span className="text-[#4a6455] font-bold">HIGH ≥ 0.67</span> • <span className="text-[#644c00] font-bold">MED 0.34–0.66</span> • <span className="text-[#893417] font-bold">LOW ≤ 0.33</span>
            </div>
          </div>

          {/* 6-Factor Interactive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Factor 1: Goal Impact */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d]">w: 0.35</span>
                  <span className="bg-[#ffdf98] text-[#251a00] px-1.5 py-0.5 rounded font-mono-data text-[10px] font-bold">MED</span>
                </div>
                <span className="font-sans-body text-[14px] font-bold text-[#1c1b19] mt-0.5">Goal Impact</span>
                <span className="font-sans-body text-[11px] text-[#56423d] leading-snug">Cherry Blossoms (5x1.0) + Country count (3x0.2)</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-mono-data">
                <div className="flex justify-between items-baseline text-[11px]">
                  <span className="text-[#56423d]">Raw: 5.6/10</span>
                  <span className="text-[#1c1b19] font-bold text-[13px]">0.56</span>
                </div>
                <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '56%' }}></div>
                </div>
                <span className="text-[10px] text-[#89726b] text-right">Weighted: +0.196</span>
              </div>
            </div>

            {/* Factor 2: Urgency */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d]">w: 0.20</span>
                  <span className="bg-[#ffdf98] text-[#251a00] px-1.5 py-0.5 rounded font-mono-data text-[10px] font-bold">MED</span>
                </div>
                <span className="font-sans-body text-[14px] font-bold text-[#1c1b19] mt-0.5">Urgency Fit</span>
                <span className="font-sans-body text-[11px] text-[#56423d] leading-snug">1 - (2.5 yrs to college / 5 yrs span)</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-mono-data">
                <div className="flex justify-between items-baseline text-[11px]">
                  <span className="text-[#56423d]">Score</span>
                  <span className="text-[#1c1b19] font-bold text-[13px]">0.50</span>
                </div>
                <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '50%' }}></div>
                </div>
                <span className="text-[10px] text-[#89726b] text-right">Weighted: +0.100</span>
              </div>
            </div>

            {/* Factor 3: Timing Fit */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d]">w: 0.15</span>
                  <span className="bg-[#ccead6] text-[#062014] px-1.5 py-0.5 rounded font-mono-data text-[10px] font-bold">HIGH</span>
                </div>
                <span className="font-sans-body text-[14px] font-bold text-[#1c1b19] mt-0.5">Timing Fit</span>
                <span className="font-sans-body text-[11px] text-[#56423d] leading-snug">March window captures Tokyo & Kyoto opening</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-mono-data">
                <div className="flex justify-between items-baseline text-[11px]">
                  <span className="text-[#56423d]">Phenology</span>
                  <span className="text-[#4a6455] font-bold text-[13px]">0.80</span>
                </div>
                <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
                <span className="text-[10px] text-[#89726b] text-right">Weighted: +0.120</span>
              </div>
            </div>

            {/* Factor 4: Preference Fit */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d]">w: 0.15</span>
                  <span className="bg-[#ccead6] text-[#062014] px-1.5 py-0.5 rounded font-mono-data text-[10px] font-bold">HIGH</span>
                </div>
                <span className="font-sans-body text-[14px] font-bold text-[#1c1b19] mt-0.5">Preference Fit</span>
                <span className="font-sans-body text-[11px] text-[#56423d] leading-snug">Pace: Moderate. Family age fit: 12 & 15 suitable</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-mono-data">
                <div className="flex justify-between items-baseline text-[11px]">
                  <span className="text-[#56423d]">Teen index</span>
                  <span className="text-[#4a6455] font-bold text-[13px]">0.90</span>
                </div>
                <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-[10px] text-[#89726b] text-right">Weighted: +0.135</span>
              </div>
            </div>

            {/* Factor 5: Budget Fit */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d]">w: 0.15</span>
                  <span className="bg-[#ffdad6] text-[#93000a] px-1.5 py-0.5 rounded font-mono-data text-[10px] font-bold">LOW</span>
                </div>
                <span className="font-sans-body text-[14px] font-bold text-[#1c1b19] mt-0.5">Budget Fit</span>
                <span className="font-sans-body text-[11px] text-[#56423d] leading-snug">($14K - $9.5K) / $14K leaves $4.5K reserve</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-mono-data">
                <div className="flex justify-between items-baseline text-[11px]">
                  <span className="text-[#56423d]">Absorb ratio</span>
                  <span className="text-[#893417] font-bold text-[13px]">0.32</span>
                </div>
                <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#893417] h-full rounded-full" style={{ width: '32%' }}></div>
                </div>
                <span className="text-[10px] text-[#89726b] text-right">Weighted: +0.048</span>
              </div>
            </div>

            {/* Factor 6: Tradeoff Penalty */}
            <div className="bg-[#ffffff] p-4 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d]">penalty</span>
                  <span className="bg-[#f2ede9] text-[#1c1b19] px-1.5 py-0.5 rounded font-mono-data text-[10px] font-bold">IMPACT</span>
                </div>
                <span className="font-sans-body text-[14px] font-bold text-[#1c1b19] mt-0.5">Tradeoff Penalty</span>
                <span className="font-sans-body text-[11px] text-[#56423d] leading-snug">Leaves $4.5K reserve; no critical deadline missed</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-mono-data">
                <div className="flex justify-between items-baseline text-[11px]">
                  <span className="text-[#56423d]">Deduction</span>
                  <span className="text-[#893417] font-bold text-[13px]">-0.02</span>
                </div>
                <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-[10px] text-[#89726b] text-right">Penalty: -0.020</span>
              </div>
            </div>
          </div>

          {/* Deterministic Score Formula Mathematical Verification Banner */}
          <div className="bg-[#ece7e3] px-4 py-2.5 rounded-lg flex flex-wrap items-center justify-between gap-2 border border-[#dcc1b9]">
            <div className="flex items-center gap-2 font-mono-data text-[11px] overflow-x-auto py-0.5">
              <span className="text-[#893417] font-bold uppercase tracking-wider">MCDA Mathematical Trace:</span>
              <span className="text-[#56423d]">0.35(0.56) + 0.20(0.50) + 0.15(0.80) + 0.15(0.90) + 0.15(0.32) - 0.02</span>
              <span className="font-bold text-[#1c1b19]">= 0.196 + 0.100 + 0.120 + 0.135 + 0.048 - 0.020</span>
              <span className="text-[#893417] font-bold bg-white px-2 py-0.5 rounded border border-[#dcc1b9]">= 0.58</span>
            </div>
            <div className="font-mono-data text-[11px] text-[#4a6455] font-semibold shrink-0">
              Formula Verified • Curated Model Standard
            </div>
          </div>
        </section>

        {/* Two-Column Goal & Constraint Impact Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Goals Advanced */}
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4a6455]"></span>
                <h3 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                  Goals Advanced (2 Active Goals)
                </h3>
              </div>
              <span className="font-mono-data text-[11px] text-[#4a6455] font-bold">
                100% Core Milestone Target
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#f8f3ef] p-4 rounded-lg flex flex-col gap-1 border border-[#e6e2de]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 font-mono-data text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-[#893417] text-white font-bold">Priority 5</span>
                      <span className="text-[#56423d]">Signature / Nature</span>
                    </div>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Japan Cherry Blossoms in Full Bloom
                    </h4>
                  </div>
                  <span className="bg-[#ccead6] text-[#062014] font-mono-data text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider shrink-0">
                    100% Complete
                  </span>
                </div>
                <p className="font-sans-body text-[12px] text-[#56423d] leading-relaxed">
                  Fully satisfies your primary signature bucket-list dream. Captures spring break window before college graduation timelines compress family schedule.
                </p>
              </div>

              <div className="bg-[#f8f3ef] p-4 rounded-lg flex flex-col gap-1 border border-[#e6e2de]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 font-mono-data text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-[#e6e2de] text-[#1c1b19] font-bold">Priority 3</span>
                      <span className="text-[#56423d]">Lifetime Collection</span>
                    </div>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Visit 50 Countries Before 50
                    </h4>
                  </div>
                  <span className="bg-[#ffffff] text-[#1c1b19] font-mono-data text-[11px] px-2 py-1 rounded font-bold shrink-0 border border-[#e6e2de]">
                    32 → 33 / 50 (+1)
                  </span>
                </div>
                <p className="font-sans-body text-[12px] text-[#56423d] leading-relaxed">
                  Adds Japan to your official count. Retains pacing needed to maintain current 1.8 countries/year target trajectory.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-2 bg-[#f2ede9] p-3 rounded-lg flex items-center justify-between font-mono-data text-[11px] text-[#1c1b19]">
              <span className="text-[#56423d]">Post-Trip Capacity:</span>
              <span>11 PTO Days Remaining</span>
              <span>•</span>
              <span className="text-[#893417] font-bold">$4,500 Capital Buffer</span>
            </div>
          </div>

          {/* Right Column: Goals Deferred & Tradeoffs */}
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#893417]"></span>
                <h3 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                  Goals Deferred & Tradeoffs
                </h3>
              </div>
              <span className="font-mono-data text-[11px] text-[#893417] font-bold">
                Deterministic Postponement
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#f8f3ef] p-4 rounded-lg flex flex-col gap-1 border border-[#e6e2de]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 font-mono-data text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-[#e6e2de] text-[#1c1b19] font-bold">Priority 4</span>
                      <span className="text-[#56423d]">Winter Aurora</span>
                    </div>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Northern Lights in Norway
                    </h4>
                  </div>
                  <span className="bg-[#ece7e3] text-[#56423d] font-mono-data text-[10px] px-2 py-1 rounded font-semibold shrink-0">
                    Shift to Dec 2027
                  </span>
                </div>
                <p className="font-sans-body text-[12px] text-[#56423d] leading-relaxed">
                  Taking Japan uses $9.5K midpoint, leaving $4.5K in annual reserves. Norway requires $8K–$11K; executing Japan gracefully shifts Norway to next fiscal year window without deadline penalty.
                </p>
              </div>

              <div className="bg-[#f8f3ef] p-3 rounded-lg flex flex-col gap-0.5 border border-[#e6e2de]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono-data text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-[#e6e2de] text-[#1c1b19] font-bold">Priority 4</span>
                    <span className="font-sans-body text-[13px] font-bold text-[#1c1b19]">Antarctica Cruise</span>
                  </div>
                  <span className="text-[#ba1a1a] font-mono-data text-[10px] font-bold">Exceeds Budget ($45K–$60K)</span>
                </div>
                <p className="font-sans-body text-[11px] text-[#56423d]">
                  Far beyond $14K annual travel boundary. Requires multi-year dedicated sinking fund.
                </p>
              </div>

              <div className="bg-[#f8f3ef] p-3 rounded-lg flex flex-col gap-0.5 border border-[#e6e2de]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono-data text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-[#e6e2de] text-[#1c1b19] font-bold">Priority 3</span>
                    <span className="font-sans-body text-[13px] font-bold text-[#1c1b19]">Tanzania Serengeti Safari</span>
                  </div>
                  <span className="text-[#ba1a1a] font-mono-data text-[10px] font-bold">Exceeds Budget ($18K–$26K)</span>
                </div>
                <p className="font-sans-body text-[11px] text-[#56423d]">
                  Peak migration window cost violates hard ceiling by $4,000+ for 4 travelers.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-2 bg-[#f2ede9] p-3 rounded-lg flex items-center justify-between font-mono-data text-[11px] text-[#1c1b19]">
              <span className="text-[#56423d]">Tradeoff Soundness:</span>
              <span className="text-[#4a6455] font-bold">Zero Irreversible Losses</span>
              <span>•</span>
              <span className="font-semibold">3 College-eligible Windows Left</span>
            </div>
          </div>
        </section>

        {/* Pareto View & Viable Alternatives */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="font-mono-data text-[11px] text-[#4a6455] uppercase font-bold tracking-wider">
                Pareto Frontier Analysis
              </span>
              <h2 className="font-serif-headline text-[24px] font-semibold text-[#1c1b19]">
                Top Surviving Alternative Candidates
              </h2>
            </div>
            <p className="font-sans-body text-[13px] text-[#56423d] max-w-md">
              These alternatives passed all hard constraints. The table below illustrates their individual dimension advantages versus Japan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SURVIVING_ALTERNATIVES.map((alt, idx) => (
              <div
                key={alt.id}
                className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#e6e2de] flex flex-col justify-between gap-4 hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-[10px] px-2 py-0.5 rounded bg-[#f2ede9] text-[#1c1b19] font-bold">
                      ALT RANK {idx + 1}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif-headline text-[20px] text-[#893417] font-bold">
                        {alt.mcdaScore.toFixed(2)}
                      </span>
                      <span className="font-mono-data text-[11px] text-[#89726b]">/ 1.00</span>
                    </div>
                  </div>

                  <div className="relative h-32 rounded-lg overflow-hidden border border-[#e6e2de]">
                    <img
                      className="w-full h-full object-cover"
                      src={alt.images[0].url}
                      alt={alt.images[0].alt}
                    />
                    <div className="absolute bottom-2 left-2 bg-[#ffffff]/90 backdrop-blur-xs px-2 py-0.5 rounded font-mono-data text-[10px] font-bold text-[#1c1b19]">
                      {alt.destination}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans-body text-[15px] font-bold text-[#1c1b19]">
                      {alt.title}
                    </h3>
                    <p className="font-mono-data text-[11px] text-[#56423d] mt-0.5">
                      {alt.window} • Est. ${alt.midpointCost.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-[#ccead6]/40 p-2 rounded text-[#062014] font-mono-data text-[10px] flex items-center gap-1.5 border border-[#b1cdbb]/60">
                    <span className="material-symbols-outlined text-[15px] text-[#4a6455]">trending_up</span>
                    <span><strong>Wins on:</strong> {alt.paretoAdvantage}</span>
                  </div>

                  <p className="font-sans-body text-[12px] text-[#56423d] leading-relaxed">
                    <strong>Tradeoff:</strong> {alt.tradeoffSummary}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('what-if-replanning')}
                  className="w-full py-2 px-3 bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1c1b19] font-mono-data text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#dcc1b9]"
                  type="button"
                >
                  <span>Inspect Differential Matrix</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Expandable Audit Log: Hard Constraint Rejections */}
        <section className="bg-[#f8f3ef] rounded-xl p-6 shadow-xs border border-[#e6e2de] flex flex-col gap-3">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setShowRejectionLog(!showRejectionLog)}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#ffffff] text-[#1c1b19] border border-[#e6e2de]">
                <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
              </span>
              <div>
                <h3 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                  Engine Audit Log: Hard Constraint Rejection Log
                </h3>
                <span className="font-mono-data text-[11px] text-[#56423d]">
                  3 Candidates Pruned at Stage 1 & Stage 2 Screening
                </span>
              </div>
            </div>
            <button
              className="flex items-center gap-1 font-mono-data text-[11px] text-[#893417] font-bold cursor-pointer"
              type="button"
            >
              <span>{showRejectionLog ? 'Hide Pruned Candidates' : 'View Pruned Candidates'}</span>
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${showRejectionLog ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
          </div>

          {/* Collapsible log items */}
          {showRejectionLog && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[#e6e2de]">
              {REJECTED_CANDIDATES.map((cand, idx) => (
                <div
                  key={idx}
                  className="bg-[#ffffff] p-3.5 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-2 shadow-xs border border-[#e6e2de]"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans-body text-[14px] text-[#1c1b19] font-bold">{cand.title}</span>
                      <span className="font-mono-data text-[9px] bg-[#ffdad6] text-[#ba1a1a] px-1.5 py-0.5 rounded font-bold">
                        {cand.stage}
                      </span>
                    </div>
                    <p className="font-sans-body text-[12px] text-[#56423d]">
                      Cost band <span className="font-mono-data font-semibold text-[#1c1b19]">{cand.cost}</span>: {cand.reason}
                    </p>
                  </div>
                  <span className="font-mono-data text-[10px] text-[#56423d] bg-[#f2ede9] px-2 py-1 rounded shrink-0">
                    {cand.rule}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Interactive "Quick What-If" Launcher Bar (Bridge to Screen 4) */}
        <section className="bg-[#e6e2de] p-6 rounded-xl shadow-xs border border-[#dcc1b9] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1">
            <div>
              <span className="font-mono-data text-[11px] text-[#893417] uppercase font-bold tracking-wider">
                Screen 4 Simulation Bridge
              </span>
              <h3 className="font-serif-headline text-[20px] font-semibold text-[#1c1b19]">
                Explore Sensitivity & Counterfactual Scenarios
              </h3>
            </div>
            <div className="font-sans-body text-[12px] text-[#56423d]">
              Simulate parameter shifts without mutating your primary profile state.
            </div>
          </div>

          <form onSubmit={handleWhatIfSubmit} className="flex flex-col md:flex-row items-center gap-2 w-full">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89726b] text-[20px]">
                help_outline
              </span>
              <input
                className="w-full h-11 pl-10 pr-4 bg-[#ffffff] text-[#1c1b19] placeholder:text-[#89726b] font-sans-body text-[14px] rounded-lg border border-[#dcc1b9] shadow-inner focus:outline-none focus:border-[#893417]"
                placeholder="Ask a what-if question (e.g., 'What if I can only travel in December?', 'What if budget increases to $20K?')..."
                type="text"
                value={quickPrompt}
                onChange={(e) => setQuickPrompt(e.target.value)}
              />
            </div>
            <button
              className="w-full md:w-auto h-11 px-5 bg-[#893417] hover:bg-[#a84b2c] text-white font-sans-body text-[13px] font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm shrink-0 transition-colors cursor-pointer"
              type="submit"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Simulate Replanning</span>
            </button>
          </form>

          {/* Quick Preset Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="font-mono-data text-[10px] text-[#56423d] font-bold">Quick Prompts:</span>
            <button
              onClick={() => setPromptValue('What if our travel budget increases to $20,000?')}
              className="bg-white hover:bg-[#f8f3ef] text-[#1c1b19] px-2.5 py-1 rounded font-mono-data text-[10px] border border-[#dcc1b9] transition-colors cursor-pointer"
              type="button"
            >
              + Budget to $20K
            </button>
            <button
              onClick={() => setPromptValue('What if we can only travel during December holiday window?')}
              className="bg-white hover:bg-[#f8f3ef] text-[#1c1b19] px-2.5 py-1 rounded font-mono-data text-[10px] border border-[#dcc1b9] transition-colors cursor-pointer"
              type="button"
            >
              December Window Only
            </button>
            <button
              onClick={() => setPromptValue('What if we only take 6 PTO days instead of 9?')}
              className="bg-white hover:bg-[#f8f3ef] text-[#1c1b19] px-2.5 py-1 rounded font-mono-data text-[10px] border border-[#dcc1b9] transition-colors cursor-pointer"
              type="button"
            >
              Reduce PTO to 6 Days
            </button>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
        >
          <img
            src={selectedPhoto}
            alt="Enlarged preview"
            className="max-w-4xl max-h-[85vh] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
