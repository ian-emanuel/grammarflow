import { Introduction } from '../types';

export const REPORTED_SPEECH_DATA: Introduction = {
  title: "Discurso Reportado",
  definition: "El discurso reportado (Reported Speech) se usa para contar lo que alguien más ha dicho. Generalmente, los tiempos verbales retroceden un paso en el pasado (backshift).",
  list: ["Said", "Told", "That"],
  examples: [
    {
      tense: "Reported Speech (Presente a Pasado)",
      context: "General",
      group: "indicativo",
      explanation: "Si el discurso directo está en presente simple, el reportado pasa a pasado simple.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " dijo", type: "verb", label: "Verbo Reporte" }, { text: " que", type: "conjunction", label: "Conjunción" }, { text: " él", type: "person", label: "Sujeto" }, { text: " estaba", type: "verb", label: "Verbo (Pasado)" }, { text: " feliz", type: "complement", label: "Complemento" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " said", type: "verb", label: "Verbo Reporte" }, { text: " that", type: "conjunction", label: "Conjunción" }, { text: " he", type: "person", label: "Sujeto" }, { text: " was", type: "verb", label: "Verbo (Pasado)" }, { text: " happy", type: "complement", label: "Complemento" }] }
        ]}
      ]
    }
  ]
};
