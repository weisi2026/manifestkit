// Moon phase calculation and manifestation tips

export type MoonPhaseName = 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';

export interface MoonPhaseInfo {
  phase: MoonPhaseName;
  emoji: string;
  illumination: number; // 0-1
  dayInCycle: number;   // 0-29.53
  manifestationTip: string;
  bestAction: string;
}

const SYNODIC_MONTH = 29.53058867;
const KNOWN_NEW_MOON = new Date(2000, 0, 6, 18, 14, 0).getTime(); // Jan 6 2000 known new moon

const phaseTips: Record<MoonPhaseName, { tip: string; action: string }> = {
  'New Moon': {
    tip: 'The darkest night holds the most potent seeds. This is the Universe\'s blank canvas — plant your intentions deeply.',
    action: 'Set new intentions, write goals, start new projects, perform New Moon rituals',
  },
  'Waxing Crescent': {
    tip: 'Your intentions are taking root beneath the surface. Nurture them with daily affirmations and small actions.',
    action: 'Take first steps, gather resources, affirm your intentions daily, build momentum',
  },
  'First Quarter': {
    tip: 'Challenges arise to test your commitment. This is the Universe asking: "How badly do you want it?"',
    action: 'Push through obstacles, make decisions, take bold action, commit to your vision',
  },
  'Waxing Gibbous': {
    tip: 'Your manifestation is building energy. Refine your approach and trust the process — you\'re almost there.',
    action: 'Refine plans, adjust strategies, edit and perfect, practice gratitude for what\'s coming',
  },
  'Full Moon': {
    tip: 'Maximum illumination! What was hidden is revealed. Celebrate manifestations and release what no longer serves you.',
    action: 'Celebrate wins, perform gratitude rituals, release limiting beliefs, charge crystals, journal insights',
  },
  'Waning Gibbous': {
    tip: 'Time to share your wisdom and harvest. What you\'ve learned can illuminate others\' paths.',
    action: 'Share knowledge, teach others, express gratitude, review accomplishments, give back',
  },
  'Last Quarter': {
    tip: 'Release and let go. Old patterns and beliefs must be shed to make way for the new cycle.',
    action: 'Forgive, release negativity, break bad habits, detox — body and mind, declutter',
  },
  'Waning Crescent': {
    tip: 'Rest and surrender. The cycle is completing. Go within, dream, and prepare for the next New Moon.',
    action: 'Rest, meditate, Self-care practices, dream journaling, reflect and surrender',
  },
};

function getPhaseName(pct: number): MoonPhaseName {
  if (pct < 0.03 || pct > 0.97) return 'New Moon';
  if (pct < 0.22) return 'Waxing Crescent';
  if (pct < 0.28) return 'First Quarter';
  if (pct < 0.47) return 'Waxing Gibbous';
  if (pct < 0.53) return 'Full Moon';
  if (pct < 0.72) return 'Waning Gibbous';
  if (pct < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
}

function getPhaseEmoji(phase: MoonPhaseName): string {
  const map: Record<MoonPhaseName, string> = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘',
  };
  return map[phase];
}

function getIllumination(pct: number): number {
  // Approximate illumination based on phase
  return Math.round((1 - Math.cos(2 * Math.PI * pct)) / 2 * 100) / 100;
}

export function getMoonPhase(date?: Date): MoonPhaseInfo {
  const now = date ? date.getTime() : Date.now();
  const diff = (now - KNOWN_NEW_MOON) / 86400000;
  const dayInCycle = ((diff % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const pct = dayInCycle / SYNODIC_MONTH;
  const phase = getPhaseName(pct);

  return {
    phase,
    emoji: getPhaseEmoji(phase),
    illumination: getIllumination(pct),
    dayInCycle: Math.round(dayInCycle * 100) / 100,
    manifestationTip: phaseTips[phase].tip,
    bestAction: phaseTips[phase].action,
  };
}

// Get moon phases for a range of dates (for calendar)
export function getMoonPhasesForMonth(year: number, month: number): { date: Date; phase: MoonPhaseInfo }[] {
  const days = new Date(year, month + 1, 0).getDate();
  const result: { date: Date; phase: MoonPhaseInfo }[] = [];
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d, 12, 0, 0);
    result.push({ date, phase: getMoonPhase(date) });
  }
  return result;
}

// Find next full moon from a given date
export function findNextFullMoon(fromDate?: Date): Date {
  const start = fromDate || new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const info = getMoonPhase(d);
    if (info.phase === 'Full Moon') return d;
  }
  return new Date(start.getTime() + 15 * 86400000);
}

// Find next new moon from a given date
export function findNextNewMoon(fromDate?: Date): Date {
  const start = fromDate || new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const info = getMoonPhase(d);
    if (info.phase === 'New Moon') return d;
  }
  return new Date(start.getTime() + 15 * 86400000);
}