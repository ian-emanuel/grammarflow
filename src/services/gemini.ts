import { GoogleGenAI, Type } from "@google/genai";
import { Exercise, GrammarTopic, Introduction, Category } from "../types";
import { getCachedIntroduction, saveIntroduction, getCachedExercise, saveExercise } from "./pocketbase";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateIntroduction(category: Category, selectedVerb?: string, verbType?: string): Promise<Introduction> {
  // Try to get from cache first
  const cacheKey = `${category}_${selectedVerb || 'random'}_${verbType || 'any'}`;
  const cached = await getCachedIntroduction(cacheKey);
  if (cached) return cached as unknown as Introduction;

  let prompt = `Genera una introducción educativa exhaustiva para la categoría: ${category}. 
    
    ${selectedVerb ? `USA EL VERBO ESPECÍFICO: "${selectedVerb}" para todos los ejemplos.` : `Usa un verbo ${verbType === 'regulares' ? 'regular' : verbType === 'irregulares' ? 'irregular' : 'común'} en español para los ejemplos.`}
    
    REGLAS POR CATEGORÍA:
    - Si es 'tiempos_simples': 
        * Grupo 'indicativo': Presente, Pasado, Futuro, Futuro idiomático (voy a...), Copretérito, Pospretérito.
        * Grupo 'subjuntivo': Subjuntivo Presente, Subjuntivo Imperfecto (jugara/jugase), Subjuntivo Futuro (jugare).
    - Si es 'tiempos_perfectos': 
        * Grupo 'indicativo': Presente Perfecto, Pasado Perfecto, Futuro Perfecto, Futuro Idiomático Perfecto (voy a haber jugado), Condicional Perfecto.
        * Grupo 'subjuntivo': Pretérito Perfecto de Subjuntivo (haya jugado), Pluscuamperfecto de Subjuntivo (hubiera/hubiese jugado).
    - Si es 'tiempos_continuos': 
        * Grupo 'indicativo': Presente Continuo, Pasado Continuo, Futuro Continuo, Futuro Idiomático Continuo (voy a estar jugando), Condicional Continuo.
        * Grupo 'subjuntivo': Presente Continuo de Subjuntivo (esté jugando), Pasado Continuo de Subjuntivo (estuviera/estuviese jugando).
    
    PARA CADA TIEMPO, debes incluir las 6 PERSONAS GRAMATICALES:
    - 'yo' (I)
    - 'tu' (You)
    - 'el_ella' (He/She/It)
    - 'nosotros' (We)
    - 'uds' (You all)
    - 'ellos' (They)
    
    PARA CADA PERSONA, debes incluir:
    - La versión AFIRMATIVA
    - La versión NEGATIVA
    - La versión INTERROGATIVA
    
    IMPORTANTE: Cada oración (spanish y english) debe ser un ARRAY de objetos (SentencePart).
    Cada objeto debe tener:
    - "text": El fragmento de texto (ej: "I", " do", " not", " play", "s")
    - "type": Uno de ["person", "auxiliary", "verb", "suffix", "other"]
    - "label": El nombre gramatical en español (ej: "Sujeto", "Auxiliar", "Verbo", "Sufijo 3ra Persona")
    
    REGLA DE ORO: Resalta los cambios gramaticales (como la 's' en 3ra persona inglés o auxiliares) separándolos en su propio objeto con type "suffix" o "auxiliary".
    
    Sigue estrictamente este formato JSON:
    {
      "title": "Nombre de la Categoría",
      "definition": "Definición clara y educativa",
      "list": ["Auxiliares clave"],
      "examples": [
        {
          "tense": "Nombre del tiempo",
          "group": "indicativo" o "subjuntivo",
          "explanation": "Análisis gramatical",
          "persons": [
            {
              "id": "yo",
              "label": "Yo",
              "forms": [
                { 
                  "type": "afirmativo", 
                  "spanish": [{"text": "Yo", "type": "person", "label": "Sujeto"}, {"text": " juego", "type": "verb", "label": "Verbo"}],
                  "english": [{"text": "I", "type": "person", "label": "Sujeto"}, {"text": " play", "type": "verb", "label": "Verbo"}]
                }
                // ... otros tipos de oración
              ]
            }
          ]
        }
      ]
    }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          definition: { type: Type.STRING },
          list: { type: Type.ARRAY, items: { type: Type.STRING } },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tense: { type: Type.STRING },
                group: { type: Type.STRING, enum: ["indicativo", "subjuntivo"] },
                explanation: { type: Type.STRING },
                persons: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING, enum: ["yo", "tu", "el_ella", "nosotros", "uds", "ellos"] },
                      label: { type: Type.STRING },
                      forms: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            type: { type: Type.STRING, enum: ["afirmativo", "negativo", "pregunta"] },
                            spanish: {
                              type: Type.ARRAY,
                              items: {
                                type: Type.OBJECT,
                                properties: {
                                  text: { type: Type.STRING },
                                  type: { type: Type.STRING, enum: ["person", "auxiliary", "verb", "suffix", "other"] },
                                  label: { type: Type.STRING }
                                },
                                required: ["text", "type", "label"]
                              }
                            },
                            english: {
                              type: Type.ARRAY,
                              items: {
                                type: Type.OBJECT,
                                properties: {
                                  text: { type: Type.STRING },
                                  type: { type: Type.STRING, enum: ["person", "auxiliary", "verb", "suffix", "other"] },
                                  label: { type: Type.STRING }
                                },
                                required: ["text", "type", "label"]
                              }
                            }
                          },
                          required: ["type", "spanish", "english"]
                        }
                      }
                    },
                    required: ["id", "label", "forms"]
                  }
                }
              },
              required: ["tense", "group", "explanation", "persons"]
            }
          }
        },
        required: ["title", "definition", "examples"]
      }
    }
  });

  const intro = JSON.parse(response.text || "{}");
  // Save to cache
  await saveIntroduction({ ...intro, category: cacheKey });
  return intro;
}

export async function generateExercise(category: Category, topic: GrammarTopic, selectedVerb?: string, verbType?: string): Promise<Exercise> {
  // Try to get from cache first
  const cacheKey = `${category}_${topic}_${selectedVerb || 'random'}_${verbType || 'any'}`;
  const cached = await getCachedExercise(cacheKey, topic);
  if (cached) return cached as unknown as Exercise;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Genera un ejercicio de aprendizaje de inglés para hispanohablantes sobre el tema: ${topic} dentro de la categoría: ${category}. 
    
    ${selectedVerb ? `USA EL VERBO ESPECÍFICO: "${selectedVerb}" para el ejercicio.` : `Usa un verbo ${verbType === 'regulares' ? 'regular' : verbType === 'irregulares' ? 'irregular' : 'común'} en español.`}
    
    Sigue estrictamente este formato JSON:
    {
      "id": "unique_id",
      "topic": "${topic}",
      "category": "${category}",
      "spanishSentence": "Frase corta enfocada en el verbo",
      "englishSentence": "Short sentence focused on the verb",
      "grammarExplanation": "Análisis gramatical detallado. No te limites al verbo; explica la estructura completa, el uso del auxiliar (si aplica), el tiempo verbal, el modo y la lógica de la traducción paralela (ej: 'En español usamos el copretérito para acciones habituales, que en inglés se traduce como Past Simple o used to').",
      "type": "identify_spanish",
      "options": ["opcion1", "opcion2", "opcion3", "opcion4"],
      "correctAnswer": "la respuesta correcta",
      "highlightedStructure": "el verbo conjugado o estructura gramatical clave"
    }
    
    El ejercicio debe enfocarse primero en que el usuario identifique la estructura gramatical en ESPAÑOL antes de pasar al inglés.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          topic: { type: Type.STRING },
          category: { type: Type.STRING },
          spanishSentence: { type: Type.STRING },
          englishSentence: { type: Type.STRING },
          grammarExplanation: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["identify_spanish", "translate_to_english", "parallel_match"] },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING },
          highlightedStructure: { type: Type.STRING }
        },
        required: ["id", "topic", "category", "spanishSentence", "englishSentence", "grammarExplanation", "type", "options", "correctAnswer", "highlightedStructure"]
      }
    }
  });

  const exercise = JSON.parse(response.text || "{}");
  // Save to cache
  await saveExercise({ ...exercise, topic: cacheKey });
  return exercise;
}
