import { Introduction } from '../types';

export const CONDITIONALS_DATA: Introduction = {
  title: "Condicionales",
  definition: "Los condicionales se usan para hablar de situaciones reales o hipotéticas y sus resultados. Se componen de una cláusula 'if' (condición) y una cláusula de resultado.",
  concepts: [
    {
      term: "Cláusula If",
      definition: "La parte de la oración que establece la condición necesaria.",
      usage: "Suele ir al principio (seguida de coma) o al final de la oración (e.g., 'If it rains, I'll stay' o 'I'll stay if it rains')."
    },
    {
      term: "Resultado",
      definition: "La consecuencia que ocurre si se cumple la condición.",
      usage: "Dependiendo del tipo de condicional, usa diferentes tiempos verbales (e.g., 'will' para el primero, 'would' para el segundo)."
    },
    {
      term: "Hipotético",
      definition: "Situaciones que no son reales en el presente o son poco probables.",
      usage: "Se expresan principalmente con el segundo condicional usando el pasado simple en la condición (e.g., 'If I won')."
    }
  ],
  examples: [
    {
      tense: "Condicional Cero",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para verdades universales o hechos científicos. Ambas cláusulas van en presente simple.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Si", type: "conjunction", label: "Conjunción" }, { text: " yo", type: "person", label: "Sujeto" }, { text: " caliento", type: "verb", label: "Verbo" }, { text: " hielo", type: "complement", label: "Complemento" }, { text: ", se", type: "other", label: "Pronombre" }, { text: " derrite", type: "verb", label: "Verbo" }], target: [{ text: "If", type: "conjunction", label: "Conjunción" }, { text: " I", type: "person", label: "Sujeto" }, { text: " heat", type: "verb", label: "Verbo" }, { text: " ice", type: "complement", label: "Complemento" }, { text: ", it", type: "person", label: "Sujeto" }, { text: " melts", type: "verb", label: "Verbo" }] }
        ]}
      ]
    },
    {
      tense: "Primer Condicional",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para situaciones reales o posibles en el futuro. Estructura: If + Presente Simple, Will + Infinitivo.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Si", type: "conjunction", label: "Conjunción" }, { text: " yo", type: "person", label: "Sujeto" }, { text: " estudio", type: "verb", label: "Verbo" }, { text: ", yo", type: "person", label: "Sujeto" }, { text: " aprobaré", type: "verb", label: "Verbo" }], target: [{ text: "If", type: "conjunction", label: "Conjunción" }, { text: " I", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }, { text: ", I", type: "person", label: "Sujeto" }, { text: " will", type: "auxiliary", label: "Auxiliar" }, { text: " pass", type: "verb", label: "Verbo" }] }
        ]}
      ]
    },
    {
      tense: "Segundo Condicional",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para situaciones hipotéticas o poco probables en el presente o futuro. Estructura: If + Pasado Simple, Would + Infinitivo.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Si", type: "conjunction", label: "Conjunción" }, { text: " yo", type: "person", label: "Sujeto" }, { text: " ganara", type: "verb", label: "Verbo" }, { text: " la lotería", type: "complement", label: "Complemento" }, { text: ", yo", type: "person", label: "Sujeto" }, { text: " viajaría", type: "verb", label: "Verbo" }], target: [{ text: "If", type: "conjunction", label: "Conjunción" }, { text: " I", type: "person", label: "Sujeto" }, { text: " won", type: "verb", label: "Verbo" }, { text: " the lottery", type: "complement", label: "Complemento" }, { text: ", I", type: "person", label: "Sujeto" }, { text: " would", type: "modal", label: "Modal" }, { text: " travel", type: "verb", label: "Verbo" }] }
        ]}
      ]
    }
  ]
};
