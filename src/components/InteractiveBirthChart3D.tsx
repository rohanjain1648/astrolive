import React, { useState, useRef, useEffect } from 'react';
import type { PlanetPosition } from '../utils/astroEngine';
import { Sparkles, Compass } from 'lucide-react';

interface InteractiveBirthChartProps {
  planets: PlanetPosition[];
  risingSign: string;
  sunSign: string;
  moonSign: string;
}

export const InteractiveBirthChart: React.FC<InteractiveBirthChartProps> = ({
  planets,
  risingSign,
  sunSign,
  moonSign
}) => {
  const [chartStyle, setChartStyle] = useState<'mandala' | 'north' | 'south'>('mandala');
  const [activePlanet, setActivePlanet] = useState<PlanetPosition | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render High-Resolution Canvas Mandala
  useEffect(() => {
    if (chartStyle !== 'mandala' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) - 20;

      ctx.clearRect(0, 0, width, height);

      // Background Radial Glow
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      grad.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      grad.addColorStop(0.7, 'rgba(236, 72, 153, 0.05)');
      grad.addColorStop(1, 'rgba(6, 6, 15, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Zodiac Ring
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 12 House Sectors
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + rotation * 0.1;
        const x1 = cx + Math.cos(angle) * (radius * 0.5);
        const y1 = cy + Math.sin(angle) * (radius * 0.5);
        const x2 = cx + Math.cos(angle) * radius;
        const y2 = cy + Math.sin(angle) * radius;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Middle Ring
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.68, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Core Ring
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.38, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Aspect Harmonic Lines
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      for (let i = 0; i < planets.length - 1; i++) {
        for (let j = i + 1; j < planets.length; j++) {
          if (Math.abs(planets[i].house - planets[j].house) === 4 || Math.abs(planets[i].house - planets[j].house) === 6) {
            const a1 = ((planets[i].house - 1) * Math.PI) / 6 + (planets[i].degree / 30) * (Math.PI / 6) - Math.PI / 2;
            const a2 = ((planets[j].house - 1) * Math.PI) / 6 + (planets[j].degree / 30) * (Math.PI / 6) - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a1) * (radius * 0.68), cy + Math.sin(a1) * (radius * 0.68));
            ctx.lineTo(cx + Math.cos(a2) * (radius * 0.68), cy + Math.sin(a2) * (radius * 0.68));
            ctx.stroke();
          }
        }
      }
      ctx.setLineDash([]);

      // Draw Planets with Glowing Nodes
      planets.forEach((planet) => {
        const houseAngle = ((planet.house - 1) * Math.PI) / 6 + (planet.degree / 30) * (Math.PI / 6) - Math.PI / 2;
        const pRadius = radius * 0.68;
        const px = cx + Math.cos(houseAngle) * pRadius;
        const py = cy + Math.sin(houseAngle) * pRadius;

        const isHovered = activePlanet?.name === planet.name;

        // Node Glow
        ctx.fillStyle = isHovered ? '#ec4899' : '#7c3aed';
        ctx.beginPath();
        ctx.arc(px, py, isHovered ? 9 : 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isHovered ? '#ffffff' : '#a78bfa';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.beginPath();
        ctx.arc(px, py, isHovered ? 12 : 8, 0, Math.PI * 2);
        ctx.stroke();

        // Planet Symbol / Text
        ctx.fillStyle = '#ffffff';
        ctx.font = isHovered ? 'bold 12px Inter' : '10px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labelRadius = radius * 0.82;
        const lx = cx + Math.cos(houseAngle) * labelRadius;
        const ly = cy + Math.sin(houseAngle) * labelRadius;
        ctx.fillText(`${planet.symbol} ${planet.name.slice(0, 2)}`, lx, ly);
      });

      // Center Lagna Glyph
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px Cinzel';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`LAGNA`, cx, cy - 8);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter';
      ctx.fillText(`${risingSign}`, cx, cy + 8);

      rotation += 0.005;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [chartStyle, planets, activePlanet, risingSign]);

  return (
    <div className="dash-card">
      <div className="dash-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Compass className="w-5 h-5 text-purple-400" />
          <h3 className="dash-card__title">Kundli & Birth Chart Matrix</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem', borderRadius: '999px' }}>
          <button
            onClick={() => setChartStyle('mandala')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: chartStyle === 'mandala' ? 'var(--gradient-cosmic)' : 'transparent',
              color: chartStyle === 'mandala' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            3D Mandala
          </button>
          <button
            onClick={() => setChartStyle('north')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: chartStyle === 'north' ? 'var(--gradient-cosmic)' : 'transparent',
              color: chartStyle === 'north' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            North Indian
          </button>
          <button
            onClick={() => setChartStyle('south')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: chartStyle === 'south' ? 'var(--gradient-cosmic)' : 'transparent',
              color: chartStyle === 'south' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            South Indian
          </button>
        </div>
      </div>

      {chartStyle === 'mandala' && (
        <div style={{ position: 'relative', width: '100%', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{ width: '320px', height: '320px', cursor: 'crosshair' }}
          />
          <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
            <Sparkles style={{ width: '12px', height: '12px', color: 'var(--cosmic-gold)' }} />
            <span>Interactive Real-time Ayanamsa Engine</span>
          </div>
        </div>
      )}

      {chartStyle === 'north' && (
        <div style={{ width: '100%', maxWidth: '320px', margin: '1rem auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--cosmic-border)', borderRadius: '1rem' }}>
          <svg viewBox="0 0 300 300" style={{ width: '100%', height: 'auto' }}>
            <rect x="10" y="10" width="280" height="280" fill="none" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="2" />
            <line x1="10" y1="10" x2="290" y2="290" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1.5" />
            <line x1="290" y1="10" x2="10" y2="290" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1.5" />
            <polygon points="150,10 290,150 150,290 10,150" fill="rgba(124, 58, 237, 0.08)" stroke="rgba(236, 72, 153, 0.5)" strokeWidth="1.5" />
            
            <text x="150" y="80" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">1 (Asc: {risingSign})</text>
            <text x="75" y="45" fill="#94a3b8" fontSize="10" textAnchor="middle">12</text>
            <text x="225" y="45" fill="#94a3b8" fontSize="10" textAnchor="middle">2</text>
            <text x="255" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">3</text>
            <text x="220" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">4</text>
            <text x="255" y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">5</text>
            <text x="225" y="255" fill="#94a3b8" fontSize="10" textAnchor="middle">6</text>
            <text x="150" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle">7</text>
            <text x="75" y="255" fill="#94a3b8" fontSize="10" textAnchor="middle">8</text>
            <text x="45" y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">9</text>
            <text x="80" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">10</text>
            <text x="45" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">11</text>
            
            <text x="150" y="105" fill="#f1f5f9" fontSize="11" textAnchor="middle">☉ Sun | ☽ Moon</text>
            <text x="150" y="125" fill="#a78bfa" fontSize="9" textAnchor="middle">♂ Mars ({planets.find(p=>p.name==='Mars')?.house}H)</text>
          </svg>
        </div>
      )}

      {chartStyle === 'south' && (
        <div style={{ width: '100%', maxWidth: '320px', margin: '1rem auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--cosmic-border)', borderRadius: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '4px', height: '240px' }}>
            {['Pisces', 'Aries', 'Taurus', 'Gemini', 'Aquarius', '', '', 'Cancer', 'Capricorn', '', '', 'Leo', 'Sagittarius', 'Scorpio', 'Libra', 'Virgo'].map((sign, idx) => {
              if (!sign) return <div key={idx} style={{ background: 'transparent' }} />;
              const isAsc = sign === risingSign;
              const isSun = sign === sunSign;
              const isMoon = sign === moonSign;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '4px',
                    fontSize: '0.65rem',
                    background: isAsc ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ color: isAsc ? '#fbbf24' : '#94a3b8', fontWeight: isAsc ? 700 : 500 }}>
                    {sign.slice(0, 3)} {isAsc && '★'}
                  </span>
                  <span style={{ fontSize: '0.6rem', color: '#f1f5f9' }}>
                    {isSun && '☉'}{isMoon && '☽'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Planetary Placements Quick Filter Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
        {planets.slice(0, 6).map((planet) => (
          <div
            key={planet.name}
            onMouseEnter={() => setActivePlanet(planet)}
            onMouseLeave={() => setActivePlanet(null)}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: activePlanet?.name === planet.name ? 'rgba(124, 58, 237, 0.25)' : 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{planet.symbol} {planet.name}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--cosmic-primary-light)' }}>H{planet.house}</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {planet.sign} {planet.degree}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
