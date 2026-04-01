export type CategoryId = 
  | 'tiempos_simples' 
  | 'tiempos_perfectos' 
  | 'tiempos_continuos' 
  | 'modales'
  | 'condicionales'
  | 'voz_pasiva'
  | 'discurso_reportado'
  | 'clausulas_relativas'
  | 'preposiciones' 
  | 'adverbios' 
  | 'pronombres'
  | 'vocabulario'
  | 'otros';

export type Category = CategoryId;

export type ModuleId = 'fundamentos' | 'tiempos' | 'avanzado';

export interface Module {
  id: ModuleId;
  label: string;
  icon: string;
  categories: CategoryId[];
}

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
  | 'adverbios'
  | 'pronombres_personales'
  | 'posesivos'
  | 'demostrativos'
  | 'reflexivos'
  | 'modales_basicos'
  | 'modales_perfectos'
  | 'condicional_cero'
  | 'condicional_primero'
  | 'condicional_segundo'
  | 'condicional_tercero'
  | 'voz_pasiva_presente'
  | 'voz_pasiva_pasado'
  | 'reported_speech_presente'
  | 'reported_speech_pasado'
  | 'clausulas_relativas_definidas'
  | 'clausulas_relativas_no_definidas'
  | 'vocabulario_casa'
  | 'vocabulario_super'
  | 'vocabulario_trabajo'
  | 'vocabulario_aeropuerto'
  | 'vocabulario_restaurante'
  | 'vocabulario_escuela';

export type PersonId = 'yo' | 'tu' | 'el_ella' | 'nosotros' | 'uds' | 'ellos';

export type Language = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt';

export interface LanguagePair {
  source: Language;
  target: Language;
}

export interface SentencePart {
  text: string;
  type: 'person' | 'auxiliary' | 'verb' | 'suffix' | 'other' | 'complement' | 'modal' | 'preposition' | 'adverb' | 'conjunction' | 'relative_pronoun' | 'article' | 'adjective';
  label: string;
  explanation?: string;
  mnemonic?: string; // New: Mnemonic aid
}

export interface Concept {
  term: string;
  definition: string;
  usage: string;
}

export interface Introduction {
  title: string;
  definition: string;
  examples: {
    tense: string;
    context?: string;
    group: 'indicativo' | 'subjuntivo';
    explanation: string;
    mnemonic?: string; // New: Mnemonic for the whole tense/structure
    persons: {
      id: PersonId;
      label: string;
      forms: {
        type: 'afirmativo' | 'negativo' | 'pregunta';
        source: SentencePart[]; // Renamed from spanish
        target: SentencePart[]; // Renamed from english
      }[];
    }[];
  }[];
  list?: string[];
  concepts?: Concept[]; // New: Detailed concepts with insights
}

export interface Exercise {
  id: string;
  topic: GrammarTopic;
  category: Category;
  sourceSentence: string; // Renamed
  targetSentence: string; // Renamed
  grammarExplanation: string;
  mnemonic?: string; // New
  type: 'identify_source' | 'translate_to_target' | 'parallel_match';
  options: string[];
  correctAnswer: string;
  highlightedStructure: string;
  wrongAnswerExplanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  level: number;
  xp: number;
  hearts: number;
  streak: number;
  gems?: number;
  isPro?: boolean;
  badges?: string[];
  completedTopics: GrammarTopic[];
  selectedVerb?: string;
  selectedVerbType: VerbType;
  languagePair: LanguagePair;
  inventory: string[];
}

export interface World {
  id: string;
  name: string;
  icon: string;
  color: string;
  modules: ModuleId[];
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string;
  xp: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}
