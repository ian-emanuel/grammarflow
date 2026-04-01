export const GRAMMAR_COLORS = {
  person: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500'
  },
  verb: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500'
  },
  auxiliary: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500'
  },
  suffix: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500'
  },
  complement: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-500'
  },
  other: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-500'
  },
  modal: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500'
  },
  preposition: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
    dot: 'bg-cyan-500'
  },
  adverb: {
    bg: 'bg-lime-100',
    text: 'text-lime-700',
    border: 'border-lime-200',
    dot: 'bg-lime-500'
  },
  conjunction: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
    dot: 'bg-orange-500'
  },
  relative_pronoun: {
    bg: 'bg-teal-100',
    text: 'text-teal-700',
    border: 'border-teal-200',
    dot: 'bg-teal-500'
  },
  article: {
    bg: 'bg-zinc-100',
    text: 'text-zinc-700',
    border: 'border-zinc-200',
    dot: 'bg-zinc-500'
  },
  adjective: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    border: 'border-pink-200',
    dot: 'bg-pink-500'
  }
};

export const CONTEXT_THEMES: Record<string, { bg: string; primary: string }> = {
  'General': { bg: 'bg-emerald-50', primary: 'text-emerald-600' },
  'Casa': { bg: 'bg-orange-50', primary: 'text-orange-600' },
  'Trabajo': { bg: 'bg-blue-50', primary: 'text-blue-600' },
  'Viajes': { bg: 'bg-purple-50', primary: 'text-purple-600' },
  'Supermercado': { bg: 'bg-amber-50', primary: 'text-amber-600' },
  'Aeropuerto': { bg: 'bg-indigo-50', primary: 'text-indigo-600' },
  'Restaurante': { bg: 'bg-rose-50', primary: 'text-rose-600' },
  'Escuela': { bg: 'bg-cyan-50', primary: 'text-cyan-600' }
};
