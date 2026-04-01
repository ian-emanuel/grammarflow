import { VerbType } from '../types';

export const VERB_BANK = {
  regulares: [
    { source: "jugar", target: "play" },
    { source: "trabajar", target: "work" },
    { source: "estudiar", target: "study" }, // Termina en 'y' precedida de consonante
    { source: "escuchar", target: "listen" },
    { source: "mirar", target: "watch" },
    { source: "bailar", target: "dance" }, // Termina en 'e'
    { source: "cocinar", target: "cook" },
    { source: "limpiar", target: "clean" },
    { source: "caminar", target: "walk" },
    { source: "hablar", target: "talk" },
    { source: "visitar", target: "visit" },
    { source: "ayudar", target: "help" },
    { source: "llamar", target: "call" },
    { source: "esperar", target: "wait" },
    { source: "necesitar", target: "need" },
    { source: "detener", target: "stop" }, // Duplica consonante (stopped)
    { source: "planear", target: "plan" }, // Duplica consonante (planned)
    { source: "disfrutar", target: "enjoy" }, // Termina en 'y' precedida de vocal
    { source: "intentar", target: "try" }, // Termina en 'y' precedida de consonante
    { source: "amar", target: "love" } // Termina en 'e'
  ],
  irregulares: [
    { source: "ir", target: "go" },
    { source: "comer", target: "eat" },
    { source: "beber", target: "drink" },
    { source: "dormir", target: "sleep" },
    { source: "correr", target: "run" },
    { source: "escribir", target: "write" },
    { source: "leer", target: "read" },
    { source: "hablar", target: "speak" },
    { source: "ver", target: "see" },
    { source: "comprar", target: "buy" },
    { source: "hacer", target: "do" },
    { source: "tener", target: "have" },
    { source: "venir", target: "come" },
    { source: "decir", target: "say" },
    { source: "tomar", target: "take" },
    { source: "ser/estar", target: "be" }, // El más irregular
    { source: "romper", target: "break" },
    { source: "traer", target: "bring" },
    { source: "pensar", target: "think" },
    { source: "saber", target: "know" }
  ]
};
