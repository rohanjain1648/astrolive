import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SmoothScroll } from './components/SmoothScroll';
import { OnboardingModal } from './components/OnboardingModal';
import { LiveAstrologerModal } from './components/LiveAstrologerModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CompatibilityPage } from './pages/CompatibilityPage';
import { RitualPage } from './pages/RitualPage';
import { MarketplacePage } from './pages/MarketplacePage';

export const App: React.FC = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const location = useLocation();

  return (
    <SmoothScroll>
      <div className="app-wrapper">
        {/* Subtle Ambient 3D Three.js Universe & Celestial Rings */}
        <ThreeCanvas />

        {/* Global Navigation */}
        <Navbar onOpenOnboarding={() => setIsOnboardingOpen(true)} />

        {/* Dynamic Route Pages */}
        <main className="main-content">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage onOpenOnboarding={() => setIsOnboardingOpen(true)} />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/compatibility" element={<CompatibilityPage />} />
            <Route path="/ritual" element={<RitualPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
          </Routes>
        </main>

        {/* Onboarding & Spacetime Coordinate Input Modal */}
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />

        {/* 1-Click AI-to-Human Live Astrologer Handover Modal */}
        <LiveAstrologerModal />
      </div>
    </SmoothScroll>
  );
};
export default App;
