import { Category, Introduction } from './types';
import { VERB_BANK } from './constants/verbs';
import { PRONOUNS_DATA } from './constants/pronouns';
import { SIMPLES_DATA, PERFECTOS_DATA, CONTINUOS_DATA } from './constants/tenses';
import { VOCABULARY_DATA } from './constants/vocabulary';
import { MODALS_DATA } from './constants/modals';
import { CONDITIONALS_DATA } from './constants/conditionals';
import { PASSIVE_VOICE_DATA } from './constants/passive_voice';
import { REPORTED_SPEECH_DATA } from './constants/reported_speech';
import { RELATIVE_CLAUSES_DATA } from './constants/relative_clauses';
import { PREPOSITIONS_DATA } from './constants/prepositions';
import { ADVERBS_DATA } from './constants/adverbs';

export { VERB_BANK };

export const PRE_DESIGNED_DATA: Partial<Record<Category, Introduction>> = {
  pronombres: PRONOUNS_DATA,
  tiempos_simples: SIMPLES_DATA,
  tiempos_perfectos: PERFECTOS_DATA,
  tiempos_continuos: CONTINUOS_DATA,
  vocabulario: VOCABULARY_DATA,
  modales: MODALS_DATA,
  condicionales: CONDITIONALS_DATA,
  voz_pasiva: PASSIVE_VOICE_DATA,
  discurso_reportado: REPORTED_SPEECH_DATA,
  clausulas_relativas: RELATIVE_CLAUSES_DATA,
  preposiciones: PREPOSITIONS_DATA,
  adverbios: ADVERBS_DATA
};
