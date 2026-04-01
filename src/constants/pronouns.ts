import { Introduction } from '../types';

export const PRONOUNS_DATA: Introduction = {
  title: "Pronombres en Inglés",
  definition: "Los pronombres sustituyen al nombre para evitar repeticiones. En inglés, es vital distinguir entre los que realizan la acción, los que la reciben y los que indican posesión.",
  concepts: [
    {
      term: "Sujeto",
      definition: "La persona o cosa que realiza la acción del verbo.",
      usage: "Se coloca antes del verbo en oraciones afirmativas (e.g., 'I study')."
    },
    {
      term: "Posesivo",
      definition: "Indica pertenencia o relación de propiedad.",
      usage: "Los adjetivos posesivos van antes del sustantivo ('My book'), mientras que los pronombres posesivos lo sustituyen ('It is mine')."
    },
    {
      term: "Demostrativo",
      definition: "Palabras que señalan la distancia física o temporal de un objeto.",
      usage: "Usa 'This/These' para lo cercano y 'That/Those' para lo lejano."
    },
    {
      term: "Reflexivo",
      definition: "Indica que la acción recae sobre el mismo sujeto que la realiza.",
      usage: "Se usa cuando el objeto directo es el mismo que el sujeto (e.g., 'I see myself')."
    }
  ],
  examples: [
    {
      tense: "Pronombres Personales (Sujeto)",
      context: "General",
      group: "indicativo",
      explanation: "Sustituyen al sujeto de la oración. Siempre van antes del verbo.",
      persons: [
        { id: "yo", label: "Yo", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " estudio", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "tu", label: "Tú", forms: [{ type: "afirmativo", source: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " estudias", type: "verb", label: "Verbo" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "el_ella", label: "Él/Ella", forms: [{ type: "afirmativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " estudia", type: "verb", label: "Verbo" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " studies", type: "verb", label: "Verbo" }] }] },
        { id: "nosotros", label: "Nosotros", forms: [{ type: "afirmativo", source: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " estudiamos", type: "verb", label: "Verbo" }], target: [{ text: "We", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "uds", label: "Ustedes", forms: [{ type: "afirmativo", source: [{ text: "Ustedes", type: "person", label: "Sujeto" }, { text: " estudian", type: "verb", label: "Verbo" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "ellos", label: "Ellos", forms: [{ type: "afirmativo", source: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " estudian", type: "verb", label: "Verbo" }], target: [{ text: "They", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] }
      ]
    },
    {
      tense: "Adjetivos Posesivos",
      context: "General",
      group: "indicativo",
      explanation: "Indican a quién pertenece algo. Siempre van seguidos de un sustantivo.",
      persons: [
        { id: "yo", label: "Mi", forms: [{ type: "afirmativo", source: [{ text: "Mi", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "My", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "tu", label: "Tu", forms: [{ type: "afirmativo", source: [{ text: "Tu", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "Your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "el_ella", label: "Su (de él)", forms: [{ type: "afirmativo", source: [{ text: "Su", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "His", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "nosotros", label: "Nuestro", forms: [{ type: "afirmativo", source: [{ text: "Nuestro", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "Our", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "uds", label: "Su (de uds)", forms: [{ type: "afirmativo", source: [{ text: "Su", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "Your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "ellos", label: "Su (de ellos)", forms: [{ type: "afirmativo", source: [{ text: "Su", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "Their", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] }
      ]
    },
    {
      tense: "Pronombres Demostrativos",
      context: "General",
      group: "indicativo",
      explanation: "Se usan para señalar objetos en relación a la distancia del hablante.",
      persons: [
        { id: "yo", label: "Cerca (Singular)", forms: [{ type: "afirmativo", source: [{ text: "Este", type: "person", label: "Demostrativo" }, { text: " es", type: "verb", label: "Verbo" }, { text: " mi", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "This", type: "person", label: "Demostrativo" }, { text: " is", type: "verb", label: "Verbo" }, { text: " my", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "tu", label: "Lejos (Singular)", forms: [{ type: "afirmativo", source: [{ text: "Ese", type: "person", label: "Demostrativo" }, { text: " es", type: "verb", label: "Verbo" }, { text: " tu", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], target: [{ text: "That", type: "person", label: "Demostrativo" }, { text: " is", type: "verb", label: "Verbo" }, { text: " your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "el_ella", label: "Cerca (Plural)", forms: [{ type: "afirmativo", source: [{ text: "Estos", type: "person", label: "Demostrativo" }, { text: " son", type: "verb", label: "Verbo" }, { text: " mis", type: "auxiliary", label: "Posesivo" }, { text: " libros", type: "other", label: "Sustantivo" }], target: [{ text: "These", type: "person", label: "Demostrativo" }, { text: " are", type: "verb", label: "Verbo" }, { text: " my", type: "auxiliary", label: "Posesivo" }, { text: " books", type: "other", label: "Sustantivo" }] }] },
        { id: "nosotros", label: "Lejos (Plural)", forms: [{ type: "afirmativo", source: [{ text: "Esos", type: "person", label: "Demostrativo" }, { text: " son", type: "verb", label: "Verbo" }, { text: " nuestros", type: "auxiliary", label: "Posesivo" }, { text: " libros", type: "other", label: "Sustantivo" }], target: [{ text: "Those", type: "person", label: "Demostrativo" }, { text: " are", type: "verb", label: "Verbo" }, { text: " our", type: "auxiliary", label: "Posesivo" }, { text: " books", type: "other", label: "Sustantivo" }] }] }
      ]
    },
    {
      tense: "Pronombres Posesivos",
      context: "General",
      group: "indicativo",
      explanation: "Sustituyen al sustantivo y al adjetivo posesivo. Indican posesión sin mencionar el objeto.",
      persons: [
        { id: "yo", label: "Mío", forms: [{ type: "afirmativo", source: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " mío", type: "auxiliary", label: "Posesivo" }], target: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " mine", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "tu", label: "Tuyo", forms: [{ type: "afirmativo", source: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " tuyo", type: "auxiliary", label: "Posesivo" }], target: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " yours", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "el_ella", label: "Suyo (de él)", forms: [{ type: "afirmativo", source: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " suyo", type: "auxiliary", label: "Posesivo" }], target: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " his", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "nosotros", label: "Nuestro", forms: [{ type: "afirmativo", source: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " nuestro", type: "auxiliary", label: "Posesivo" }], target: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " ours", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "ellos", label: "Suyo (de ellos)", forms: [{ type: "afirmativo", source: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " suyo", type: "auxiliary", label: "Posesivo" }], target: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " theirs", type: "auxiliary", label: "Posesivo" }] }] }
      ]
    },
    {
      tense: "Pronombres Reflexivos",
      context: "General",
      group: "indicativo",
      explanation: "Se usan cuando el sujeto y el objeto de la oración son la misma persona.",
      persons: [
        { id: "yo", label: "Myself", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " me", type: "auxiliary", label: "Reflexivo" }, { text: " veo", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " myself", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "tu", label: "Yourself", forms: [{ type: "afirmativo", source: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " te", type: "auxiliary", label: "Reflexivo" }, { text: " ves", type: "verb", label: "Verbo" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " yourself", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "el_ella", label: "Himself", forms: [{ type: "afirmativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " se", type: "auxiliary", label: "Reflexivo" }, { text: " ve", type: "verb", label: "Verbo" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " sees", type: "verb", label: "Verbo" }, { text: " himself", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "nosotros", label: "Ourselves", forms: [{ type: "afirmativo", source: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " nos", type: "auxiliary", label: "Reflexivo" }, { text: " vemos", type: "verb", label: "Verbo" }], target: [{ text: "We", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " ourselves", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "ellos", label: "Themselves", forms: [{ type: "afirmativo", source: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " se", type: "auxiliary", label: "Reflexivo" }, { text: " ven", type: "verb", label: "Verbo" }], target: [{ text: "They", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " themselves", type: "auxiliary", label: "Reflexivo" }] }] }
      ]
    }
  ]
};
