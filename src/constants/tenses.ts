import { Introduction } from '../types';

export const SIMPLES_DATA: Introduction = {
  title: "Tiempos Simples",
  definition: "Los tiempos simples en inglés (Present, Past, Future) son la base de la comunicación. Se caracterizan por no usar auxiliares en su forma afirmativa (excepto el futuro), pero sí en la negativa e interrogativa.",
  concepts: [
    {
      term: "Auxiliares",
      definition: "Palabras que ayudan al verbo principal a formar tiempos, preguntas o negaciones.",
      usage: "En presente simple usamos 'Do/Does', en pasado 'Did' y en futuro 'Will'."
    },
    {
      term: "3ra Persona",
      definition: "Se refiere a 'He', 'She' o 'It'.",
      usage: "En presente simple afirmativo, se debe añadir una 's' o 'es' al final del verbo (e.g., 'He plays')."
    },
    {
      term: "Verbos Regulares",
      definition: "Verbos que siguen un patrón predecible para formar el pasado.",
      usage: "Se añade el sufijo '-ed' al final de la forma base (e.g., 'play' -> 'played')."
    }
  ],
  examples: [
    {
      tense: "Presente Simple",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para rutinas y verdades universales. En la 3ra persona del singular (he, she, it) se añade una 's' al verbo.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " juego", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juego", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juego", type: "verb", label: "Verbo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "tu", label: "Tú", forms: [
          { type: "afirmativo", source: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " juegas", type: "verb", label: "Verbo" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", source: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juegas", type: "verb", label: "Verbo" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juegas", type: "verb", label: "Verbo" }, { text: " tú", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " you", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "el_ella", label: "Él/Ella", forms: [
          { type: "afirmativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " juega", type: "verb", label: "Verbo" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "s", type: "suffix", label: "Sufijo 3ra Persona" }] },
          { type: "negativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juega", type: "verb", label: "Verbo" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " does", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juega", type: "verb", label: "Verbo" }, { text: " él", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Does", type: "auxiliary", label: "Auxiliar" }, { text: " he", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "nosotros", label: "Nosotros", forms: [
          { type: "afirmativo", source: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " jugamos", type: "verb", label: "Verbo" }], target: [{ text: "We", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", source: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " jugamos", type: "verb", label: "Verbo" }], target: [{ text: "We", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Jugamos", type: "verb", label: "Verbo" }, { text: " nosotros", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " we", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]},
        { id: "ellos", label: "Ellos", forms: [
          { type: "afirmativo", source: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " juegan", type: "verb", label: "Verbo" }], target: [{ text: "They", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "negativo", source: [{ text: "Ellos", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " juegan", type: "verb", label: "Verbo" }], target: [{ text: "They", type: "person", label: "Sujeto" }, { text: " do", type: "auxiliary", label: "Auxiliar" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Juegan", type: "verb", label: "Verbo" }, { text: " ellos", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Do", type: "auxiliary", label: "Auxiliar" }, { text: " they", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]}
      ]
    },
    {
      tense: "Pasado Simple",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para acciones terminadas en el pasado. Los verbos regulares añaden 'ed'. Los irregulares cambian su forma. En negativo e interrogativo se usa el auxiliar 'did'.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " jugué", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "ed", type: "suffix", label: "Pasado" }] },
          { type: "negativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " jugué", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " did", type: "auxiliary", label: "Auxiliar Pasado" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }] },
          { type: "pregunta", source: [{ text: "¿", type: "other", label: "Apertura" }, { text: "Jugué", type: "verb", label: "Verbo" }, { text: " yo", type: "person", label: "Sujeto" }, { text: "?", type: "other", label: "Cierre" }], target: [{ text: "Did", type: "auxiliary", label: "Auxiliar Pasado" }, { text: " I", type: "person", label: "Sujeto" }, { text: " play", type: "verb", label: "Verbo" }, { text: "?", type: "other", label: "Cierre" }] }
        ]}
      ]
    },
    {
      tense: "Futuro Simple",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para decisiones espontáneas o predicciones. Utiliza el auxiliar 'will' para todas las personas.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " jugaré", type: "verb", label: "Verbo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " will", type: "auxiliary", label: "Auxiliar Futuro" }, { text: " play", type: "verb", label: "Verbo" }] }
        ]}
      ]
    }
  ]
};

export const CONTINUOS_DATA: Introduction = {
  title: "Tiempos Continuos",
  definition: "Los tiempos continuos expresan acciones que están, estaban o estarán en progreso. Utilizan el verbo 'to be' como auxiliar y el verbo principal con la terminación '-ing'.",
  concepts: [
    {
      term: "Verbo Be",
      definition: "Funciona como auxiliar en los tiempos continuos.",
      usage: "Se conjuga según la persona y el tiempo (e.g., 'I am', 'He was', 'They will be')."
    },
    {
      term: "Gerundio (-ing)",
      definition: "Forma del verbo que indica una acción en progreso.",
      usage: "Se forma añadiendo '-ing' al verbo base (e.g., 'playing', 'studying')."
    }
  ],
  examples: [
    {
      tense: "Presente Continuo",
      context: "General",
      group: "indicativo",
      explanation: "Se usa para acciones que ocurren en el momento. Utiliza el verbo 'to be' como auxiliar y el verbo principal con terminación '-ing'.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " estoy", type: "verb", label: "Verbo Estar" }, { text: " jugando", type: "verb", label: "Gerundio" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " am", type: "auxiliary", label: "Auxiliar (Be)" }, { text: " play", type: "verb", label: "Verbo" }, { text: "ing", type: "suffix", label: "Gerundio" }] },
          { type: "negativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " no", type: "other", label: "Negación" }, { text: " estoy", type: "verb", label: "Verbo Estar" }, { text: " jugando", type: "verb", label: "Gerundio" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " am", type: "auxiliary", label: "Auxiliar (Be)" }, { text: " not", type: "other", label: "Negación" }, { text: " play", type: "verb", label: "Verbo" }, { text: "ing", type: "suffix", label: "Gerundio" }] }
        ]}
      ]
    }
  ]
};

export const PERFECTOS_DATA: Introduction = {
  title: "Tiempos Perfectos",
  definition: "Los tiempos perfectos conectan dos momentos en el tiempo. Utilizan el auxiliar 'have/has' (o 'had' en pasado) y el participio del verbo principal.",
  concepts: [
    {
      term: "Auxiliar Have",
      definition: "Verbo auxiliar fundamental para los tiempos perfectos.",
      usage: "En presente usamos 'Have/Has', en pasado 'Had' y en futuro 'Will have'."
    },
    {
      term: "Participio Pasado",
      definition: "Forma verbal usada con el auxiliar 'have'.",
      usage: "Para verbos regulares termina en '-ed' (e.g., 'played'). Los irregulares tienen formas propias (e.g., 'gone', 'seen')."
    }
  ],
  examples: [
    {
      tense: "Presente Perfecto",
      context: "General",
      group: "indicativo",
      explanation: "Conecta el pasado con el presente. Usa el auxiliar 'have/has' y el participio del verbo.",
      persons: [
        { id: "yo", label: "Yo", forms: [
          { type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " he", type: "auxiliary", label: "Auxiliar Haber" }, { text: " jugado", type: "verb", label: "Participio" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " have", type: "auxiliary", label: "Auxiliar" }, { text: " play", type: "verb", label: "Verbo" }, { text: "ed", type: "suffix", label: "Participio" }] }
        ]}
      ]
    }
  ]
};
