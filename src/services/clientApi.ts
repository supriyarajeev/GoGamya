import {
  parseTravelGoalWithGemini,
  simulateWhatIfWithThinking,
  generateGroundedRationale,
  ParsedGoalResult,
  WhatIfSimulationResult,
} from '../server/geminiApi';

/**
 * Client service layer that calls server endpoints with seamless local fallback
 */
export async function apiParseGoal(goalText: string): Promise<ParsedGoalResult> {
  try {
    const res = await fetch('/api/gemini/parse-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goalText }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // network or endpoint fallback
  }
  // Call local evaluator directly
  return parseTravelGoalWithGemini(goalText);
}

export async function apiSimulateWhatIf(query: string, profileContext: any): Promise<WhatIfSimulationResult> {
  try {
    const res = await fetch('/api/gemini/what-if', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, profileContext }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // network or endpoint fallback
  }
  return simulateWhatIfWithThinking(query, profileContext);
}

export async function apiGenerateRationale(recommendation: any, goals: any[]): Promise<string> {
  try {
    const res = await fetch('/api/gemini/explain-rationale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recommendation, goals }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.rationale) return data.rationale;
    }
  } catch (e) {
    // fallback
  }
  return generateGroundedRationale(recommendation, goals);
}
