import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import { X, PhoneCall, MessageSquare, ShieldCheck, Star, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const LiveAstrologerModal: React.FC = () => {
  const { isLiveModalOpen, closeLiveModal, selectedAstrologer, profile } = useAstro();
  const [callState, setCallState] = useState<'preview' | 'connecting' | 'connected'>('preview');

  if (!isLiveModalOpen || !selectedAstrologer) return null;

  const handleStartConsultation = () => {
    setCallState('connecting');
    setTimeout(() => {
      setCallState('connected');
    }, 2000);
  };

  return (
    <div className="modal-overlay modal-overlay--active" onClick={closeLiveModal}>
      <div className="modal" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={closeLiveModal}>
          <X className="w-5 h-5" />
        </button>

        {callState === 'preview' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.3rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                <PhoneCall className="w-4 h-4" />
              </div>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', color: '#f87171', fontWeight: 600 }}>
                1-CLICK AI-TO-HUMAN HANDOVER
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
              <img
                src={selectedAstrologer.image}
                alt={selectedAstrologer.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--cosmic-primary)' }}
              />
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700 }}>{selectedAstrologer.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedAstrologer.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', fontSize: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--cosmic-gold)' }}>
                    <Star className="w-3.5 h-3.5 fill-current" /> {selectedAstrologer.rating} ({selectedAstrologer.reviews})
                  </span>
                  <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                  <span style={{ color: 'var(--cosmic-green)' }}>{selectedAstrologer.experience}</span>
                </div>
              </div>
            </div>

            {/* Smart Context Handover Capsule */}
            <div style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid var(--cosmic-border)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--cosmic-primary-light)', fontWeight: 600, marginBottom: '0.4rem' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Injected Cosmic DNA Briefing</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Astrologer will instantly receive your <strong>{profile?.sunSign} Sun</strong>, <strong>{profile?.risingSign} Lagna</strong>, and active <strong>{profile?.currentDasha.major} Dasha</strong> so your session focuses on solutions immediately without 10 minutes of intake overhead!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <button
                onClick={handleStartConsultation}
                style={{
                  padding: '0.85rem',
                  borderRadius: '0.75rem',
                  background: 'var(--gradient-cosmic)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Audio Call ({selectedAstrologer.rate})</span>
              </button>

              <button
                onClick={handleStartConsultation}
                style={{
                  padding: '0.85rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <MessageSquare className="w-4 h-4 text-pink-400" />
                <span>Live Chat (₹10/min)</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Encrypted & Anonymous • 3-Min Moneyback Guarantee</span>
            </div>
          </>
        )}

        {callState === 'connecting' && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div className="loading-spinner" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginTop: '1rem' }}>
              Connecting with {selectedAstrologer.name}...
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Transmitting your natal chart ephemeris & Dasha matrix...
            </p>
          </div>
        )}

        {callState === 'connected' && (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Live Session Active</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#34d399', fontFamily: 'var(--font-accent)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
              <Clock className="w-4 h-4 animate-spin" />
              <span>00:14 • Connected to {selectedAstrologer.name}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
              "Namaste {profile?.birthDetails.name}! I am looking at your {profile?.risingSign} Lagna and {profile?.currentDasha.major} Mahadasha right now..."
            </p>
            <button
              onClick={() => { setCallState('preview'); closeLiveModal(); }}
              style={{ padding: '0.7rem 1.5rem', borderRadius: '999px', background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}
            >
              End Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
