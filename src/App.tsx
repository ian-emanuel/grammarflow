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
  Lightbulb
} from 'lucide-react';
import { generateExercise, generateIntroduction } from './services/gemini';
import { Exercise, GrammarTopic, UserProgress, Introduction, Category, VerbType, PersonId, SentencePart } from './types';
import { PRE_DESIGNED_DATA, VERB_BANK } from './constants';
import { cn } from './lib/utils';

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
];

const getBadges = (topic: string) => {
  const parts = topic.split('_');
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1));
};

export default function App() {
  const [view, setView] = useState<'home' | 'intro' | 'lesson' | 'summary'>('home');
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    hearts: 5,
    completedTopics: [],
    selectedVerb: '',
    selectedVerbType: 'cualquiera'
  });
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentTopic, setCurrentTopic] = useState<GrammarTopic | null>(null);
  const [introduction, setIntroduction] = useState<Introduction | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [step, setStep] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const [activeForm, setActiveForm] = useState<'afirmativo' | 'negativo' | 'pregunta'>('afirmativo');
  const [activeGroup, setActiveGroup] = useState<'indicativo' | 'subjuntivo'>('indicativo');
  const [activePerson, setActivePerson] = useState<PersonId>('yo');

  const startCategory = async (category: Category) => {
    setCurrentCategory(category);
    
    // Check if we have pre-designed data for this category AND NO specific verb is selected
    if (PRE_DESIGNED_DATA[category] && !progress.selectedVerb) {
      setIntroduction(PRE_DESIGNED_DATA[category] as Introduction);
      setView('intro');
      setActiveForm('afirmativo');
      setActiveGroup('indicativo');
      setActivePerson('yo');
      return;
    }

    setLoading(true);
    try {
      const intro = await generateIntroduction(category, progress.selectedVerb, progress.selectedVerbType);
      setIntroduction(intro);
      setView('intro');
      setActiveForm('afirmativo');
      setActiveGroup('indicativo');
      setActivePerson('yo');
    } catch (error) {
      console.error("Error generating introduction:", error);
    } finally {
      setLoading(false);
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
      const newExercise = await generateExercise(currentCategory, randomTopic, progress.selectedVerb, progress.selectedVerbType);
      setExercise(newExercise);
      setView('lesson');
      setStep(1);
      setSelectedOption(null);
      setIsCorrect(null);
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
      setProgress(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
    } else {
      setProgress(prev => ({ ...prev, xp: prev.xp + 10 }));
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

  return (
    <div className="mobile-container bg-slate-50">
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
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">English Mastery</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <Heart className="w-4 h-4 text-duo-red fill-current" />
            <span className="text-duo-red font-black text-sm">{progress.hearts}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <Zap className="w-4 h-4 text-duo-orange fill-current" />
            <span className="text-duo-orange font-black text-sm">{progress.xp}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        <AnimatePresence mode="wait">
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
                              key={v.english}
                              onClick={() => setProgress(prev => ({ ...prev, selectedVerb: v.spanish, selectedVerbType: 'regulares' }))}
                              className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold border transition-all",
                                progress.selectedVerb === v.spanish ? "bg-duo-blue border-duo-blue text-white" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                              )}
                            >
                              {v.spanish}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block px-1">Irregulares</span>
                        <div className="flex flex-wrap gap-1">
                          {VERB_BANK.irregulares.map(v => (
                            <button
                              key={v.english}
                              onClick={() => setProgress(prev => ({ ...prev, selectedVerb: v.spanish, selectedVerbType: 'irregulares' }))}
                              className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold border transition-all",
                                progress.selectedVerb === v.spanish ? "bg-duo-blue border-duo-blue text-white" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"
                              )}
                            >
                              {v.spanish}
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
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Categorías de Estudio</h3>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => startCategory(cat.id)}
                    disabled={loading}
                    className="flex items-center gap-5 p-6 rounded-[1.5rem] bg-white border-2 border-slate-100 hover:border-duo-blue hover:shadow-xl hover:shadow-blue-50 transition-all text-left group relative overflow-hidden"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <i className={cn(cat.icon, "text-2xl text-slate-400 group-hover:text-duo-blue transition-colors")}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-lg text-slate-800">{cat.label}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {cat.topics.length} Temas • {cat.id.includes('tiempos') ? 'Gramática Base' : 'Vocabulario'}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-duo-blue group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                ))}
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

              {introduction.list && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Conceptos Clave</h3>
                  <div className="flex flex-wrap gap-2">
                    {introduction.list.map(item => (
                      <span key={item} className="px-4 py-2 bg-white rounded-xl text-xs font-black text-slate-600 border-2 border-slate-100 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex flex-col gap-4 px-2">
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
                  {introduction.examples.filter(ex => ex.group === activeGroup).length === 0 && (
                    <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                        <Info className="w-8 h-8 text-slate-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-400">No hay ejemplos para este modo</p>
                        <p className="text-xs text-slate-300">Cambia a "Indicativo" para ver los ejemplos base.</p>
                      </div>
                    </div>
                  )}
                  {introduction.examples
                    .filter(ex => ex.group === activeGroup)
                    .map((ex, i) => {
                      const personData = ex.persons.find(p => p.id === activePerson) || ex.persons[0];
                      const currentForm = personData.forms.find(f => f.type === activeForm) || personData.forms[0];
                      
                      const renderSentence = (parts: SentencePart[], isEnglish: boolean) => (
                        <div className="flex flex-wrap items-baseline gap-x-0.5">
                          {parts.map((part, idx) => (
                            <motion.span
                              key={idx}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className={cn(
                                "relative cursor-help px-0.5 rounded transition-colors group/part",
                                part.type === 'person' && "text-slate-700 font-bold",
                                part.type === 'auxiliary' && "text-amber-600 font-black bg-amber-50",
                                part.type === 'verb' && (isEnglish ? "text-duo-blue font-black" : "text-slate-700 font-bold"),
                                part.type === 'suffix' && "text-rose-600 font-black bg-rose-50 underline decoration-rose-200 decoration-2 underline-offset-4",
                                part.type === 'other' && "text-slate-500"
                              )}
                            >
                              {part.text}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[9px] font-bold rounded opacity-0 group-hover/part:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-xl">
                                {part.label}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                              </div>
                            </motion.span>
                          ))}
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
                                <span className="text-[10px] font-bold text-slate-300 uppercase block mb-2">Español</span>
                                <div className="text-xl">
                                  {renderSentence(currentForm.spanish, false)}
                                </div>
                              </div>
                              
                              <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center shrink-0">
                                <ArrowRight className="w-5 h-5 text-slate-300" />
                              </div>

                              <div className="flex-1 md:text-right">
                                <span className="text-[10px] font-bold text-duo-blue uppercase block mb-2">English</span>
                                <div className="text-xl md:flex md:justify-end">
                                  {renderSentence(currentForm.english, true)}
                                </div>
                              </div>
                            </div>

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
                  </div>
                  <div className="flex gap-1">
                    {getBadges(exercise.topic).map(badge => (
                      <span key={badge} className="px-2 py-0.5 bg-blue-50 rounded text-[9px] font-black text-duo-blue uppercase">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-100 relative">
                  <div className="text-lg leading-relaxed">
                    {step === 1 ? (
                      <div className="space-y-6">
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                          <p className="text-2xl font-black text-slate-800 italic">"{exercise.spanishSentence}"</p>
                        </div>
                        <p className="text-center text-slate-500 font-medium">
                          ¿Qué tiempo verbal se utiliza en esta frase?
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Base Española</span>
                            <p className="text-xl font-bold text-slate-700">{exercise.spanishSentence}</p>
                          </div>
                          <div className="p-5 bg-blue-50 rounded-2xl border-2 border-duo-blue/20">
                            <span className="text-[10px] font-black text-duo-blue uppercase tracking-widest block mb-2">Equivalente Inglés</span>
                            <p className="text-xl font-black text-duo-blue">{exercise.englishSentence}</p>
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
                    <div className="mt-8 p-6 bg-blue-50 rounded-[1.5rem] border-2 border-duo-blue/10 flex gap-4">
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
                      <div className="flex items-center gap-3 text-duo-red font-black bg-red-50 p-4 rounded-2xl border-2 border-red-100">
                        <XCircle className="w-6 h-6" />
                        <span>Casi... La respuesta era: {exercise.correctAnswer}</span>
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

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-100 shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">XP Ganado</span>
                  <p className="text-3xl font-black text-duo-orange">+10</p>
                </div>
                <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-100 shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Precisión</span>
                  <p className="text-3xl font-black text-duo-green">100%</p>
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
    </div>
  );
}
