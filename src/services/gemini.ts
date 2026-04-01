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
    - Si es 'tiempos_simples': Cubre Presente, Pasado, Futuro, Futuro idiomático (voy a...), Copretérito, Pospretérito, Subjuntivo Presente, Subjuntivo Imperfecto (jugara/jugase) y Subjuntivo Futuro (jugare).
    - Si es 'tiempos_perfectos': Cubre Presente Perfecto, Pasado Perfecto, Futuro Perfecto, Futuro Idiomático Perfecto (voy a haber jugado) y Condicional Perfecto. DEBES mostrar cómo el verbo auxiliar 'haber' cambia en sus formas simples para formar estos tiempos.
    - Si es 'tiempos_continuos': Cubre Presente Continuo, Pasado Continuo, Futuro Continuo, Futuro Idiomático Continuo (voy a estar jugando) y Condicional Continuo. DEBES mostrar cómo el verbo auxiliar 'estar' cambia en sus formas simples para formar estos tiempos.
    
    PARA CADA TIEMPO, debes incluir:
    - La versión AFIRMATIVA (Yo [verbo] / I [verb])
    - La versión NEGATIVA (Yo no [verbo] / I [aux] not [verb])
    - La versión INTERROGATIVA (¿[verbo] yo? / [Aux] I [verb]?)
    
    IMPORTANTE: Usa una estructura repetitiva enfocada SOLO en el pronombre "Yo" y el verbo. No añadas complementos ni contexto.
    
    Sigue estrictamente este formato JSON:
    {
      "title": "Nombre de la Categoría",
      "definition": "Definición clara y educativa en español sobre cómo funcionan estos sistemas en español vs inglés",
      "list": ["Lista de auxiliares o palabras clave"],
      "examples": [
        {
          "spanish": "Yo [verbo] / Yo no [verbo] / ¿[verbo] yo?",
          "english": "I [verb] / I [aux] not [verb] / [Aux] I [verb]?",
          "explanation": "Análisis gramatical profundo: Identifica el tiempo, el modo, el uso del auxiliar en ambos idiomas y la estructura (ej: Sujeto + Auxiliar + Verbo en participio)."
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
                spanish: { type: Type.STRING },
                english: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["spanish", "english", "explanation"]
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
