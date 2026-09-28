import React, { useState } from 'react';
import { ScreenId, ConstraintProfile, TravelGoal } from './types/decision';
import { INITIAL_PROFILE, INITIAL_GOALS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExportModal } from './components/ExportModal';
import { Screen1TravelGoals } from './components/Screen1TravelGoals';
import { Screen2TravelReality } from './components/Screen2TravelReality';
import { Screen3NextJourney } from './components/Screen3NextJourney';
import { Screen4WhatIfReplanning } from './components/Screen4WhatIfReplanning';
import { Screen5ProgressHistory } from './components/Screen5ProgressHistory';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('travel-goals');
  const [profile, setProfile] = useState<ConstraintProfile>(INITIAL_PROFILE);
  const [goals, setGoals] = useState<TravelGoal[]>(INITIAL_GOALS);
  const [isRecomputing, setIsRecomputing] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRecompute = () => {
    setIsRecomputing(true);
    showToast('Recomputing MCDA Decision Matrix across 14 candidate vectors...');
    setTimeout(() => {
      setIsRecomputing(false);
      showToast('✓ MCDA Model converged. Top frontier: Japan (Score 0.58).');
    }, 750);
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = (newProfile: ConstraintProfile) => {
    setProfile(newProfile);
    showToast('Constraint Ledger updated. Re-evaluating candidate filters.');
  };

  const handleSetWhatIfQuery = (_q: string) => {
    handleNavigate('what-if-replanning');
  };

  const handleSaveToHistory = () => {
    showToast('Decision state saved to run audit trail.');
    handleNavigate('progress-history');
  };

  const handleCommitDecision = (winnerTitle: string) => {
    showToast(`✓ Committed: ${winnerTitle}. Portfolio reconciled.`);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#1c1917] flex flex-col font-sans selection:bg-[#735c3c]/20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1c1917] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#e6e2de]/20 text-xs font-mono flex items-center space-x-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenExport={() => setIsExportOpen(true)}
        onRecompute={handleRecompute}
        isRecomputing={isRecomputing}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 sm:pt-24 pb-12">
        {currentScreen === 'travel-goals' && (
          <Screen1TravelGoals
            onNavigate={handleNavigate}
            onRecompute={handleRecompute}
          />
        )}

        {currentScreen === 'travel-reality' && (
          <Screen2TravelReality
            onNavigate={handleNavigate}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentScreen === 'next-journey' && (
          <Screen3NextJourney
            onNavigate={handleNavigate}
            onSetWhatIfQuery={handleSetWhatIfQuery}
            onSaveToHistory={handleSaveToHistory}
          />
        )}

        {currentScreen === 'what-if-replanning' && (
          <Screen4WhatIfReplanning
            onNavigate={handleNavigate}
            profile={profile}
            onCommitDecision={handleCommitDecision}
          />
        )}

        {currentScreen === 'progress-history' && (
          <Screen5ProgressHistory
            onNavigate={handleNavigate}
            onOpenExport={() => setIsExportOpen(true)}
            goals={goals}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Google Sheets & Drive Export Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
