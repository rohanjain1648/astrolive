import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAstro } from '../context/AstroContext';
import { Sparkles, X, MapPin, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { createProfile } = useAstro();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dob: '1999-07-24',
    tob: '14:45',
    pob: 'New Delhi, India',
    gender: 'Female'
  });

  const [isCalculating, setIsCalculating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setIsCalculating(true);

    setTimeout(() => {
      createProfile(formData);
      setIsCalculating(false);
      onClose();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#ec4899', '#f59e0b', '#06b6d4']
      });

      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="modal-overlay modal-overlay--active" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ padding: '0.35rem', borderRadius: '8px', background: 'var(--gradient-cosmic)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--cosmic-primary-light)', fontWeight: 600 }}>
            SIDEREAL ASTROLOGY ENGINE
          </span>
        </div>

        <h3 className="modal__title">Decode Your Cosmic DNA</h3>
        <p className="modal__subtitle">
          Enter your precise birth spacetime coordinates to unlock your personalized Vedic natal chart, Dasha timeline, and AI cosmic copilot.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User className="w-3.5 h-3.5 text-purple-400" /> Full Name
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Rohan Verma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar className="w-3.5 h-3.5 text-pink-400" /> Date of Birth
              </label>
              <input
                type="date"
                className="form-input"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Time of Birth
              </label>
              <input
                type="time"
                className="form-input"
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Birthplace (City, Country)
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Mumbai, Maharashtra"
              value={formData.pob}
              onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="form-submit" disabled={isCalculating}>
            {isCalculating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span className="animate-spin">✦</span> Aligning Vedic Ephemeris...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span>Generate Cosmic DNA</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
