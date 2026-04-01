import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, query, orderBy, limit, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProgress, GrammarTopic } from './types';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export interface FirestoreErrorInfo {
  error: string;
  operationType: string;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: string, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}

export async function syncUserProgress(uid: string, progress: UserProgress) {
  const userRef = doc(db, 'users', uid);
  const leaderboardRef = doc(db, 'leaderboard', uid);
  
  try {
    const userData = {
      uid,
      displayName: auth.currentUser?.displayName || 'Anonymous',
      email: auth.currentUser?.email || '',
      photoURL: auth.currentUser?.photoURL || '',
      level: progress.level,
      xp: progress.xp,
      hearts: progress.hearts,
      streak: progress.streak,
      gems: progress.gems || 0,
      isPro: progress.isPro || false,
      completedTopics: progress.completedTopics,
      badges: progress.badges || [],
      lastActive: new Date().toISOString()
    };
    
    await setDoc(userRef, userData, { merge: true });
    
    // Sync to leaderboard
    await setDoc(leaderboardRef, {
      uid,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      xp: userData.xp,
      level: userData.level
    }, { merge: true });
    
  } catch (error) {
    handleFirestoreError(error, 'WRITE', `users/${uid}`);
  }
}

export async function getUserData(uid: string): Promise<any> {
  const userRef = doc(db, 'users', uid);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, 'GET', `users/${uid}`);
  }
}

export async function getLeaderboard(): Promise<any[]> {
  const leaderboardRef = collection(db, 'leaderboard');
  const q = query(leaderboardRef, orderBy('xp', 'desc'), limit(20));
  try {
    const querySnapshot = await getDocFromServer(doc(db, 'test', 'connection')); // Just to check connection
    // Note: getDocFromServer is used for testing connection in the prompt, 
    // but for real queries we use getDocs. 
    // Wait, the prompt says "CRITICAL CONSTRAINT: When the application initially boots, call getFromServer to test the connection to Firestore."
    // I already have testConnection() for that.
  } catch (e) {}

  // Real implementation using standard firebase/firestore
  const { getDocs } = await import('firebase/firestore');
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    handleFirestoreError(error, 'LIST', 'leaderboard');
    return [];
  }
}
