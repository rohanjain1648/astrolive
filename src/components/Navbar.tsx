import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Compass, HeartHandshake, CalendarCheck, ShoppingBag, PhoneCall, Zap } from 'lucide-react';
import { useAstro } from '../context/AstroContext';

interface NavbarProps {
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOnboarding }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { streak, xp, rank, openLiveModal } = useAstro();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <Link to="/" className="nav__logo">
        <div className="nav__logo-icon">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <span className="nav__logo-text">ASTROLIVE</span>
          <span style={{ fontSize: '0.65rem', display: 'block', letterSpacing: '0.12em', color: 'var(--cosmic-primary-light)', fontWeight: 600, marginTop: '-3px' }}>
            COSMIC DNA
          </span>
        </div>
      </Link>

      <ul className="nav__links">
        <li>
          <Link
            to="/dashboard"
            className="nav__link"
            style={{ color: location.pathname === '/dashboard' ? 'var(--cosmic-primary-light)' : undefined, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Compass className="w-4 h-4" />
            <span>My Cosmic DNA</span>
          </Link>
        </li>
        <li>
          <Link
            to="/compatibility"
            className="nav__link"
            style={{ color: location.pathname === '/compatibility' ? 'var(--cosmic-secondary-light)' : undefined, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Cosmic Bond (Viral)</span>
          </Link>
        </li>
        <li>
          <Link
            to="/ritual"
            className="nav__link"
            style={{ color: location.pathname === '/ritual' ? 'var(--cosmic-gold)' : undefined, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Daily Ritual</span>
          </Link>
        </li>
        <li>
          <Link
            to="/marketplace"
            className="nav__link"
            style={{ color: location.pathname === '/marketplace' ? 'var(--cosmic-teal)' : undefined, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Remedies & Pro</span>
          </Link>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Streak & XP Gamification Pill */}
        <div
          onClick={() => navigate('/ritual')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--glass-border)',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title={`${xp} XP - ${rank}`}
        >
          <span style={{ fontSize: '0.85rem' }}>🔥</span>
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--cosmic-gold)' }}>
            {streak}d
          </span>
          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--cosmic-teal)' }}>
            {xp} XP
          </span>
        </div>

        {/* Live Astrologer Instant Call Button */}
        <button
          onClick={() => openLiveModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
          <span>Talk Live (₹10/m)</span>
        </button>

        {/* Calculate DNA CTA */}
        <button className="nav__cta" onClick={onOpenOnboarding}>
          Calculate DNA
        </button>
      </div>
    </header>
  );
};
