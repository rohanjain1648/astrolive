import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { InteractiveBirthChart } from '../components/InteractiveBirthChart3D';
import {
  Sun,
  Moon,
  Compass,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Send,
  PhoneCall,
  Calendar,
  Gem
} from 'lucide-react';
import { ZODIAC_SYMBOLS } from '../utils/astroEngine';

export const DashboardPage: React.FC = () => {
  const { profile, openLiveModal } = useAstro();
  
  // AI Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Namaste ${profile?.birthDetails.name || 'Friend'}! I am your Cosmic DNA Copilot. Looking at your ${profile?.sunSign} Sun and ${profile?.risingSign} Lagna, what area of your life would you like clarity on today?`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!profile) return null;

  const handleSendChat = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || chatInput;
    if (!query.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user' as const, text: query }];
    setChatMessages(newMessages);
    if (!customQuery) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = '';
      const q = query.toLowerCase();

      if (q.includes('career') || q.includes('job') || q.includes('money') || q.includes('wealth')) {
        aiResponse = `With your ${profile.sunSign} Sun placed in harmony with your ${profile.currentDasha.major} Mahadasha, this period favors bold strategic expansion. Your 10th house indicates an upcoming transit shift over the next 45 days. Focus on high-leverage collaborations.`;
      } else if (q.includes('love') || q.includes('marriage') || q.includes('relationship') || q.includes('partner')) {
        aiResponse = `Your ${profile.moonSign} Moon reveals deep emotional empathy. Your 7th house is currently supported by Jupiter's benevolent trine. It's a favorable window for deepening authentic vulnerability with partners.`;
      } else if (q.includes('remedy') || q.includes('gemstone') || q.includes('dosha')) {
        aiResponse = `To balance your planetary currents, your chart specifically benefits from ${profile.mangalDosha.remedy}. Chanting the Gayatri Mantra at sunrise strengthens your Lagna Lord vitality.`;
      } else {
        aiResponse = `According to your ${profile.risingSign} Ascendant and ${profile.nakshatra.name} Nakshatra, your natural archetype is "${profile.cosmicArchetype}". Aligning your daily routine with your cosmic element (${profile.dominantElement}) will amplify your clarity.`;
      }

      setChatMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 900);
  };

  const sampleQuestions = [
    'When is my best career breakthrough period?',
    'What does my active Mahadasha signify?',
    'How can I harmonize my relationship energy?'
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="hero__badge-dot" />
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', color: 'var(--cosmic-primary-light)', letterSpacing: '0.1em' }}>
                COSMIC IDENTITY BLUEPRINT
              </span>
            </div>
            <h1 className="dashboard__name">{profile.birthDetails.name} • {profile.cosmicArchetype}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', marginTop: '0.25rem' }}>
              "{profile.cosmicTagline}"
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => openLiveModal()}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '999px',
                background: 'var(--gradient-cosmic)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Discuss With Astrologer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard__grid">
        {/* Left Column: Big Three, Chart Matrix, Elements */}
        <div className="dashboard__sidebar">
          {/* Big Three Placards */}
          <div className="dash-card">
            <div className="dash-card__header">
              <h3 className="dash-card__title">The Sacred Trine (Big Three)</h3>
              <span className="dash-card__badge">CORE ESSENCE</span>
            </div>

            {/* Sun Sign */}
            <div className="sign-card">
              <div className="sign-card__symbol" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                <Sun className="w-5 h-5" />
              </div>
              <div className="sign-card__info">
                <div className="sign-card__label">Sun Sign (Soul Will)</div>
                <div className="sign-card__value">{profile.sunSign} {ZODIAC_SYMBOLS[profile.sunSign]}</div>
              </div>
            </div>

            {/* Moon Sign */}
            <div className="sign-card">
              <div className="sign-card__symbol" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#c4b5fd' }}>
                <Moon className="w-5 h-5" />
              </div>
              <div className="sign-card__info">
                <div className="sign-card__label">Moon Sign (Emotional Mind)</div>
                <div className="sign-card__value">{profile.moonSign} {ZODIAC_SYMBOLS[profile.moonSign]}</div>
              </div>
            </div>

            {/* Rising Sign */}
            <div className="sign-card">
              <div className="sign-card__symbol" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
                <Compass className="w-5 h-5" />
              </div>
              <div className="sign-card__info">
                <div className="sign-card__label">Ascendant (Lagna / Destiny)</div>
                <div className="sign-card__value">{profile.risingSign} {ZODIAC_SYMBOLS[profile.risingSign]}</div>
              </div>
            </div>

            {/* Nakshatra Card */}
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Birth Nakshatra</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--cosmic-gold)', fontWeight: 600 }}>Pada {profile.nakshatra.pada}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--cosmic-primary-light)', marginTop: '0.2rem' }}>
                {profile.nakshatra.name} ({profile.nakshatra.symbol})
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Lord: {profile.nakshatra.lord} • Deity: {profile.nakshatra.deity}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginTop: '0.35rem', fontStyle: 'italic' }}>
                "{profile.nakshatra.meaning}"
              </div>
            </div>
          </div>

          {/* Elemental Alchemy Breakdown */}
          <div className="dash-card">
            <div className="dash-card__header">
              <h3 className="dash-card__title">Elemental Alchemy</h3>
              <span className="dash-card__badge">{profile.dominantElement} Dominant</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Fire */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f87171' }}>
                    <Flame className="w-3.5 h-3.5" /> Fire (Passion & Will)
                  </span>
                  <span>{profile.elementBreakdown.Fire}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${profile.elementBreakdown.Fire}%`, height: '100%', background: 'linear-gradient(90deg, #ef4444, #f97316)', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Earth */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#34d399' }}>
                    <Mountain className="w-3.5 h-3.5" /> Earth (Structure & Wealth)
                  </span>
                  <span>{profile.elementBreakdown.Earth}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${profile.elementBreakdown.Earth}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Air */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#38bdf8' }}>
                    <Wind className="w-3.5 h-3.5" /> Air (Intellect & Vision)
                  </span>
                  <span>{profile.elementBreakdown.Air}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${profile.elementBreakdown.Air}%`, height: '100%', background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', borderRadius: '999px' }} />
                </div>
              </div>

              {/* Water */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#a78bfa' }}>
                    <Droplets className="w-3.5 h-3.5" /> Water (Intuition & Empathy)
                  </span>
                  <span>{profile.elementBreakdown.Water}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${profile.elementBreakdown.Water}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Kundli, AI Copilot, Dasha Timeline, Remedies */}
        <div className="dashboard__main">
          {/* 3D / Canvas Interactive Kundli Matrix */}
          <InteractiveBirthChart
            planets={profile.planetaryPositions}
            risingSign={profile.risingSign}
            sunSign={profile.sunSign}
            moonSign={profile.moonSign}
          />

          {/* Active Mahadasha & Planetary Energy Meter */}
          <div className="dash-card">
            <div className="dash-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar className="w-4 h-4 text-pink-400" />
                <h3 className="dash-card__title">Active Mahadasha Timeline</h3>
              </div>
              <span className="dash-card__badge" style={{ color: 'var(--cosmic-gold)' }}>
                {profile.currentDasha.major} - {profile.currentDasha.minor} Period
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Karmic Phase: {profile.currentDasha.focusArea}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{profile.currentDasha.startDate} to {profile.currentDasha.endDate}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Under {profile.currentDasha.major} rulership, your chart experiences accelerated maturity in wealth and philosophical alignment. Any remedies undertaken in this window have 2.4x karmic efficacy.
              </p>
            </div>

            {/* Daily Cosmic Energy Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Love & Chemistry</div>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.2rem', fontWeight: 700, color: '#f472b6' }}>{profile.energyScores.love}%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Career Momentum</div>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8' }}>{profile.energyScores.career}%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Vitality / Prana</div>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.2rem', fontWeight: 700, color: '#34d399' }}>{profile.energyScores.health}%</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Intuition Index</div>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24' }}>{profile.energyScores.intuition}%</div>
              </div>
            </div>
          </div>

          {/* "Ask Your Chart" AI Copilot */}
          <div className="chat-panel">
            <div className="chat-panel__header">
              <div className="chat-panel__header-dot" />
              <div className="chat-panel__header-title">Ask Your Chart (AI Astrologer Copilot)</div>
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--cosmic-primary-light)' }}>
                Trained on Vedic Ephemeris
              </span>
            </div>

            <div className="chat-panel__messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-message chat-message--${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="chat-message chat-message--ai" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                </div>
              )}
            </div>

            {/* Quick suggested questions */}
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1.5rem', overflowX: 'auto' }}>
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChat(undefined, q)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--glass-border)',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            <form className="chat-panel__input" onSubmit={(e) => handleSendChat(e)}>
              <input
                type="text"
                className="chat-panel__input-field"
                placeholder="Ask about relationships, wealth, career timing..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="chat-panel__send">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* Actionable Vedic Remedies & Astrological Protection */}
          <div className="dash-card">
            <div className="dash-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Gem className="w-4 h-4 text-amber-400" />
                <h3 className="dash-card__title">Personalized Vedic Remedies</h3>
              </div>
              <span className="dash-card__badge" style={{ color: 'var(--cosmic-green)' }}>AUTHENTIC</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--cosmic-gold)', fontWeight: 600 }}>PRESCRIBED GEMSTONE</div>
                <h4 style={{ fontWeight: 600, margin: '0.25rem 0' }}>Natural Yellow Sapphire / Citrine</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Amplifies Jupiter's wisdom current and fortifies your 9th house of fortune.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.7rem', color: '#f472b6', fontWeight: 600 }}>MANGLIK DOSHA STATUS</div>
                <h4 style={{ fontWeight: 600, margin: '0.25rem 0' }}>{profile.mangalDosha.intensity} Affliction</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {profile.mangalDosha.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
