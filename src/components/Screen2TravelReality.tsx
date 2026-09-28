import React, { useState } from 'react';
import { ScreenId, ConstraintProfile } from '../types/decision';
import { INITIAL_PROFILE } from '../data/mockData';

interface Screen2Props {
  onNavigate: (screen: ScreenId) => void;
  profile: ConstraintProfile;
  onUpdateProfile: (newProfile: ConstraintProfile) => void;
}

export const Screen2TravelReality: React.FC<Screen2Props> = ({
  onNavigate,
  profile,
  onUpdateProfile,
}) => {
  const [budgetVal, setBudgetVal] = useState<number>(profile.annualBudget);
  const [pointsVal, setPointsVal] = useState<number>(profile.pointsReserve);
  const [activeWindows, setActiveWindows] = useState<string[]>(profile.activeWindows);
  const [showAstModal, setShowAstModal] = useState<boolean>(false);
  const [saveProfileToast, setSaveProfileToast] = useState<boolean>(false);

  const pointsSubsidy = Math.round(pointsVal * profile.pointsValuePerPoint);
  const primaryTripAlloc = Math.round(budgetVal * 0.72);
  const reserveTripAlloc = budgetVal - primaryTripAlloc;
  const netSubsidized = budgetVal + pointsSubsidy;

  const handleBudgetChange = (val: number) => {
    setBudgetVal(val);
    onUpdateProfile({
      ...profile,
      annualBudget: val,
      budgetCeiling: val,
    });
  };

  const handlePointsChange = (pts: number) => {
    setPointsVal(pts);
    onUpdateProfile({
      ...profile,
      pointsReserve: pts,
    });
  };

  const toggleWindow = (win: string) => {
    let next: string[];
    if (activeWindows.includes(win)) {
      if (activeWindows.length === 1) return; // Keep at least one
      next = activeWindows.filter((w) => w !== win);
    } else {
      next = [...activeWindows, win];
    }
    setActiveWindows(next);
    onUpdateProfile({
      ...profile,
      activeWindows: next,
    });
  };

  const handleSaveProfile = () => {
    setSaveProfileToast(true);
    setTimeout(() => setSaveProfileToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Alert */}
      {saveProfileToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#4a6455] text-white px-4 py-2.5 rounded-lg shadow-xl font-sans-body text-[13px] font-medium">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Profile state v1.4 parameters locked & saved!</span>
        </div>
      )}

      {/* Editorial Top Banner / Sovereign Status Bar */}
      <section className="w-full border-b border-[#e6e2de]/60 bg-[#f8f3ef] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col max-w-3xl space-y-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-mono-data text-[10px] uppercase tracking-widest text-[#893417] font-bold bg-[#ffdbd0] px-2 py-0.5 rounded">
                Stage 2 of 5
              </span>
              <span className="text-[#dcc1b9] font-mono-data">•</span>
              <span className="font-mono-data text-[10px] uppercase tracking-wider text-[#4a6455] font-bold">
                Inviolable Guardrails Active
              </span>
              <span className="text-[#dcc1b9] font-mono-data">•</span>
              <span className="font-mono-data text-[10px] text-[#56423d]">
                Appendix B Worked Example
              </span>
            </div>
            <h1 className="font-serif-headline text-[32px] sm:text-[40px] font-semibold text-[#1c1b19] leading-tight">
              Travel Reality & Constraint Envelope
            </h1>
            <p className="font-sans-body text-[14px] text-[#56423d] mt-1 leading-relaxed">
              Deterministic decision analysis demands inviolable boundaries. Hard constraints mathematically eliminate infeasible trajectories before multi-attribute scoring begins, safeguarding family capital, remaining PTO balances, and adolescent academic calendars against decision drift.
            </p>
          </div>

          {/* Live Engine Integrity Badges */}
          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0 font-mono-data text-[11px]">
            <div className="flex items-center gap-2 bg-[#ffffff] px-3 py-1.5 rounded-lg shadow-xs border border-[#e6e2de]">
              <span className="w-2 h-2 rounded-full bg-[#4a6455]"></span>
              <span className="text-[#1c1b19] font-semibold">Engine Run #14</span>
              <span className="text-[#dcc1b9]">•</span>
              <span className="text-[#56423d]">SFO Departure Hub</span>
            </div>
            <div className="flex items-center gap-2 bg-[#ffffff] px-3 py-1.5 rounded-lg shadow-xs border border-[#e6e2de]">
              <span className="material-symbols-outlined text-[16px] text-[#893417]">verified</span>
              <span className="text-[#1c1b19] font-semibold">4 Confirmed Hard Rules</span>
              <span className="text-[#dcc1b9]">•</span>
              <span className="text-[#4a6455] font-semibold">Zero-Tolerance Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Top Level Constraint Configuration Grid (4 Specialized Panels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Panel 1: Capital Ledger */}
          <div className="bg-[#ffffff] rounded-xl p-5 flex flex-col justify-between shadow-xs border border-[#e6e2de] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#893417]"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-data text-[11px] uppercase text-[#893417] tracking-wider font-semibold">
                  Panel 01 // Capital Ledger
                </span>
                <span className="material-symbols-outlined text-[#893417] text-[20px]">
                  account_balance_wallet
                </span>
              </div>
              <h2 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                12-Month Total Budget
              </h2>
              <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                Four-traveler all-inclusive ceiling across domestic & global excursions.
              </p>

              {/* Master Slider Counter */}
              <div className="mt-3 p-3 bg-[#f8f3ef] rounded-lg border border-[#e6e2de]">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d] uppercase font-semibold">
                    Enforced Ceiling
                  </span>
                  <span className="font-mono-data text-[22px] text-[#893417] font-bold tracking-tight leading-none">
                    ${budgetVal.toLocaleString()}
                  </span>
                </div>
                <input
                  className="w-full mt-2 h-1.5 bg-[#ece7e3] rounded-lg appearance-none cursor-pointer accent-[#893417]"
                  max="30000"
                  min="8000"
                  step="500"
                  type="range"
                  value={budgetVal}
                  onChange={(e) => handleBudgetChange(Number(e.target.value))}
                />
                <div className="flex justify-between font-mono-data text-[10px] text-[#56423d] mt-1">
                  <span>$8,000</span>
                  <span className="font-semibold text-[#893417]">$14,000 (Target)</span>
                  <span>$30,000</span>
                </div>
              </div>

              {/* Trip Allocation Breakdown */}
              <div className="mt-3 space-y-1 font-sans-body text-[12px]">
                <div className="flex justify-between items-center text-[#56423d] py-1 border-b border-[#f2ede9]">
                  <span>Major Milestone Journey:</span>
                  <span className="font-mono-data text-[#1c1b19] font-bold">
                    ${primaryTripAlloc.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#56423d] py-1 border-b border-[#f2ede9]">
                  <span>Secondary Trip Reserve:</span>
                  <span className="font-mono-data text-[#1c1b19] font-bold">
                    ${reserveTripAlloc.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Points & Loyalty Subsidy Ledger */}
              <div className="mt-3 p-2.5 bg-[#f2ede9] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#4a6455] text-[15px]">stars</span>
                    <span className="font-sans-body text-[12px] font-semibold text-[#1c1b19]">
                      Points Reserve
                    </span>
                  </div>
                  <span className="font-mono-data text-[11px] text-[#4a6455] font-bold">
                    +${pointsSubsidy.toLocaleString()} subsidy
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    className="w-full bg-white text-[#1c1b19] font-mono-data text-[11px] px-2 py-1 rounded border border-[#dcc1b9] text-right focus:outline-none"
                    step="5000"
                    type="number"
                    value={pointsVal}
                    onChange={(e) => handlePointsChange(Number(e.target.value))}
                  />
                  <span className="font-mono-data text-[10px] text-[#56423d] shrink-0">pts (Chase/UA)</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-mono-data text-[10px] text-[#56423d]">
                  <span>Subsidized Power:</span>
                  <span className="text-[#4a6455] font-bold">${netSubsidized.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Strict Boundary Tag */}
            <div className="mt-3 pt-2 border-t border-[#f2ede9]">
              <div className="bg-[#893417]/10 p-2 rounded-lg flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#893417] text-[16px] shrink-0 mt-0.5">
                  do_not_disturb_on
                </span>
                <p className="font-mono-data text-[#893417] text-[10px] leading-tight">
                  <strong>HARD PRUNE:</strong> Trajectories exceeding $14,000 total out-of-pocket are pruned at Stage 1 (e.g., Antarctica $52k, Safari $22k).
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2: Temporal Limits */}
          <div className="bg-[#ffffff] rounded-xl p-5 flex flex-col justify-between shadow-xs border border-[#e6e2de] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#4a6455]"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-data text-[11px] uppercase text-[#4a6455] tracking-wider font-semibold">
                  Panel 02 // Temporal Limits
                </span>
                <span className="material-symbols-outlined text-[#4a6455] text-[20px]">
                  calendar_month
                </span>
              </div>
              <h2 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                Annual PTO & Windows
              </h2>
              <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                Calendar boundaries synchronized with school term holidays.
              </p>

              {/* PTO Quota Card */}
              <div className="mt-3 p-3 bg-[#f8f3ef] rounded-lg border border-[#e6e2de]">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono-data text-[10px] text-[#56423d] uppercase font-semibold">
                    Available PTO Pool
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono-data text-[22px] text-[#4a6455] font-bold tracking-tight leading-none">
                      {profile.availablePTO}
                    </span>
                    <span className="font-mono-data text-[11px] text-[#56423d]">Days</span>
                  </div>
                </div>
                <div className="w-full bg-[#ece7e3] h-2 rounded-full overflow-hidden flex mt-2.5">
                  <div className="bg-[#4a6455] h-full" style={{ width: '50%' }}></div>
                  <div className="bg-[#b1cdbb] h-full" style={{ width: '25%' }}></div>
                  <div className="bg-[#dcc1b9]/40 h-full" style={{ width: '25%' }}></div>
                </div>
                <div className="flex justify-between font-mono-data text-[10px] text-[#56423d] mt-1.5">
                  <span className="text-[#4a6455] font-semibold">Major: 10d</span>
                  <span>Weekend: 5d</span>
                  <span>Buffer: 5d</span>
                </div>
              </div>

              {/* Discrete Seasonal Windows */}
              <div className="mt-3">
                <label className="font-mono-data text-[10px] uppercase tracking-wider text-[#56423d] block mb-1.5 font-bold">
                  Permitted Travel Windows
                </label>
                <div className="space-y-1.5 font-sans-body text-[12px]">
                  <div
                    onClick={() => toggleWindow('March')}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                      activeWindows.includes('March')
                        ? 'bg-[#ccead6] text-[#062014] font-semibold'
                        : 'bg-[#f2ede9] text-[#56423d]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#4a6455]">eco</span>
                      <span>March (Spring Break Recess)</span>
                    </div>
                    <span className="material-symbols-outlined text-[17px]">
                      {activeWindows.includes('March') ? 'check_circle' : 'add_circle'}
                    </span>
                  </div>

                  <div
                    onClick={() => toggleWindow('December')}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                      activeWindows.includes('December')
                        ? 'bg-[#ccead6] text-[#062014] font-semibold'
                        : 'bg-[#f2ede9] text-[#56423d]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#4a6455]">ac_unit</span>
                      <span>December (Winter Solstice)</span>
                    </div>
                    <span className="material-symbols-outlined text-[17px]">
                      {activeWindows.includes('December') ? 'check_circle' : 'add_circle'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#f2ede9]/60 text-[#89726b] cursor-not-allowed">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">block</span>
                      <span className="line-through">Jun–Aug (Sports & Camps)</span>
                    </div>
                    <span className="font-mono-data uppercase text-[9px]">Blackout</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#f2ede9]">
              <div className="bg-[#4a6455]/10 p-2 rounded-lg flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#4a6455] text-[16px] shrink-0 mt-0.5">
                  timer_off
                </span>
                <p className="font-mono-data text-[#4a6455] text-[10px] leading-tight">
                  <strong>HARD PRUNE:</strong> Trajectories exceeding 10 days or occurring outside active windows receive automatic exclusion.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 3: Party Composition & Hub */}
          <div className="bg-[#ffffff] rounded-xl p-5 flex flex-col justify-between shadow-xs border border-[#e6e2de] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#826300]"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-data text-[11px] uppercase text-[#826300] tracking-wider font-semibold">
                  Panel 03 // Party & Hub
                </span>
                <span className="material-symbols-outlined text-[#826300] text-[20px]">
                  group
                </span>
              </div>
              <h2 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                4 Travelers & Origin Hub
              </h2>
              <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                Multi-ticket scaling & legal age-gated feasibility checks.
              </p>

              {/* Composition */}
              <div className="mt-3 p-3 bg-[#f8f3ef] rounded-lg border border-[#e6e2de] space-y-2">
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#1c1b19]">person</span>
                    <span className="font-semibold text-[#1c1b19]">Adult Travelers</span>
                  </div>
                  <span className="font-mono-data text-[#1c1b19] bg-[#ffffff] px-2 py-0.5 rounded font-bold border border-[#e6e2de]">
                    2 Pax
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#e6e2de] pt-2 text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#1c1b19]">school</span>
                    <span className="font-semibold text-[#1c1b19]">Teen Travelers</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-mono-data text-[10px] text-[#893417] font-bold bg-[#ffdbd0] px-1.5 py-0.5 rounded">
                      Age 12
                    </span>
                    <span className="font-mono-data text-[10px] text-[#893417] font-bold bg-[#ffdbd0] px-1.5 py-0.5 rounded">
                      Age 15
                    </span>
                  </div>
                </div>
              </div>

              {/* Origin Hub */}
              <div className="mt-3">
                <label className="font-mono-data text-[10px] uppercase tracking-wider text-[#56423d] block mb-1.5 font-bold">
                  Origin Hub (Airfare Banding)
                </label>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f3ef] border border-[#dcc1b9]/60">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#893417] text-[18px]">flight_takeoff</span>
                    <div>
                      <div className="font-sans-body text-[12px] text-[#1c1b19] font-bold">SFO (San Francisco)</div>
                      <div className="font-mono-data text-[10px] text-[#56423d]">Standard Tier 1 Hub</div>
                    </div>
                  </div>
                  <span className="font-mono-data text-[10px] text-[#4a6455] bg-[#ccead6] px-2 py-0.5 rounded font-bold">
                    Locked
                  </span>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-3 p-2 bg-[#f2ede9] rounded-lg flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#56423d] text-[15px] shrink-0 mt-0.5">shield</span>
                <p className="font-mono-data text-[#56423d] text-[10px] leading-tight">
                  <strong>Privacy PRD E8:</strong> Zero names, birthdays, or PII stored. Youngest age (12) automatically disqualifies expeditions requiring age 15+ (e.g., Rwanda Gorilla trek).
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#f2ede9]">
              <div className="bg-[#826300]/10 p-2 rounded-lg flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#826300] text-[16px] shrink-0 mt-0.5">rule</span>
                <p className="font-mono-data text-[#826300] text-[10px] leading-tight">
                  <strong>CAPACITY 4X:</strong> Midpoint flight & accommodation budgets calculate simultaneously for 4 pax.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 4: Pace & Personal Clock */}
          <div className="bg-[#ffffff] rounded-xl p-5 flex flex-col justify-between shadow-xs border border-[#e6e2de] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#89726b]"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-data text-[11px] uppercase text-[#89726b] tracking-wider font-semibold">
                  Panel 04 // Horizon & Effort
                </span>
                <span className="material-symbols-outlined text-[#89726b] text-[20px]">
                  vital_signs
                </span>
              </div>
              <h2 className="font-sans-body text-[16px] font-bold text-[#1c1b19]">
                Pace & Personal Clock
              </h2>
              <p className="font-sans-body text-[12px] text-[#56423d] mt-0.5">
                Physical exertion tolerances and family milestone countdowns.
              </p>

              {/* Pace */}
              <div className="mt-3 p-3 bg-[#f8f3ef] rounded-lg border border-[#e6e2de] space-y-1.5 text-[12px]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#1c1b19]">Pace Preference</span>
                  <span className="font-mono-data text-[10px] bg-[#ccead6] text-[#062014] px-2 py-0.5 rounded font-bold">
                    Moderate
                  </span>
                </div>
                <p className="text-[#56423d] text-[11px] leading-tight">
                  Private intercity rail, light day hiking (max 8–10 km/day), zero unassisted mountaineering.
                </p>
                <div className="flex justify-between pt-1 border-t border-[#e6e2de] text-[11px]">
                  <span className="text-[#56423d]">Max Altitude:</span>
                  <span className="font-mono-data font-bold text-[#1c1b19]">&lt; 2,800m (No AMS)</span>
                </div>
              </div>

              {/* Personal Countdown Clock */}
              <div className="mt-3 p-3 bg-[#f2ede9] rounded-lg space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-sans-body text-[12px] font-bold text-[#1c1b19] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#893417] text-[16px]">hourglass_top</span>
                    Matriculation Clock
                  </span>
                  <span className="font-mono-data text-[10px] text-[#893417] font-bold">
                    2.5 Yrs Remaining
                  </span>
                </div>
                <div className="w-full bg-[#ece7e3] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#893417] h-full" style={{ width: '70%' }}></div>
                </div>
                <p className="font-mono-data text-[10px] text-[#56423d] leading-tight">
                  Only <strong className="text-[#1c1b19]">3 spring breaks</strong> and <strong className="text-[#1c1b19]">3 winter windows</strong> remain for intact 4-person family expeditions.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#f2ede9]">
              <div className="bg-[#f2ede9] p-2 rounded-lg flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#1c1b19] text-[16px] shrink-0 mt-0.5">health_and_safety</span>
                <p className="font-mono-data text-[#1c1b19] text-[10px] leading-tight">
                  <strong>MOBILITY STATUS:</strong> Full international confidence, no step-free assistance required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Verified Hard Rules Engine Guardrails (FR4 Confirmation Matrix) */}
        <section className="bg-[#ffffff] rounded-xl p-6 shadow-xs border border-[#e6e2de]">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#e6e2de] gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="material-symbols-outlined text-[#4a6455] text-[20px]">gavel</span>
                <h3 className="font-serif-headline text-[20px] font-semibold text-[#1c1b19]">
                  Engine Rule Enforcement (FR4 Specification)
                </h3>
              </div>
              <p className="font-sans-body text-[13px] text-[#56423d]">
                Deterministic translation of qualitative boundaries into immutable Boolean filter statements. These rules execute prior to candidate ranking.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-[11px] text-[#4a6455] bg-[#ccead6] px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">security</span>
                100% Deterministic Guardrails
              </span>
            </div>
          </div>

          {/* Rule Matrix Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans-body text-[13px]">
              <thead>
                <tr className="border-b border-[#e6e2de] font-mono-data text-[11px] text-[#56423d] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Rule Identifier</th>
                  <th className="py-2.5 px-3">Algorithmic Predicate (Python Engine AST)</th>
                  <th className="py-2.5 px-3">Pruned Edge-Cases (Catalog Samples)</th>
                  <th className="py-2.5 px-3">Confidence & Tolerance</th>
                  <th className="py-2.5 px-3 text-right">Gate Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2ede9]">
                <tr className="hover:bg-[#f8f3ef]/60">
                  <td className="py-3 px-3 font-mono-data text-[12px] font-bold text-[#1c1b19]">
                    RULE_CAPITAL_CEILING
                  </td>
                  <td className="py-3 px-3">
                    <code className="font-mono-data text-[11px] bg-[#f8f3ef] px-2 py-0.5 rounded text-[#893417] border border-[#e6e2de]">
                      candidate.est_cost_party_4p &lt;= {budgetVal}
                    </code>
                  </td>
                  <td className="py-3 px-3 text-[#56423d] text-[12px]">
                    Antarctica Classic ($52,400), Serengeti Luxury ($23,800), Galapagos Charter ($19,200)
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono-data text-[11px] text-[#893417] font-bold">
                      Zero-Tolerance (Strict Hard)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono-data text-[10px] bg-[#ccead6] text-[#062014] px-2 py-0.5 rounded font-bold">
                      <span className="material-symbols-outlined text-[13px]">check</span> Enforced
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f8f3ef]/60">
                  <td className="py-3 px-3 font-mono-data text-[12px] font-bold text-[#1c1b19]">
                    RULE_TEMPORAL_PTO
                  </td>
                  <td className="py-3 px-3">
                    <code className="font-mono-data text-[11px] bg-[#f8f3ef] px-2 py-0.5 rounded text-[#893417] border border-[#e6e2de]">
                      candidate.duration_days &lt;= 10 and candidate.pto_required &lt;= 20
                    </code>
                  </td>
                  <td className="py-3 px-3 text-[#56423d] text-[12px]">
                    Patagonia O-Trek (16 days), New Zealand Grand South (18 days), Silk Road (21 days)
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono-data text-[11px] text-[#893417] font-bold">
                      Calendar Inviolable
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono-data text-[10px] bg-[#ccead6] text-[#062014] px-2 py-0.5 rounded font-bold">
                      <span className="material-symbols-outlined text-[13px]">check</span> Enforced
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f8f3ef]/60">
                  <td className="py-3 px-3 font-mono-data text-[12px] font-bold text-[#1c1b19]">
                    RULE_SEASONAL_WINDOW
                  </td>
                  <td className="py-3 px-3">
                    <code className="font-mono-data text-[11px] bg-[#f8f3ef] px-2 py-0.5 rounded text-[#893417] border border-[#e6e2de]">
                      candidate.optimal_season in {JSON.stringify(activeWindows)}
                    </code>
                  </td>
                  <td className="py-3 px-3 text-[#56423d] text-[12px]">
                    Kenya Great Migration (July-Aug), Canadian Rockies Alpine Lakes (July-Sept)
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono-data text-[11px] text-[#4a6455] font-bold">
                      School Term Locked
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono-data text-[10px] bg-[#ccead6] text-[#062014] px-2 py-0.5 rounded font-bold">
                      <span className="material-symbols-outlined text-[13px]">check</span> Enforced
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f8f3ef]/60">
                  <td className="py-3 px-3 font-mono-data text-[12px] font-bold text-[#1c1b19]">
                    RULE_AGE_GATING
                  </td>
                  <td className="py-3 px-3">
                    <code className="font-mono-data text-[11px] bg-[#f8f3ef] px-2 py-0.5 rounded text-[#893417] border border-[#e6e2de]">
                      min([12, 15]) &gt;= candidate.min_legal_expedition_age
                    </code>
                  </td>
                  <td className="py-3 px-3 text-[#56423d] text-[12px]">
                    Rwanda Mountain Gorilla Trek (Strict park requirement: min 15 years old for youngest)
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono-data text-[11px] text-[#89726b] font-bold">
                      Legal & Safety Mandate
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono-data text-[10px] bg-[#ccead6] text-[#062014] px-2 py-0.5 rounded font-bold">
                      <span className="material-symbols-outlined text-[13px]">check</span> Enforced
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 p-3 bg-[#f8f3ef] rounded-lg flex items-center justify-between flex-wrap gap-2">
            <span className="font-mono-data text-[11px] text-[#56423d]">
              Deterministic Parser Status: All 4 expressions verified against GoGamya Engine AST v0.1 without semantic ambiguity.
            </span>
            <button
              onClick={() => setShowAstModal(true)}
              className="font-mono-data text-[11px] text-[#893417] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>View Python AST</span>
            </button>
          </div>
        </section>

        {/* Bottom Section: Candidate Pruning Simulation & Pre-Filter Pipeline */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Bento: Pruning Funnel Metrics */}
          <div className="lg:col-span-4 bg-[#ffffff] rounded-xl p-6 shadow-xs border border-[#e6e2de] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-data text-[11px] uppercase text-[#893417] font-bold">
                  Pruning Funnel Simulation
                </span>
                <span className="material-symbols-outlined text-[#893417] text-[20px]">filter_alt</span>
              </div>
              <h3 className="font-serif-headline text-[22px] font-semibold text-[#1c1b19]">
                Pre-Filter Funnel
              </h3>
              <p className="font-sans-body text-[13px] text-[#56423d] mt-1">
                Immediate elimination of unviable catalog candidates before the MCDA weighting matrix is invoked.
              </p>

              <div className="mt-6 space-y-3 font-mono-data">
                <div className="p-3 bg-[#f8f3ef] rounded-lg flex items-center justify-between border border-[#e6e2de]">
                  <div>
                    <div className="text-[10px] text-[#56423d] uppercase font-semibold">Initial Catalog Pool</div>
                    <div className="text-[26px] font-bold text-[#1c1b19] leading-tight">50</div>
                  </div>
                  <span className="text-[11px] bg-[#e6e2de] text-[#1c1b19] px-2 py-0.5 rounded font-semibold">
                    100% Universe
                  </span>
                </div>

                <div className="p-3 bg-[#ffdad6]/40 rounded-lg flex items-center justify-between border border-[#ffdad6]">
                  <div>
                    <div className="text-[10px] text-[#ba1a1a] uppercase font-bold">Pruned by Hard Constraints</div>
                    <div className="text-[26px] font-bold text-[#ba1a1a] leading-tight">46</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] text-[#ba1a1a] font-bold block">-92.0%</span>
                    <span className="text-[10px] text-[#56423d]">44 Budget / 2 Window</span>
                  </div>
                </div>

                <div className="p-3 bg-[#ccead6] rounded-lg flex items-center justify-between border border-[#b1cdbb]">
                  <div>
                    <div className="text-[10px] text-[#062014] uppercase font-bold">Surviving Feasible Trajectories</div>
                    <div className="text-[26px] font-bold text-[#062014] leading-tight">4</div>
                  </div>
                  <span className="text-[11px] bg-[#4a6455] text-white px-2 py-0.5 rounded font-bold">
                    Passed to Stage 3
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f2ede9] flex items-center gap-2 text-[#4a6455]">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              <span className="font-mono-data text-[11px] font-bold">0 Hard Constraint Violations Guaranteed</span>
            </div>
          </div>

          {/* Right Bento: Surviving Feasible Trajectories Visual Preview */}
          <div className="lg:col-span-8 bg-[#ffffff] rounded-xl p-6 shadow-xs border border-[#e6e2de] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-data text-[11px] uppercase text-[#4a6455] font-bold">
                  Surviving Feasible Set (MCDA Candidates)
                </span>
                <span className="font-mono-data text-[11px] text-[#56423d]">Appendix B Curated Matches</span>
              </div>
              <h3 className="font-serif-headline text-[22px] font-semibold text-[#1c1b19]">
                The 4 Candidate Trajectories for Stage 3
              </h3>
              <p className="font-sans-body text-[13px] text-[#56423d] mt-1">
                All 4 candidates fit the ${budgetVal.toLocaleString()} 4-person ceiling, align with March/December school breaks, match teen activity profiles, and fly seamlessly out of SFO.
              </p>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {/* Candidate 1 */}
                <div className="bg-[#f8f3ef] rounded-lg p-3.5 flex flex-col justify-between border border-[#e6e2de] group hover:shadow-md transition-shadow">
                  <div>
                    <span className="font-mono-data text-[10px] text-[#4a6455] font-bold uppercase tracking-wider bg-[#ccead6] px-2 py-0.5 rounded">
                      March Window (Spring Break)
                    </span>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Japan: Tokyo, Kyoto & Mt. Fuji
                    </h4>
                    <div className="font-sans-body text-[11px] text-[#56423d]">Cherry Blossom Season • Shinkansen Transit</div>
                  </div>
                  <div className="my-2.5 h-24 w-full rounded overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg4-TMmYDoL6yrNt03nn2j5PCxpF4VdFXQ-ZlEeg1M-aI49rWQZEzNI5Lf8zEeZ2Io82aPZHFCwzofq8hiSQ9vXWZVuSdJUe5JYXuzkyzcggur9yZxtVOCDz27-WNlpxavNTMN1l05SzpxhMj2p6NPpaJblRJ3dbBK4_PRxQm4HvchT6NIL1G4FrRb2EWaWRQPQsHe7YGWRO71NwCYAFI1HMADScIEt0uUWO3QiLYzMn_bmsXFW6hpDQ"
                      alt="Japan cherry blossoms"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white font-mono-data text-[10px] px-1.5 py-0.5 rounded">
                      9 Days • SFO direct
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#e6e2de] font-mono-data text-[11px]">
                    <span className="text-[#56423d]">Est: <strong className="text-[#1c1b19]">$10,400</strong></span>
                    <span className="text-[#4a6455] font-bold">100% Feasible</span>
                  </div>
                </div>

                {/* Candidate 2 */}
                <div className="bg-[#f8f3ef] rounded-lg p-3.5 flex flex-col justify-between border border-[#e6e2de] group hover:shadow-md transition-shadow">
                  <div>
                    <span className="font-mono-data text-[10px] text-[#893417] font-bold uppercase tracking-wider bg-[#ffdbd0] px-2 py-0.5 rounded">
                      Dec Window (Winter Solstice)
                    </span>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Norway: Tromsø & Arctic Fjords
                    </h4>
                    <div className="font-sans-body text-[11px] text-[#56423d]">Northern Lights • Polar Night Fjord Cruise</div>
                  </div>
                  <div className="my-2.5 h-24 w-full rounded overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLQKnn95sa1rarFivueDoCv6gVIwz0Q4ECXT5fLDUsnWQAVKD2h2r3AjWVbetIuvqNvc--DCWKxKFDmhEPh3VuPgSkSq3u_rrXA39pTFT5A6HCV5YRXmklhW1IvtZDUOdud-swcapPaAZr2H8zi5-ERYcyyqIkcG0O-aJKA0HzJ20zEg9QyeIUqU5t2BCaTdaKfGImnL-xe5KxTGs1UGUEh0oGPIzP2o1-PculeMrA4JPKUCY76niFjQ"
                      alt="Norway Tromso aurora"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white font-mono-data text-[10px] px-1.5 py-0.5 rounded">
                      8 Days • 1-stop via FRA
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#e6e2de] font-mono-data text-[11px]">
                    <span className="text-[#56423d]">Est: <strong className="text-[#1c1b19]">$9,600</strong></span>
                    <span className="text-[#4a6455] font-bold">100% Feasible</span>
                  </div>
                </div>

                {/* Candidate 3 */}
                <div className="bg-[#f8f3ef] rounded-lg p-3.5 flex flex-col justify-between border border-[#e6e2de] group hover:shadow-md transition-shadow">
                  <div>
                    <span className="font-mono-data text-[10px] text-[#893417] font-bold uppercase tracking-wider bg-[#ffdbd0] px-2 py-0.5 rounded">
                      Dec Window (Holiday Lights)
                    </span>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Iceland: Reykjavík & South Coast
                    </h4>
                    <div className="font-sans-body text-[11px] text-[#56423d]">Geothermal Lagoons • Glacier Walk • Waterfalls</div>
                  </div>
                  <div className="my-2.5 h-24 w-full rounded overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgklSU97sbOp0JbI9l_oWja76xV1huqS3H637MwLh_GmJp-jY1UjM9cmfKveMhhkwBSLAQkulUDsC67SacSXKru9mK8xKpYUQox16TVsV0GW4E63F5zyQIeYjZ-7fJajDANB2x0Gv9aGr8bA6EZARY3gJqIpB20FdRzYB0FrgtAer9agLHT62lIq0VkS1dKGmQQyL2yjDAbAea5wfkYkjeuEHJbMJhOqANl2HaBHyRNoC3IUQQrjZegQ"
                      alt="Iceland geothermal hot spring"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white font-mono-data text-[10px] px-1.5 py-0.5 rounded">
                      7 Days • SFO direct
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#e6e2de] font-mono-data text-[11px]">
                    <span className="text-[#56423d]">Est: <strong className="text-[#1c1b19]">$8,800</strong></span>
                    <span className="text-[#4a6455] font-bold">100% Feasible</span>
                  </div>
                </div>

                {/* Candidate 4 */}
                <div className="bg-[#f8f3ef] rounded-lg p-3.5 flex flex-col justify-between border border-[#e6e2de] group hover:shadow-md transition-shadow">
                  <div>
                    <span className="font-mono-data text-[10px] text-[#893417] font-bold uppercase tracking-wider bg-[#ffdbd0] px-2 py-0.5 rounded">
                      Dec Window (Arctic Winter)
                    </span>
                    <h4 className="font-sans-body text-[15px] font-bold text-[#1c1b19] mt-1">
                      Finland: Rovaniemi & Glass Igloos
                    </h4>
                    <div className="font-sans-body text-[11px] text-[#56423d]">Husky Sledding • Reindeer Safari • Snow Forest</div>
                  </div>
                  <div className="my-2.5 h-24 w-full rounded overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiV2jZX12FBeYIBE-7m7TQH1f54FpnvNYsPiVStaE7iJbnu6V3kB1Bp7ZfvkLf3-0pbIZiT0iOsIRCdGCjfIpAE03cWfvzG5zayFuQLtSnm-M_W6EBFZX2Gfr3UBUv5itwK-Zb_8hu6wwmrS5ZpQA7GnI7_Yu7QWtMps9JncSVqKU3y7J55aaq9S_0xqdxugh3S1bVkHlYQINvdU3xVwoWgo0VCZOb-86Ksaj-yrLB21Wip1cqY8kObQ"
                      alt="Finland glass igloos"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white font-mono-data text-[10px] px-1.5 py-0.5 rounded">
                      8 Days • 1-stop via HEL
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#e6e2de] font-mono-data text-[11px]">
                    <span className="text-[#56423d]">Est: <strong className="text-[#1c1b19]">$10,200</strong></span>
                    <span className="text-[#4a6455] font-bold">100% Feasible</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#f2ede9] flex flex-wrap items-center justify-between gap-2 font-mono-data text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-[#56423d]">Stage 3 Next Action:</span>
                <span className="text-[#893417] font-bold">
                  MCDA Multi-Attribute Scoring will calculate ranking & Pareto efficiency across these 4.
                </span>
              </div>
              <div className="text-[#89726b]">Deterministic Neutrality Verified</div>
            </div>
          </div>
        </section>

        {/* Sovereign Action & Flow Progression Bar */}
        <div className="bg-[#ece7e3] p-5 rounded-xl shadow-xs border border-[#dcc1b9] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('travel-goals')}
              className="inline-flex items-center gap-2 font-sans-body text-[13px] font-semibold text-[#1c1b19] bg-white hover:bg-[#f8f3ef] px-4 py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer border border-[#dcc1b9]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>1. Travel Goals</span>
            </button>
            <div className="hidden sm:flex flex-col">
              <span className="font-sans-body text-[13px] font-bold text-[#1c1b19]">
                Profile Snapshot: v1.4
              </span>
              <span className="font-mono-data text-[11px] text-[#56423d]">
                SFO Hub • 4 Pax • ${budgetVal.toLocaleString()} Cap • 20 PTO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleSaveProfile}
              className="hidden lg:inline-flex items-center gap-1.5 font-mono-data text-[11px] text-[#56423d] hover:text-[#1c1b19] px-3 py-2 rounded-lg bg-white border border-[#dcc1b9] transition-colors cursor-pointer"
              title="Save parameters to profile JSON"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Save Profile v1.4</span>
            </button>
            <button
              onClick={() => onNavigate('next-journey')}
              className="inline-flex items-center justify-center gap-2 font-sans-body text-[14px] font-semibold text-white bg-[#893417] hover:bg-[#a84b2c] px-6 py-2.5 rounded-lg shadow-sm transition-all group shrink-0 cursor-pointer"
              type="button"
            >
              <span>Lock Travel Reality & Generate Decision (Step 3: Next Journey)</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Python AST Modal */}
      {showAstModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-[#32302e] text-[#f5f0ec] rounded-xl p-6 shadow-2xl border border-white/10 space-y-4 font-mono-data text-[12px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[#ffb59e] font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                GoGamya Hard Constraint AST Definition
              </span>
              <button
                onClick={() => setShowAstModal(false)}
                className="text-[#dcc1b9] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <pre className="p-3 bg-black/40 rounded-lg overflow-x-auto text-[#ccead6] leading-relaxed">
{`class Stage1Guardrails:
    def __init__(self, profile: ConstraintProfile):
        self.budget_cap = profile.annual_budget  # $${budgetVal}
        self.max_duration = 10
        self.max_pto = profile.available_pto    # 20 days
        self.allowed_windows = ${JSON.stringify(activeWindows)}
        self.youngest_traveler = min(profile.teens_ages)  # 12 yrs

    def is_feasible(self, c: Candidate) -> bool:
        if c.est_cost_party_4p > self.budget_cap:
            return False
        if c.duration_days > self.max_duration:
            return False
        if c.optimal_season not in self.allowed_windows:
            return False
        if self.youngest_traveler < c.min_legal_expedition_age:
            return False
        return True`}
            </pre>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowAstModal(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
