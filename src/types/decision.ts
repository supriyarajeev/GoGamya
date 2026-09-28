export type ScreenId = 
  | 'travel-goals' 
  | 'travel-reality' 
  | 'next-journey' 
  | 'what-if-replanning' 
  | 'progress-history';

export interface TravelGoal {
  id: string;
  title: string;
  description: string;
  category: 'Geographic & Iconic' | 'Phenology & Wonder' | 'Milestone & Clock';
  taxonomyType: string;
  priority: number; // 1 to 5
  weight: number; // 0.0 to 1.0
  urgencyLabel?: string;
  phenologyWindow?: string;
  deadline?: string;
  compoundingMultiplier?: string;
  estimatedBudget?: string;
  matchedTrajectory?: string;
  status: 'active' | 'completed' | 'deferred' | 'pruned';
  progress?: {
    current: number;
    target: number;
    unit: string;
  };
  flag?: string;
  icon: string;
}

export interface ConstraintProfile {
  runId: string;
  version: string;
  annualBudget: number; // e.g. 14000
  budgetCeiling: number;
  availablePTO: number; // e.g. 20
  usedPTO: number; // e.g. 9
  pointsReserve: number; // e.g. 180000
  pointsValuePerPoint: number; // e.g. 0.012
  originHub: string; // "SFO"
  adultsCount: number; // 2
  teensAges: number[]; // [12, 15]
  pacePreference: 'Relaxed' | 'Moderate' | 'High-Exertion';
  maxAltitude: number; // 2800
  collegeDeadlineYears: number; // 2.5
  springWindowsLeft: number; // 3
  winterWindowsLeft: number; // 3
  activeWindows: string[]; // ['March', 'December']
}

export interface CandidateJourney {
  id: string;
  rank: number;
  title: string;
  destination: string;
  window: string;
  durationDays: number;
  travelersCount: number;
  origin: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  midpointCost: number;
  ptoDays: number;
  mcdaScore: number;
  status: 'recommended' | 'alternative' | 'pruned';
  images: {
    url: string;
    caption: string;
    alt: string;
  }[];
  factors: {
    goalImpact: { raw: number; score: number; weight: number; label: string; details: string };
    urgencyFit: { raw: number; score: number; weight: number; label: string; details: string };
    timingFit: { raw: number; score: number; weight: number; label: string; details: string };
    preferenceFit: { raw: number; score: number; weight: number; label: string; details: string };
    budgetFit: { raw: number; score: number; weight: number; label: string; details: string };
    tradeoffPenalty: { deduction: number; label: string; details: string };
  };
  paretoAdvantage: string;
  tradeoffSummary: string;
  auroraProb?: number;
  teenEngagementFit?: number;
}

export interface GatedEligibilityItem {
  id: string;
  title: string;
  authority: string;
  windowInfo: string;
  leadTime: string;
  status: string;
  description: string;
  canDraw?: boolean;
  outcome?: 'won' | 'lost' | 'pending';
}

export interface DecisionRun {
  runId: string;
  timestamp: string;
  triggerContext: string;
  triggerDetails: string;
  activeRecommendation: string;
  score: number | string;
  frontier: string;
  stateHash: string;
  isFulfilled?: boolean;
  isActive?: boolean;
}
