export type Category = 
  | 'tiempos_simples' 
  | 'tiempos_perfectos' 
  | 'tiempos_continuos' 
  | 'preposiciones' 
  | 'adverbios' 
  | 'otros';

export type VerbType = 'regulares' | 'irregulares' | 'cualquiera';

export type GrammarTopic = 
  | 'presente' 
  | 'pasado' 
  | 'futuro' 
  | 'futuro_idiomatico' 
  | 'copreterito' 
  | 'pospreterito'
  | 'subjuntivo_presente'
  | 'subjuntivo_imperfecto'
  | 'subjuntivo_futuro'
  | 'presente_perfecto'
  | 'pasado_perfecto'
  | 'futuro_perfecto'
  | 'futuro_idiomatico_perfecto'
  | 'condicional_perfecto'
  | 'presente_continuo'
  | 'pasado_continuo'
  | 'futuro_continuo'
  | 'futuro_idiomatico_continuo'
  | 'condicional_continuo'
  | 'preposiciones' 
  | 'adverbios';

export interface Introduction {
  title: string;
  definition: string;
  examples: {
    spanish: string;
    english: string;
    explanation: string;
  }[];
  list?: string[]; // For things like prepositions list
}

export interface Exercise {
  id: string;
  topic: GrammarTopic;
  category: Category;
  spanishSentence: string;
  englishSentence: string;
  grammarExplanation: string;
  type: 'identify_spanish' | 'translate_to_english' | 'parallel_match';
  options: string[];
  correctAnswer: string;
  highlightedStructure: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  hearts: number;
  completedTopics: GrammarTopic[];
  selectedVerb?: string;
  selectedVerbType: VerbType;
}
