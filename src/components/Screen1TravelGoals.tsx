import React, { useState } from 'react';
import { ScreenId, TravelGoal } from '../types/decision';
import { INITIAL_GOALS, TAXONOMY_CATEGORIES } from '../data/mockData';
import { apiParseGoal } from '../services/clientApi';

interface Screen1Props {
  onNavigate: (screen: ScreenId) => void;
  onRecompute: () => void;
}

export const Screen1TravelGoals: React.FC<Screen1Props> = ({ onNavigate, onRecompute }) => {
  const [goals, setGoals] = useState<TravelGoal[]>(INITIAL_GOALS);
  const [nlpInput, setNlpInput] = useState<string>(
    'Show the kids Japan during cherry blossom season before our eldest goes to college'
  );
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [astOutput, setAstOutput] = useState<string>(
    `parse_goals(text="Show the kids Japan during cherry blossom season before our eldest goes to college", primary_type="Signature Experiences", secondary_types=["Cultural / Historical", "Family / Multi-generational"], deadline="May 2027 (College matriculation)", suggested_priority=5, confidence=0.98)`
  );
  const [telemetryTags, setTelemetryTags] = useState<string[]>([
    'Taxonomy Match: 98.4%',
    'Resolved Entity: Japan [NRT / KIX]',
    'Phenology Window: Late Mar – Mid Apr',
    'Compounding Flag: +1 Country Count',
  ]);
  const [activeTaxonomyFilter, setActiveTaxonomyFilter] = useState<string | null>(null);
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<'Geographic & Iconic' | 'Phenology & Wonder' | 'Milestone & Clock'>('Phenology & Wonder');
  const [newGoalPriority, setNewGoalPriority] = useState(4);

  const handleParseAspiration = async () => {
    if (!nlpInput.trim()) return;
    setIsParsing(true);
    try {
      const result = await apiParseGoal(nlpInput);
      setAstOutput(result.ast_code);
      setTelemetryTags([
        `Taxonomy Match: ${result.taxonomy_match}`,
        `Resolved Entity: ${result.resolved_entity}`,
        `Phenology Window: ${result.phenology_window}`,
        `Compounding Flag: ${result.compounding_flag}`,
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsParsing(false);
    }
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal: TravelGoal = {
      id: `goal-${Date.now()}`,
      title: newGoalTitle,
      description: `Captured via GoGamya structured natural language parser. Priority ${newGoalPriority} weighting assigned.`,
      category: newGoalCategory,
      taxonomyType: newGoalCategory === 'Phenology & Wonder' ? 'Seasonal Phenomenon' : 'Iconic Landmark',
      priority: newGoalPriority,
      weight: +(newGoalPriority * 0.2).toFixed(2),
      urgencyLabel: 'Active Candidate',
      phenologyWindow: 'Identified Optimal Window',
      deadline: 'Standard Planning Horizon',
      compoundingMultiplier: '+1 Milestones Advanced',
      estimatedBudget: 'Within Annual Capacity Envelope',
      matchedTrajectory: 'Trajectory Matched',
      status: 'active',
      icon: 'star',
    };

    setGoals([newGoal, ...goals]);
    setNewGoalTitle('');
    setShowAddGoalModal(false);
  };

  const scrollToTaxonomy = () => {
    const el = document.getElementById('taxonomy-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header / Run Control Bar */}
      <section className="w-full bg-[#f8f3ef] border-b border-[#e6e2de]/60 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono-data text-[11px]">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#893417] text-white font-semibold tracking-wider uppercase">
              Engine Run #14
            </span>
            <span className="text-[#56423d] font-medium">
              Profile: Supriya Rajeev (Family Milestone v1.4)
            </span>
            <span className="text-[#dcc1b9]">•</span>
            <span className="text-[#4a6455] font-semibold">5 Active Portfolio Goals</span>
            <span className="text-[#dcc1b9]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#893417] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#893417] animate-pulse"></span>
              1 Urgent Deadline Window (Japan Spring 2027)
            </span>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={scrollToTaxonomy}
              className="px-3 py-1.5 rounded-lg bg-[#ffffff] hover:bg-[#ece7e3] text-[#1c1b19] text-[13px] font-medium transition-colors shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4a6455]">category</span>
              <span>Browse 25-Type Taxonomy</span>
            </button>
            <button
              onClick={onRecompute}
              className="px-3.5 py-1.5 rounded-lg bg-[#893417] text-white text-[13px] font-semibold hover:bg-[#a84b2c] transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              type="button"
            >
              <span>Recompute Matrix</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace Canvas */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Section: Header Overview + Live Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7 space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono-data text-[11px] text-[#893417] uppercase tracking-widest font-semibold">
              <span>MCDA Layer 01</span>
              <span>/</span>
              <span>Portfolio Seeding & Extraction</span>
            </div>
            <h1 className="font-serif-headline text-[32px] sm:text-[40px] font-semibold text-[#1c1b19] tracking-tight leading-tight">
              Travel Goal Portfolio
            </h1>
            <p className="font-sans-body text-[15px] text-[#56423d] max-w-2xl leading-relaxed">
              Deterministic multi-criteria planning anchors trips to lifespan objectives. Capture long-range aspirations, classify them against our 25-archetype taxonomy, and calculate compounding value.
            </p>
          </div>

          {/* Quick Analytical Summary Metrics */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div className="bg-[#f2ede9] p-3.5 rounded-xl space-y-1 shadow-xs border border-[#e6e2de]/60">
              <span className="font-mono-data text-[10px] text-[#56423d] uppercase block">Portfolio Progress</span>
              <div className="font-sans-body text-[20px] text-[#1c1b19] font-bold">64%</div>
              <span className="font-mono-data text-[11px] text-[#4a6455] font-semibold">32/50 UN Nations</span>
            </div>
            <div className="bg-[#f2ede9] p-3.5 rounded-xl space-y-1 shadow-xs border border-[#e6e2de]/60">
              <span className="font-mono-data text-[10px] text-[#56423d] uppercase block">Active Trajectories</span>
              <div className="font-sans-body text-[20px] text-[#1c1b19] font-bold">5 Primary</div>
              <span className="font-mono-data text-[11px] text-[#893417] font-semibold">2 Exceed Budget</span>
            </div>
            <div className="bg-[#f2ede9] p-3.5 rounded-xl space-y-1 shadow-xs border border-[#e6e2de]/60">
              <span className="font-mono-data text-[10px] text-[#56423d] uppercase block">Synergy Bonus</span>
              <div className="font-sans-body text-[20px] text-[#4a6455] font-bold">+3.4x</div>
              <span className="font-mono-data text-[11px] text-[#56423d]">Dual-Goal Multiplier</span>
            </div>
          </div>
        </section>

        {/* Natural Language AI Ingestion Banner (FR2 / Section 6) */}
        <section className="bg-[#f2ede9] rounded-xl p-6 shadow-sm border border-[#e6e2de] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#893417] text-[22px]">auto_fix_high</span>
              <h2 className="font-sans-body text-[18px] text-[#1c1b19] font-semibold">
                Natural Language Goal Ingestion & Taxonomy Parser
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded font-mono-data text-[10px] bg-[#ccead6] text-[#334c3e] font-semibold">
                Deterministic Extraction Active
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded font-mono-data text-[10px] bg-[#ffdf98] text-[#251a00] font-bold">
                FR2 Structured Protocol (Gemini 3.1)
              </span>
            </div>
          </div>

          {/* Interactive Input Bar */}
          <div className="relative flex flex-col md:flex-row items-stretch gap-2 bg-[#ffffff] rounded-lg p-1.5 shadow-inner border border-[#dcc1b9]">
            <div className="flex items-center pl-3 text-[#56423d]">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <input
              className="flex-1 bg-transparent py-2.5 px-2 font-sans-body text-[14px] text-[#1c1b19] focus:outline-none"
              placeholder="Enter a freeform goal (e.g., 'See the Northern lights in Tromsø with parents before winter 2026')..."
              type="text"
              value={nlpInput}
              onChange={(e) => setNlpInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleParseAspiration()}
            />
            <div className="flex items-center gap-1.5 pr-1">
              <button
                onClick={handleParseAspiration}
                disabled={isParsing}
                className="px-4 py-2 bg-[#893417] hover:bg-[#a84b2c] text-white rounded-lg text-[13px] font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isParsing ? 'animate-spin' : ''}`}>
                  {isParsing ? 'refresh' : 'neurology'}
                </span>
                <span>{isParsing ? 'Parsing Aspiration...' : 'Parse Aspiration'}</span>
              </button>
            </div>
          </div>

          {/* Extraction Trace Pipeline Display */}
          <div className="bg-[#32302e] rounded-lg p-4 text-[#f5f0ec] font-mono-data space-y-2 overflow-x-auto shadow-sm">
            <div className="flex items-center justify-between text-[#dcc1b9] text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccead6] animate-ping"></span>
                LLM PARSER TELEMETRY • AST CONVERSION ENGINE (gemini-3.1-flash-lite)
              </span>
              <span className="text-[#eec14b]">Latency: 142ms • Strict Schema v1.4</span>
            </div>
            <p className="font-mono text-[12px] text-[#ffb59e] leading-relaxed break-all">
              {astOutput}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
              {telemetryTags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section: 25-Type Travel Goal Taxonomy Drawer / Quick Chips (Section 8) */}
        <section className="bg-[#f8f3ef] rounded-xl p-6 shadow-sm border border-[#e6e2de] space-y-4" id="taxonomy-section">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span className="font-mono-data text-[11px] text-[#893417] uppercase tracking-wider font-semibold">
                Standard Reference System
              </span>
              <h2 className="font-serif-headline text-[22px] font-semibold text-[#1c1b19]">
                The 25-Type Travel Goal Taxonomy (PRD v1.4)
              </h2>
            </div>
            <span className="font-sans-body text-[13px] text-[#56423d]">
              Classify any objective to derive constraints and phenology
            </span>
          </div>

          {/* Categories & Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans-body text-[13px]">
            {TAXONOMY_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="bg-[#ffffff] p-4 rounded-lg shadow-xs border border-[#e6e2de] space-y-3">
                <div className="flex items-center justify-between text-[15px] text-[#1c1b19] font-semibold">
                  <span>{cat.name}</span>
                  <span className="font-mono-data text-[11px] text-[#4a6455] font-bold">{cat.count}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.types.map((type, tIdx) => {
                    const isSelected = activeTaxonomyFilter === type;
                    return (
                      <button
                        key={tIdx}
                        onClick={() => setActiveTaxonomyFilter(isSelected ? null : type)}
                        className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#893417] text-white font-semibold'
                            : 'bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1c1b19]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Active Portfolio Goal Cards */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono-data text-[11px] text-[#893417] uppercase tracking-wider font-semibold">
                Active Engine Portfolio
              </span>
              <h2 className="font-serif-headline text-[26px] font-semibold text-[#1c1b19]">
                {goals.length} Prioritized Strategic Goals
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddGoalModal(true)}
                className="px-3 py-1.5 rounded-lg bg-[#4a6455] hover:bg-[#334c3e] text-white text-[12px] font-semibold transition-colors inline-flex items-center gap-1 shadow-xs cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Goal</span>
              </button>
            </div>
          </div>

          {/* Goal Cards Stack */}
          <div className="grid grid-cols-1 gap-4">
            {goals.map((goal) => {
              const isUrgent = goal.priority === 5;
              const isDeferred = goal.status === 'deferred';
              return (
                <article
                  key={goal.id}
                  className={`bg-[#ffffff] rounded-xl p-6 shadow-sm border border-[#e6e2de] space-y-4 transition-shadow hover:shadow-md ${
                    isDeferred ? 'opacity-90' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left Header Info */}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isUrgent ? 'bg-[#ffdbd0] text-[#893417]' : isDeferred ? 'bg-[#ffdf98] text-[#644c00]' : 'bg-[#ccead6] text-[#4a6455]'
                      }`}>
                        <span className="material-symbols-outlined text-[28px]">{goal.icon}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded font-mono-data text-[10px] font-semibold ${
                            isUrgent ? 'bg-[#893417] text-white' : 'bg-[#f2ede9] text-[#1c1b19]'
                          }`}>
                            Priority {goal.priority} / 5
                          </span>
                          {goal.urgencyLabel && (
                            <span className={`px-2 py-0.5 rounded font-mono-data text-[10px] font-semibold ${
                              isUrgent ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#f2ede9] text-[#56423d]'
                            }`}>
                              {goal.urgencyLabel}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded font-mono-data text-[10px] bg-[#f2ede9] text-[#1c1b19]">
                            Taxonomy: {goal.taxonomyType}
                          </span>
                        </div>
                        <h3 className="font-sans-body text-[17px] text-[#1c1b19] font-bold">
                          {goal.title}
                        </h3>
                        <p className="font-sans-body text-[13px] text-[#56423d] max-w-3xl leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    {/* Score / Weight badge */}
                    <div className="flex items-center gap-3 shrink-0 bg-[#f8f3ef] px-3.5 py-1.5 rounded-lg border border-[#e6e2de]">
                      <span className="font-mono-data text-[11px] text-[#56423d]">Weight (w):</span>
                      <div className="flex items-center gap-1 text-[#893417]">
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="font-mono-data text-[14px] font-bold">{goal.weight.toFixed(2)}</span>
                      </div>
                      {isDeferred && (
                        <>
                          <span className="text-[#dcc1b9]">|</span>
                          <span className="font-mono-data text-[11px] text-[#ba1a1a] font-semibold">Deferred</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mid Section: Deterministic Factors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                    <div className="bg-[#f8f3ef] p-3 rounded-lg space-y-0.5">
                      <span className="font-mono-data text-[10px] text-[#56423d] block uppercase">Phenology Window</span>
                      <span className="font-sans-body text-[13px] font-semibold text-[#1c1b19] block">{goal.phenologyWindow || 'N/A'}</span>
                      <span className="font-mono-data text-[10px] text-[#4a6455]">Optimal Nature Slot</span>
                    </div>
                    <div className="bg-[#f8f3ef] p-3 rounded-lg space-y-0.5">
                      <span className="font-mono-data text-[10px] text-[#56423d] block uppercase">Hard Deadline</span>
                      <span className="font-sans-body text-[13px] font-semibold text-[#893417] block">{goal.deadline || 'Flexible'}</span>
                      <span className="font-mono-data text-[10px] text-[#56423d]">Lifespan horizon</span>
                    </div>
                    <div className="bg-[#f8f3ef] p-3 rounded-lg space-y-0.5">
                      <span className="font-mono-data text-[10px] text-[#56423d] block uppercase">Compounding Multiplier</span>
                      <span className="font-sans-body text-[13px] font-semibold text-[#4a6455] block">{goal.compoundingMultiplier || '+1 Goal'}</span>
                      <span className="font-mono-data text-[10px] text-[#4a6455]">Cross-archetype value</span>
                    </div>
                    <div className="bg-[#f8f3ef] p-3 rounded-lg space-y-0.5">
                      <span className="font-mono-data text-[10px] text-[#56423d] block uppercase">Budget Envelope</span>
                      <span className={`font-sans-body text-[13px] font-semibold block ${isDeferred ? 'text-[#ba1a1a]' : 'text-[#4a6455]'}`}>
                        {goal.estimatedBudget || 'Under review'}
                      </span>
                      <span className="font-mono-data text-[10px] text-[#56423d]">4-Person midpoint</span>
                    </div>
                  </div>

                  {/* Progress bar if goal has numerical counter (e.g. 50 Countries) */}
                  {goal.progress && (
                    <div className="space-y-1 bg-[#f2ede9] p-3 rounded-lg">
                      <div className="flex items-center justify-between text-[12px] font-semibold">
                        <span className="text-[#1c1b19]">
                          Progress: {goal.progress.current} of {goal.progress.target} {goal.progress.unit} reached
                        </span>
                        <span className="font-mono-data text-[#4a6455] font-bold">
                          {((goal.progress.current / goal.progress.target) * 100).toFixed(1)}% Completed
                        </span>
                      </div>
                      <div className="w-full bg-[#e6e2de] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-[#4a6455] h-2.5 rounded-full transition-all duration-700"
                          style={{ width: `${(goal.progress.current / goal.progress.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Candidate Journey Match Link */}
                  {goal.matchedTrajectory && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 bg-[#f8f3ef] px-4 py-2.5 rounded-lg text-[13px]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#4a6455] text-[18px]">check_circle</span>
                        <span className="text-[#1c1b19]">
                          Candidate Trajectory Matched: <strong className="text-[#893417]">{goal.matchedTrajectory}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigate('next-journey')}
                        className="inline-flex items-center gap-1 font-mono-data text-[11px] text-[#893417] font-semibold hover:underline cursor-pointer"
                        type="button"
                      >
                        <span>Inspect in Next Journey (Step 3)</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Section: Goal Compounding Graph & Synergy Visualization */}
        <section className="bg-[#f8f3ef] rounded-xl p-6 shadow-sm border border-[#e6e2de] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span className="font-mono-data text-[11px] text-[#893417] uppercase tracking-wider font-semibold">
                Core MCDA Mechanism (PRD Section 9)
              </span>
              <h2 className="font-serif-headline text-[22px] font-semibold text-[#1c1b19]">
                Goal Compounding & Multiplier Architecture
              </h2>
            </div>
            <div className="font-mono-data text-[11px] text-[#56423d] bg-[#ffffff] px-3 py-1 rounded-full shadow-xs border border-[#e6e2de]">
              Formula: <span className="font-semibold text-[#893417]">Score = ∑(Weight_i × Match_i) × Multiplier</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trajectory A */}
            <div className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#e6e2de] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4a6455]"></span>
                  <span className="font-sans-body text-[15px] font-semibold text-[#1c1b19]">
                    Candidate Trajectory A: Japan Bloom '27
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#ccead6] text-[#334c3e] font-mono-data text-[11px] font-bold">
                  Compounded Score: 5.60
                </span>
              </div>
              <p className="font-sans-body text-[13px] text-[#56423d] leading-relaxed">
                Simultaneously discharges 3 active strategic goals in a single 14-day holiday envelope without violating budget or calendar windows.
              </p>
              <div className="space-y-2 pt-1 font-sans-body text-[12px]">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[#1c1b19]">Cherry Blossoms Peak Bloom (P5, w=1.0)</span>
                    <span className="font-mono-data text-[#4a6455] font-bold">+1.00</span>
                  </div>
                  <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[#1c1b19]">Family Milestone Before College (P5, w=1.0)</span>
                    <span className="font-mono-data text-[#4a6455] font-bold">+1.00</span>
                  </div>
                  <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[#1c1b19]">50 Countries Milestone (P3, w=0.6)</span>
                    <span className="font-mono-data text-[#4a6455] font-bold">+0.60</span>
                  </div>
                  <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4a6455] h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="pt-1 text-[11px] font-mono-data text-[#4a6455] flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>Synergy Multiplier: 2.15x raw return on annual travel budget</span>
              </div>
            </div>

            {/* Trajectory B */}
            <div className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#e6e2de] space-y-3 opacity-90">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#89726b]"></span>
                  <span className="font-sans-body text-[15px] font-semibold text-[#1c1b19]">
                    Candidate Trajectory B: Cancun All-Inclusive
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#f2ede9] text-[#1c1b19] font-mono-data text-[11px] font-bold">
                  Compounded Score: 1.00
                </span>
              </div>
              <p className="font-sans-body text-[13px] text-[#56423d] leading-relaxed">
                Provides rest and leisure but advances 0 long-term milestones. Consumes 60% of annual budget without ticking any lifespan horizons.
              </p>
              <div className="space-y-2 pt-1 font-sans-body text-[12px]">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[#56423d]">General Rest & Relaxation (P2, w=0.4)</span>
                    <span className="font-mono-data text-[#56423d]">+0.40</span>
                  </div>
                  <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#89726b] h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[#56423d]">50 Countries Milestone (Already Visited Mexico)</span>
                    <span className="font-mono-data text-[#56423d]">0.00</span>
                  </div>
                  <div className="w-full bg-[#f2ede9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#89726b] h-full rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              <div className="pt-1 text-[11px] font-mono-data text-[#56423d] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>Zero Compounding: Treats holiday as transactional rather than strategic</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Progression & Action Ribbon */}
        <section className="bg-[#ece7e3] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-[#dcc1b9]">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono-data text-[11px] text-[#4a6455] uppercase font-bold">
              Step 1 of 5 Completed
            </span>
            <h4 className="font-sans-body text-[18px] text-[#1c1b19] font-bold">
              Travel Goal Portfolio Initialized
            </h4>
            <p className="font-sans-body text-[13px] text-[#56423d]">
              5 Goals locked into memory. Next: Apply real-world constraints (budget, PTO, health horizons).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('travel-reality')}
              className="px-6 py-2.5 rounded-lg bg-[#893417] hover:bg-[#a84b2c] text-white font-sans-body text-[14px] font-semibold transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              type="button"
            >
              <span>Continue to Screen 2: Travel Reality</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form
            onSubmit={handleCreateGoal}
            className="w-full max-w-lg bg-[#fdf8f5] rounded-xl p-6 shadow-2xl border border-[#dcc1b9] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#e6e2de] pb-3">
              <h3 className="font-serif-headline text-[18px] font-semibold text-[#1c1b19]">
                Add Travel Goal
              </h3>
              <button
                type="button"
                onClick={() => setShowAddGoalModal(false)}
                className="text-[#56423d] hover:text-[#1c1b19]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#1c1b19] mb-1 font-mono-data uppercase">
                  Goal Title / Aspiration
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hike the Inca Trail to Machu Picchu"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#dcc1b9] text-[14px] text-[#1c1b19] focus:outline-none focus:border-[#893417]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1c1b19] mb-1 font-mono-data uppercase">
                  Taxonomy Category
                </label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#dcc1b9] text-[14px] text-[#1c1b19] focus:outline-none focus:border-[#893417]"
                >
                  <option value="Phenology & Wonder">Phenology & Wonder</option>
                  <option value="Geographic & Iconic">Geographic & Iconic</option>
                  <option value="Milestone & Clock">Milestone & Clock</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1c1b19] mb-1 font-mono-data uppercase">
                  Priority (1 to 5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newGoalPriority}
                  onChange={(e) => setNewGoalPriority(Number(e.target.value))}
                  className="w-full accent-[#893417]"
                />
                <div className="flex justify-between font-mono-data text-[11px] text-[#56423d]">
                  <span>P1 (Casual)</span>
                  <span className="font-bold text-[#893417]">Priority {newGoalPriority}</span>
                  <span>P5 (Essential Signature)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#e6e2de]">
              <button
                type="button"
                onClick={() => setShowAddGoalModal(false)}
                className="px-4 py-2 bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1c1b19] text-[13px] rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#893417] hover:bg-[#a84b2c] text-white text-[13px] font-semibold rounded-lg cursor-pointer"
              >
                Add Goal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
