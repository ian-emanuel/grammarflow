import { Category, Introduction } from './types';
import { VERB_BANK } from './constants/verbs';
import { PRONOUNS_DATA } from './constants/pronouns';
import { TENSES_DATA } from './constants/tenses';

export { VERB_BANK };

export const PRE_DESIGNED_DATA: Partial<Record<Category, Introduction>> = {
  pronombres: PRONOUNS_DATA,
  tiempos_simples: TENSES_DATA
};
