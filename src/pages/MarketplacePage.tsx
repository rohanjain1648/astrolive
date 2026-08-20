import React, { useState } from 'react';
import { useAstro } from '../context/AstroContext';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

const REMEDIES = [
  {
    id: 'yellow-sapphire',
    name: 'Certified Natural Yellow Sapphire (Pukhraj)',
    category: 'Gemstones',
    rating: '4.98',
    reviews: '3,820',
    price: '₹4,999',
    originalPrice: '₹7,999',
    description: 'Energized at Varanasi ghats. Fortifies your Jupiter current to invite career breakthroughs and financial growth.',
    icon: '💎',
    badge: 'AI PRESCRIBED'
  },
  {
    id: 'rudraksha-5mukhi',
    name: 'Authentic 5-Mukhi Nepali Rudraksha Mala',
    category: 'Sacred Beads',
    rating: '4.95',
    reviews: '2,140',
    price: '₹1,299',
    originalPrice: '₹1,999',
    description: 'Strung in pure silver with lab certificate. Calms nervous mental activity and balances Rahu-Ketu axis.',
    icon: '📿',
    badge: 'BESTSELLER'
  },
  {
    id: 'mahamrityunjaya-pooja',
    name: 'Personalized Maha Mrityunjaya Live Pooja',
    category: 'Live Poojas',
    rating: '4.99',
    reviews: '1,490',
    price: '₹2,499',
    originalPrice: '₹3,499',
    description: 'Performed with your exact Gotra and birth details at Trimbakeshwar. Includes live video streaming & home prasad.',
    icon: '🔥',
    badge: 'HIGH IMPACT'
  },
  {
    id: 'shree-yantra',
    name: '24K Gold-Plated Meru Shree Yantra',
    category: 'Sacred Geometry',
    rating: '4.92',
    reviews: '980',
    price: '₹1,899',
    originalPrice: '₹2,699',
    description: 'Precision etched sacred geometric matrix to anchor sovereign wealth and positive Vastu energy in your workspace.',
    icon: '✨',
    badge: 'POPULAR'
  }
];

export const MarketplacePage: React.FC = () => {
  const { profile } = useAstro();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'vip'>('pro');
  const [purchasedItem, setPurchasedItem] = useState<string | null>(null);

  const handleBuyRemedy = (item: typeof REMEDIES[0]) => {
    setPurchasedItem(item.name);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#7c3aed']
    });
    setTimeout(() => setPurchasedItem(null), 3500);
  };

  return (
    <div className="marketplace">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: '999px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', color: 'var(--cosmic-teal)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>ASTRO-COMMERCE & PRO SUBSCRIPTIONS</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Astro-Commerce & Remedy Vault
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Unlocking revenue diversification beyond per-minute consultations through AI-curated certified remedies and recurring membership plans.
        </p>
      </div>

      {/* Success Notification */}
      {purchasedItem && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--cosmic-green)', borderRadius: '1rem', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.9rem', fontWeight: 600 }}>
          <CheckCircle2 className="w-5 h-5" />
          <span>Remedy Order Initiated for "{purchasedItem}" with Vedic Energization Ritual!</span>
        </div>
      )}

      {/* AI Prescribed Remedies Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600 }}>
            Curated For {profile?.birthDetails.name || 'You'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Targeted astrological remedies based on your {profile?.sunSign} Sun and active {profile?.currentDasha.major} Dasha.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--cosmic-gold)' }}>
          <ShieldCheck className="w-4 h-4" />
          <span>100% Lab Certified Authenticity</span>
        </div>
      </div>

      <div className="remedy-grid">
        {REMEDIES.map((item) => (
          <div key={item.id} className="remedy-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>{item.icon}</div>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-accent)', padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--cosmic-gold)', fontWeight: 700 }}>
                {item.badge}
              </span>
            </div>

            <h4 className="remedy-card__title">{item.name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--cosmic-gold)', marginBottom: '0.5rem' }}>
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{item.rating} ({item.reviews} reviews)</span>
            </div>

            <p className="remedy-card__desc">{item.description}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="remedy-card__price">{item.price}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{item.originalPrice}</span>
            </div>

            <button className="remedy-card__btn" onClick={() => handleBuyRemedy(item)}>
              Order Energized Remedy
            </button>
          </div>
        ))}
      </div>

      {/* Subscription SaaS Plans */}
      <div style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Cosmic DNA Pro Memberships
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '550px', margin: '0 auto' }}>
          Unlock continuous transit forecasting, unlimited AI Copilot inquiries, and priority live astrologer matching.
        </p>
      </div>

      <div className="plans-grid">
        {/* Free Tier */}
        <div className={`plan-card ${selectedPlan === 'free' ? 'plan-card--featured' : ''}`}>
          <h3 className="plan-card__name">Cosmic Free</h3>
          <div className="plan-card__price">₹0</div>
          <div className="plan-card__period">Forever Free Access</div>

          <ul className="plan-card__features">
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Full Birth Chart & Big Three Profile</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Daily Horoscope & Tarot Draw</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Viral 36-Point Compatibility Checks</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>3 AI Chart Inquiries / Day</span>
            </li>
          </ul>

          <button className="plan-card__btn plan-card__btn--secondary" onClick={() => setSelectedPlan('free')}>
            Current Plan
          </button>
        </div>

        {/* Pro Tier (Recommended) */}
        <div className={`plan-card plan-card--featured ${selectedPlan === 'pro' ? 'shadow-glow-primary' : ''}`}>
          <h3 className="plan-card__name">Cosmic Pro</h3>
          <div className="plan-card__price" style={{ background: 'var(--gradient-cosmic)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ₹149
          </div>
          <div className="plan-card__period">Per Month (Billed Annually)</div>

          <ul className="plan-card__features">
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Everything in Free, plus:</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Unlimited "Ask Your Chart" AI Copilot</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>15 Free Consultation Mins Every Month</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Detailed 20-Page Karmic Synastry Reports</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>15% Discount across all Gemstones & Poojas</span>
            </li>
          </ul>

          <button
            className="plan-card__btn plan-card__btn--primary"
            onClick={() => {
              setSelectedPlan('pro');
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            }}
          >
            Upgrade to Pro
          </button>
        </div>

        {/* VIP Lifetime Founder */}
        <div className={`plan-card ${selectedPlan === 'vip' ? 'plan-card--featured' : ''}`}>
          <h3 className="plan-card__name">VIP Founder</h3>
          <div className="plan-card__price" style={{ color: 'var(--cosmic-gold)' }}>
            ₹1,499
          </div>
          <div className="plan-card__period">One-Time Lifetime Access</div>

          <ul className="plan-card__features">
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Lifetime Pro Subscription Access</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Direct 1-on-1 Consultation with Master Astrologer</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Custom Hand-Cast 3D Natal Mandala NFT/Print</span>
            </li>
            <li className="plan-card__feature">
              <CheckCircle2 className="w-4 h-4 plan-card__feature-check" />
              <span>Exclusive Access to Live Group Astrological Satsangs</span>
            </li>
          </ul>

          <button
            className="plan-card__btn plan-card__btn--secondary"
            onClick={() => {
              setSelectedPlan('vip');
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            }}
          >
            Claim VIP Access
          </button>
        </div>
      </div>
    </div>
  );
};
