import React from 'react';
import { ScreenId, TravelGoal } from '../types/decision';
import { INITIAL_GOALS, AUDIT_LOG } from '../data/mockData';
import { SURVIVING_ALTERNATIVES } from '../data/candidateJourneys';
import { LifespanGoalCompoundingChart } from './LifespanGoalCompoundingChart';

interface Screen5Props {
  onNavigate: (screen: ScreenId) => void;
  onOpenExport: () => void;
  goals: TravelGoal[];
}

export const Screen5ProgressHistory: React.FC<Screen5Props> = ({
  onNavigate,
  onOpenExport,
  goals,
}) => {
  const tromso = SURVIVING_ALTERNATIVES[0]; // Candidate A

  // Updated goals showing Japan fulfilled
  const updatedGoals = goals.map((g) => {
    let status: 'active' | 'completed' | 'deferred' | 'pruned' | 'fulfilled' = g.status;
    let progressPct = g.progress ? Math.round((g.progress.current / g.progress.target) * 100) : 40;
    let priority = g.priority;
    let targetWindow = g.phenologyWindow || g.deadline || 'Flexible Window';

    if (g.id === 'goal-japan-bloom' || g.id === 'goal-cherry-blossom') {
      status = 'fulfilled';
      progressPct = 100;
      targetWindow = 'Fulfilled Spring 2026';
    } else if (g.id === 'goal-50-countries') {
      progressPct = 66; // 33 of 50
    } else if (g.id === 'goal-northern-lights') {
      priority = 1;
      targetWindow = 'December 2027 (Locked Next)';
      progressPct = 40;
    }

    return {
      id: g.id,
      title: g.title,
      category: g.category,
      priority,
      weight: g.weight,
      targetWindow,
      progressPct,
      status,
    };
  });


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Subheader breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e6e2de]">
        <div className="flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-[#735c3c]">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Stage 05: Progress, History & Next Journey Locked</span>
          <span className="text-[#a8a29e]">•</span>
          <span className="text-[#57534e]">Portfolio Reconciliation Run #15</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={onOpenExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#d6cfc7] text-[#57534e] hover:bg-[#f8f3ef] transition-colors font-medium shadow-2xs"
          >
            <svg
              className="w-3.5 h-3.5 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>Export Portfolio to Sheets</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-mono font-semibold">
          <span>✓</span>
          <span>LIFESPAN MILESTONE COMMITTED TO LEDGER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1c1917] tracking-tight">
          Portfolio Progress & Next Deterministic Journey
        </h1>
        <p className="text-base text-[#57534e] max-w-3xl leading-relaxed">
          Japan Spring 2026 has been reconciled into the family journey ledger. Candidate A (Tromsø,
          Norway) is locked as the next deterministic objective for December 2027.
        </p>
      </div>

      {/* Journey Fulfilled Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-[#1c3024] to-[#122018] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-900/40 relative overflow-hidden">
        {/* Background watermark badge */}
        <div className="absolute -right-8 -bottom-8 opacity-10 text-white select-none pointer-events-none text-9xl font-serif">
          ✓
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-sm">
                ✓
              </span>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-emerald-300 uppercase block">
                  Completed Milestone • Run #14 Fulfilled
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                  Japan: Tokyo & Kyoto Cherry Blossoms
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-emerald-200 bg-emerald-900/60 border border-emerald-700/50 px-3 py-1 rounded-full">
                Completed Spring 2026 (9 Days)
              </span>
            </div>
          </div>

          {/* Actuals vs Planned Ledger Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-[11px] text-emerald-200/70 font-mono uppercase">Total Spend</div>
              <div className="text-xl font-serif font-bold text-white mt-1">$9,240</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                +$260 Under Budget ($9,500 target)
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-[11px] text-emerald-200/70 font-mono uppercase">
                Points Redeemed
              </div>
              <div className="text-xl font-serif font-bold text-white mt-1">180,000 pts</div>
              <div className="text-[10px] text-emerald-300 mt-0.5">$2,400 Cash Offset</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-[11px] text-emerald-200/70 font-mono uppercase">
                Lifespan Advance
              </div>
              <div className="text-xl font-serif font-bold text-emerald-300 mt-1">Goal #5 100%</div>
              <div className="text-[10px] text-emerald-200/80 mt-0.5">+33rd Country Token</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="text-[11px] text-emerald-200/70 font-mono uppercase">
                College Clock
              </div>
              <div className="text-xl font-serif font-bold text-amber-200 mt-1">1.8 Yrs Left</div>
              <div className="text-[10px] text-amber-300/80 mt-0.5">Next Window: Dec 2027</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Deterministic Journey Card (Candidate A: Tromsø Norway) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#735c3c] shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#735c3c]">
                NEXT DETERMINISTIC OBJECTIVE • RUN #15
              </span>
              <span className="px-2 py-0.5 bg-[#735c3c] text-white text-[10px] font-mono font-bold rounded">
                LOCKED CANDIDATE A
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mt-1">
              Northern Lights in Tromsø, Norway
            </h2>
            <p className="text-sm text-[#57534e]">
              December 10 – 17, 2027 (7 Days) • SFO Departure • 4 Travelers
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-serif font-bold text-[#735c3c]">0.44</div>
            <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
              +0.08 Penalty Relief Applied
            </div>
          </div>
        </div>

        {/* Visual Hero & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden relative border border-[#e6e2de]">
            <img
              src={tromso.images[0].url}
              alt={tromso.images[0].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="text-xs font-mono text-emerald-300">Peak Solar Cycle Alignment</div>
              <div className="text-sm font-serif font-semibold">Tromsø Fjord Polar Night</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 bg-[#fdf8f5] rounded-xl border border-[#e6e2de] text-sm text-[#44403c] leading-relaxed">
              <strong className="text-[#1c1917] font-semibold">Mathematical Rationale:</strong> With
              the Japan window completed, the timing tradeoff penalty (-0.08) is officially
              eliminated. Tromsø commands the Pareto frontier with an 80% aurora observation
              probability, 100% solstice timing alignment, and an estimated cost band ($8,000 –
              $11,000) that maintains a healthy $4,500 reserve cushion.
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#f8f3ef] rounded-xl border border-[#e6e2de]">
                <div className="text-[11px] text-[#78716c]">Aurora Probability</div>
                <div className="text-lg font-serif font-bold text-[#1c1917]">0.80 (Peak)</div>
              </div>
              <div className="p-3 bg-[#f8f3ef] rounded-xl border border-[#e6e2de]">
                <div className="text-[11px] text-[#78716c]">Teen Engagement</div>
                <div className="text-lg font-serif font-bold text-[#1c1917]">0.70 / 1.0</div>
              </div>
              <div className="p-3 bg-[#f8f3ef] rounded-xl border border-[#e6e2de]">
                <div className="text-[11px] text-[#78716c]">Cost Midpoint</div>
                <div className="text-lg font-serif font-bold text-[#1c1917]">$9,500</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#57534e]">
              <span className="bg-[#f0ebe6] px-2.5 py-1 rounded font-medium">
                🎯 Goal #2: Northern Lights (+80%)
              </span>
              <span className="bg-[#f0ebe6] px-2.5 py-1 rounded font-medium">
                🌍 Goal #1: 34th Country Token
              </span>
              <span className="bg-[#f0ebe6] px-2.5 py-1 rounded font-medium">
                ⏱️ Pre-College Window (1.8y remaining)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lifespan Goal Compounding Metrics Visualization (Recharts) */}
      <LifespanGoalCompoundingChart />

      {/* Reconciled Lifespan Goal Portfolio */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6e2de] shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1c1917]">
              Reconciled Goal Graph & Compounding Velocity
            </h2>
            <p className="text-xs text-[#78716c]">
              Strategic lifespan goals dynamically recalibrated following Spring 2026 execution.
            </p>
          </div>
          <div className="text-xs font-mono text-[#57534e]">
            Portfolio Completion:{' '}
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              38.4% (was 26.2%)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {updatedGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 rounded-2xl border transition-all ${
                goal.status === 'fulfilled'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : goal.priority === 1
                  ? 'bg-[#fdf8f5] border-[#735c3c]/40'
                  : 'bg-white border-[#e6e2de]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      goal.status === 'fulfilled'
                        ? 'bg-emerald-600 text-white'
                        : goal.priority === 1
                        ? 'bg-[#735c3c] text-white'
                        : 'bg-[#f0ebe6] text-[#78716c]'
                    }`}
                  >
                    {goal.status === 'fulfilled' ? '✓' : `#${goal.priority}`}
                  </span>
                  <div>
                    <div className="font-serif font-bold text-base text-[#1c1917]">
                      {goal.title}
                    </div>
                    <div className="text-xs text-[#78716c]">
                      {goal.targetWindow} • Weight: {goal.weight} • Category:{' '}
                      {goal.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-32 sm:w-40 text-right">
                    <div className="text-xs font-mono font-bold text-[#1c1917]">
                      {goal.status === 'fulfilled' ? '100% Fulfilled' : `${goal.progressPct}% Complete`}
                    </div>
                    <div className="w-full bg-[#e6e2de] rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          goal.status === 'fulfilled'
                            ? 'bg-emerald-600'
                            : goal.priority === 1
                            ? 'bg-[#735c3c]'
                            : 'bg-[#a8a29e]'
                        }`}
                        style={{ width: `${goal.progressPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      goal.status === 'fulfilled'
                        ? 'bg-emerald-100 text-emerald-800'
                        : goal.priority === 1
                        ? 'bg-[#735c3c] text-white'
                        : 'bg-[#f0ebe6] text-[#57534e]'
                    }`}
                  >
                    {goal.status === 'fulfilled'
                      ? 'Archived'
                      : goal.priority === 1
                      ? 'Next Target'
                      : 'Queued'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Decision Run Audit Trail Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6e2de] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#1c1917]">
              Deterministic Decision Audit Trail
            </h3>
            <p className="text-xs text-[#78716c]">
              Immutable record of model recalculations and portfolio state transitions.
            </p>
          </div>
          <span className="text-xs font-mono bg-[#f0ebe6] px-2.5 py-1 rounded text-[#57534e]">
            3 Runs Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e6e2de] text-[#78716c] font-mono uppercase tracking-wider">
                <th className="py-2.5 px-3">Run ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Trigger / Event</th>
                <th className="py-2.5 px-3">Selected / Locked</th>
                <th className="py-2.5 px-3">MCDA Score</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ebe6] text-[#44403c]">
              <tr className="bg-emerald-50/40">
                <td className="py-3 px-3 font-mono font-bold text-[#735c3c]">RUN #15</td>
                <td className="py-3 px-3">Mar 28, 2026</td>
                <td className="py-3 px-3 font-medium text-[#1c1917]">
                  Japan Spring 2026 Fulfilled; Rebalance Dec 2027
                </td>
                <td className="py-3 px-3 font-semibold text-[#1c1917]">Tromsø, Norway</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-700">0.44 (+0.08)</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                    LOCKED
                  </span>
                </td>
              </tr>
              {AUDIT_LOG.map((log) => (
                <tr key={log.id} className="hover:bg-[#fdf8f5]">
                  <td className="py-3 px-3 font-mono font-bold text-[#78716c]">{log.runId}</td>
                  <td className="py-3 px-3">{log.date}</td>
                  <td className="py-3 px-3">{log.event}</td>
                  <td className="py-3 px-3 font-medium text-[#1c1917]">{log.selectedCandidate}</td>
                  <td className="py-3 px-3 font-mono">{log.score.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#f0ebe6] text-[#57534e] font-mono text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Footer Controls */}
      <div className="bg-[#f8f3ef] rounded-2xl p-6 border border-[#e6e2de] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#57534e]">
          Would you like to simulate alternative macroeconomic shocks or add newly discovered travel
          goals?
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('what-if-replanning')}
            className="px-4 py-2 bg-white border border-[#d6cfc7] hover:bg-[#f0ebe6] text-[#57534e] rounded-xl text-xs font-medium transition-colors"
          >
            ← Re-run What-If Simulator
          </button>
          <button
            onClick={() => onNavigate('travel-goals')}
            className="px-4 py-2 bg-[#735c3c] hover:bg-[#5b482f] text-white rounded-xl text-xs font-medium transition-colors shadow-2xs"
          >
            + Ingest New Goal to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
