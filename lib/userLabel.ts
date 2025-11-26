function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return h >>> 0
}

const adjectives = [
  '静かな',
  '速い',
  '明るい',
  '鋭い',
  '柔らかい',
  '強い',
  '軽やか',
  '賢い',
  '清らか',
  '穏やか',
  '勇ましい',
  'しなやか',
  '機敏な',
  '陽気な',
  '粘り強い',
  '冴えた'
]

const animals = [
  'キツネ',
  'タヌキ',
  'ネコ',
  'イヌ',
  'トリ',
  'イルカ',
  'クマ',
  'シカ',
  'パンダ',
  'ウサギ',
  'オオカミ',
  'リス',
  'コアラ',
  'サル',
  'ペンギン',
  'フクロウ'
]

const animalEmoji: Record<string, string> = {
  キツネ: '🦊',
  タヌキ: '🦝',
  ネコ: '🐱',
  イヌ: '🐶',
  トリ: '🐦',
  イルカ: '🐬',
  クマ: '🐻',
  シカ: '🦌',
  パンダ: '🐼',
  ウサギ: '🐰',
  オオカミ: '🐺',
  リス: '🐿️',
  コアラ: '🐨',
  サル: '🐵',
  ペンギン: '🐧',
  フクロウ: '🦉'
}

export function userLabel(userId: string) {
  const h = hash(userId)
  const a = adjectives[h % adjectives.length]
  const b = animals[(h >>> 8) % animals.length]
  const name = a + b
  const hue = h % 360
  const color = `hsl(${hue} 70% 55%)`
  const emoji = animalEmoji[b] ?? '🐾'
  return { name, color, emoji }
}
