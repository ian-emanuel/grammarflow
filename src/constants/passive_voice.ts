import { Introduction } from '../types';

export const PASSIVE_VOICE_DATA: Introduction = {
  title: "Voz Pasiva",
  definition: "La voz pasiva se usa cuando queremos dar más importancia a la acción o al objeto que recibe la acción que al sujeto que la realiza. Estructura: Verbo 'to be' (en el tiempo correspondiente) + Participio Pasado.",
  list: ["Be", "Been", "Being", "By"],
  examples: [
    {
      tense: "Voz Pasiva (Presente)",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para hechos generales o procesos actuales.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "La carta", type: "person", label: "Objeto" }, { text: " es", type: "verb", label: "Verbo Be" }, { text: " escrita", type: "verb", label: "Participio" }], target: [{ text: "The letter", type: "person", label: "Objeto" }, { text: " is", type: "auxiliary", label: "Auxiliar (Be)" }, { text: " written", type: "verb", label: "Participio" }] }
        ]}
      ]
    },
    {
      tense: "Voz Pasiva (Pasado)",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para acciones terminadas en el pasado donde el objeto es el foco.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "La carta", type: "person", label: "Objeto" }, { text: " fue", type: "verb", label: "Verbo Be (Pasado)" }, { text: " escrita", type: "verb", label: "Participio" }], target: [{ text: "The letter", type: "person", label: "Objeto" }, { text: " was", type: "auxiliary", label: "Auxiliar (Be)" }, { text: " written", type: "verb", label: "Participio" }] }
        ]}
      ]
    }
  ]
};
