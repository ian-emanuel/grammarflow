import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Exercise, GrammarTopic, Introduction, Category, LanguagePair } from "../types";
import { getCachedIntroduction, saveIntroduction, getCachedExercise, saveExercise } from "./pocketbase";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateSpeech(text: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly in English: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
}

export async function generateIntroduction(category: Category, selectedVerb?: string, verbType?: string, customContext?: string, languagePair: LanguagePair = { source: 'es', target: 'en' }): Promise<Introduction> {
  // Try to get from cache first
  const cacheKey = `${category}_${selectedVerb || 'random'}_${verbType || 'any'}_${customContext || 'default'}_${languagePair.source}_${languagePair.target}`;
  const cached = await getCachedIntroduction(cacheKey);
  if (cached) return cached as unknown as Introduction;

  let prompt = `Actúa como un experto lingüista y profesor de idiomas.
    Genera una introducción educativa exhaustiva para la categoría: ${category}. 
    
    ${selectedVerb ? `USA EL VERBO ESPECÍFICO: "${selectedVerb}" para todos los ejemplos.` : `Usa un verbo ${verbType === 'regulares' ? 'regular' : verbType === 'irregulares' ? 'irregular' : 'común'} en el idioma de origen para los ejemplos.`}
    
    ${customContext ? `CONTEXTO ESPECÍFICO: Los ejemplos deben estar ambientados en: "${customContext}".` : ''}
    
    Idioma de origen: ${languagePair.source}
    Idioma de destino: ${languagePair.target}

    REGLAS POR CATEGORÍA:
    - Si es 'tiempos_simples': 
        * Grupo 'indicativo': Presente, Pasado, Futuro, Futuro idiomático, Copretérito, Pospretérito.
        * Grupo 'subjuntivo': Subjuntivo Presente, Subjuntivo Imperfecto, Subjuntivo Futuro.
    - Si es 'tiempos_perfectos': 
        * Grupo 'indicativo': Presente Perfecto, Pasado Perfecto, Futuro Perfecto, Condicional Perfecto.
        * Grupo 'subjuntivo': Pretérito Perfecto de Subjuntivo, Pluscuamperfecto de Subjuntivo.
    
    PARA CADA TIEMPO, debes incluir las 6 PERSONAS GRAMATICALES (o las equivalentes en el idioma de origen).
    
    PARA CADA PERSONA, debes incluir:
    - La versión AFIRMATIVA
    - La versión NEGATIVA
    - La versión INTERROGATIVA
    
    IMPORTANTE: Cada oración (source y target) debe ser un ARRAY de objetos (SentencePart).
    Cada objeto debe tener:
    - "text": El fragmento de texto
    - "type": Uno de ["person", "auxiliary", "verb", "suffix", "other", "complement", "modal", "preposition", "adverb", "conjunction", "relative_pronoun", "article", "adjective"]
    - "label": El nombre gramatical en el idioma de origen
    - "explanation": Una breve explicación detallada de por qué se usa esta parte.
    - "mnemonic": (Opcional) Una nemotecnia corta para esta parte específica.
    
    REGLA DE ORO: Resalta los cambios gramaticales separándolos en su propio objeto con type "suffix" o "auxiliary".
    
    Sigue estrictamente este formato JSON:
    {
      "title": "Nombre de la Categoría",
      "definition": "Definición clara y educativa",
      "list": ["Conceptos clave (opcional)"],
      "concepts": [
        {
          "term": "Concepto clave",
          "definition": "Explicación de qué es este concepto",
          "usage": "Explicación de cómo se usa en este contexto"
        }
      ],
      "examples": [
        {
          "tense": "Nombre del tiempo",
          "group": "indicativo" o "subjuntivo",
          "explanation": "Análisis gramatical",
          "mnemonic": "Nemotecnia para toda la estructura",
          "persons": [
            {
              "id": "yo",
              "label": "Yo",
              "forms": [
                { 
                  "type": "afirmativo", 
                  "source": [{"text": "...", "type": "person", "label": "..."}],
                  "target": [{"text": "...", "type": "person", "label": "..."}]
                }
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
          concepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                definition: { type: Type.STRING },
                usage: { type: Type.STRING }
              },
              required: ["term", "definition", "usage"]
            }
          },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tense: { type: Type.STRING },
                context: { type: Type.STRING },
                group: { type: Type.STRING, enum: ["indicativo", "subjuntivo"] },
                explanation: { type: Type.STRING },
                mnemonic: { type: Type.STRING },
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
                            source: {
                              type: Type.ARRAY,
                              items: {
                                type: Type.OBJECT,
                                properties: {
                                  text: { type: Type.STRING },
                                  type: { type: Type.STRING, enum: ["person", "auxiliary", "verb", "suffix", "other", "complement", "modal", "preposition", "adverb", "conjunction", "relative_pronoun", "article", "adjective"] },
                                  label: { type: Type.STRING },
                                  explanation: { type: Type.STRING },
                                  mnemonic: { type: Type.STRING }
                                },
                                required: ["text", "type", "label", "explanation"]
                              }
                            },
                            target: {
                              type: Type.ARRAY,
                              items: {
                                type: Type.OBJECT,
                                properties: {
                                  text: { type: Type.STRING },
                                  type: { type: Type.STRING, enum: ["person", "auxiliary", "verb", "suffix", "other", "complement", "modal", "preposition", "adverb", "conjunction", "relative_pronoun", "article", "adjective"] },
                                  label: { type: Type.STRING },
                                  explanation: { type: Type.STRING },
                                  mnemonic: { type: Type.STRING }
                                },
                                required: ["text", "type", "label", "explanation"]
                              }
                            }
                          },
                          required: ["type", "source", "target"]
                        }
                      }
                    },
                    required: ["id", "label", "forms"]
                  }
                }
              },
              required: ["tense", "explanation", "persons"]
            }
          }
        },
        required: ["title", "definition", "examples"]
      }
    }
  });

  const responseText = response.text || "";
  const cleanJson = responseText.replace(/```json|```/g, "").trim();
  const intro = JSON.parse(cleanJson);
  
  // Ensure context is set if provided
  if (customContext && intro.examples) {
    intro.examples = intro.examples.map((ex: any) => ({
      ...ex,
      context: customContext
    }));
  }

  // Save to cache
  await saveIntroduction({ ...intro, category: cacheKey });
  return intro;
}

export async function generateExercise(category: Category, topic: GrammarTopic, selectedVerb?: string, verbType?: string, context: string = "General", languagePair: LanguagePair = { source: 'es', target: 'en' }): Promise<Exercise> {
  // Try to get from cache first
  const cacheKey = `${category}_${topic}_${selectedVerb || 'random'}_${verbType || 'any'}_${context}_${languagePair.source}_${languagePair.target}`;
  const cached = await getCachedExercise(cacheKey, topic);
  if (cached) return cached as unknown as Exercise;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Genera un ejercicio de aprendizaje de idiomas para el par: ${languagePair.source} -> ${languagePair.target}.
    Tema: ${topic}, Categoría: ${category}. 
    
    CONTEXTO: "${context}".
    
    ${selectedVerb ? `USA EL VERBO ESPECÍFICO: "${selectedVerb}" para el ejercicio.` : `Usa un verbo común en el idioma de origen.`}
    
    Sigue estrictamente este formato JSON:
    {
      "id": "unique_id",
      "topic": "${topic}",
      "category": "${category}",
      "sourceSentence": "Frase corta enfocada en la estructura",
      "targetSentence": "Traducción enfocada en la estructura",
      "grammarExplanation": "Análisis gramatical detallado...",
      "mnemonic": "Nemotecnia divertida para recordar esta regla.",
      "wrongAnswerExplanation": "Explicación de por qué las otras opciones son incorrectas.",
      "difficulty": "medium",
      "type": "identify_source",
      "options": ["opcion1", "opcion2", "opcion3", "opcion4"],
      "correctAnswer": "la respuesta correcta",
      "highlightedStructure": "la estructura gramatical clave"
    }
    
    El ejercicio debe enfocarse primero en que el usuario identifique la estructura gramatical en el idioma de origen antes de pasar al de destino.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          topic: { type: Type.STRING },
          category: { type: Type.STRING },
          sourceSentence: { type: Type.STRING },
          targetSentence: { type: Type.STRING },
          grammarExplanation: { type: Type.STRING },
          mnemonic: { type: Type.STRING },
          wrongAnswerExplanation: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ["easy", "medium", "hard"] },
          type: { type: Type.STRING, enum: ["identify_source", "translate_to_target", "parallel_match"] },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING },
          highlightedStructure: { type: Type.STRING }
        },
        required: ["id", "topic", "category", "sourceSentence", "targetSentence", "grammarExplanation", "wrongAnswerExplanation", "type", "options", "correctAnswer", "highlightedStructure"]
      }
    }
  });

  const exercise = JSON.parse(response.text || "{}");
  // Save to cache
  await saveExercise({ ...exercise, topic: cacheKey });
  return exercise;
}
