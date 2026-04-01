import { Introduction } from '../types';

export const PRONOUNS_DATA: Introduction = {
  title: "Pronombres en Inglés",
  definition: "Los pronombres sustituyen al nombre para evitar repeticiones. En inglés, es vital distinguir entre los que realizan la acción, los que la reciben y los que indican posesión.",
  list: ["I, You, He, She, It, We, They", "Me, You, Him, Her, It, Us, Them", "My, Your, His, Her, Its, Our, Their", "Mine, Yours, His, Hers, Ours, Theirs"],
  examples: [
    {
      tense: "Pronombres Personales (Sujeto)",
      group: "indicativo",
      explanation: "Sustituyen al sujeto de la oración. Siempre van antes del verbo.",
      persons: [
        { id: "yo", label: "Yo", forms: [{ type: "afirmativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " estudio", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "tu", label: "Tú", forms: [{ type: "afirmativo", spanish: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " estudias", type: "verb", label: "Verbo" }], english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "el_ella", label: "Él/Ella", forms: [{ type: "afirmativo", spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " estudia", type: "verb", label: "Verbo" }], english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " studies", type: "verb", label: "Verbo" }] }] },
        { id: "nosotros", label: "Nosotros", forms: [{ type: "afirmativo", spanish: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " estudiamos", type: "verb", label: "Verbo" }], english: [{ text: "We", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "uds", label: "Ustedes", forms: [{ type: "afirmativo", spanish: [{ text: "Ustedes", type: "person", label: "Sujeto" }, { text: " estudian", type: "verb", label: "Verbo" }], english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] },
        { id: "ellos", label: "Ellos", forms: [{ type: "afirmativo", spanish: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " estudian", type: "verb", label: "Verbo" }], english: [{ text: "They", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }] }] }
      ]
    },
    {
      tense: "Adjetivos Posesivos",
      group: "indicativo",
      explanation: "Indican a quién pertenece algo. Siempre van seguidos de un sustantivo.",
      persons: [
        { id: "yo", label: "Mi", forms: [{ type: "afirmativo", spanish: [{ text: "Mi", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "My", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "tu", label: "Tu", forms: [{ type: "afirmativo", spanish: [{ text: "Tu", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "Your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "el_ella", label: "Su (de él)", forms: [{ type: "afirmativo", spanish: [{ text: "Su", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "His", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "nosotros", label: "Nuestro", forms: [{ type: "afirmativo", spanish: [{ text: "Nuestro", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "Our", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "uds", label: "Su (de uds)", forms: [{ type: "afirmativo", spanish: [{ text: "Su", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "Your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "ellos", label: "Su (de ellos)", forms: [{ type: "afirmativo", spanish: [{ text: "Su", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "Their", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] }
      ]
    },
    {
      tense: "Pronombres Demostrativos",
      group: "indicativo",
      explanation: "Se usan para señalar objetos en relación a la distancia del hablante.",
      persons: [
        { id: "yo", label: "Cerca (Singular)", forms: [{ type: "afirmativo", spanish: [{ text: "Este", type: "person", label: "Demostrativo" }, { text: " es", type: "verb", label: "Verbo" }, { text: " mi", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "This", type: "person", label: "Demostrativo" }, { text: " is", type: "verb", label: "Verbo" }, { text: " my", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "tu", label: "Lejos (Singular)", forms: [{ type: "afirmativo", spanish: [{ text: "Ese", type: "person", label: "Demostrativo" }, { text: " es", type: "verb", label: "Verbo" }, { text: " tu", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }], english: [{ text: "That", type: "person", label: "Demostrativo" }, { text: " is", type: "verb", label: "Verbo" }, { text: " your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }] }] },
        { id: "el_ella", label: "Cerca (Plural)", forms: [{ type: "afirmativo", spanish: [{ text: "Estos", type: "person", label: "Demostrativo" }, { text: " son", type: "verb", label: "Verbo" }, { text: " mis", type: "auxiliary", label: "Posesivo" }, { text: " libros", type: "other", label: "Sustantivo" }], english: [{ text: "These", type: "person", label: "Demostrativo" }, { text: " are", type: "verb", label: "Verbo" }, { text: " my", type: "auxiliary", label: "Posesivo" }, { text: " books", type: "other", label: "Sustantivo" }] }] },
        { id: "nosotros", label: "Lejos (Plural)", forms: [{ type: "afirmativo", spanish: [{ text: "Esos", type: "person", label: "Demostrativo" }, { text: " son", type: "verb", label: "Verbo" }, { text: " nuestros", type: "auxiliary", label: "Posesivo" }, { text: " libros", type: "other", label: "Sustantivo" }], english: [{ text: "Those", type: "person", label: "Demostrativo" }, { text: " are", type: "verb", label: "Verbo" }, { text: " our", type: "auxiliary", label: "Posesivo" }, { text: " books", type: "other", label: "Sustantivo" }] }] }
      ]
    },
    {
      tense: "Pronombres Posesivos",
      group: "indicativo",
      explanation: "Sustituyen al sustantivo y al adjetivo posesivo. Indican posesión sin mencionar el objeto.",
      persons: [
        { id: "yo", label: "Mío", forms: [{ type: "afirmativo", spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " mío", type: "auxiliary", label: "Posesivo" }], english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " mine", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "tu", label: "Tuyo", forms: [{ type: "afirmativo", spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " tuyo", type: "auxiliary", label: "Posesivo" }], english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " yours", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "el_ella", label: "Suyo (de él)", forms: [{ type: "afirmativo", spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " suyo", type: "auxiliary", label: "Posesivo" }], english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " his", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "nosotros", label: "Nuestro", forms: [{ type: "afirmativo", spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " nuestro", type: "auxiliary", label: "Posesivo" }], english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " ours", type: "auxiliary", label: "Posesivo" }] }] },
        { id: "ellos", label: "Suyo (de ellos)", forms: [{ type: "afirmativo", spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " suyo", type: "auxiliary", label: "Posesivo" }], english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " theirs", type: "auxiliary", label: "Posesivo" }] }] }
      ]
    },
    {
      tense: "Pronombres Reflexivos",
      group: "indicativo",
      explanation: "Se usan cuando el sujeto y el objeto de la oración son la misma persona.",
      persons: [
        { id: "yo", label: "Myself", forms: [{ type: "afirmativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " me", type: "auxiliary", label: "Reflexivo" }, { text: " veo", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " myself", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "tu", label: "Yourself", forms: [{ type: "afirmativo", spanish: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " te", type: "auxiliary", label: "Reflexivo" }, { text: " ves", type: "verb", label: "Verbo" }], english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " yourself", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "el_ella", label: "Himself", forms: [{ type: "afirmativo", spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " se", type: "auxiliary", label: "Reflexivo" }, { text: " ve", type: "verb", label: "Verbo" }], english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " sees", type: "verb", label: "Verbo" }, { text: " himself", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "nosotros", label: "Ourselves", forms: [{ type: "afirmativo", spanish: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " nos", type: "auxiliary", label: "Reflexivo" }, { text: " vemos", type: "verb", label: "Verbo" }], english: [{ text: "We", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " ourselves", type: "auxiliary", label: "Reflexivo" }] }] },
        { id: "ellos", label: "Themselves", forms: [{ type: "afirmativo", spanish: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " se", type: "auxiliary", label: "Reflexivo" }, { text: " ven", type: "verb", label: "Verbo" }], english: [{ text: "They", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " themselves", type: "auxiliary", label: "Reflexivo" }] }] }
      ]
    }
  ]
};
