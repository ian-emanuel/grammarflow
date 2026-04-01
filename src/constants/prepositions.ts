import { Introduction } from '../types';

export const PREPOSITIONS_DATA: Introduction = {
  title: "Preposiciones",
  definition: "Las preposiciones son palabras que indican relación entre elementos de una oración, generalmente indicando lugar, tiempo o dirección.",
  list: ["In", "On", "At", "By", "With", "For", "To", "From"],
  examples: [
    {
      tense: "Preposiciones de Lugar",
      context: "General",
      group: "indicativo",
      explanation: "Indican dónde se encuentra algo.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "El libro", type: "person", label: "Sujeto" }, { text: " está", type: "verb", label: "Verbo" }, { text: " en", type: "preposition", label: "Preposición" }, { text: " la mesa", type: "complement", label: "Complemento" }], target: [{ text: "The book", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " on", type: "preposition", label: "Preposición" }, { text: " the table", type: "complement", label: "Complemento" }] }
        ]}
      ]
    }
  ]
};
