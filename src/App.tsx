/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Zap, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Trophy,
  Sparkles,
  ArrowRight,
  Info,
  Play,
  Settings2,
  Search,
  GraduationCap,
  Target,
  Lightbulb,
  Plus,
  Globe,
  Map,
  Database,
  Flame,
  Brain,
  Coins,
  ShoppingBag,
  Users,
  Star,
  Lock,
  Crown
} from 'lucide-react';
import { generateExercise, generateIntroduction, generateSpeech } from './services/gemini';
import { auth, googleProvider, syncUserProgress, getUserData, getLeaderboard } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  Exercise, 
  GrammarTopic, 
  UserProgress, 
  Introduction, 
  Category, 
  VerbType, 
  PersonId, 
  SentencePart,
  ModuleId,
  Module,
  CategoryId,
  LanguagePair,
  Concept,
  World,
  LeaderboardEntry
} from './types';
import { PRE_DESIGNED_DATA, VERB_BANK } from './constants';
import { GRAMMAR_COLORS, CONTEXT_THEMES } from './constants/colors';
import { cn } from './lib/utils';

const MODULES: Module[] = [
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    icon: 'fa-solid fa-seedling',
    categories: ['pronombres', 'vocabulario', 'preposiciones', 'adverbios']
  },
  {
    id: 'tiempos',
    label: 'Tiempos Verbales',
    icon: 'fa-solid fa-clock',
    categories: ['tiempos_simples', 'tiempos_continuos', 'tiempos_perfectos']
  },
  {
    id: 'avanzado',
    label: 'Estructuras Avanzadas',
    icon: 'fa-solid fa-graduation-cap',
    categories: ['modales', 'condicionales', 'voz_pasiva', 'discurso_reportado', 'clausulas_relativas']
  }
];

const CATEGORIES: { id: Category; label: string; icon: string; topics: GrammarTopic[] }[] = [
  { 
    id: 'tiempos_simples', 
    label: 'Tiempos Simples', 
    icon: 'fa-solid fa-clock', 
    topics: ['presente', 'pasado', 'futuro', 'futuro_idiomatico', 'copreterito', 'pospreterito', 'subjuntivo_presente', 'subjuntivo_imperfecto', 'subjuntivo_futuro'] 
  },
  { 
    id: 'pronombres', 
    label: 'Pronombres', 
    icon: 'fa-solid fa-user', 
    topics: ['pronombres_personales', 'posesivos', 'demostrativos', 'reflexivos'] 
  },
  { 
    id: 'tiempos_perfectos', 
    label: 'Tiempos Perfectos', 
    icon: 'fa-solid fa-wand-magic-sparkles', 
    topics: ['presente_perfecto', 'pasado_perfecto', 'futuro_perfecto', 'futuro_idiomatico_perfecto', 'condicional_perfecto'] 
  },
  { 
    id: 'tiempos_continuos', 
    label: 'Tiempos Continuos', 
    icon: 'fa-solid fa-rotate', 
    topics: ['presente_continuo', 'pasado_continuo', 'futuro_continuo', 'futuro_idiomatico_continuo', 'condicional_continuo'] 
  },
  { 
    id: 'preposiciones', 
    label: 'Preposiciones', 
    icon: 'fa-solid fa-location-dot', 
    topics: ['preposiciones'] 
  },
  { 
    id: 'adverbios', 
    label: 'Adverbios', 
    icon: 'fa-solid fa-bolt', 
    topics: ['adverbios'] 
  },
  { 
    id: 'vocabulario', 
    label: 'Vocabulario', 
    icon: 'fa-solid fa-book', 
    topics: ['vocabulario_casa', 'vocabulario_super', 'vocabulario_trabajo', 'vocabulario_aeropuerto', 'vocabulario_restaurante', 'vocabulario_escuela'] 
  },
  { 
    id: 'modales', 
    label: 'Modales', 
    icon: 'fa-solid fa-shield-halved', 
    topics: ['modales_basicos', 'modales_perfectos'] 
  },
  { 
    id: 'condicionales', 
    label: 'Condicionales', 
    icon: 'fa-solid fa-code-branch', 
    topics: ['condicional_cero', 'condicional_primero', 'condicional_segundo', 'condicional_tercero'] 
  },
  { 
    id: 'voz_pasiva', 
    label: 'Voz Pasiva', 
    icon: 'fa-solid fa-repeat', 
    topics: ['voz_pasiva_presente', 'voz_pasiva_pasado'] 
  },
  { 
    id: 'discurso_reportado', 
    label: 'Reported Speech', 
    icon: 'fa-solid fa-quote-left', 
    topics: ['reported_speech_presente', 'reported_speech_pasado'] 
  },
  { 
    id: 'clausulas_relativas', 
    label: 'Cláusulas Relativas', 
    icon: 'fa-solid fa-link', 
    topics: ['clausulas_relativas_definidas', 'clausulas_relativas_no_definidas'] 
  },
];

const getBadges = (topic: string) => {
  const parts = topic.split('_');
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1));
};

const WORLDS: World[] = [
  {
    id: 'world_1',
    name: 'Fundamentos',
    icon: 'fa-solid fa-seedling',
    color: 'bg-emerald-500',
    modules: ['fundamentos']
  },
  {
    id: 'world_2',
    name: 'Tiempos Verbales',
    icon: 'fa-solid fa-clock',
    color: 'bg-blue-500',
    modules: ['tiempos']
  },
  {
    id: 'world_3',
    name: 'Maestría Avanzada',
    icon: 'fa-solid fa-crown',
    color: 'bg-purple-500',
    modules: ['avanzado']
  }
];

const SHOP_ITEMS = [
  { id: 'refill_hearts', name: 'Refill Corazones', price: 100, icon: <Heart className="w-6 h-6 text-red-500 fill-current" />, description: 'Recupera tus 5 corazones al instante.' },
  { id: 'streak_freeze', name: 'Protector de Racha', price: 200, icon: <Flame className="w-6 h-6 text-orange-500 fill-current" />, description: 'Mantiene tu racha aunque no practiques un día.' },
  { id: 'pro_badge', name: 'GrammarFlow Pro', price: 1000, icon: <Crown className="w-6 h-6 text-yellow-500 fill-current" />, description: 'Acceso ilimitado y badges exclusivos.' }
];

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [view, setView] = useState<'home' | 'intro' | 'lesson' | 'summary' | 'roadmap' | 'leaderboard' | 'shop'>('home');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    hearts: 5,
    streak: 0,
    gems: 0,
    isPro: false,
    badges: [],
    completedTopics: [],
    selectedVerb: '',
    selectedVerbType: 'cualquiera',
    languagePair: { source: 'es', target: 'en' },
    inventory: []
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const savedData = await getUserData(firebaseUser.uid);
        if (savedData) {
          setProgress({
            level: savedData.level || 1,
            xp: savedData.xp || 0,
            hearts: savedData.hearts || 5,
            streak: savedData.streak || 0,
            gems: savedData.gems || 0,
            isPro: savedData.isPro || false,
            badges: savedData.badges || [],
            completedTopics: savedData.completedTopics || [],
            selectedVerb: '',
            selectedVerbType: 'cualquiera',
            languagePair: { source: 'es', target: 'en' },
            inventory: []
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const savedData = await getUserData(result.user.uid);
        if (!savedData) {
          // Initial sync for new user
          await syncUserProgress(result.user.uid, progress);
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setView('home');
  };

  const updateProgress = async (newProgress: Partial<UserProgress>) => {
    const updated = { ...progress, ...newProgress };
    setProgress(updated);
    if (user) {
      await syncUserProgress(user.uid, updated);
    }
  };

  const buyItem = async (item: typeof SHOP_ITEMS[0]) => {
    if ((progress.gems || 0) < item.price) return;
    
    let newProgress: Partial<UserProgress> = { gems: (progress.gems || 0) - item.price };
    
    if (item.id === 'refill_hearts') {
      newProgress.hearts = 5;
    } else if (item.id === 'pro_badge') {
      newProgress.isPro = true;
    } else {
      newProgress.inventory = [...(progress.inventory || []), item.id];
    }
    
    await updateProgress(newProgress);
  };
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentTopic, setCurrentTopic] = useState<GrammarTopic | null>(null);
  const [introduction, setIntroduction] = useState<Introduction | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [step, setStep] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleId | null>(null);

  const [activeForm, setActiveForm] = useState<'afirmativo' | 'negativo' | 'pregunta'>('afirmativo');
  const [activeGroup, setActiveGroup] = useState<'indicativo' | 'subjuntivo'>('indicativo');
  const [activePerson, setActivePerson] = useState<PersonId>('yo');
  const [activeContext, setActiveContext] = useState<string>('General');
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [customContext, setCustomContext] = useState('');
  const [isGeneratingContext, setIsGeneratingContext] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activePartExplanation, setActivePartExplanation] = useState<string | null>(null);

  const playAudio = async (text: string) => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      const base64Audio = await generateSpeech(text);
      if (base64Audio) {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        audio.onended = () => setIsPlayingAudio(false);
        await audio.play();
      } else {
        setIsPlayingAudio(false);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlayingAudio(false);
    }
  };

  const startCategory = async (category: Category) => {
    setCurrentCategory(category);
    
    // Check if we have pre-designed data for this category AND NO specific verb is selected
    if (PRE_DESIGNED_DATA[category] && !progress.selectedVerb) {
      const preDesigned = PRE_DESIGNED_DATA[category] as Introduction;
      // Map old spanish/english to source/target if necessary
      const mappedData: Introduction = {
        ...preDesigned,
        examples: preDesigned.examples.map(ex => ({
          ...ex,
          persons: ex.persons.map(p => ({
            ...p,
            forms: p.forms.map(f => ({
              ...f,
              source: (f as any).source || (f as any).spanish,
              target: (f as any).target || (f as any).english
            }))
          }))
        }))
      };
      setIntroduction(mappedData);
      setView('intro');
      setActiveForm('afirmativo');
      setActiveGroup('indicativo');
      setActivePerson('yo');
      setActiveContext(mappedData.examples[0]?.context || mappedData.examples[0]?.tense || 'General');
      return;
    }

    setLoading(true);
    try {
      const intro = await generateIntroduction(category, progress.selectedVerb, progress.selectedVerbType, undefined, progress.languagePair);
      setIntroduction(intro);
      setView('intro');
      setActiveForm('afirmativo');
      setActiveGroup('indicativo');
      setActivePerson('yo');
      setActiveContext(intro.examples[0]?.context || intro.examples[0]?.tense || 'General');
    } catch (error) {
      console.error("Error generating introduction:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContext = async () => {
    if (!customContext.trim() || !currentCategory) return;
    setIsGeneratingContext(true);
    try {
      const newIntro = await generateIntroduction(currentCategory, progress.selectedVerb, progress.selectedVerbType, customContext, progress.languagePair);
      // Merge examples
      setIntroduction(prev => {
        if (!prev) return newIntro;
        return {
          ...prev,
          examples: [...prev.examples, ...newIntro.examples]
        };
      });
      setActiveContext(customContext);
      setCustomContext('');
    } catch (error) {
      console.error("Error generating custom context:", error);
    } finally {
      setIsGeneratingContext(false);
    }
  };
  const startLesson = async () => {
    if (!currentCategory) return;
    
    const categoryData = CATEGORIES.find(c => c.id === currentCategory);
    if (!categoryData) return;
    
    const randomTopic = categoryData.topics[Math.floor(Math.random() * categoryData.topics.length)];
    setCurrentTopic(randomTopic);
    
    setLoading(true);
    try {
      const newExercise = await generateExercise(currentCategory, randomTopic, progress.selectedVerb, progress.selectedVerbType, activeContext, progress.languagePair);
      setExercise(newExercise);
      setView('lesson');
      setStep(1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowMnemonic(false);
    } catch (error) {
      console.error("Error generating exercise:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = () => {
    if (!exercise || !selectedOption) return;

    const correct = selectedOption === exercise.correctAnswer;
    setIsCorrect(correct);

    if (!correct) {
      updateProgress({ hearts: Math.max(0, progress.hearts - 1), streak: 0 });
    } else {
      updateProgress({ 
        xp: progress.xp + 10, 
        streak: progress.streak + 1,
        gems: (progress.gems || 0) + 2
      });
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      setStep(2);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setView('summary');
    }
  };

  const theme = CONTEXT_THEMES[activeContext] || CONTEXT_THEMES.General;

  return (
    <div className={cn("mobile-container transition-colors duration-500", theme.bg)}>
      {/* Header */}
      <header className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20 shadow-sm">
        <div className="flex items-center gap-4">
          {view !== 'home' ? (
            <button onClick={() => setView('home')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
          ) : (
            <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <Settings2 className="w-6 h-6 text-slate-500" />
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="font-black text-xl text-duo-green tracking-tight leading-none">GrammarFlow</h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{progress.languagePair.source.toUpperCase()} → {progress.languagePair.target.toUpperCase()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            <Coins className="w-4 h-4 text-blue-500 fill-current" />
            <span className="text-blue-600 font-black text-sm">{progress.gems || 0}</span>
          </div>
          <button 
            onClick={() => setView('shop')}
            className={cn("p-2 rounded-xl transition-colors", view === 'shop' ? "bg-duo-blue text-white" : "hover:bg-slate-100 text-slate-500")}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setView('leaderboard');
              getLeaderboard().then(setLeaderboard);
            }}
            className={cn("p-2 rounded-xl transition-colors", view === 'leaderboard' ? "bg-duo-blue text-white" : "hover:bg-slate-100 text-slate-500")}
          >
            <Users className="w-5 h-5" />
          </button>
          {user ? (
            <button 
              onClick={handleLogout}
              className="p-0.5 hover:bg-slate-100 rounded-full transition-colors border-2 border-slate-100"
              title="Cerrar Sesión"
            >
              <img src={user.photoURL || ''} alt="User" className="w-8 h-8 rounded-full" />
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-duo-blue font-black text-[10px] uppercase tracking-widest border-2 border-duo-blue/20"
            >
              Login
            </button>
          )}
          <button 
            onClick={() => setView('roadmap')}
            className={cn("p-2 rounded-xl transition-colors", view === 'roadmap' ? "bg-duo-blue text-white" : "hover:bg-slate-100 text-slate-500")}
          >
            <Map className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <Heart className="w-4 h-4 text-duo-red fill-current" />
            <span className="text-duo-red font-black text-sm">{progress.hearts}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <Zap className="w-4 h-4 text-duo-orange fill-current" />
            <span className="text-duo-orange font-black text-sm">{progress.xp}</span>
          </div>
          {progress.streak > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 animate-bounce">
              <Sparkles className="w-4 h-4 text-duo-orange fill-current" />
              <span className="text-duo-orange font-black text-sm">{progress.streak}</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        <AnimatePresence mode="wait">
          {view === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto space-y-12 pb-20"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-800">Tu Camino</h2>
                <p className="text-slate-500 font-medium">Domina cada mundo para avanzar</p>
              </div>

              <div className="relative space-y-20">
                {WORLDS.map((world, worldIdx) => (
                  <div key={world.id} className="relative">
                    {/* World Header */}
                    <div className={cn("p-6 rounded-[2rem] text-white shadow-xl mb-10 relative overflow-hidden", world.color)}>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <i className={cn(world.icon, "text-2xl")}></i>
                          <span className="font-black uppercase tracking-widest text-xs opacity-80">Mundo {worldIdx + 1}</span>
                        </div>
                        <h3 className="text-2xl font-black">{world.name}</h3>
                      </div>
                      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-20">
                        <i className={cn(world.icon, "text-9xl")}></i>
                      </div>
                    </div>

                    {/* Path Nodes */}
                    <div className="flex flex-col items-center gap-8">
                      {world.modules.map((modId, modIdx) => {
                        const mod = MODULES.find(m => m.id === modId);
                        if (!mod) return null;
                        return (
                          <div key={modId} className="flex flex-col items-center gap-4">
                            <div className="relative">
                              <button
                                onClick={() => setSelectedModule(modId)}
                                className={cn(
                                  "w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-90 relative z-10",
                                  selectedModule === modId ? "ring-8 ring-slate-100 scale-110" : "",
                                  world.color
                                )}
                              >
                                <i className={cn(mod.icon, "text-3xl")}></i>
                              </button>
                              {/* Progress Ring */}
                              <svg className="absolute inset-0 -m-2 w-24 h-24 rotate-[-90deg]">
                                <circle
                                  cx="48"
                                  cy="48"
                                  r="44"
                                  fill="transparent"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  className="text-slate-100"
                                />
                                <circle
                                  cx="48"
                                  cy="48"
                                  r="44"
                                  fill="transparent"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  strokeDasharray={2 * Math.PI * 44}
                                  strokeDashoffset={2 * Math.PI * 44 * (1 - 0.4)} // Mock progress
                                  className="text-white"
                                />
                              </svg>
                            </div>
                            <span className="font-black text-slate-700 text-sm">{mod.label}</span>

                            {/* Categories for selected module */}
                            <AnimatePresence>
                              {selectedModule === modId && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden w-full max-w-xs"
                                >
                                  <div className="grid grid-cols-1 gap-2 p-4 bg-white rounded-3xl border-2 border-slate-100 shadow-sm mt-4">
                                    {mod.categories.map(catId => {
                                      const cat = CATEGORIES.find(c => c.id === catId);
                                      if (!cat) return null;
                                      return (
                                        <button
                                          key={catId}
                                          onClick={() => startCategory(catId)}
                                          className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                                        >
                                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform", world.color)}>
                                            <i className={cat.icon}></i>
                                          </div>
                                          <div className="flex-1">
                                            <h4 className="font-black text-slate-800 text-sm">{cat.label}</h4>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1">
                                              <div className={cn("h-full rounded-full", world.color)} style={{ width: '30%' }}></div>
                                            </div>
                                          </div>
                                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex p-4 bg-amber-100 rounded-full mb-2">
                  <Trophy className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">Liga Global</h2>
                <p className="text-slate-500 font-medium">Los mejores estudiantes de GrammarFlow</p>
              </div>

              <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-sm overflow-hidden">
                {leaderboard.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    {leaderboard.map((entry, i) => (
                      <div key={entry.uid} className={cn("flex items-center gap-4 p-5", entry.uid === user?.uid ? "bg-blue-50/50" : "")}>
                        <div className="w-8 font-black text-slate-400 text-lg">
                          {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                        </div>
                        <img src={entry.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.uid}`} className="w-12 h-12 rounded-full border-2 border-slate-100" alt="" />
                        <div className="flex-1">
                          <h4 className="font-black text-slate-800">{entry.displayName}</h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nivel {entry.level}</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-duo-orange font-black">
                            <Zap className="w-4 h-4 fill-current" />
                            {entry.xp}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">XP Total</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center space-y-4">
                    <div className="animate-spin w-8 h-8 border-4 border-duo-blue border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-slate-400 font-bold">Cargando clasificación...</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-2">Tienda de Gemas</h2>
                  <p className="opacity-80 font-medium mb-6">Usa tus gemas para obtener ventajas exclusivas.</p>
                  <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30">
                    <Coins className="w-6 h-6 text-yellow-300 fill-current" />
                    <span className="text-2xl font-black">{progress.gems || 0}</span>
                  </div>
                </div>
                <ShoppingBag className="absolute -bottom-10 -right-10 w-60 h-60 text-white/10 rotate-12" />
              </div>

              <div className="space-y-4">
                {SHOP_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => buyItem(item)}
                    disabled={(progress.gems || 0) < item.price || (item.id === 'pro_badge' && progress.isPro)}
                    className={cn(
                      "w-full flex items-center gap-6 p-6 bg-white rounded-[2rem] border-2 transition-all text-left group",
                      (progress.gems || 0) >= item.price ? "border-slate-100 hover:border-duo-blue hover:shadow-lg" : "opacity-60 border-slate-50 grayscale"
                    )}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-slate-800 text-lg">{item.name}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-tight">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                        <Coins className="w-4 h-4 text-blue-500 fill-current" />
                        <span className="text-blue-600 font-black">{item.price}</span>
                      </div>
                      {item.id === 'pro_badge' && progress.isPro && (
                        <span className="text-[10px] font-black text-duo-green uppercase block mt-1">Adquirido</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {showSettings && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5"
                >
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <Settings2 className="w-5 h-5 text-duo-blue" />
                    Configuración de Verbos
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Verbos</label>
                    <div className="flex gap-2">
                      {(['regulares', 'irregulares', 'cualquiera'] as VerbType[]).map(type => (
                        <button
                          key={type}
                          onClick={() => setProgress(prev => ({ ...prev, selectedVerbType: type }))}
                          className={cn(
                            "flex-1 py-3 px-4 rounded-2xl text-xs font-black border-2 transition-all capitalize shadow-sm",
                            progress.selectedVerbType === type 
                              ? "bg-duo-blue border-duo-blue text-white shadow-blue-200" 
                              : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banco de Verbos Comunes</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block px-1">Regulares</span>
                        <div className="flex flex-wrap gap-1">
                          {VERB_BANK.regulares.map(v => (
                            <button
                              key={v.target}
                              onClick={() => setProgress(prev => ({ ...prev, selectedVerb: v.source, selectedVerbType: 'regulares' }))}
                              className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold border transition-all",
                                progress.selectedVerb === v.source ? "bg-duo-blue border-duo-blue text-white" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                              )}
                            >
                              {v.source}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block px-1">Irregulares</span>
                        <div className="flex flex-wrap gap-1">
                          {VERB_BANK.irregulares.map(v => (
                            <button
                              key={v.target}
                              onClick={() => setProgress(prev => ({ ...prev, selectedVerb: v.source, selectedVerbType: 'irregulares' }))}
                              className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold border transition-all",
                                progress.selectedVerb === v.source ? "bg-duo-blue border-duo-blue text-white" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                              )}
                            >
                              {v.source}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verbo Específico</label>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-duo-blue transition-colors" />
                      <input 
                        type="text"
                        placeholder="Ej: Comer, Vivir, Ser..."
                        value={progress.selectedVerb}
                        onChange={(e) => setProgress(prev => ({ ...prev, selectedVerb: e.target.value }))}
                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-duo-blue focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                      {progress.selectedVerb && (
                        <button 
                          onClick={() => setProgress(prev => ({ ...prev, selectedVerb: '' }))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="bg-gradient-to-br from-duo-green to-emerald-500 p-8 rounded-[2rem] text-white shadow-lg shadow-emerald-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <GraduationCap className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-2">¡Hola, Ian! 👋</h2>
                  <p className="text-emerald-50 font-medium opacity-90">
                    {progress.selectedVerb 
                      ? `Hoy dominaremos el verbo "${progress.selectedVerb}"` 
                      : `Hoy practicaremos verbos ${progress.selectedVerbType}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {selectedModule ? `Módulo: ${MODULES.find(m => m.id === selectedModule)?.label}` : 'Módulos de Aprendizaje'}
                  </h3>
                  {selectedModule && (
                    <button 
                      onClick={() => setSelectedModule(null)}
                      className="text-[10px] font-black text-duo-blue uppercase tracking-wider hover:underline"
                    >
                      Ver todos los módulos
                    </button>
                  )}
                </div>

                {!selectedModule ? (
                  <div className="grid grid-cols-1 gap-4">
                    {MODULES.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => setSelectedModule(module.id)}
                        className="flex items-center gap-5 p-8 rounded-[2rem] bg-white border-2 border-slate-100 hover:border-duo-blue hover:shadow-xl hover:shadow-blue-50 transition-all text-left group relative overflow-hidden"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <i className={cn(module.icon, "text-3xl text-slate-400 group-hover:text-duo-blue transition-colors")}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-xl text-slate-800">{module.label}</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {module.categories.length} Categorías • {module.id === 'fundamentos' ? 'Básico' : module.id === 'tiempos' ? 'Intermedio' : 'Avanzado'}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-duo-blue group-hover:text-white transition-all">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {CATEGORIES.filter(cat => MODULES.find(m => m.id === selectedModule)?.categories.includes(cat.id)).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => startCategory(cat.id)}
                        disabled={loading}
                        className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-white border-2 border-slate-100 hover:border-duo-blue hover:shadow-lg hover:shadow-blue-50 transition-all text-left group relative overflow-hidden"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <i className={cn(cat.icon, "text-xl text-slate-400 group-hover:text-duo-blue transition-colors")}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-base text-slate-800">{cat.label}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {cat.topics.length} Temas
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-duo-blue group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'intro' && introduction && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Info className="w-6 h-6 text-duo-blue" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 leading-tight">{introduction.title}</h2>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm relative">
                <div className="absolute -top-3 -left-3">
                  <Lightbulb className="w-8 h-8 text-duo-orange fill-white" />
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {introduction.definition}
                </p>
              </div>

              {((introduction.list && introduction.list.length > 0) || (introduction.concepts && introduction.concepts.length > 0)) && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Conceptos Clave</h3>
                  <div className="flex flex-wrap gap-2 relative">
                    {introduction.concepts ? (
                      introduction.concepts.map(concept => (
                        <div key={concept.term} className="relative group/concept">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            onMouseEnter={() => setActiveConcept(concept)}
                            onMouseLeave={() => setActiveConcept(null)}
                            onClick={() => setActiveConcept(activeConcept?.term === concept.term ? null : concept)}
                            className={cn(
                              "px-4 py-2 bg-white rounded-xl text-xs font-black border-2 transition-all shadow-sm",
                              activeConcept?.term === concept.term 
                                ? "border-duo-blue text-duo-blue bg-blue-50" 
                                : "border-slate-100 text-slate-600 hover:border-slate-200"
                            )}
                          >
                            {concept.term}
                          </motion.button>
                          
                          <AnimatePresence>
                            {activeConcept?.term === concept.term && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute z-50 bottom-full left-0 mb-3 w-64 bg-white p-4 rounded-2xl shadow-xl border-2 border-slate-100 pointer-events-none md:pointer-events-auto"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-duo-blue" />
                                    <span className="text-[10px] font-black text-duo-blue uppercase tracking-wider">¿Qué es?</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    {concept.definition}
                                  </p>
                                  <div className="pt-2 border-t border-slate-50">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-duo-orange" />
                                      <span className="text-[10px] font-black text-duo-orange uppercase tracking-wider">¿Cómo se usa?</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 italic leading-relaxed">
                                      {concept.usage}
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-100 rotate-45" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    ) : (
                      introduction.list?.map(item => (
                        <span key={item} className="px-4 py-2 bg-white rounded-xl text-xs font-black text-slate-600 border-2 border-slate-100 shadow-sm">
                          {item}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex flex-col gap-4 px-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contexto / Tópico</h3>
                      <div className="flex gap-1">
                        <input 
                          type="text"
                          placeholder="Nuevo contexto..."
                          value={customContext}
                          onChange={(e) => setCustomContext(e.target.value)}
                          className="text-[10px] px-2 py-1 bg-slate-100 rounded-lg border-none outline-none focus:ring-1 focus:ring-duo-blue w-24"
                        />
                        <button 
                          onClick={handleGenerateContext}
                          disabled={isGeneratingContext || !customContext.trim()}
                          className="p-1 bg-duo-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-2xl">
                      {Array.from(new Set(introduction.examples.map(ex => ex.context || ex.tense))).map((ctx) => (
                        <button
                          key={ctx}
                          onClick={() => setActiveContext(ctx)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all border-2",
                            activeContext === ctx 
                              ? "bg-white border-duo-blue text-duo-blue shadow-sm" 
                              : "bg-transparent border-transparent text-slate-400 hover:bg-white/50"
                          )}
                        >
                          {ctx}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modo</h3>
                    <div className="flex bg-slate-200/50 p-1 rounded-xl">
                      {(['indicativo', 'subjuntivo'] as const).map((group) => (
                        <button
                          key={group}
                          onClick={() => setActiveGroup(group)}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all",
                            activeGroup === group 
                              ? "bg-duo-blue text-white shadow-sm" 
                              : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {group}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Oración</h3>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      {(['afirmativo', 'negativo', 'pregunta'] as const).map((form) => (
                        <button
                          key={form}
                          onClick={() => setActiveForm(form)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all",
                            activeForm === form 
                              ? "bg-white text-duo-blue shadow-sm" 
                              : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {form}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Persona</h3>
                    <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-2xl">
                      {(['yo', 'tu', 'el_ella', 'nosotros', 'uds', 'ellos'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setActivePerson(p)}
                          className={cn(
                            "px-3 py-2 rounded-xl text-[11px] font-bold transition-all border-2",
                            activePerson === p 
                              ? "bg-white border-duo-blue text-duo-blue shadow-sm" 
                              : "bg-transparent border-transparent text-slate-500 hover:bg-white/50"
                          )}
                        >
                          {p === 'el_ella' ? 'Él/Ella' : p === 'uds' ? 'Uds.' : p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {introduction.examples.filter(ex => ex.group === activeGroup && (ex.context === activeContext || ex.tense === activeContext)).length === 0 && (
                    <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                        <Info className="w-8 h-8 text-slate-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-400">No hay ejemplos para este modo</p>
                        <p className="text-xs text-slate-300">Cambia a "Indicativo" o selecciona otro contexto.</p>
                      </div>
                    </div>
                  )}
                  {introduction.examples
                    .filter(ex => ex.group === activeGroup && (ex.context === activeContext || ex.tense === activeContext))
                    .map((ex, i) => {
                      const personData = ex.persons.find(p => p.id === activePerson) || ex.persons[0];
                      const currentForm = personData.forms.find(f => f.type === activeForm) || personData.forms[0];
                      
                      const renderSentence = (parts: SentencePart[], isEnglish: boolean) => (
                        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
                          {parts.map((part, idx) => {
                            const colors = GRAMMAR_COLORS[part.type] || GRAMMAR_COLORS.other;
                            return (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05, y: -2 }}
                                onClick={() => setActivePartExplanation(part.explanation || part.label)}
                                className={cn(
                                  "relative px-2 py-1 rounded-xl transition-all border-2 text-sm font-bold",
                                  colors.bg,
                                  colors.text,
                                  colors.border,
                                  "hover:shadow-md active:scale-95"
                                )}
                              >
                                {part.text}
                                <div className="absolute -top-2 -right-1 w-2 h-2 rounded-full border border-white shadow-sm" style={{ backgroundColor: 'currentColor' }} />
                              </motion.button>
                            );
                          })}
                        </div>
                      );

                      return (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm hover:border-duo-blue transition-all group">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-50 rounded-lg text-[10px] font-black text-duo-blue uppercase tracking-wider">
                              {ex.tense}
                            </span>
                            <div className="h-px flex-1 bg-slate-50" />
                          </div>

                          <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex-1">
                                <span className="text-[10px] font-bold text-slate-300 uppercase block mb-2">{progress.languagePair.source.toUpperCase()}</span>
                                <div className="text-xl">
                                  {renderSentence(currentForm.source, false)}
                                </div>
                              </div>
                              
                              <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center shrink-0">
                                <ArrowRight className="w-5 h-5 text-slate-300" />
                              </div>

                              <div className="flex-1 md:text-right">
                                <div className="flex items-center justify-between md:justify-end gap-2 mb-2">
                                  <span className="text-[10px] font-bold text-duo-blue uppercase block">{progress.languagePair.target.toUpperCase()}</span>
                                  <button 
                                    onClick={() => playAudio(currentForm.target.map(p => p.text).join(''))}
                                    className="p-1.5 bg-blue-50 text-duo-blue rounded-lg hover:bg-blue-100 transition-colors"
                                  >
                                    <Play className={cn("w-3 h-3 fill-current", isPlayingAudio && "animate-pulse")} />
                                  </button>
                                </div>
                                <div className="text-xl md:flex md:justify-end">
                                  {renderSentence(currentForm.target, true)}
                                </div>
                              </div>
                            </div>

                            {currentForm.target.some(p => p.mnemonic) && (
                              <div className="mt-4 bg-amber-50 p-4 rounded-2xl border-2 border-amber-100 flex items-start gap-3">
                                <Brain className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] font-medium text-amber-800 italic">
                                  {currentForm.target.find(p => p.mnemonic)?.mnemonic}
                                </p>
                              </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-slate-50">
                              <div className="flex items-start gap-3 bg-slate-50/50 p-4 rounded-2xl">
                                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                  {ex.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t max-w-md mx-auto z-30">
                <button
                  onClick={startLesson}
                  className="w-full py-5 bg-duo-green text-white rounded-2xl font-black text-lg hover:bg-opacity-90 shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current" />
                  COMENZAR PRÁCTICA
                </button>
              </div>
            </motion.div>
          )}

          {view === 'lesson' && exercise && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className="bg-duo-green h-full shadow-[0_0_10px_rgba(88,204,2,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-duo-blue" />
                    <h2 className="text-lg font-black text-slate-800">
                      {step === 1 ? 'Identifica el Tiempo' : 'Traducción Paralela'}
                    </h2>
                    {exercise.difficulty && (
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase",
                        exercise.difficulty === 'easy' ? "bg-green-100 text-green-700" :
                        exercise.difficulty === 'medium' ? "bg-amber-100 text-amber-700" :
                        "bg-rose-100 text-rose-700"
                      )}>
                        {exercise.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setShowHelp(!showHelp)}
                      className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" />
                    </button>
                    {getBadges(exercise.topic).map(badge => (
                      <span key={badge} className="px-2 py-0.5 bg-blue-50 rounded text-[9px] font-black text-duo-blue uppercase">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {showHelp && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-100 text-xs font-medium text-amber-800 leading-relaxed"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Info className="w-3 h-3" />
                      <span className="font-black uppercase tracking-widest text-[9px]">Recordatorio Gramatical</span>
                    </div>
                    {exercise.grammarExplanation}
                  </motion.div>
                )}
                
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-100 relative">
                  <div className="text-lg leading-relaxed">
                    {step === 1 ? (
                      <div className="space-y-6">
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                          <p className="text-2xl font-black text-slate-800 italic">"{exercise.sourceSentence}"</p>
                        </div>
                        <p className="text-center text-slate-500 font-medium">
                          ¿Qué tiempo verbal se utiliza en esta frase?
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Base {progress.languagePair.source.toUpperCase()}</span>
                            <p className="text-xl font-bold text-slate-700">{exercise.sourceSentence}</p>
                          </div>
                          <div className="p-5 bg-blue-50 rounded-2xl border-2 border-duo-blue/20">
                            <span className="text-[10px] font-black text-duo-blue uppercase tracking-widest block mb-2">Equivalente {progress.languagePair.target.toUpperCase()}</span>
                            <p className="text-xl font-black text-duo-blue">{exercise.targetSentence}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {step === 1 && (
                    <div className="grid grid-cols-1 gap-3 mt-8">
                      {exercise.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => !isCorrect && setSelectedOption(option)}
                          className={cn(
                            "p-5 rounded-2xl border-2 text-left transition-all font-black text-sm shadow-sm",
                            selectedOption === option ? "border-duo-blue bg-blue-50 text-duo-blue" : "border-slate-100 bg-white text-slate-600 hover:border-slate-200",
                            isCorrect === true && option === exercise.correctAnswer && "border-duo-green bg-green-50 text-duo-green",
                            isCorrect === false && selectedOption === option && "border-duo-red bg-red-50 text-duo-red"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 mt-8">
                      {exercise.mnemonic && (
                        <div className="p-6 bg-amber-50 rounded-[1.5rem] border-2 border-amber-100 flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                            <Brain className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <span className="font-black text-amber-600 text-xs uppercase tracking-widest block mb-1">Tip Nemotécnico</span>
                            <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
                              {exercise.mnemonic}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6 bg-blue-50 rounded-[1.5rem] border-2 border-duo-blue/10 flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                          <GraduationCap className="w-6 h-6 text-duo-blue" />
                        </div>
                        <div>
                          <span className="font-black text-duo-blue text-xs uppercase tracking-widest block mb-1">Análisis Gramatical Profundo</span>
                          <p className="text-slate-700 text-sm font-medium leading-relaxed">
                            {exercise.grammarExplanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t max-w-md mx-auto z-30">
                {isCorrect === null && step === 1 ? (
                  <button
                    onClick={handleCheck}
                    disabled={!selectedOption}
                    className={cn(
                      "w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95",
                      selectedOption ? "bg-duo-green text-white shadow-emerald-100" : "bg-slate-200 text-slate-400 shadow-none"
                    )}
                  >
                    COMPROBAR
                  </button>
                ) : (
                  <div className="space-y-4">
                    {isCorrect === true && (
                      <div className="flex items-center gap-3 text-duo-green font-black bg-green-50 p-4 rounded-2xl border-2 border-green-100">
                        <CheckCircle2 className="w-6 h-6" />
                        <span>¡Excelente! Has identificado la base.</span>
                      </div>
                    )}
                    {isCorrect === false && (
                      <div className="flex flex-col gap-2 bg-red-50 p-4 rounded-2xl border-2 border-red-100">
                        <div className="flex items-center gap-3 text-duo-red font-black">
                          <XCircle className="w-6 h-6" />
                          <span>Casi... La respuesta era: {exercise.correctAnswer}</span>
                        </div>
                        {exercise.wrongAnswerExplanation && (
                          <p className="text-[11px] text-red-600 font-medium pl-9 italic">
                            {exercise.wrongAnswerExplanation}
                          </p>
                        )}
                      </div>
                    )}
                    <button
                      onClick={nextStep}
                      className="w-full py-5 bg-duo-blue text-white rounded-2xl font-black text-lg hover:bg-opacity-90 shadow-lg shadow-blue-100 transition-all active:scale-95"
                    >
                      {step === 1 ? 'CONTINUAR AL INGLÉS' : 'FINALIZAR LECCIÓN'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center h-full space-y-10 text-center pt-12"
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="absolute -inset-8 bg-duo-orange/10 rounded-full"
                />
                <Trophy className="w-40 h-40 text-duo-orange relative drop-shadow-2xl" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">¡Lección Completada!</h2>
                <p className="text-slate-500 text-lg font-medium">Tu base gramatical es cada vez más sólida.</p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-100 shadow-sm">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">XP Ganado</span>
                  <p className="text-xl font-black text-duo-orange">+10</p>
                </div>
                <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-100 shadow-sm">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Gemas</span>
                  <p className="text-xl font-black text-blue-500">+2</p>
                </div>
                <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-100 shadow-sm">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Precisión</span>
                  <p className="text-xl font-black text-duo-green">100%</p>
                </div>
              </div>

              <button
                onClick={() => setView('home')}
                className="w-full py-5 bg-duo-green text-white rounded-2xl font-black text-lg hover:bg-opacity-90 shadow-lg shadow-emerald-100 transition-all active:scale-95"
              >
                VOLVER AL INICIO
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {loading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center z-50">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-100 rounded-full" />
            <div className="w-20 h-20 border-4 border-duo-blue border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="mt-6 font-black text-duo-blue animate-pulse text-center px-10 leading-tight">
            {view === 'home' ? 'Diseñando tu mapa gramatical...' : 'Preparando el siguiente desafío...'}
          </p>
        </div>
      )}

      {activePartExplanation && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-duo-blue" />
                </div>
                <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Análisis de Estructura</h4>
              </div>
              <button 
                onClick={() => setActivePartExplanation(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6 text-slate-300" />
              </button>
            </div>
            <p className="text-lg text-slate-700 font-medium leading-relaxed">
              {activePartExplanation}
            </p>
            <button 
              onClick={() => setActivePartExplanation(null)}
              className="w-full py-4 bg-duo-blue text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
            >
              ENTENDIDO
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
