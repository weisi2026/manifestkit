// Affirmation database organized by category
export type AffirmationCategory = 'abundance' | 'love' | 'health' | 'confidence' | 'peace' | 'success' | 'gratitude' | 'self-love';

export const categoryMeta: Record<AffirmationCategory, { emoji: string; label: string; color: string }> = {
  abundance:   { emoji: '💰', label: 'Abundance & Wealth',    color: 'from-amber-400 to-yellow-500' },
  love:       { emoji: '💕', label: 'Love & Relationships',   color: 'from-pink-400 to-rose-500' },
  health:     { emoji: '🌿', label: 'Health & Wellness',      color: 'from-green-400 to-emerald-500' },
  confidence: { emoji: '🔥', label: 'Confidence & Power',      color: 'from-orange-400 to-red-500' },
  peace:      { emoji: '🧘', label: 'Peace & Calm',            color: 'from-blue-400 to-cyan-500' },
  success:    { emoji: '🏆', label: 'Success & Achievement',   color: 'from-purple-400 to-indigo-500' },
  gratitude:  { emoji: '🙏', label: 'Gratitude & Joy',        color: 'from-yellow-400 to-amber-500' },
  'self-love':{ emoji: '💜', label: 'Self-Love & Worth',      color: 'from-violet-400 to-purple-500' },
};

export const affirmations: Record<AffirmationCategory, string[]> = {
  abundance: [
    "Money flows to me easily and effortlessly.",
    "I am a magnet for financial abundance.",
    "Wealth constantly flows into my life.",
    "I release all resistance to attracting money.",
    "My income is constantly increasing.",
    "I am worthy of financial freedom.",
    "Abundance is my birthright.",
    "Every dollar I spend comes back to me multiplied.",
    "I am open and receptive to all the wealth life offers me.",
    "My actions create constant prosperity.",
    "I attract lucrative opportunities naturally.",
    "Financial abundance is flowing into my life right now.",
  ],
  love: [
    "I am worthy of deep, unconditional love.",
    "My heart is open to giving and receiving love.",
    "I attract loving and supportive people into my life.",
    "I deserve a relationship filled with passion and respect.",
    "Love surrounds me everywhere I go.",
    "I radiate love and love radiates back to me.",
    "My relationship is filled with love, trust, and understanding.",
    "I am a magnet for soul-deep connections.",
    "Every day, my capacity for love expands.",
    "The perfect partner is being drawn to me now.",
    "I love myself and am loved by others deeply.",
    "My love life is filled with joy and harmony.",
  ],
  health: [
    "My body is a vessel of wellness and vitality.",
    "Every cell in my body vibrates with health and energy.",
    "I am grateful for my healthy, strong body.",
    "Healing energy flows through me with every breath.",
    "I nourish my body with healthy choices.",
    "My immune system is powerful and strong.",
    "I am becoming healthier and stronger every day.",
    "My body heals itself naturally and perfectly.",
    "I radiate vibrant health and well-being.",
    "I listen to my body and give it what it needs.",
    "Perfect health is my birthright.",
    "I am filled with life force and energy.",
  ],
  confidence: [
    "I am confident, capable, and powerful.",
    "I trust myself and my decisions completely.",
    "I am bold, brave, and unstoppable.",
    "My confidence grows stronger every day.",
    "I embrace challenges as opportunities to grow.",
    "I am fearlessly myself at all times.",
    "I radiate confidence, self-respect, and inner power.",
    "I am enough just as I am.",
    "I have everything I need to succeed.",
    "My voice matters and I speak with authority.",
    "I step into my power with grace and confidence.",
    "I am the architect of my destiny.",
  ],
  peace: [
    "Peace flows through me like a river.",
    "I am calm, centered, and at peace.",
    "I release all worry and embrace serenity.",
    "My mind is calm and my heart is still.",
    "I choose peace over worry, every time.",
    "I am surrounded by an ocean of peace.",
    "With every breath, I inhale peace and exhale tension.",
    "I am at peace with my past, present, and future.",
    "Calm energy fills every fiber of my being.",
    "I trust the process of life completely.",
    "Everything is working out for my highest good.",
    "Inner peace is my natural state of being.",
  ],
  success: [
    "I am destined for greatness.",
    "Success flows to me naturally and effortlessly.",
    "I am aligned with the energy of success.",
    "Every day, I move closer to my vision.",
    "I am a powerful creator of my reality.",
    "My potential to succeed is infinite.",
    "I achieve whatever I set my mind to.",
    "Opportunities for success are everywhere around me.",
    "I am successful in everything I do.",
    "My gifts and talents are needed in this world.",
    "I am unstoppable in the pursuit of my dreams.",
    "Success is my natural birthright.",
  ],
  gratitude: [
    "I am grateful for every experience in my life.",
    "Abundance surrounds me and I am thankful.",
    "I appreciate the small miracles in each day.",
    "Gratitude fills my heart and attracts more blessings.",
    "I celebrate every moment of this beautiful life.",
    "Thank you, Universe, for your infinite blessings.",
    "I see beauty and abundance everywhere I look.",
    "My life is filled with blessings I am grateful for.",
    "I am thankful for all the good coming into my life.",
    "Every day is a gift I deeply appreciate.",
    "Gratitude transforms my life in magical ways.",
    "I am grateful for who I am and who I am becoming.",
  ],
  'self-love': [
    "I love and accept myself exactly as I am.",
    "I am worthy of love, respect, and kindness.",
    "I honor my feelings and needs without guilt.",
    "I am enough — just as I am right now.",
    "I deserve to treat myself with compassion.",
    "My worth is not defined by others' opinions.",
    "I choose to love myself unconditionally.",
    "I am proud of who I am and who I'm becoming.",
    "I forgive myself for past mistakes with love.",
    "My relationship with myself is my highest priority.",
    "I am beautiful inside and out.",
    "Self-love is the foundation of my happy life.",
  ],
};

// Get random affirmation from a category
export function getRandomAffirmation(category: AffirmationCategory): string {
  const list = affirmations[category];
  return list[Math.floor(Math.random() * list.length)];
}

// Get random affirmation from any category
export function getRandomAnyAffirmation(): { category: AffirmationCategory; text: string } {
  const categories = Object.keys(affirmations) as AffirmationCategory[];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  return { category: cat, text: getRandomAffirmation(cat) };
}

// Get daily affirmation (deterministic based on date)
export function getDailyAffirmation(): { category: AffirmationCategory; text: string } {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const categories = Object.keys(affirmations) as AffirmationCategory[];
  const cat = categories[dayOfYear % categories.length];
  const list = affirmations[cat];
  const idx = dayOfYear % list.length;
  return { category: cat, text: list[idx] };
}