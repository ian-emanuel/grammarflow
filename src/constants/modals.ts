import { Introduction } from '../types';

export const MODALS_DATA: Introduction = {
  title: "Verbos Modales",
  definition: "Los verbos modales son verbos auxiliares que expresan modalidad (posibilidad, habilidad, permiso, obligación, etc.). No cambian su forma según la persona (no llevan 's' en 3ra persona) y siempre van seguidos de un verbo en infinitivo sin 'to'.",
  concepts: [
    {
      term: "Modal",
      definition: "Verbo auxiliar que añade un matiz de significado al verbo principal.",
      usage: "Se coloca directamente antes del verbo principal (e.g., 'I can swim')."
    },
    {
      term: "Invariabilidad",
      definition: "Los modales no cambian su forma según el sujeto.",
      usage: "No se añade 's' en la tercera persona (e.g., 'He can', no 'He cans')."
    },
    {
      term: "Bare Infinitive",
      definition: "Forma base del verbo sin la partícula 'to'.",
      usage: "Los modales siempre van seguidos de un verbo en esta forma (e.g., 'must go', no 'must to go')."
    }
  ],
  examples: [
    {
      tense: "Can (Habilidad/Permiso)",
      context: "General",
      group: "indicativo",
      explanation: "Expresa habilidad física o mental, o permiso informal.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " puedo", type: "modal", label: "Modal" }, { text: " nadar", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " can", type: "modal", label: "Modal" }, { text: " swim", type: "verb", label: "Verbo" }] },
          { type: "negativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " puedo", type: "modal", label: "Modal" }, { text: " nadar", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " can", type: "modal", label: "Modal" }, { text: "not", type: "other", label: "Negación" }, { text: " swim", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Puedo", type: "modal", label: "Modal" }, { text: " yo", type: "person", label: "Sujeto" }, { text: " nadar", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Can", type: "modal", label: "Modal" }, { text: " I", type: "person", label: "Sujeto" }, { text: " swim", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]}
      ]
    },
    {
      tense: "Should (Consejo)",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para dar consejos o sugerencias.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " debería", type: "modal", label: "Modal" }, { text: " estudiar", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " should", type: "modal", label: "Modal" }, { text: " study", type: "verb", label: "Verbo" }] }
        ]}
      ]
    },
    {
      tense: "Must (Obligación)",
      context: "General",
      group: "indicativo",
      explanation: "Expresa una obligación fuerte o una necesidad.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " debo", type: "modal", label: "Modal" }, { text: " ir", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " must", type: "modal", label: "Modal" }, { text: " go", type: "verb", label: "Verbo" }] }
        ]}
      ]
    }
  ]
};
