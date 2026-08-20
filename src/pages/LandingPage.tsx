import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Sparkles,
  Compass,
  HeartHandshake,
  CalendarCheck,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Cpu,
  Share2
} from 'lucide-react';
import { useAstro } from '../context/AstroContext';

interface LandingPageProps {
  onOpenOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenOnboarding }) => {
  const navigate = useNavigate();
  const { openLiveModal } = useAstro();
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    // Subtle floating animation for cards
    gsap.to('.floating-card', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4
    });
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero__content">
          <div className="hero__badge" ref={badgeRef}>
            <span className="hero__badge-dot" />
            <span>AstroLive 2.0 • AI-Powered Growth Engine</span>
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="hero__title-line">Beyond Horoscopes.</span>
            <span className="hero__title-line hero__title-gradient">Your Living Cosmic DNA.</span>
          </h1>

          <p className="hero__subtitle" ref={subtitleRef}>
            Transforming astrology from a one-time transaction into a hyper-personalized daily habit, structural viral growth loop, and AI-assisted consultation ecosystem.
          </p>

          <div className="hero__actions" ref={actionsRef}>
            <button className="hero__btn-primary" onClick={onOpenOnboarding}>
              <Sparkles className="w-5 h-5" />
              <span>Decode My Cosmic DNA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="hero__btn-secondary" onClick={() => navigate('/compatibility')}>
              <HeartHandshake className="w-4 h-4 text-pink-400" />
              <span>Check Viral Compatibility</span>
            </button>
          </div>

          <div className="hero__stats" ref={statsRef}>
            <div className="hero__stat">
              <div className="hero__stat-value">3.8x</div>
              <div className="hero__stat-label">Higher D30 Retention</div>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <div className="hero__stat-value">0.42</div>
              <div className="hero__stat-label">Viral K-Factor (Organic)</div>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <div className="hero__stat-value">₹240+</div>
              <div className="hero__stat-label">Projected ARPU</div>
            </div>
          </div>
        </div>

        <div className="hero__scroll">
          <span className="hero__scroll-text">Explore The Engine</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* AstroLive Teardown & Growth Solution Comparison */}
      <section className="section" style={{ background: 'rgba(10, 10, 26, 0.6)' }}>
        <div className="section__header">
          <span className="section__label">Problem Diagnosis & Teardown</span>
          <h2 className="section__title">Why Traditional Astrology Platforms Stall</h2>
          <p className="section__subtitle">
            AstroLive currently operates as a per-minute consultation marketplace. Here is how Cosmic DNA unlocks structural viral loops and continuous LTV.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--glass-bg)', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Growth Pillar</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AstroLive Current State</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontSize: '0.85rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cosmic DNA 2.0 Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span>Viral Acquisition (K-Factor)</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  100% reliant on paid performance ads (Meta/Google). Zero organic peer sharing loops.
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                  <strong>Cosmic Bond Engine:</strong> Two-sided compatibility sharing cards with Instagram/WhatsApp export & unlock gates.
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CalendarCheck className="w-4 h-4 text-amber-400" />
                    <span>User Retention & DAU</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  High churn. Users consult during crises, then disappear for months.
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                  <strong>Daily Cosmic Ritual:</strong> Gamified check-in streaks, XP ranks, Moon mood tracker & transit correlation insights.
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Cpu className="w-4 h-4 text-pink-400" />
                    <span>Unique Selling Proposition (USP)</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Standard astrologer directory — virtually indistinguishable from AstroTalk or InstaAstro.
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                  <strong>AI Chart Intelligence:</strong> Storytelling birth profile, 3D interactive Kundli matrix & 1-Click briefing handover to astrologers.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShoppingBag className="w-4 h-4 text-cyan-400" />
                    <span>Monetization Beyond Calls</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Per-minute call billing only. Astrologers waste 10 min on basic chart intake.
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                  <strong>Multi-Tier Monetization:</strong> Pro subscriptions (₹149/mo), certified gemstone remedies, and live pooja streaming.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4 Pillars Interactive Showcase */}
      <section className="section features">
        <div className="section__header">
          <span className="section__label">Strategic Architecture</span>
          <h2 className="section__title">The 4 Engines of Exponential Growth</h2>
          <p className="section__subtitle">
            Every feature is engineered around a core business metric: K-factor, DAU/MAU ratio, LTV/CAC ratio, and consultation conversion.
          </p>
        </div>

        <div className="features__grid">
          <div className="feature-card floating-card" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="feature-card__icon feature-card__icon--purple">
              <Compass className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="feature-card__title">1. AI Birth Chart Intelligence</h3>
            <p className="feature-card__desc">
              Turns dense Kundli data into a captivating, interactive story. Real-time sidereal calculations, Dasha timelines, and 24/7 "Ask Your Chart" AI Copilot.
            </p>
            <div className="feature-card__tag feature-card__tag--usp">Defensible USP</div>
          </div>

          <div className="feature-card floating-card" onClick={() => navigate('/compatibility')} style={{ cursor: 'pointer' }}>
            <div className="feature-card__icon feature-card__icon--pink">
              <Share2 className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="feature-card__title">2. Viral "Cosmic Bond" Engine</h3>
            <p className="feature-card__desc">
              Scan compatibility with anyone via a shareable link. Generates high-res Instagram Story cards with 36-point Ashtakoot Guna Milan and two-sided unlock rewards.
            </p>
            <div className="feature-card__tag feature-card__tag--viral">Structural Virality</div>
          </div>

          <div className="feature-card floating-card" onClick={() => navigate('/ritual')} style={{ cursor: 'pointer' }}>
            <div className="feature-card__icon feature-card__icon--gold">
              <CalendarCheck className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="feature-card__title">3. Daily Habit & Gamification Loop</h3>
            <p className="feature-card__desc">
              Daily tarot draw, streak multipliers, Moon mood tracker with transit correlation, and audio soundscapes. Transforms casual browsers into daily active rituals.
            </p>
            <div className="feature-card__tag feature-card__tag--retention">Habit Retention</div>
          </div>

          <div className="feature-card floating-card" onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer' }}>
            <div className="feature-card__icon feature-card__icon--teal">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="feature-card__title">4. Astro-Commerce & Pro SaaS</h3>
            <p className="feature-card__desc">
              AI-prescribed certified gemstones, live pooja booking, and recurring Cosmic DNA Pro subscriptions (₹149/mo) creating high-margin diversified revenue.
            </p>
            <div className="feature-card__tag feature-card__tag--revenue">New Monetization</div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section how-it-works" style={{ background: 'rgba(6,6,15,0.7)' }}>
        <div className="section__header">
          <span className="section__label">Frictionless Onboarding</span>
          <h2 className="section__title">From Spacetime Coordinates to Cosmic Clarity</h2>
          <p className="section__subtitle">
            Zero friction, instant value delivery within 10 seconds of landing.
          </p>
        </div>

        <div className="how-it-works__steps">
          <div className="how-it-works__step">
            <div className="how-it-works__step-number">01</div>
            <div className="how-it-works__step-icon">🪐</div>
            <h3 className="how-it-works__step-title">Input Spacetime Anchor</h3>
            <p className="how-it-works__step-desc">
              Enter Name, Date, Time, and City. Our sidereal engine aligns the exact astronomical planetary degrees.
            </p>
          </div>

          <div className="how-it-works__step">
            <div className="how-it-works__step-number">02</div>
            <div className="how-it-works__step-icon">🧬</div>
            <h3 className="how-it-works__step-title">Generate Cosmic DNA</h3>
            <p className="how-it-works__step-desc">
              Instant 3D Kundli mandala, Sun/Moon/Lagna breakdown, active Dasha period, and personalized remedies.
            </p>
          </div>

          <div className="how-it-works__step">
            <div className="how-it-works__step-number">03</div>
            <div className="how-it-works__step-icon">🔥</div>
            <h3 className="how-it-works__step-title">Engage Daily & Share</h3>
            <p className="how-it-works__step-desc">
              Build daily check-in streaks, match synastry with friends, or seamlessly escalate to top verified astrologers.
            </p>
          </div>
        </div>
      </section>

      {/* Live Astrologer Handover Teaser */}
      <section className="section" style={{ background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'var(--glass-bg)', border: '1px solid var(--cosmic-border)', borderRadius: '1.5rem', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '999px', background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
              <Sparkles className="w-3.5 h-3.5" /> High-Efficiency Live Consultations
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
              1-Click AI-to-Human Handover
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              When users need human guidance, their entire Cosmic DNA profile, planetary transits, and AI chat history are instantly synthesized and forwarded to the Astrologer. No 10-minute intake delay — instant high-value advice.
            </p>
            <button
              onClick={() => openLiveModal()}
              style={{
                padding: '0.85rem 1.75rem',
                borderRadius: '999px',
                background: 'var(--gradient-cosmic)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <span>Preview Astrologer Handover</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-cosmic)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                🧘‍♂️
              </div>
              <div>
                <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Verified Astrologer Dashboard</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--cosmic-green)' }}>● Incoming Call: Arya Sharma (Ready)</p>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem', fontFamily: 'monospace', color: 'var(--cosmic-primary-light)' }}>
              <div>[EPHEMERIS BRIEF]: Taurus Sun • Scorpio Moon • Gemini Lagna</div>
              <div style={{ marginTop: '0.25rem' }}>[ACTIVE TRANSIT]: Jupiter 11H trine Lagna Lord</div>
              <div style={{ marginTop: '0.25rem' }}>[USER QUERY]: Career shift timing & foreign relocation</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-section__bg-glow" />
        <h2 className="cta-section__title">Ready to Experience the Future of AstroLive?</h2>
        <p className="cta-section__subtitle">
          Join thousands decoding their cosmic architecture with precision Vedic intelligence.
        </p>
        <button className="hero__btn-primary" onClick={onOpenOnboarding}>
          <Sparkles className="w-5 h-5" />
          <span>Generate Free Cosmic DNA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__brand-icon">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="footer__brand-text">AstroLive Cosmic DNA • Hackathon Edition</span>
          </div>

          <ul className="footer__links">
            <li className="footer__link" onClick={() => navigate('/dashboard')}>My DNA</li>
            <li className="footer__link" onClick={() => navigate('/compatibility')}>Cosmic Bond</li>
            <li className="footer__link" onClick={() => navigate('/ritual')}>Daily Ritual</li>
            <li className="footer__link" onClick={() => navigate('/marketplace')}>Astro-Commerce</li>
          </ul>

          <div className="footer__copyright">
            © 2026 Tech4Billion Media Pvt. Ltd. Engineered for Scale.
          </div>
        </div>
      </footer>
    </div>
  );
};
