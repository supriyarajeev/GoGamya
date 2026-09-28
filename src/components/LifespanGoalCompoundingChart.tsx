import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

export interface MilestoneDataPoint {
  year: string;
  yearNum: number;
  period: string;
  milestoneTitle: string;
  status: 'historical' | 'current-fulfilled' | 'projected-locked' | 'projected-future';
  countriesCount: number;
  compoundingMultiplier: number;
  strategicGoalsCompleted: number;
  ptoUsed: number;
  budgetAllocated: number;
  familyPhase: string;
  notes: string;
}

const COMPOUNDING_DATA: MilestoneDataPoint[] = [
  {
    year: '2022',
    yearNum: 2022,
    period: 'Summer 2022',
    milestoneTitle: 'Baseline Inception',
    status: 'historical',
    countriesCount: 24,
    compoundingMultiplier: 1.0,
    strategicGoalsCompleted: 0,
    ptoUsed: 12,
    budgetAllocated: 7500,
    familyPhase: 'Kids: 8 & 11 (Middle School)',
    notes: 'Established baseline travel catalog and country registry.',
  },
  {
    year: '2023',
    yearNum: 2023,
    period: 'Summer 2023',
    milestoneTitle: 'Western Europe & Alps',
    status: 'historical',
    countriesCount: 27,
    compoundingMultiplier: 1.6,
    strategicGoalsCompleted: 0,
    ptoUsed: 16,
    budgetAllocated: 11200,
    familyPhase: 'Kids: 9 & 12',
    notes: 'Switzerland & Italy hiking trip; high pace tolerance verified.',
  },
  {
    year: '2024',
    yearNum: 2024,
    period: 'Spring 2024',
    milestoneTitle: 'Costa Rica & Peru',
    status: 'historical',
    countriesCount: 30,
    compoundingMultiplier: 2.3,
    strategicGoalsCompleted: 0,
    ptoUsed: 14,
    budgetAllocated: 9800,
    familyPhase: 'Kids: 10 & 13',
    notes: 'High altitude acclimation verified under 2,800m.',
  },
  {
    year: '2025',
    yearNum: 2025,
    period: 'Winter 2025',
    milestoneTitle: 'Iceland Winter Prep',
    status: 'historical',
    countriesCount: 32,
    compoundingMultiplier: 2.8,
    strategicGoalsCompleted: 0,
    ptoUsed: 15,
    budgetAllocated: 8400,
    familyPhase: 'Kids: 11 & 14',
    notes: 'Sub-zero equipment and Arctic photography testing.',
  },
  {
    year: '2026',
    yearNum: 2026,
    period: 'Spring 2026 (Now)',
    milestoneTitle: 'Japan Cherry Blossoms (Fulfilled!)',
    status: 'current-fulfilled',
    countriesCount: 33,
    compoundingMultiplier: 3.8,
    strategicGoalsCompleted: 1,
    ptoUsed: 9,
    budgetAllocated: 9240,
    familyPhase: 'Kids: 12 & 15 (Critical Pre-College)',
    notes: 'Goal #5 Fulfilled (100%). Surge of +1.0x compounding velocity.',
  },
  {
    year: '2027',
    yearNum: 2027,
    period: 'Dec 2027 (Locked)',
    milestoneTitle: 'Tromsø Northern Lights (Locked)',
    status: 'projected-locked',
    countriesCount: 34,
    compoundingMultiplier: 4.6,
    strategicGoalsCompleted: 2,
    ptoUsed: 7,
    budgetAllocated: 9500,
    familyPhase: 'Kids: 13.5 & 16.5',
    notes: 'Goal #2 Target. Solstice auroral display at peak solar cycle.',
  },
  {
    year: '2028',
    yearNum: 2028,
    period: 'Summer 2028',
    milestoneTitle: 'Serengeti Great Migration',
    status: 'projected-future',
    countriesCount: 37,
    compoundingMultiplier: 5.5,
    strategicGoalsCompleted: 3,
    ptoUsed: 14,
    budgetAllocated: 13500,
    familyPhase: 'Eldest: High School Senior (17.5)',
    notes: 'Goal #3 Target. River crossing phenology before graduation.',
  },
  {
    year: '2030',
    yearNum: 2030,
    period: 'Winter 2030',
    milestoneTitle: 'Antarctica Expedition',
    status: 'projected-future',
    countriesCount: 41,
    compoundingMultiplier: 6.4,
    strategicGoalsCompleted: 4,
    ptoUsed: 16,
    budgetAllocated: 18000,
    familyPhase: 'College Era & Young Adults',
    notes: 'Goal #4 Target. Polar ice cap expedition; points subsidized.',
  },
  {
    year: '2032',
    yearNum: 2032,
    period: 'Autumn 2032',
    milestoneTitle: '50 Countries Milestone (Goal Complete)',
    status: 'projected-future',
    countriesCount: 50,
    compoundingMultiplier: 7.5,
    strategicGoalsCompleted: 5,
    ptoUsed: 18,
    budgetAllocated: 14000,
    familyPhase: 'Supriya 50th Birthday Celebration',
    notes: 'Goal #1 Completed: 50 Countries Before 50 reached!',
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: MilestoneDataPoint;
    color?: string;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isCurrent = data.status === 'current-fulfilled';
    const isLocked = data.status === 'projected-locked';

    return (
      <div className="bg-[#1c1917] text-white p-4 rounded-xl shadow-xl border border-white/10 text-xs space-y-2 max-w-xs font-sans">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
          <span className="font-mono text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
            {data.period}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
              isCurrent
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                : isLocked
                ? 'bg-[#735c3c]/40 text-amber-200 border border-amber-400/30'
                : 'bg-white/10 text-stone-300'
            }`}
          >
            {data.status.replace('-', ' ')}
          </span>
        </div>

        <div className="font-serif font-bold text-sm text-stone-100">
          {data.milestoneTitle}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
          <div>
            <span className="text-stone-400 block text-[9px]">Compounding Index</span>
            <span className="text-amber-300 font-bold">{data.compoundingMultiplier.toFixed(1)}x</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[9px]">Countries Reached</span>
            <span className="text-emerald-400 font-bold">{data.countriesCount} / 50</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[9px]">Strategic Goals</span>
            <span className="text-stone-200">{data.strategicGoalsCompleted} / 5 Finished</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[9px]">Budget Envelope</span>
            <span className="text-stone-200">${data.budgetAllocated.toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-white/10 text-[10px] text-stone-300 italic">
          {data.familyPhase}
        </div>
        <div className="text-[10px] text-stone-400 leading-snug">
          {data.notes}
        </div>
      </div>
    );
  }
  return null;
};

export const LifespanGoalCompoundingChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'compounding' | 'countries' | 'both'>('both');
  const [timeHorizon, setTimeHorizon] = useState<'all' | 'pre-college'>('all');

  const filteredData =
    timeHorizon === 'pre-college'
      ? COMPOUNDING_DATA.filter((d) => d.yearNum <= 2028)
      : COMPOUNDING_DATA;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6e2de] shadow-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#f0ebe6]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#735c3c] animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-[#735c3c] uppercase tracking-wider">
              D3 / RECHARTS ANALYTIC MODULE
            </span>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-200">
              Surge: +1.0x Post-Japan
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mt-1">
            Lifespan Goal Compounding Velocity
          </h2>
          <p className="text-xs sm:text-sm text-[#57534e] max-w-2xl mt-0.5 leading-relaxed">
            Deterministic modeling of cumulative milestone acceleration over time. Notice how each
            fulfilled high-urgency journey amplifies the compounding return on subsequent goals.
          </p>
        </div>

        {/* View Switches */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Horizon toggle */}
          <div className="flex items-center p-1 bg-[#f8f3ef] rounded-xl border border-[#e6e2de]">
            <button
              onClick={() => setTimeHorizon('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeHorizon === 'all'
                  ? 'bg-white text-[#1c1917] shadow-2xs font-semibold'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Full Lifespan (2022–2032)
            </button>
            <button
              onClick={() => setTimeHorizon('pre-college')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeHorizon === 'pre-college'
                  ? 'bg-white text-[#1c1917] shadow-2xs font-semibold'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Pre-College Focus (2022–2028)
            </button>
          </div>

          {/* Metric toggle */}
          <div className="flex items-center p-1 bg-[#f8f3ef] rounded-xl border border-[#e6e2de]">
            <button
              onClick={() => setActiveMetric('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetric === 'both'
                  ? 'bg-[#735c3c] text-white shadow-2xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Dual Perspective
            </button>
            <button
              onClick={() => setActiveMetric('compounding')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetric === 'compounding'
                  ? 'bg-[#735c3c] text-white shadow-2xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              Compounding Index (x)
            </button>
            <button
              onClick={() => setActiveMetric('countries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetric === 'countries'
                  ? 'bg-[#735c3c] text-white shadow-2xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              50 Countries Target
            </button>
          </div>
        </div>
      </div>

      {/* Main Recharts Visualization */}
      <div className="w-full h-80 sm:h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="compoundingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#735c3c" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#735c3c" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="countryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e6e2de" vertical={false} />

            <XAxis
              dataKey="year"
              stroke="#78716c"
              tick={{ fontSize: 12, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#d6cfc7' }}
              axisLine={{ stroke: '#d6cfc7' }}
            />

            {/* Left Y Axis: Compounding Index Multiplier */}
            {(activeMetric === 'compounding' || activeMetric === 'both') && (
              <YAxis
                yAxisId="left"
                stroke="#735c3c"
                domain={[0, 8.5]}
                tickFormatter={(val) => `${val.toFixed(1)}x`}
                tick={{ fontSize: 11, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: 'Compounding Velocity (Multiplier)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#735c3c',
                  fontSize: 11,
                  fontFamily: 'serif',
                  offset: 0,
                }}
              />
            )}

            {/* Right Y Axis: 50 Countries Progress */}
            {(activeMetric === 'countries' || activeMetric === 'both') && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#059669"
                domain={[20, 55]}
                tickFormatter={(val) => `${val}`}
                tick={{ fontSize: 11, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: 'Countries Visited (Goal: 50)',
                  angle: 90,
                  position: 'insideRight',
                  fill: '#059669',
                  fontSize: 11,
                  fontFamily: 'serif',
                  offset: 0,
                }}
              />
            )}

            <Tooltip content={<CustomTooltip />} />

            {/* Reference Line for Fulfilled Spring 2026 */}
            <ReferenceLine
              x="2026"
              stroke="#059669"
              strokeWidth={2}
              strokeDasharray="4 4"
              yAxisId={activeMetric === 'countries' ? 'right' : 'left'}
              label={{
                value: '🌸 Japan Fulfilled (Now)',
                position: 'top',
                fill: '#059669',
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: 600,
              }}
            />

            {/* Reference Line for College Matriculation Horizon */}
            <ReferenceLine
              x="2027"
              stroke="#b45309"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              yAxisId={activeMetric === 'countries' ? 'right' : 'left'}
              label={{
                value: '🎓 Eldest College Window',
                position: 'insideTopRight',
                fill: '#b45309',
                fontSize: 10,
                fontFamily: 'monospace',
              }}
            />

            {/* Target 50 Countries Goal Line */}
            {activeMetric !== 'compounding' && (
              <ReferenceLine
                y={50}
                yAxisId="right"
                stroke="#047857"
                strokeDasharray="5 5"
                label={{
                  value: '🎯 50th Country Target (Age 50)',
                  position: 'insideBottomRight',
                  fill: '#047857',
                  fontSize: 10,
                  fontFamily: 'monospace',
                }}
              />
            )}

            {/* Area fill for Compounding Multiplier */}
            {(activeMetric === 'compounding' || activeMetric === 'both') && (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="compoundingMultiplier"
                stroke="#735c3c"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#compoundingGradient)"
                name="Compounding Multiplier"
                activeDot={{ r: 7, stroke: '#735c3c', strokeWidth: 2, fill: '#ffffff' }}
              />
            )}

            {/* Line for Countries Count */}
            {(activeMetric === 'countries' || activeMetric === 'both') && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="countriesCount"
                stroke="#059669"
                strokeWidth={2.5}
                strokeDasharray="4 2"
                dot={{ r: 4, stroke: '#059669', strokeWidth: 2, fill: '#ffffff' }}
                activeDot={{ r: 7, stroke: '#059669', strokeWidth: 2, fill: '#ffffff' }}
                name="Countries Reached"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div className="p-4 bg-[#fdf8f5] rounded-2xl border border-[#e6e2de]">
          <div className="text-[11px] font-mono uppercase text-[#78716c]">
            Current Compounding Velocity
          </div>
          <div className="text-2xl font-serif font-bold text-[#735c3c] mt-1 flex items-baseline space-x-1.5">
            <span>3.8x</span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              +1.0x surge
            </span>
          </div>
          <div className="text-[10px] text-[#57534e] mt-1">
            Reconciled post Japan Spring 2026 completion
          </div>
        </div>

        <div className="p-4 bg-[#fdf8f5] rounded-2xl border border-[#e6e2de]">
          <div className="text-[11px] font-mono uppercase text-[#78716c]">
            Countries Milestone Velocity
          </div>
          <div className="text-2xl font-serif font-bold text-[#059669] mt-1 flex items-baseline space-x-1.5">
            <span>33 / 50</span>
            <span className="text-xs font-mono text-[#78716c]">66% Target</span>
          </div>
          <div className="text-[10px] text-[#57534e] mt-1">
            Pacing: 2.4 new nations / year on track for 2032
          </div>
        </div>

        <div className="p-4 bg-[#fdf8f5] rounded-2xl border border-[#e6e2de]">
          <div className="text-[11px] font-mono uppercase text-[#78716c]">
            Pre-College Window Utilization
          </div>
          <div className="text-2xl font-serif font-bold text-[#b45309] mt-1 flex items-baseline space-x-1.5">
            <span>83.3%</span>
            <span className="text-xs font-mono text-[#78716c]">5/6 Windows</span>
          </div>
          <div className="text-[10px] text-[#57534e] mt-1">
            1.8 yrs left before eldest matriculates to university
          </div>
        </div>

        <div className="p-4 bg-[#fdf8f5] rounded-2xl border border-[#e6e2de]">
          <div className="text-[11px] font-mono uppercase text-[#78716c]">
            Points & Miles Arbitrage
          </div>
          <div className="text-2xl font-serif font-bold text-[#1c1917] mt-1 flex items-baseline space-x-1.5">
            <span>$1.42</span>
            <span className="text-xs font-mono text-emerald-700 font-bold">per $1.00</span>
          </div>
          <div className="text-[10px] text-[#57534e] mt-1">
            Redemption efficiency: 180k pts offset $2,400 in Japan
          </div>
        </div>
      </div>

      {/* Anatomy of the Compounding Multiplier Breakdown */}
      <div className="p-5 bg-[#f8f3ef] rounded-2xl border border-[#e6e2de]/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-[#57534e] uppercase tracking-wider">
            ANATOMY OF 3.8x COMPOUNDING VELOCITY (DECOMPOSITION)
          </span>
          <span className="text-xs font-mono text-[#735c3c]">
            Deterministic Multi-Attribute Factor Weights
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
          <div className="bg-white p-3 rounded-xl border border-[#e6e2de] text-center">
            <div className="text-lg font-serif font-bold text-[#735c3c]">+1.0x</div>
            <div className="text-xs font-medium text-[#1c1917] mt-0.5">Phenology Timing</div>
            <div className="text-[10px] text-[#78716c] mt-0.5">
              100% Cherry Blossom match; solar peak prep
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#e6e2de] text-center">
            <div className="text-lg font-serif font-bold text-[#735c3c]">+1.0x</div>
            <div className="text-xs font-medium text-[#1c1917] mt-0.5">Family Co-Presence</div>
            <div className="text-[10px] text-[#78716c] mt-0.5">
              Both teens active; prior to college departure
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#e6e2de] text-center">
            <div className="text-lg font-serif font-bold text-[#735c3c]">+0.8x</div>
            <div className="text-xs font-medium text-[#1c1917] mt-0.5">Country Registry</div>
            <div className="text-[10px] text-[#78716c] mt-0.5">
              +1 token towards 50 Before 50 target
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#e6e2de] text-center">
            <div className="text-lg font-serif font-bold text-[#735c3c]">+0.6x</div>
            <div className="text-xs font-medium text-[#1c1917] mt-0.5">Cultural Immersiveness</div>
            <div className="text-[10px] text-[#78716c] mt-0.5">
              Tea ceremonies, temples, Kyoto heritage
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#e6e2de] text-center">
            <div className="text-lg font-serif font-bold text-[#735c3c]">+0.4x</div>
            <div className="text-xs font-medium text-[#1c1917] mt-0.5">Capital Efficiency</div>
            <div className="text-[10px] text-[#78716c] mt-0.5">
              $260 reserve surplus; 180k points redeemed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
