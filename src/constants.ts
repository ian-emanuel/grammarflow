import { Introduction, Category } from './types';

export const VERB_BANK = {
  regulares: [
    { spanish: "jugar", english: "play" },
    { spanish: "trabajar", english: "work" },
    { spanish: "estudiar", english: "study" },
    { spanish: "escuchar", english: "listen" },
    { spanish: "mirar", english: "watch" },
    { spanish: "bailar", english: "dance" },
    { spanish: "cocinar", english: "cook" },
    { spanish: "limpiar", english: "clean" },
    { spanish: "caminar", english: "walk" },
    { spanish: "hablar", english: "talk" }
  ],
  irregulares: [
    { spanish: "ir", english: "go" },
    { spanish: "comer", english: "eat" },
    { spanish: "beber", english: "drink" },
    { spanish: "dormir", english: "sleep" },
    { spanish: "correr", english: "run" },
    { spanish: "escribir", english: "write" },
    { spanish: "leer", english: "read" },
    { spanish: "hablar", english: "speak" },
    { spanish: "ver", english: "see" },
    { spanish: "comprar", english: "buy" }
  ]
};

export const PRE_DESIGNED_DATA: Partial<Record<Category, Introduction>> = {
  pronombres: {
    title: "Pronombres en Inglés",
    definition: "Los pronombres sustituyen al nombre para evitar repeticiones. En inglés, es vital distinguir entre los que realizan la acción, los que la reciben y los que indican posesión.",
    list: ["I, You, He, She, It, We, They", "Me, You, Him, Her, It, Us, Them", "My, Your, His, Her, Its, Our, Their", "Mine, Yours, His, Hers, Ours, Theirs"],
    examples: [
      {
        tense: "Pronombres Personales (Sujeto)",
        group: "indicativo",
        explanation: "Sustituyen al sujeto de la oración. Siempre van antes del verbo.",
        persons: [
          {
            id: "yo",
            label: "Yo",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " estudio", type: "verb", label: "Verbo" }],
                english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }]
              }
            ]
          },
          {
            id: "tu",
            label: "Tú",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " estudias", type: "verb", label: "Verbo" }],
                english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " study", type: "verb", label: "Verbo" }]
              }
            ]
          }
        ]
      },
      {
        tense: "Adjetivos Posesivos",
        group: "indicativo",
        explanation: "Indican a quién pertenece algo. Siempre van seguidos de un sustantivo.",
        persons: [
          {
            id: "yo",
            label: "Mi",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Mi", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }],
                english: [{ text: "My", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }]
              }
            ]
          },
          {
            id: "tu",
            label: "Tu",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Tu", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }],
                english: [{ text: "Your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }]
              }
            ]
          }
        ]
      },
      {
        tense: "Pronombres Demostrativos",
        group: "indicativo",
        explanation: "Se usan para señalar objetos en relación a la distancia del hablante.",
        persons: [
          {
            id: "yo",
            label: "Cerca",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Este", type: "person", label: "Demostrativo" }, { text: " es", type: "verb", label: "Verbo" }, { text: " mi", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }],
                english: [{ text: "This", type: "person", label: "Demostrativo" }, { text: " is", type: "verb", label: "Verbo" }, { text: " my", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }]
              }
            ]
          },
          {
            id: "tu",
            label: "Lejos",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Ese", type: "person", label: "Demostrativo" }, { text: " es", type: "verb", label: "Verbo" }, { text: " tu", type: "auxiliary", label: "Posesivo" }, { text: " libro", type: "other", label: "Sustantivo" }],
                english: [{ text: "That", type: "person", label: "Demostrativo" }, { text: " is", type: "verb", label: "Verbo" }, { text: " your", type: "auxiliary", label: "Posesivo" }, { text: " book", type: "other", label: "Sustantivo" }]
              }
            ]
          }
        ]
      },
      {
        tense: "Pronombres Posesivos",
        group: "indicativo",
        explanation: "Sustituyen al sustantivo y al adjetivo posesivo. Indican posesión sin mencionar el objeto.",
        persons: [
          {
            id: "yo",
            label: "Mío",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " mío", type: "auxiliary", label: "Posesivo" }],
                english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " mine", type: "auxiliary", label: "Posesivo" }]
              }
            ]
          },
          {
            id: "tu",
            label: "Tuyo",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Es", type: "verb", label: "Verbo" }, { text: " tuyo", type: "auxiliary", label: "Posesivo" }],
                english: [{ text: "It", type: "person", label: "Sujeto" }, { text: " is", type: "verb", label: "Verbo" }, { text: " yours", type: "auxiliary", label: "Posesivo" }]
              }
            ]
          }
        ]
      },
      {
        tense: "Pronombres Reflexivos",
        group: "indicativo",
        explanation: "Se usan cuando el sujeto y el objeto de la oración son la misma persona.",
        persons: [
          {
            id: "yo",
            label: "Mismo",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " me", type: "auxiliary", label: "Reflexivo" }, { text: " veo", type: "verb", label: "Verbo" }],
                english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " myself", type: "auxiliary", label: "Reflexivo" }]
              }
            ]
          },
          {
            id: "tu",
            label: "Mismo",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " te", type: "auxiliary", label: "Reflexivo" }, { text: " ves", type: "verb", label: "Verbo" }],
                english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " see", type: "verb", label: "Verbo" }, { text: " yourself", type: "auxiliary", label: "Reflexivo" }]
              }
            ]
          }
        ]
      }
    ]
  },
  tiempos_simples: {
    title: "Tiempos Simples",
    definition: "Los tiempos simples en inglés (Present, Past, Future) son la base de la comunicación. Se caracterizan por no usar auxiliares en su forma afirmativa (excepto el futuro), pero sí en la negativa e interrogativa.",
    list: ["Do/Does", "Did", "Will"],
    examples: [
      {
        tense: "Presente Simple",
        group: "indicativo",
        explanation: "Se usa para rutinas y verdades universales. En la 3ra persona del singular (he, she, it) se añade una 's' al verbo.",
        persons: [
          {
            id: "yo",
            label: "Yo",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " juego", type: "verb", label: "Verbo" }],
                english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }]
              },
              {
                type: "negativo",
                spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juego", type: "verb", label: "Verbo" }],
                english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }]
              },
              {
                type: "pregunta",
                spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juego", type: "verb", label: "Verbo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }],
                english: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }]
              }
            ]
          },
          {
            id: "el_ella",
            label: "Él/Ella",
            forms: [
              {
                type: "afirmativo",
                spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " juega", type: "verb", label: "Verbo" }],
                english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "s", type: "suffix", label: "Sufijo 3ra Persona" }]
              },
              {
                type: "negativo",
                spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juega", type: "verb", label: "Verbo" }],
                english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " does", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }]
              },
              {
                type: "pregunta",
                spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juega", type: "verb", label: "Verbo" }, { text: " él", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }],
                english: [{ text: "Does", type: "auxiliary", label: "Auxiliar" }, { text: " he", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }]
              }
            ]
          }
        ]
      }
    ]
  }
};
