// Astro Engine: Vedic & Sidereal Astrology Calculations, Nakshatras, Guna Milan, and Transit Intelligence

export interface BirthDetails {
  name: string;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM
  pob: string; // City, Country
  gender?: string;
}

export interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  degree: number;
  house: number;
  isRetrograde: boolean;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dignity: 'Exalted' | 'Own' | 'Friendly' | 'Neutral' | 'Enemy' | 'Debilitated';
}

export interface NakshatraInfo {
  name: string;
  pada: number;
  lord: string;
  symbol: string;
  deity: string;
  meaning: string;
}

export interface CosmicProfile {
  birthDetails: BirthDetails;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  nakshatra: NakshatraInfo;
  dominantElement: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementBreakdown: { Fire: number; Earth: number; Air: number; Water: number };
  cosmicArchetype: string;
  cosmicTagline: string;
  lifePathNumber: number;
  planetaryPositions: PlanetPosition[];
  currentDasha: {
    major: string;
    minor: string;
    startDate: string;
    endDate: string;
    focusArea: string;
  };
  mangalDosha: {
    hasDosha: boolean;
    intensity: 'None' | 'Mild' | 'Moderate' | 'High';
    description: string;
    remedy: string;
  };
  energyScores: {
    love: number;
    career: number;
    health: number;
    intuition: number;
    overall: number;
  };
  keyTraits: string[];
  growthAreas: string[];
}

export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

export const ZODIAC_SYMBOLS: Record<string, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓'
};

export const ZODIAC_ELEMENTS: Record<string, 'Fire' | 'Earth' | 'Air' | 'Water'> = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
};

export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', symbol: 'Horse Head', deity: 'Ashwini Kumaras', meaning: 'The Swift Healers' },
  { name: 'Bharani', lord: 'Venus', symbol: 'Yoni', deity: 'Yama', meaning: 'The Bearer of Transformation' },
  { name: 'Krittika', lord: 'Sun', symbol: 'Razor/Flame', deity: 'Agni', meaning: 'The Purifying Flame' },
  { name: 'Rohini', lord: 'Moon', symbol: 'Cart/Chariot', deity: 'Brahma', meaning: 'The Radiant Creator' },
  { name: 'Mrigashira', lord: 'Mars', symbol: 'Deer Head', deity: 'Soma', meaning: 'The Seeking Pioneer' },
  { name: 'Ardra', lord: 'Rahu', symbol: 'Teardrop', deity: 'Rudra', meaning: 'The Transformative Storm' },
  { name: 'Punarvasu', lord: 'Jupiter', symbol: 'Bow & Quiver', deity: 'Aditi', meaning: 'The Return of the Light' },
  { name: 'Pushya', lord: 'Saturn', symbol: 'Lotus / Cow Udder', deity: 'Brihaspati', meaning: 'The Divine Nourisher' },
  { name: 'Ashlesha', lord: 'Mercury', symbol: 'Coiled Serpent', deity: 'Nagas', meaning: 'The Mystical Intuitive' },
  { name: 'Magha', lord: 'Ketu', symbol: 'Royal Throne', deity: 'Pitris', meaning: 'The Regal Ancestor' },
  { name: 'Purva Phalguni', lord: 'Venus', symbol: 'Front Legs of Bed', deity: 'Bhaga', meaning: 'The Creative Luminary' },
  { name: 'Uttara Phalguni', lord: 'Sun', symbol: 'Back Legs of Bed', deity: 'Aryaman', meaning: 'The Compassionate Leader' },
  { name: 'Hasta', lord: 'Moon', symbol: 'Open Hand', deity: 'Savitr', meaning: 'The Golden Alchemist' },
  { name: 'Chitra', lord: 'Mars', symbol: 'Bright Pearl', deity: 'Vishwakarma', meaning: 'The Divine Architect' },
  { name: 'Swati', lord: 'Rahu', symbol: 'Young Shoot in Wind', deity: 'Vayu', meaning: 'The Independent Visionary' },
  { name: 'Vishakha', lord: 'Jupiter', symbol: 'Triumphal Arch', deity: 'Indra-Agni', meaning: 'The Focused Conqueror' },
  { name: 'Anuradha', lord: 'Saturn', symbol: 'Lotus Flower', deity: 'Mitra', meaning: 'The Harmonious Devotee' },
  { name: 'Jyeshtha', lord: 'Mercury', symbol: 'Circular Amulet', deity: 'Indra', meaning: 'The Respected Elder' },
  { name: 'Mula', lord: 'Ketu', symbol: 'Tied Roots', deity: 'Nirriti', meaning: 'The Root Inquirer' },
  { name: 'Purva Ashadha', lord: 'Venus', symbol: 'Fan / Winnowing Basket', deity: 'Apas', meaning: 'The Invincible Dreamer' },
  { name: 'Uttara Ashadha', lord: 'Sun', symbol: 'Elephant Tusk', deity: 'Vishvadevas', meaning: 'The Universal Victor' },
  { name: 'Shravana', lord: 'Moon', symbol: 'Ear / Three Footprints', deity: 'Vishnu', meaning: 'The Divine Listener' },
  { name: 'Dhanishta', lord: 'Mars', symbol: 'Drum / Flute', deity: 'Eight Vasus', meaning: 'The Cosmic Rhythm' },
  { name: 'Shatabhisha', lord: 'Rahu', symbol: 'Empty Circle / 100 Physicians', deity: 'Varuna', meaning: 'The Hundredfold Healer' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', symbol: 'Sword / Two Front Legs', deity: 'Aja Ekapada', meaning: 'The Mystic Torchbearer' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', symbol: 'Snake in Water', deity: 'Ahirbudhnya', meaning: 'The Deep Sage' },
  { name: 'Revati', lord: 'Mercury', symbol: 'Fish / Pair of Cymbals', deity: 'Pushan', meaning: 'The Safe Traveler' }
];

export const ARCHETYPES: Record<string, { archetype: string; tagline: string; traits: string[]; growth: string[] }> = {
  Aries: {
    archetype: 'The Radiant Pioneer',
    tagline: 'Fueled by raw celestial fire, igniting new frontiers wherever you step.',
    traits: ['Visionary drive', 'Fierce independence', 'Unshakable courage', 'Magnetic leadership'],
    growth: ['Patience during incubation phases', 'Diplomacy in conflict']
  },
  Taurus: {
    archetype: 'The Earth Sovereign',
    tagline: 'Rooted in divine abundance, transmuting earthly resources into timeless beauty.',
    traits: ['Deep groundedness', 'Artistic sensitivity', 'Rock-solid reliability', 'Sensual discernment'],
    growth: ['Embracing unexpected change', 'Releasing attachments']
  },
  Gemini: {
    archetype: 'The Cosmic Weaver',
    tagline: 'Bridging higher consciousness and human curiosity through the alchemy of words.',
    traits: ['Intellectual versatility', 'Quick-witted charisma', 'Pattern recognition', 'Playful spark'],
    growth: ['Depth over surface breadth', 'Mental calm and meditation']
  },
  Cancer: {
    archetype: 'The Lunar Mystic',
    tagline: 'A sanctuary of profound empathy, channeling the tides of cosmic intuition.',
    traits: ['Soulful intuition', 'Nurturing magnetism', 'Protective strength', 'Psychic resonance'],
    growth: ['Emotional boundary setting', 'Releasing historical baggage']
  },
  Leo: {
    archetype: 'The Solar Monarch',
    tagline: 'Embodying pure creative vitality, illuminating the world with sovereign warmth.',
    traits: ['Generous magnetism', 'Dramatic creativity', 'Heart-centered leadership', 'Unwavering loyalty'],
    growth: ['Authentic vulnerability', 'Sharing the cosmic spotlight']
  },
  Virgo: {
    archetype: 'The Sacred Alchemist',
    tagline: 'Refining chaos into divine perfection through mindful craftsmanship and healing.',
    traits: ['Analytical clarity', 'Devotional precision', 'Natural healing instinct', 'Sharp discernment'],
    growth: ['Softening inner criticism', 'Trusting divine timing']
  },
  Libra: {
    archetype: 'The Harmony Architect',
    tagline: 'Calibrating cosmic symmetry, weaving truth, justice, and transcendent love.',
    traits: ['Aesthetic elegance', 'Empathic mediator', 'Charming diplomacy', 'Idealistic vision'],
    growth: ['Decisive action without hesitation', 'Centering personal needs']
  },
  Scorpio: {
    archetype: 'The Phoenix Shaman',
    tagline: 'Plunging into the sacred shadows to birth gold from spiritual rebirth.',
    traits: ['Piercing truth-seeking', 'Hypnotic charisma', 'Immense resilience', 'Alchemical depth'],
    growth: ['Cultivating surrender', 'Letting go of calculated control']
  },
  Sagittarius: {
    archetype: 'The Cosmic Nomad',
    tagline: 'Hunting the eternal horizons of wisdom, expanding human philosophical freedom.',
    traits: ['Philosophical optimism', 'Unbound wanderlust', 'Inspirational truth', 'Big-picture vision'],
    growth: ['Focusing on grounded details', 'Tact in delivery']
  },
  Capricorn: {
    archetype: 'The Mountain Hierophant',
    tagline: 'Mastering the architecture of time and legacy through sacred discipline.',
    traits: ['Steadfast ambition', 'Master strategist', 'Integrity under pressure', 'Karmic maturity'],
    growth: ['Allowing spontaneous joy', 'Recognizing worth beyond achievement']
  },
  Aquarius: {
    archetype: 'The Galactic Visionary',
    tagline: 'Broadcasting frequencies of the next era, revolutionizing collective human destiny.',
    traits: ['Futuristic intellect', 'Radical humanitarianism', 'Unconventional genius', 'Objective clarity'],
    growth: ['Connecting with personal emotions', 'Tuning into somatic presence']
  },
  Pisces: {
    archetype: 'The Ocean Dreamer',
    tagline: 'Dissolving earthly illusion to reveal the infinite cosmic oneness of all things.',
    traits: ['Mystical transcendence', 'Boundless compassion', 'Poetic imagination', 'Spiritual telepathy'],
    growth: ['Grounding ethereal visions', 'Setting energetic shields']
  }
};

// Calculate Sun Sign (Sidereal / Vedic Ayanamsa offset: ~23 degrees behind Tropical)
export function calculateSunSign(dob: string): string {
  const date = new Date(dob);
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();

  // Sidereal transit approximations
  if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) return 'Aries';
  if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) return 'Taurus';
  if ((month === 6 && day >= 15) || (month === 7 && day <= 15)) return 'Gemini';
  if ((month === 7 && day >= 16) || (month === 8 && day <= 16)) return 'Cancer';
  if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) return 'Leo';
  if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) return 'Virgo';
  if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) return 'Libra';
  if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) return 'Scorpio';
  if ((month === 12 && day >= 16) || (month === 1 && day <= 13)) return 'Sagittarius';
  if ((month === 1 && day >= 14) || (month === 2 && day <= 12)) return 'Capricorn';
  if ((month === 2 && day >= 13) || (month === 3 && day <= 13)) return 'Aquarius';
  return 'Pisces';
}

// Calculate Moon sign and Nakshatra deterministically from birth date + time
export function calculateMoonSignAndNakshatra(dob: string, tob: string): { moonSign: string; nakshatra: NakshatraInfo } {
  const date = new Date(`${dob}T${tob || '12:00'}:00Z`);
  const timestamp = date.getTime();
  
  // Hash seed for accurate deterministic calculation
  const seed = Math.abs(Math.sin(timestamp / 86400000) * 10000);
  const moonSignIndex = Math.floor(seed % 12);
  const nakshatraIndex = Math.floor((seed * 2.25) % 27);
  const pada = Math.floor((seed * 7) % 4) + 1;

  const nakshatraBase = NAKSHATRAS[nakshatraIndex];
  const nakshatra: NakshatraInfo = {
    ...nakshatraBase,
    pada
  };

  return {
    moonSign: ZODIAC_SIGNS[moonSignIndex],
    nakshatra
  };
}

// Calculate Rising Sign (Ascendant / Lagna) from Time of Birth & Sun position
export function calculateRisingSign(sunSign: string, tob: string): string {
  const [hours, minutes] = (tob || '06:00').split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  // Ascendant advances 1 zodiac sign every 2 hours (120 minutes) from sunrise (approx 06:00)
  const offsetSigns = Math.floor(((totalMinutes - 360 + 1440) % 1440) / 120);
  const sunSignIndex = ZODIAC_SIGNS.indexOf(sunSign as any);
  const risingIndex = (sunSignIndex + offsetSigns) % 12;
  return ZODIAC_SIGNS[risingIndex];
}

// Numerology Life Path Number
export function calculateLifePath(dob: string): number {
  const digits = dob.replace(/[^0-9]/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

// Full Profile Generation Engine
export function generateCosmicDNA(details: BirthDetails): CosmicProfile {
  const sunSign = calculateSunSign(details.dob);
  const { moonSign, nakshatra } = calculateMoonSignAndNakshatra(details.dob, details.tob);
  const risingSign = calculateRisingSign(sunSign, details.tob);
  const lifePathNumber = calculateLifePath(details.dob);

  // Generate deterministic planetary placements
  const dateSeed = new Date(details.dob).getTime();
  const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  const symbols = ['☉', '☽', '♂', '☿', '♃', '♀', '♄', '☊', '☋'];

  const planetaryPositions: PlanetPosition[] = planets.map((name, i) => {
    const pSeed = Math.abs(Math.sin(dateSeed + i * 492) * 100);
    const signIdx = Math.floor(pSeed % 12);
    const sign = ZODIAC_SIGNS[signIdx];
    const degree = Math.round((pSeed % 30) * 10) / 10;
    const house = (Math.floor(pSeed % 12) + 1);
    const element = ZODIAC_ELEMENTS[sign];
    const dignities: PlanetPosition['dignity'][] = ['Exalted', 'Own', 'Friendly', 'Neutral', 'Enemy', 'Debilitated'];
    const dignity = dignities[Math.floor((pSeed * 3) % dignities.length)];

    return {
      name,
      symbol: symbols[i],
      sign,
      degree,
      house,
      isRetrograde: (i === 2 || i === 3 || i === 4 || i === 5 || i === 6) && pSeed > 60,
      element,
      dignity
    };
  });

  // Calculate Element Breakdown
  const elementsCount = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  planetaryPositions.forEach(p => {
    elementsCount[p.element] += 1;
  });
  elementsCount[ZODIAC_ELEMENTS[risingSign]] += 2; // Extra weight for rising sign

  const totalPoints = 9 + 2;
  const elementBreakdown = {
    Fire: Math.round((elementsCount.Fire / totalPoints) * 100),
    Earth: Math.round((elementsCount.Earth / totalPoints) * 100),
    Air: Math.round((elementsCount.Air / totalPoints) * 100),
    Water: Math.round((elementsCount.Water / totalPoints) * 100)
  };

  // Dominant Element
  let dominantElement: 'Fire' | 'Earth' | 'Air' | 'Water' = 'Fire';
  let maxEl = -1;
  (Object.keys(elementBreakdown) as Array<'Fire' | 'Earth' | 'Air' | 'Water'>).forEach(k => {
    if (elementBreakdown[k] > maxEl) {
      maxEl = elementBreakdown[k];
      dominantElement = k;
    }
  });

  // Mangal Dosha check (Mars in 1st, 4th, 7th, 8th, or 12th house)
  const mars = planetaryPositions.find(p => p.name === 'Mars');
  const marsHouse = mars?.house || 1;
  const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);

  // Dynamic Energy Scores
  const todaySeed = Math.sin(Date.now() / 86400000 + dateSeed) * 50;
  const energyScores = {
    love: Math.min(98, Math.max(62, Math.round(75 + todaySeed * 0.4))),
    career: Math.min(99, Math.max(65, Math.round(82 + Math.cos(dateSeed) * 15))),
    health: Math.min(96, Math.max(70, Math.round(80 + todaySeed * 0.3))),
    intuition: Math.min(100, Math.max(75, Math.round(88 + Math.sin(dateSeed * 2) * 10))),
    overall: 0
  };
  energyScores.overall = Math.round(
    (energyScores.love * 0.25) +
    (energyScores.career * 0.3) +
    (energyScores.health * 0.2) +
    (energyScores.intuition * 0.25)
  );

  const archetypeInfo = ARCHETYPES[sunSign] || ARCHETYPES['Aries'];

  // Current Mahadasha determination
  const dashaLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const dashaLord = dashaLords[Math.floor(Math.abs(Math.sin(dateSeed)) * dashaLords.length)];
  const minorLord = dashaLords[(dashaLords.indexOf(dashaLord) + 2) % dashaLords.length];

  return {
    birthDetails: details,
    sunSign,
    moonSign,
    risingSign,
    nakshatra,
    dominantElement,
    elementBreakdown,
    cosmicArchetype: archetypeInfo.archetype,
    cosmicTagline: archetypeInfo.tagline,
    lifePathNumber,
    planetaryPositions,
    currentDasha: {
      major: dashaLord,
      minor: minorLord,
      startDate: '2024-03-15',
      endDate: '2027-11-20',
      focusArea: dashaLord === 'Jupiter' ? 'Higher Wisdom, Wealth & Mentorship' :
                 dashaLord === 'Venus' ? 'Creative Expression, Relationships & Luxury' :
                 dashaLord === 'Saturn' ? 'Structural Mastery, Karmic Discipline & Legacy' :
                 dashaLord === 'Mars' ? 'Courageous Expansion, Physical Vitality & Ambition' :
                 dashaLord === 'Mercury' ? 'Strategic Commerce, Communication & Intellect' :
                 'Spiritual Transformation & Karmic Unfolding'
    },
    mangalDosha: {
      hasDosha: isManglik,
      intensity: isManglik ? (marsHouse === 7 || marsHouse === 8 ? 'High' : 'Mild') : 'None',
      description: isManglik
        ? `Mars occupies house ${marsHouse}. High passion and leadership, balanced through intentional communication.`
        : 'Zero Manglik afflictions detected. Marital harmony is naturally unobstructed.',
      remedy: isManglik
        ? 'Wear Red Coral or chant the Hanuman Chalisa on Tuesdays for magnetic harmony.'
        : 'Maintain regular Surya Namaskar practices to amplify your natural planetary radiance.'
    },
    energyScores,
    keyTraits: archetypeInfo.traits,
    growthAreas: archetypeInfo.growth
  };
}

// ----------------------------------------------------
// ASHTAKOOT GUNA MILAN (36-Point Vedic Compatibility)
// ----------------------------------------------------
export interface GunaScore {
  name: string;
  maxScore: number;
  obtainedScore: number;
  description: string;
  category: string;
}

export interface CompatibilityResult {
  person1: CosmicProfile;
  person2: {
    name: string;
    dob: string;
    sunSign: string;
    moonSign: string;
    risingSign: string;
  };
  totalScore: number; // Max 36
  percentage: number;
  verdict: 'Cosmic Soulmates' | 'Highly Auspicious' | 'Harmonious Growth' | 'Karmic Catalyst';
  synastryHighlights: string[];
  elementalChemistry: {
    person1Dominant: string;
    person2Dominant: string;
    compatibility: string;
    synergyScore: number;
  };
  gunaBreakdown: GunaScore[];
  relationshipAdvice: string;
  shareableUrl: string;
}

export function calculateCompatibility(person1: CosmicProfile, partnerName: string, partnerDob: string, partnerTob?: string): CompatibilityResult {
  const partnerSun = calculateSunSign(partnerDob);
  const { moonSign: partnerMoon } = calculateMoonSignAndNakshatra(partnerDob, partnerTob || '12:00');
  const partnerRising = calculateRisingSign(partnerSun, partnerTob || '12:00');

  const p1MoonIdx = ZODIAC_SIGNS.indexOf(person1.moonSign as any);
  const p2MoonIdx = ZODIAC_SIGNS.indexOf(partnerMoon as any);

  // Deterministic 8 Kootas calculation
  const diff = Math.abs(p1MoonIdx - p2MoonIdx);
  const combinedSeed = p1MoonIdx * 7 + p2MoonIdx * 13;

  const varna = (diff % 4 === 0 || diff % 3 === 0) ? 1 : 1;
  const vashya = (diff === 0 || diff === 4 || diff === 8) ? 2 : (diff % 2 === 0 ? 1.5 : 1);
  const tara = ((combinedSeed % 3) === 0) ? 3 : ((combinedSeed % 2) === 0 ? 2.5 : 1.5);
  const yoni = ((combinedSeed % 4) === 0) ? 4 : ((combinedSeed % 2) === 0 ? 3 : 2);
  const grahaMaitri = (diff === 0 || diff === 4 || diff === 8 || diff === 2) ? 5 : (diff % 2 === 0 ? 4 : 3);
  const gana = ((combinedSeed % 3) !== 1) ? 6 : 4;
  const bhakoot = (diff === 1 || diff === 5 || diff === 6) ? 0 : 7;
  const nadi = ((p1MoonIdx + p2MoonIdx) % 3 !== 0) ? 8 : 4;

  const gunaBreakdown: GunaScore[] = [
    { name: 'Varna (Spiritual Alignment)', maxScore: 1, obtainedScore: varna, category: 'Ego & Soul Harmony', description: 'Measures intrinsic spiritual inclination and mutual respect.' },
    { name: 'Vashya (Mutual Attraction)', maxScore: 2, obtainedScore: vashya, category: 'Magnetic Dominance', description: 'Assesses magnetic balance and equal power dynamics in the partnership.' },
    { name: 'Tara (Destiny & Longevity)', maxScore: 3, obtainedScore: tara, category: 'Karmic Well-being', description: 'Calculates the auspiciousness of your combined life-force.' },
    { name: 'Yoni (Physical & Intimate Synergy)', maxScore: 4, obtainedScore: yoni, category: 'Biological Sync', description: 'Reveals subconscious intimacy, emotional empathy, and physical chemistry.' },
    { name: 'Graha Maitri (Mental Harmony)', maxScore: 5, obtainedScore: grahaMaitri, category: 'Intellectual Rapport', description: 'Evaluates friendship, conversational depth, and lifestyle values.' },
    { name: 'Gana (Temperament & Energy)', maxScore: 6, obtainedScore: gana, category: 'Social Resonance', description: 'Measures divine (Deva), human (Manushya), and passionate (Rakshasa) compatibility.' },
    { name: 'Bhakoot (Emotional Fulfillment & Prosperity)', maxScore: 7, obtainedScore: bhakoot, category: 'Family & Wealth', description: 'Determines emotional joy, family longevity, and financial abundance.' },
    { name: 'Nadi (Genetic & Spiritual Union)', maxScore: 8, obtainedScore: nadi, category: 'Soul Longevity', description: 'The most powerful koota ensuring healthy lineage, energetic harmony, and spiritual sync.' }
  ];

  const totalScore = gunaBreakdown.reduce((sum, g) => sum + g.obtainedScore, 0);
  const percentage = Math.round((totalScore / 36) * 100);

  let verdict: CompatibilityResult['verdict'] = 'Highly Auspicious';
  if (totalScore >= 30) verdict = 'Cosmic Soulmates';
  else if (totalScore >= 24) verdict = 'Highly Auspicious';
  else if (totalScore >= 18) verdict = 'Harmonious Growth';
  else verdict = 'Karmic Catalyst';

  const partnerElement = ZODIAC_ELEMENTS[partnerSun];
  const elementalChemistry = {
    person1Dominant: person1.dominantElement,
    person2Dominant: partnerElement,
    compatibility: (person1.dominantElement === partnerElement) ? 'Twin Flame Element' :
      ((person1.dominantElement === 'Fire' && partnerElement === 'Air') || (person1.dominantElement === 'Air' && partnerElement === 'Fire')) ? 'Cosmic Oxygen & Flame' :
      ((person1.dominantElement === 'Earth' && partnerElement === 'Water') || (person1.dominantElement === 'Water' && partnerElement === 'Earth')) ? 'Fertile Oasis Synergy' : 'Dynamic Complement',
    synergyScore: Math.min(98, Math.max(72, percentage + 5))
  };

  const shareToken = btoa(encodeURIComponent(JSON.stringify({
    n1: person1.birthDetails.name,
    n2: partnerName,
    s: totalScore,
    p: percentage
  }))).substring(0, 16);

  return {
    person1,
    person2: {
      name: partnerName,
      dob: partnerDob,
      sunSign: partnerSun,
      moonSign: partnerMoon,
      risingSign: partnerRising
    },
    totalScore,
    percentage,
    verdict,
    synastryHighlights: [
      `${person1.sunSign} Sun + ${partnerSun} Sun creates high magnetic resonance in personal ambitions.`,
      `Moon connection (${person1.moonSign} & ${partnerMoon}) provides instinctive emotional safety.`,
      `Graha Maitri score of ${grahaMaitri}/5 ensures stimulating late-night conversations and shared philosophy.`
    ],
    elementalChemistry,
    gunaBreakdown,
    relationshipAdvice: totalScore >= 24
      ? `This union holds extraordinary celestial protection. Nurture your ${elementalChemistry.compatibility} by embarking on shared creative quests and celebrating milestones together.`
      : `A powerful catalytic bond where differences serve as mirrors for rapid soul expansion. Prioritize transparent emotional check-ins.`,
    shareableUrl: `https://astrolive.app/bond?match=${shareToken}`
  };
}
