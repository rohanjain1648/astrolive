import React, { createContext, useContext, useState } from 'react';
import type { CosmicProfile, BirthDetails } from '../utils/astroEngine';
import { generateCosmicDNA } from '../utils/astroEngine';

interface AstroContextType {
  profile: CosmicProfile | null;
  hasProfile: boolean;
  createProfile: (details: BirthDetails) => CosmicProfile;
  streak: number;
  xp: number;
  rank: string;
  checkedInToday: boolean;
  doDailyCheckIn: () => void;
  savedMoods: Array<{ date: string; mood: string; energy: number; note: string; transitCorrelation: string }>;
  logMood: (mood: string, energy: number, note: string) => void;
  openLiveModal: (astrologerId?: string) => void;
  closeLiveModal: () => void;
  isLiveModalOpen: boolean;
  selectedAstrologer: any | null;
}

const DEFAULT_BIRTH: BirthDetails = {
  name: 'Arya Sharma',
  dob: '1998-05-18',
  tob: '08:30',
  pob: 'Bengaluru, India',
  gender: 'Female'
};

const AstroContext = createContext<AstroContextType | undefined>(undefined);

export const AstroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CosmicProfile | null>(() => {
    const saved = localStorage.getItem('astrolive_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return generateCosmicDNA(DEFAULT_BIRTH);
      }
    }
    // Default initial profile for quick preview
    return generateCosmicDNA(DEFAULT_BIRTH);
  });

  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem('astrolive_streak') || '5', 10);
  });

  const [xp, setXp] = useState<number>(() => {
    return parseInt(localStorage.getItem('astrolive_xp') || '480', 10);
  });

  const [checkedInToday, setCheckedInToday] = useState<boolean>(() => {
    const lastCheckIn = localStorage.getItem('astrolive_last_checkin');
    return lastCheckIn === new Date().toISOString().slice(0, 10);
  });

  const [savedMoods, setSavedMoods] = useState<Array<{ date: string; mood: string; energy: number; note: string; transitCorrelation: string }>>(() => {
    const saved = localStorage.getItem('astrolive_moods');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { date: 'Yesterday', mood: 'Calm', energy: 85, note: 'Deep focus on creative work', transitCorrelation: 'Moon transiting 5th house of intellect & arts' },
      { date: '2 days ago', mood: 'Energetic', energy: 95, note: 'Breakthrough team meeting', transitCorrelation: 'Sun conjunct Mercury in 10th house of career' }
    ];
  });

  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState<any | null>(null);

  // Derive Rank from XP
  const rank = xp > 1200 ? 'Cosmic Oracle' : xp > 700 ? 'Stardust Adept' : xp > 300 ? 'Celestial Voyager' : 'Astral Neophyte';

  const createProfile = (details: BirthDetails) => {
    const newProfile = generateCosmicDNA(details);
    setProfile(newProfile);
    localStorage.setItem('astrolive_profile', JSON.stringify(newProfile));
    setXp((prev) => {
      const next = prev + 100;
      localStorage.setItem('astrolive_xp', next.toString());
      return next;
    });
    return newProfile;
  };

  const doDailyCheckIn = () => {
    if (checkedInToday) return;
    const newStreak = streak + 1;
    const newXp = xp + 50;
    setStreak(newStreak);
    setXp(newXp);
    setCheckedInToday(true);
    localStorage.setItem('astrolive_streak', newStreak.toString());
    localStorage.setItem('astrolive_xp', newXp.toString());
    localStorage.setItem('astrolive_last_checkin', new Date().toISOString().slice(0, 10));
  };

  const logMood = (mood: string, energy: number, note: string) => {
    const correlation = profile?.sunSign === 'Aries' || profile?.sunSign === 'Leo' || profile?.sunSign === 'Sagittarius'
      ? 'Mars high-vibe aspect amplifying natural solar momentum'
      : 'Venus-Jupiter trine restoring restorative inner balance';

    const newEntry = {
      date: 'Today',
      mood,
      energy,
      note: note || 'Cosmic reflection logged.',
      transitCorrelation: correlation
    };

    const updated = [newEntry, ...savedMoods];
    setSavedMoods(updated);
    localStorage.setItem('astrolive_moods', JSON.stringify(updated));

    setXp((prev) => {
      const next = prev + 30;
      localStorage.setItem('astrolive_xp', next.toString());
      return next;
    });
  };

  const openLiveModal = (astrologer?: any) => {
    setSelectedAstrologer(astrologer || {
      name: 'Acharya Devdutt',
      title: 'Vedic & KP Astrology Master',
      experience: '18+ Yrs',
      rating: '4.98',
      reviews: '12,400+',
      rate: '₹15/min',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      languages: 'English, Hindi, Sanskrit'
    });
    setIsLiveModalOpen(true);
  };

  const closeLiveModal = () => {
    setIsLiveModalOpen(false);
  };

  return (
    <AstroContext.Provider
      value={{
        profile,
        hasProfile: !!profile,
        createProfile,
        streak,
        xp,
        rank,
        checkedInToday,
        doDailyCheckIn,
        savedMoods,
        logMood,
        openLiveModal,
        closeLiveModal,
        isLiveModalOpen,
        selectedAstrologer
      }}
    >
      {children}
    </AstroContext.Provider>
  );
};

export const useAstro = () => {
  const context = useContext(AstroContext);
  if (!context) throw new Error('useAstro must be used within an AstroProvider');
  return context;
};
