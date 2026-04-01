import { Introduction } from '../types';

export const VOCABULARY_DATA: Introduction = {
  title: "Vocabulario por Lugares",
  definition: "Aprender palabras en contexto es la forma más rápida de ganar fluidez. Aquí tienes vocabulario esencial dividido por los lugares que visitas a diario.",
  concepts: [
    {
      term: "Contexto",
      definition: "El entorno o situación en la que se usa una palabra.",
      usage: "Aprender vocabulario por temas (e.g., 'Restaurante') ayuda a recordar palabras relacionadas entre sí."
    },
    {
      term: "Sustantivos",
      definition: "Palabras que nombran personas, lugares, cosas o ideas.",
      usage: "En inglés, muchos sustantivos no cambian de género (e.g., 'the table', 'the book')."
    },
    {
      term: "Artículos",
      definition: "Palabras que acompañan al sustantivo para especificarlo.",
      usage: "Usa 'a/an' para algo no específico y 'the' para algo conocido por ambos hablantes."
    }
  ],
  examples: [
    {
      tense: "Vocabulario",
      context: "Casa",
      group: "indicativo",
      explanation: "Objetos y acciones comunes en el hogar.",
      persons: [
        { id: "yo", label: "Cocina", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " limpio", type: "verb", label: "Verbo" }, { text: " la", type: "other", label: "Artículo" }, { text: " cocina", type: "other", label: "Lugar" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " clean", type: "verb", label: "Verbo" }, { text: " the", type: "other", label: "Artículo" }, { text: " kitchen", type: "other", label: "Lugar" }] }] },
        { id: "tu", label: "Sala", forms: [{ type: "afirmativo", source: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " ves", type: "verb", label: "Verbo" }, { text: " la", type: "other", label: "Artículo" }, { text: " televisión", type: "other", label: "Objeto" }, { text: " en", type: "other", label: "Preposición" }, { text: " la", type: "other", label: "Artículo" }, { text: " sala", type: "other", label: "Lugar" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " watch", type: "verb", label: "Verbo" }, { text: " TV", type: "other", label: "Objeto" }, { text: " in", type: "other", label: "Preposición" }, { text: " the", type: "other", label: "Artículo" }, { text: " living room", type: "other", label: "Lugar" }] }] }
      ]
    },
    {
      tense: "Vocabulario",
      context: "Supermercado",
      group: "indicativo",
      explanation: "Vocabulario para hacer las compras.",
      persons: [
        { id: "yo", label: "Compras", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " necesito", type: "verb", label: "Verbo" }, { text: " leche", type: "other", label: "Sustantivo" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " need", type: "verb", label: "Verbo" }, { text: " milk", type: "other", label: "Sustantivo" }] }] },
        { id: "tu", label: "Carrito", forms: [{ type: "afirmativo", source: [{ text: "Tú", type: "person", label: "Sujeto" }, { text: " usas", type: "verb", label: "Verbo" }, { text: " el", type: "other", label: "Artículo" }, { text: " carrito", type: "other", label: "Objeto" }], target: [{ text: "You", type: "person", label: "Sujeto" }, { text: " use", type: "verb", label: "Verbo" }, { text: " the", type: "other", label: "Artículo" }, { text: " shopping cart", type: "other", label: "Objeto" }] }] }
      ]
    },
    {
      tense: "Vocabulario",
      context: "Trabajo",
      group: "indicativo",
      explanation: "Términos profesionales y de oficina.",
      persons: [
        { id: "yo", label: "Reunión", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " tengo", type: "verb", label: "Verbo" }, { text: " una", type: "other", label: "Artículo" }, { text: " reunión", type: "other", label: "Evento" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " have", type: "verb", label: "Verbo" }, { text: " a", type: "other", label: "Artículo" }, { text: " meeting", type: "other", label: "Evento" }] }] },
        { id: "el_ella", label: "Correo", forms: [{ type: "afirmativo", source: [{ text: "Él", type: "person", label: "Sujeto" }, { text: " envía", type: "verb", label: "Verbo" }, { text: " un", type: "other", label: "Artículo" }, { text: " correo", type: "other", label: "Objeto" }], target: [{ text: "He", type: "person", label: "Sujeto" }, { text: " sends", type: "verb", label: "Verbo" }, { text: " an", type: "other", label: "Artículo" }, { text: " email", type: "other", label: "Objeto" }] }] }
      ]
    },
    {
      tense: "Vocabulario",
      context: "Aeropuerto",
      group: "indicativo",
      explanation: "Viajes y trámites aeroportuarios.",
      persons: [
        { id: "yo", label: "Pasaporte", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " muestro", type: "verb", label: "Verbo" }, { text: " mi", type: "auxiliary", label: "Posesivo" }, { text: " pasaporte", type: "other", label: "Documento" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " show", type: "verb", label: "Verbo" }, { text: " my", type: "auxiliary", label: "Posesivo" }, { text: " passport", type: "other", label: "Documento" }] }] },
        { id: "tu", label: "Vuelo", forms: [{ type: "afirmativo", source: [{ text: "Tu", type: "person", label: "Sujeto" }, { text: " vuelo", type: "other", label: "Sustantivo" }, { text: " sale", type: "verb", label: "Verbo" }, { text: " pronto", type: "other", label: "Adverbio" }], target: [{ text: "Your", type: "auxiliary", label: "Posesivo" }, { text: " flight", type: "other", label: "Sustantivo" }, { text: " leaves", type: "verb", label: "Verbo" }, { text: " soon", type: "other", label: "Adverbio" }] }] }
      ]
    },
    {
      tense: "Vocabulario",
      context: "Restaurante",
      group: "indicativo",
      explanation: "Pedir comida y atención.",
      persons: [
        { id: "yo", label: "Menú", forms: [{ type: "afirmativo", source: [{ text: "Yo", type: "person", label: "Sujeto" }, { text: " pido", type: "verb", label: "Verbo" }, { text: " el", type: "other", label: "Artículo" }, { text: " menú", type: "other", label: "Objeto" }], target: [{ text: "I", type: "person", label: "Sujeto" }, { text: " order", type: "verb", label: "Verbo" }, { text: " the", type: "other", label: "Artículo" }, { text: " menu", type: "other", label: "Objeto" }] }] },
        { id: "nosotros", label: "Cuenta", forms: [{ type: "afirmativo", source: [{ text: "Nosotros", type: "person", label: "Sujeto" }, { text: " pagamos", type: "verb", label: "Verbo" }, { text: " la", type: "other", label: "Artículo" }, { text: " cuenta", type: "other", label: "Objeto" }], target: [{ text: "We", type: "person", label: "Sujeto" }, { text: " pay", type: "verb", label: "Verbo" }, { text: " the", type: "other", label: "Artículo" }, { text: " bill", type: "other", label: "Objeto" }] }] }
      ]
    }
  ]
};
