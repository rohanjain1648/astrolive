import type { CosmicProfile } from './astroEngine';

export function getAIChartResponse(query: string, profile: CosmicProfile): string {
  const q = query.toLowerCase().trim();
  
  // Extract birth year for age-based predictions
  const birthYear = parseInt(profile.birthDetails.dob.slice(0, 4), 10) || 1998;
  const currentYear = 2026;
  const currentAge = currentYear - birthYear;
  
  // 7th House & 7th Lord Calculation
  const house7Zodiacs = [
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo'
  ];
  const ascIndex = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ].indexOf(profile.risingSign);
  const house7Sign = house7Zodiacs[(ascIndex + 6) % 12] || 'Aries';
  
  // Rulers
  const rulers: Record<string, string> = {
    Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
    Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars/Ketu',
    Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn/Rahu', Pisces: 'Jupiter'
  };
  const house7Lord = rulers[house7Sign] || 'Venus';

  // 1. MARRIAGE & COMMITTED RELATIONSHIP TIMING
  if (
    q.includes('marry') ||
    q.includes('married') ||
    q.includes('marriage') ||
    q.includes('wedding') ||
    q.includes('spouse') ||
    q.includes('husband') ||
    q.includes('wife') ||
    q.includes('soulmate') ||
    q.includes('partner') ||
    q.includes('when will i find love') ||
    q.includes('settle down')
  ) {
    const favorableAge = currentAge < 25 ? currentYear + (26 - currentAge) :
                         currentAge <= 29 ? `${currentYear} (Late Q3) – ${currentYear + 1} (Mid Q2)` :
                         `${currentYear + 1} – ${currentYear + 2}`;
    
    return `Looking at your ${profile.risingSign} Lagna (7th House in ${house7Sign}, ruled by ${house7Lord}):

💍 Marriage & Union Window: Your chart indicates high auspiciousness for significant marriage commitments around ${favorableAge}.
• Planetary Trigger: Jupiter's benevolent transit over your 7th house axis activates strong matrimonial yogas during your current ${profile.currentDasha.major}-${profile.currentDasha.minor} Dasha period.
• Spouse Traits: Your 7th Lord ${house7Lord} indicates a partner who is intellectually driven, emotionally grounded, and likely connected through professional or educational circles.
• Remedy for Fast-Tracking: Offer water to the rising Sun daily and wear light pastel tones on Fridays to harmonize Venusian currents.`;
  }

  // 2. LOVE, DATING, CRUSH, RELATIONSHIP ISSUES
  if (
    q.includes('love') ||
    q.includes('relationship') ||
    q.includes('dating') ||
    q.includes('single') ||
    q.includes('crush') ||
    q.includes('breakup') ||
    q.includes('ex') ||
    q.includes('divorce') ||
    q.includes('heartbreak') ||
    q.includes('cheating') ||
    q.includes('feel lonely')
  ) {
    return `Based on your Moon placed in ${profile.moonSign} and your ${profile.dominantElement} element:

💖 Romantic Synergy & Dynamic:
• Emotional Core: Your ${profile.moonSign} Moon seeks deep psychic resonance and intellectual safety before opening up completely.
• Current Transit: Venus and Jupiter currently form a supportive 5-9 trine to your 5th house of romance, meaning past karmic confusion will clear within the next 60–90 days.
• Advice: If you are navigating a tricky phase or wondering about an ex, this cycle encourages setting firm energetic boundaries. A new, emotionally mature connection is primed to enter your orbit soon.`;
  }

  // 3. CAREER, JOB, PROMOTION, BUSINESS & INTERVIEW
  if (
    q.includes('career') ||
    q.includes('job') ||
    q.includes('promotion') ||
    q.includes('business') ||
    q.includes('startup') ||
    q.includes('work') ||
    q.includes('interview') ||
    q.includes('boss') ||
    q.includes('resign') ||
    q.includes('switch') ||
    q.includes('fired') ||
    q.includes('profession') ||
    q.includes('hiring') ||
    q.includes('company')
  ) {
    return `Analyzing your 10th House of Karma and active ${profile.currentDasha.major} Mahadasha:

🚀 Career Trajectory & Breakthroughs:
• Peak Timing: The strongest window for job switches, salary hikes, or funding breakthroughs opens in the next 3 to 6 months as Sun and Mars align favorably with your Lagna Lord.
• Ideal Domains: Your ${profile.cosmicArchetype} archetype thrives in roles demanding strategic leadership, tech-enabled innovation, and high-stakes communication.
• Strategic Guidance: Avoid impulsive resignations during retrograde phases; instead, position yourself for an authority leap during the upcoming transit cycle.`;
  }

  // 4. WEALTH, MONEY, FINANCIAL GAIN & PROPERTY
  if (
    q.includes('money') ||
    q.includes('wealth') ||
    q.includes('rich') ||
    q.includes('finance') ||
    q.includes('financial') ||
    q.includes('lottery') ||
    q.includes('invest') ||
    q.includes('crypto') ||
    q.includes('stock') ||
    q.includes('debt') ||
    q.includes('loan') ||
    q.includes('property') ||
    q.includes('car') ||
    q.includes('house')
  ) {
    return `Examining your 2nd House (Dhana Bhava) and 11th House (Labha Bhava):

💰 Wealth & Abundance Outlook:
• Financial Yogas: Your chart exhibits favorable Dhana Yoga currents supported by your ${profile.dominantElement} element mastery. 
• Wealth Inflow Cycle: Inflow accelerates significantly during ${profile.currentDasha.major} Dasha sub-periods, particularly through non-traditional ventures and equity/real-estate investments.
• Caution: Guard against speculative impulsive trading when Rahu transits your 8th or 12th house.
• Remedy: Keep a charged Shree Yantra in the North-East quadrant of your workspace to anchor steady financial growth.`;
  }

  // 5. FOREIGN TRAVEL, VISA, STUDY ABROAD, RELOCATION
  if (
    q.includes('foreign') ||
    q.includes('visa') ||
    q.includes('abroad') ||
    q.includes('travel') ||
    q.includes('settle abroad') ||
    q.includes('relocation') ||
    q.includes('pr') ||
    q.includes('immigration') ||
    q.includes('move to') ||
    q.includes('relocate') ||
    q.includes('passport')
  ) {
    return `Evaluating your 9th House (Bhagya / Long Travel) and 12th House (Foreign Lands):

✈️ Foreign Settlement & Visa Prospects:
• International Travel Indications: Your chart possesses strong 9th–12th house linkages, indicating significant prosperity when traveling across borders or collaborating with international clients.
• Auspicious Visa Window: The upcoming planetary transit over your 9th house creates clear clearance for visa stamps, higher education abroad, and international relocations.
• Remedy: Recite the Rahu Beej Mantra on Wednesday evenings to eliminate unexpected consular or bureaucratic roadblocks.`;
  }

  // 6. HEALTH, VITALITY, MENTAL PEACE & STRESS
  if (
    q.includes('health') ||
    q.includes('disease') ||
    q.includes('mental') ||
    q.includes('stress') ||
    q.includes('anxiety') ||
    q.includes('depress') ||
    q.includes('sick') ||
    q.includes('sleep') ||
    q.includes('surgery') ||
    q.includes('accident') ||
    q.includes('healing') ||
    q.includes('energy') ||
    q.includes('tired')
  ) {
    return `Reviewing your 6th House (Roga Bhava) and Lagna vitality (1st House):

🌿 Vitality & Health Blueprint:
• Pranic Balance: Your overall vitality index stands at ${profile.energyScores.health}%. Your ${profile.dominantElement} element suggests paying special attention to nervous system regulation and restorative hydration.
• Stress Triggers: Mental fatigue peaks during intense Moon transits over dusthana houses (6th, 8th, 12th).
• Vedic Healing Protocol: Daily listening to the 432 Hz Solfeggio soundscape (available on your Daily Ritual tab) and drinking water from a copper vessel at sunrise will restore biological equilibrium.`;
  }

  // 7. DASHA, PLANETARY PERIODS & TIMELINES
  if (
    q.includes('dasha') ||
    q.includes('mahadasha') ||
    q.includes('antardasha') ||
    q.includes('jupiter') ||
    q.includes('saturn') ||
    q.includes('mars') ||
    q.includes('venus') ||
    q.includes('rahu') ||
    q.includes('ketu') ||
    q.includes('mercury') ||
    q.includes('sun') ||
    q.includes('moon')
  ) {
    return `Active Dasha Breakdown: ${profile.currentDasha.major} Mahadasha — ${profile.currentDasha.minor} Antardasha (${profile.currentDasha.startDate} to ${profile.currentDasha.endDate})

🌌 Karmic Influence:
• Theme: ${profile.currentDasha.focusArea}.
• Manifestation: The lord of your active period (${profile.currentDasha.major}) is transiting favorable quadrants, demanding that you take sovereign responsibility for your life's vision.
• Pro Tip: Remedies performed during this active sub-period carry 3x amplification due to heightened planetary receptivity.`;
  }

  // 8. MANGLIK, SADE SATI, KAALSARP & REMEDIES
  if (
    q.includes('manglik') ||
    q.includes('mangal') ||
    q.includes('sade sati') ||
    q.includes('kaalsarp') ||
    q.includes('dosha') ||
    q.includes('remedy') ||
    q.includes('gemstone') ||
    q.includes('mantra') ||
    q.includes('pooja') ||
    q.includes('rudraksha')
  ) {
    return `Astrological Afflictions & Remedial Prescription:

🛡️ Dosha Status:
• Mangal Dosha: ${profile.mangalDosha.intensity} intensity (${profile.mangalDosha.description}).
• Remedy: ${profile.mangalDosha.remedy}
• Prescribed Gemstone: Yellow Sapphire / Citrine or Emerald depending on your Lagna Lord strength.
• Pooja Recommendation: Maha Mrityunjaya or Navagraha Shanti pooja to balance malefic degrees. (Available on the Remedies tab).`;
  }

  // 9. GENERAL / PERSONALITY / LIFE PURPOSE / ARCHETYPE
  return `Analyzing your complete natal ephemeris (${profile.sunSign} Sun, ${profile.moonSign} Moon, ${profile.risingSign} Lagna, and ${profile.nakshatra.name} Nakshatra):

✨ Cosmic Archetype: "${profile.cosmicArchetype}"
• Soul Purpose: "${profile.cosmicTagline}"
• Key Superpowers: ${profile.keyTraits.join(', ')}.
• Areas of Growth: ${profile.growthAreas.join(', ')}.
• Life Path Number: ${profile.lifePathNumber} (Signifies purposeful innovation and transformative leadership).

Feel free to ask specific questions like "When will I get married?", "What about my career switch?", or "Which gemstone is auspicious for me?"`;
}
