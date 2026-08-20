import React, { useState, useRef } from 'react';
import { useAstro } from '../context/AstroContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCw,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TAROT_CARDS = [
  {
    name: 'The Star (XVIII)',
    significance: 'Hope, Divine Inspiration & Spiritual Renewal',
    guidance: 'Celestial waters flow into your consciousness today. A breakthrough vision regarding your creative calling is ready to be anchored.',
    mantra: 'Om Som Somaya Namah'
  },
  {
    name: 'The Empress (III)',
    significance: 'Fertile Abundance, Magnetism & Creative Harmony',
    guidance: 'Venus casts a golden aura over your communication and relationships today. Trust your sensual and aesthetic instincts.',
    mantra: 'Om Shukraya Namah'
  },
  {
    name: 'The Sun (XIX)',
    significance: 'Radiant Vitality, Clarity & Absolute Success',
    guidance: 'Your inner solar sovereign is fully awakened. Step boldly into the light; obstacles dissolve before your genuine warmth.',
    mantra: 'Om Suryaya Namah'
  },
  {
    name: 'The Wheel of Fortune (X)',
    significance: 'Karmic Shift, Auspicious Timing & Destiny Expansion',
    guidance: 'Jupiter shifts your house of fortune. A spontaneous conversation today opens doors that were closed for months.',
    mantra: 'Om Brihaspataye Namah'
  }
];

export const RitualPage: React.FC = () => {
  const { profile, streak, xp, rank, checkedInToday, doDailyCheckIn, savedMoods, logMood } = useAstro();

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>('Inspired');
  const [selectedEnergy, setSelectedEnergy] = useState<number>(85);
  const [moodNote, setMoodNote] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  if (!profile) return null;

  const currentCard = TAROT_CARDS[cardIndex];

  const handleFlipCard = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      doDailyCheckIn();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fbbf24', '#7c3aed', '#ec4899']
      });
    } else {
      setIsFlipped(false);
      setTimeout(() => {
        setCardIndex((prev) => (prev + 1) % TAROT_CARDS.length);
      }, 300);
    }
  };

  const handleLogMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logMood(selectedMood, selectedEnergy, moodNote);
    setMoodNote('');
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#10b981', '#7c3aed']
    });
  };

  // 432 Hz Planetary Healing Frequency Generator
  const toggleFrequency = () => {
    if (isPlayingAudio) {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 432 Hz Solfeggio Cosmic Harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        setIsPlayingAudio(true);
      } catch (e) {
        console.error('Audio not supported', e);
      }
    }
  };

  return (
    <div className="ritual-page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: '999px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: 'var(--cosmic-gold)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>DAILY HABIT & RETENTION LOOP</span>
        </div>
        <h1 className="ritual-page__title">Your Daily Cosmic Ritual</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Anchor your daily rhythm to celestial cycles. Check in to earn streaks, track transit moods, and unlock free astrologer consultation credits.
        </p>
      </div>

      {/* Gamified Streak & Rank Progress Bar */}
      <div className="streak-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="streak-bar__fire animate-bounce">🔥</div>
          <div>
            <div className="streak-bar__count">{streak} Days</div>
            <div className="streak-bar__label">Active Daily Streak</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'var(--cosmic-border)' }} />

        <div className="streak-bar__xp">
          <div className="streak-bar__xp-value">{xp} XP</div>
          <div className="streak-bar__xp-label">Cosmic Power</div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'var(--cosmic-border)' }} />

        <div style={{ textAlign: 'center' }}>
          <div className="streak-bar__rank">Rank: {rank}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--cosmic-green)', marginTop: '0.25rem' }}>
            {checkedInToday ? '✓ Checked In Today (+50 XP)' : 'Check In Below to Keep Streak!'}
          </div>
        </div>
      </div>

      {/* 3D Daily Cosmic Oracle / Tarot Card Draw */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
          Daily Cosmic Guidance Card
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Click the card to reveal your personalized transit guidance for today.
        </p>
      </div>

      <div
        className={`daily-card ${isFlipped ? 'daily-card--flipped' : ''}`}
        onClick={handleFlipCard}
        style={{ maxWidth: '420px', margin: '0 auto 2.5rem', minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="daily-card__inner" style={{ width: '100%' }}>
          {/* Card Front (Unrevealed) */}
          <div className="daily-card__front">
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-cosmic)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}>
              ✦
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Touch To Reveal Today's Energy
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Synthesizing current Moon transit over your {profile.risingSign} Lagna...
            </p>
            <div style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--cosmic-gold)', fontWeight: 600 }}>
              <Sparkles className="w-3.5 h-3.5" /> +50 XP Reward Inside
            </div>
          </div>

          {/* Card Back (Revealed) */}
          <div className="daily-card__back" style={{ textAlign: 'left', background: 'rgba(18, 18, 42, 0.9)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid var(--cosmic-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--cosmic-gold)', fontFamily: 'var(--font-accent)', fontWeight: 700 }}>
                ORACLE DECREE
              </span>
              <RotateCw className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--cosmic-primary-light)' }}>
              {currentCard.name}
            </h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--cosmic-gold)', fontWeight: 600, margin: '0.25rem 0 0.75rem' }}>
              {currentCard.significance}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              "{currentCard.guidance}"
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.85rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Daily Transit Mantra:</span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--cosmic-teal)', fontWeight: 600 }}>{currentCard.mantra}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 432 Hz Ambient Harmonic Generator */}
      <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.2)', color: 'var(--cosmic-teal)' }}>
            {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>432 Hz Solfeggio Planetary Frequency</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Calibrates prana with current Jupiter-Venus harmony.</p>
          </div>
        </div>

        <button
          onClick={toggleFrequency}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: isPlayingAudio ? 'var(--cosmic-teal)' : 'rgba(255,255,255,0.05)',
            color: isPlayingAudio ? '#000' : 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {isPlayingAudio ? 'Pause Sound' : 'Play Sound'}
        </button>
      </div>

      {/* Daily Mood & Planetary Transit Correlation Tracker */}
      <div className="journal-entry" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Moon className="w-4 h-4 text-purple-400" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600 }}>
            Cosmic Mood & Transit Journal
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Log how you feel. AstroLive's AI correlates your emotional fluctuations with real-time planetary transits.
        </p>

        {/* Mood Selector Buttons */}
        <div className="mood-selector" style={{ margin: '1rem 0' }}>
          {[
            { label: 'Inspired', icon: '✨' },
            { label: 'Grounded', icon: '🌿' },
            { label: 'Reflective', icon: '🌙' },
            { label: 'Energetic', icon: '⚡' },
            { label: 'Anxious', icon: '🌊' }
          ].map((m) => (
            <button
              key={m.label}
              type="button"
              className={`mood-btn ${selectedMood === m.label ? 'mood-btn--selected' : ''}`}
              onClick={() => setSelectedMood(m.label)}
              title={m.label}
            >
              <span>{m.icon}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogMoodSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              <span>Energy Level: {selectedEnergy}%</span>
              <span>{selectedMood}</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={selectedEnergy}
              onChange={(e) => setSelectedEnergy(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--cosmic-primary)' }}
            />
          </div>

          <textarea
            className="journal-textarea"
            placeholder="What thoughts or synchronicities did you notice today?"
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
          />

          <button type="submit" className="form-submit" style={{ marginTop: '1rem' }}>
            Log Reflection (+30 XP)
          </button>
        </form>

        {/* Saved Mood History with AI Transit Correlation */}
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            Past Transit Correlations
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {savedMoods.map((entry, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{entry.mood} • {entry.energy}% Energy</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{entry.date}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.35rem 0' }}>"{entry.note}"</p>
                <div style={{ fontSize: '0.7rem', color: 'var(--cosmic-primary-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Sparkles className="w-3 h-3" />
                  <span>Transit Insight: {entry.transitCorrelation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
