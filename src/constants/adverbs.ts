import { Introduction } from '../types';

export const ADVERBS_DATA: Introduction = {
  title: "Adverbios",
  definition: "Los adverbios son palabras que modifican a un verbo, un adjetivo u otro adverbio, indicando cómo, cuándo, dónde o con qué frecuencia ocurre algo.",
  list: ["Quickly", "Slowly", "Always", "Never", "Often", "Sometimes"],
  examples: [
    {
      tense: "Adverbios de Modo",
      context: "General",
      group: "indicativo",
      explanation: "Indican cómo se realiza una acción.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " corre", type: "verb", label: "Verbo" }, { text: " rápidamente", type: "adverb", label: "Adverbio" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " runs", type: "verb", label: "Verbo" }, { text: " quickly", type: "adverb", label: "Adverbio" }] }
        ]}
      ]
    }
  ]
};
