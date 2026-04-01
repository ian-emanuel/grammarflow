import PocketBase from 'pocketbase';

/**
 * POCKETBASE SCHEMA (Manual setup required in PB Admin):
 * 
 * Collection: introductions
 * - category: text (unique index recommended)
 * - title: text
 * - definition: text
 * - list: json (array of strings)
 * - examples: json (array of objects: {spanish, english, explanation})
 * 
 * Collection: exercises
 * - topic: text (unique index recommended)
 * - category: text
 * - spanishSentence: text
 * - englishSentence: text
 * - grammarExplanation: text
 * - type: text
 * - options: json (array of strings)
 * - correctAnswer: text
 * - highlightedStructure: text
 */

const pb = new PocketBase('http://127.0.0.1:8090');

export default pb;

export async function getCachedIntroduction(category: string) {
  try {
    return await pb.collection('introductions').getFirstListItem(`category="${category}"`);
  } catch (e) {
    return null;
  }
}

export async function saveIntroduction(data: any) {
  try {
    return await pb.collection('introductions').create(data);
  } catch (e) {
    console.error("Error saving to PocketBase:", e);
    return null;
  }
}

export async function getCachedExercise(category: string, topic: string) {
  try {
    return await pb.collection('exercises').getFirstListItem(`category="${category}" && topic="${topic}"`);
  } catch (e) {
    return null;
  }
}

export async function saveExercise(data: any) {
  try {
    return await pb.collection('exercises').create(data);
  } catch (e) {
    console.error("Error saving to PocketBase:", e);
    return null;
  }
}
