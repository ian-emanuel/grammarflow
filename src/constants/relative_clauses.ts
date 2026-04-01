import { Introduction } from '../types';

export const RELATIVE_CLAUSES_DATA: Introduction = {
  title: "Cláusulas Relativas",
  definition: "Las cláusulas relativas se usan para dar información adicional sobre una persona o cosa sin empezar una nueva oración. Se introducen con pronombres relativos como 'who', 'which', 'that', 'whose', 'where'.",
  list: ["Who", "Which", "That", "Whose", "Where"],
  examples: [
    {
      tense: "Cláusulas Relativas (Personas)",
      context: "General",
      group: "indicativo",
      explanation: "Se usa 'who' o 'that' para referirse a personas.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "El hombre", type: "person", label: "Sujeto" }, { text: " que", type: "relative_pronoun", label: "Relativo" }, { text: " vive", type: "verb", label: "Verbo" }, { text: " al lado", type: "complement", label: "Complemento" }], target: [{ text: "The man", type: "person", label: "Sujeto" }, { text: " who", type: "relative_pronoun", label: "Relativo" }, { text: " lives", type: "verb", label: "Verbo" }, { text: " next door", type: "complement", label: "Complemento" }] }
        ]}
      ]
    },
    {
      tense: "Cláusulas Relativas (Cosas)",
      context: "General",
      group: "indicativo",
      explanation: "Se usa 'which' o 'that' para referirse a cosas o animales.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "El libro", type: "person", label: "Sujeto" }, { text: " que", type: "relative_pronoun", label: "Relativo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: " leí", type: "verb", label: "Verbo" }], target: [{ text: "The book", type: "person", label: "Sujeto" }, { text: " which", type: "relative_pronoun", label: "Relativo" }, { text: " I", type: "person", label: "Sujeto" }, { text: " read", type: "verb", label: "Verbo" }] }
        ]}
      ]
    }
  ]
};
