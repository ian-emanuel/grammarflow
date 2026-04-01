import { Introduction } from '../types';

export const TENSES_DATA: Introduction = {
  title: "Tiempos Simples",
  definition: "Los tiempos simples en inglés (Present, Past, Future) son la base de la comunicación. Se caracterizan por no usar auxiliares en su forma afirmativa (excepto el futuro), pero sí en la negativa e interrogativa.",
  list: ["Do/Does", "Did", "Will"],
  examples: [
    {
      tense: "Presente Simple",
      group: "indicativo",
      explanation: "Se usa para rutinas y verdades universales. En la 3ra persona del singular (he, she, it) se añade una 's' al verbo.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " juego", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juego", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juego", type: "verb", label: "Verbo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "tu", label: "Tú", forms: [
          { type: "afirmativo", spanish: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " juegas", type: "verb", label: "Verbo" }], english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", spanish: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juegas", type: "verb", label: "Verbo" }], english: [{ text: "You", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juegas", type: "verb", label: "Verbo" }, { text: " tú", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " you", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "el_ella", label: "Él/Ella", forms: [
          { type: "afirmativo", spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " juega", type: "verb", label: "Verbo" }], english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "s", type: "suffix", label: "Sufijo 3ra Persona" }] },
          { type: "negativo", spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juega", type: "verb", label: "Verbo" }], english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " does", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juega", type: "verb", label: "Verbo" }, { text: " él", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Does", type: "auxiliary", label: "Auxiliar" }, { text: " he", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "nosotros", label: "Nosotros", forms: [
          { type: "afirmativo", spanish: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " jugamos", type: "verb", label: "Verbo" }], english: [{ text: "We", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", spanish: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " jugamos", type: "verb", label: "Verbo" }], english: [{ text: "We", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Jugamos", type: "verb", label: "Verbo" }, { text: " nosotros", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " we", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "ellos", label: "Ellos", forms: [
          { type: "afirmativo", spanish: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " juegan", type: "verb", label: "Verbo" }], english: [{ text: "They", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", spanish: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juegan", type: "verb", label: "Verbo" }], english: [{ text: "They", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juegan", type: "verb", label: "Verbo" }, { text: " ellos", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " they", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]}
      ]
    },
    {
      tense: "Pasado Simple",
      group: "indicativo",
      explanation: "Se usa para acciones terminadas en el pasado. Los verbos regulares añaden 'ed'. Los irregulares cambian su forma. En negativo e interrogativo se usa el auxiliar 'did'.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " jugué", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "ed", type: "suffix", label: "Pasado" }] },
          { type: "negativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " jugué", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " did", type: "auxiliary", label: "Auxiliar Pasado" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Jugué", type: "verb", label: "Verbo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Did", type: "auxiliary", label: "Auxiliar Pasado" }, { text: " I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "el_ella", label: "Él/Ella", forms: [
          { type: "afirmativo", spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " jugó", type: "verb", label: "Verbo" }], english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "ed", type: "suffix", label: "Pasado" }] },
          { type: "negativo", spanish: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " jugó", type: "verb", label: "Verbo" }], english: [{ text: "He", type: "person", label: "Sujeto" }, { text: " did", type: "auxiliary", label: "Auxiliar Pasado" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] }
        ]}
      ]
    },
    {
      tense: "Futuro Simple",
      group: "indicativo",
      explanation: "Se usa para decisiones espontáneas o predicciones. Utiliza el auxiliar 'will' para todas las personas.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " jugaré", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " will", type: "auxiliary", label: "Auxiliar Futuro" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", spanish: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " jugaré", type: "verb", label: "Verbo" }], english: [{ text: "I", type: "person", label: "Sujeto" }, { text: " will", type: "auxiliary", label: "Auxiliar Futuro" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", spanish: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Jugaré", type: "verb", label: "Verbo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], english: [{ text: "Will", type: "auxiliary", label: "Auxiliar Futuro" }, { text: " I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]}
      ]
    }
  ]
};
