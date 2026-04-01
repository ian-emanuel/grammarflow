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
    tense: string;
    explanation: string;
    forms: {
      type: 'afirmativo' | 'negativo' | 'pregunta';
      spanish: string;
      english: string;
    }[];
  }[];
  list?: string[];
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
