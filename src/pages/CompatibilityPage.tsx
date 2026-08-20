import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import type { CompatibilityResult } from '../utils/astroEngine';
import { calculateCompatibility, ZODIAC_SYMBOLS } from '../utils/astroEngine';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Flame,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CompatibilityPage: React.FC = () => {
  const { profile } = useAstro();

  const [partnerName, setPartnerName] = useState('Kabir Mehta');
  const [partnerDob, setPartnerDob] = useState('1997-11-12');
  const [partnerTob, setPartnerTob] = useState('18:20');
  const [copied, setCopied] = useState(false);
  const [unlockedDeep, setUnlockedDeep] = useState(false);

  const [result, setResult] = useState<CompatibilityResult | null>(() => {
    if (!profile) return null;
    return calculateCompatibility(profile, 'Kabir Mehta', '1997-11-12', '18:20');
  });

  if (!profile) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerDob) return;

    const res = calculateCompatibility(profile, partnerName, partnerDob, partnerTob);
    setResult(res);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#7c3aed', '#f59e0b']
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(result?.shareableUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ Check out our Cosmic Bond on AstroLive! We scored ${result?.percentage}% (${result?.totalScore}/36 Gunas - ${result?.verdict})! Check your compatibility here: ${result?.shareableUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="compat-page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: '999px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', color: 'var(--cosmic-secondary-light)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIRAL 36-POINT ASHTAKOOT GUNA MILAN ENGINE</span>
        </div>
        <h1 className="compat-page__title">Cosmic Bond Synastry</h1>
        <p className="compat-page__subtitle">
          Discover magnetic synergy, karmic longevity, and elemental chemistry between your chart and your partner or friend.
        </p>
      </div>

      {/* Input Match Form */}
      <form onSubmit={handleCalculate} className="compat-form" style={{ marginBottom: '3rem' }}>
        {/* Person 1 (User) */}
        <div className="compat-form__panel">
          <div className="compat-form__panel-title">
            <span style={{ color: 'var(--cosmic-primary-light)' }}>Your Chart (Locked)</span>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-cosmic)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 0.75rem' }}>
              {ZODIAC_SYMBOLS[profile.sunSign]}
            </div>
            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{profile.birthDetails.name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {profile.sunSign} Sun • {profile.moonSign} Moon • {profile.risingSign} Lagna
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--cosmic-gold)', marginTop: '0.3rem' }}>
              Nakshatra: {profile.nakshatra.name}
            </div>
          </div>
        </div>

        {/* VS Indicator */}
        <div className="compat-form__vs">
          <div className="compat-form__vs-circle">VS</div>
        </div>

        {/* Person 2 (Partner) */}
        <div className="compat-form__panel">
          <div className="compat-form__panel-title">
            <span style={{ color: 'var(--cosmic-secondary-light)' }}>Partner / Friend Details</span>
          </div>
          <div className="form-group">
            <label className="form-label">Partner's Name</label>
            <input
              type="text"
              className="form-input"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="e.g. Kabir Mehta"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-input"
                value={partnerDob}
                onChange={(e) => setPartnerDob(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time of Birth (Opt)</label>
              <input
                type="time"
                className="form-input"
                value={partnerTob}
                onChange={(e) => setPartnerTob(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="form-submit" style={{ background: 'var(--gradient-cosmic)' }}>
            Calculate Cosmic Bond
          </button>
        </div>
      </form>

      {/* Results Section */}
      {result && (
        <div className="compat-result">
          {/* Animated Score Wheel */}
          <div className="compat-result__score-ring">
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * result.percentage) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            <div className="compat-result__score-value">
              <div className="compat-result__score-number">{result.percentage}%</div>
              <div className="compat-result__score-label">{result.totalScore}/36 Gunas</div>
            </div>
          </div>

          <div style={{ display: 'inline-block', padding: '0.4rem 1.25rem', borderRadius: '999px', background: 'var(--gradient-cosmic-subtle)', border: '1px solid var(--cosmic-border)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#f472b6', marginBottom: '1rem' }}>
            {result.verdict}
          </div>

          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {result.relationshipAdvice}
          </p>

          {/* Elemental Chemistry & Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto 2.5rem', textAlign: 'left' }}>
            <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame className="w-4 h-4 text-pink-400" /> Elemental Synergy
              </h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--cosmic-gold)', fontWeight: 600, marginBottom: '0.35rem' }}>
                {result.elementalChemistry.compatibility} ({result.elementalChemistry.synergyScore}% Synergy)
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {profile.dominantElement} ({profile.birthDetails.name}) & {result.elementalChemistry.person2Dominant} ({result.person2.name}) fuel each other's creative dreams without burning out emotional bandwidth.
              </p>
            </div>

            <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles className="w-4 h-4 text-purple-400" /> Synastry Highlights
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {result.synastryHighlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--cosmic-green)', marginTop: '2px' }}>✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8 Ashtakoot Gunas Deep Breakdown */}
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem' }}>
            8 Koota Vedic Score Breakdown
          </h3>
          <div className="compat-result__breakdown">
            {result.gunaBreakdown.map((g) => (
              <div key={g.name} className="compat-result__factor">
                <div className="compat-result__factor-name">{g.name.split(' ')[0]}</div>
                <div className="compat-result__factor-score" style={{ color: g.obtainedScore === g.maxScore ? 'var(--cosmic-green)' : 'var(--cosmic-gold)' }}>
                  {g.obtainedScore} / {g.maxScore}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                  {g.category}
                </div>
              </div>
            ))}
          </div>

          {/* High-Resolution Viral Share Card (The Virality Engine) */}
          <div className="share-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                  ASTROLIVE COSMIC BOND
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--cosmic-primary-light)', fontFamily: 'var(--font-accent)' }}>
                VERIFIED SYNASTRY
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '1.5rem 0' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gradient-cosmic)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', margin: '0 auto 0.4rem' }}>
                  {ZODIAC_SYMBOLS[profile.sunSign]}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{profile.birthDetails.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{profile.sunSign}</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '2rem', fontWeight: 900, background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {result.percentage}%
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                  {result.verdict}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', margin: '0 auto 0.4rem' }}>
                  {ZODIAC_SYMBOLS[result.person2.sunSign]}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{result.person2.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{result.person2.sunSign}</div>
              </div>
            </div>

            <div className="share-card__actions">
              <button className="share-btn share-btn--whatsapp" onClick={handleShareWhatsApp}>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share WhatsApp</span>
              </button>

              <button className="share-btn share-btn--copy" onClick={handleCopyLink}>
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied URL!' : 'Copy Share Link'}</span>
              </button>
            </div>
          </div>

          {/* Two-Sided Referral Unlock Gate */}
          <div style={{ maxWidth: '600px', margin: '2rem auto', background: 'rgba(124, 58, 237, 0.08)', border: '1px dashed var(--cosmic-border)', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <Lock className="w-6 h-6 text-purple-400" style={{ margin: '0 auto 0.5rem' }} />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Unlock Deep 20-Page Karmic Synastry Report
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Share this link with {result.person2.name}. Once both of you verify your birth spacetime coordinates, unlock the complete planetary aspect matrix for free!
            </p>
            <button
              onClick={() => setUnlockedDeep(!unlockedDeep)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '999px',
                background: unlockedDeep ? 'var(--cosmic-green)' : 'var(--gradient-cosmic)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {unlockedDeep ? '✓ Report Unlocked (Demo Mode)' : 'Simulate Partner Unlock (Referral Loop)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
