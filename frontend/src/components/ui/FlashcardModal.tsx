import { useState, useEffect, useCallback } from 'react';
import { MarkdownViewer } from './MarkdownViewer';

export interface Flashcard {
  id: string;
  week: number;
  question: string;
  answer: string;
  order_index: number;
}

type CardSide = 'question' | 'answer';
type CardResult = 'correct' | 'incorrect' | null;

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
  isLoading: boolean;
  week: number;
}

export function FlashcardModal({ isOpen, onClose, flashcards, isLoading, week }: FlashcardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [side, setSide] = useState<CardSide>('question');
  const [results, setResults] = useState<CardResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSide('question');
      setResults([]);
      setIsFinished(false);
      setIsFlipping(false);
    }
  }, [isOpen]);

  // Keyboard: Space to flip, Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && !isFinished) { e.preventDefault(); handleFlip(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, side, currentIndex, isFinished]);

  const handleFlip = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setSide(s => s === 'question' ? 'answer' : 'question');
      setIsFlipping(false);
    }, 150);
  }, [isFlipping]);

  const handleResult = useCallback((result: 'correct' | 'incorrect') => {
    const newResults = [...results, result];
    setResults(newResults);

    if (currentIndex + 1 >= flashcards.length) {
      setIsFinished(true);
    } else {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex(i => i + 1);
        setSide('question');
        setIsFlipping(false);
      }, 200);
    }
  }, [results, currentIndex, flashcards.length]);

  if (!isOpen) return null;

  const current = flashcards[currentIndex];
  const correct = results.filter(r => r === 'correct').length;
  const total = flashcards.length;
  const progress = total > 0 ? (currentIndex / total) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl glass-panel overflow-hidden flex flex-col"
        style={{ animation: 'slideUp 0.25s ease', minHeight: '480px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-local-border bg-black/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-local-accent/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Repaso Rápido — Semana {week}</h2>
              {!isFinished && !isLoading && (
                <p className="text-local-muted text-xs">Presiona Espacio para voltear la tarjeta</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-local-muted hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {!isFinished && !isLoading && total > 0 && (
          <div className="px-6 pt-3 flex-shrink-0">
            <div className="flex justify-between text-xs text-local-muted mb-1.5">
              <span>Tarjeta {Math.min(currentIndex + 1, total)} de {total}</span>
              <span className="text-local-accent font-semibold">{correct} correctas ✓</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-local-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col px-6 py-4">
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-local-accent/30 border-t-local-accent rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && total === 0 && (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <div className="text-4xl mb-3">📭</div>
                <p className="text-local-muted">Aún no hay flashcards para esta semana.</p>
              </div>
            </div>
          )}

          {!isLoading && !isFinished && current && (
            <div
              className={`flex-1 flex flex-col cursor-pointer transition-opacity duration-150 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}
              onClick={handleFlip}
            >
              {/* Card indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  side === 'question'
                    ? 'bg-local-primary/20 text-local-primary border border-local-primary/30'
                    : 'bg-local-accent/20 text-local-accent border border-local-accent/30'
                }`}>
                  {side === 'question' ? '❓ Pregunta' : '💡 Respuesta'}
                </span>
                <span className="text-xs text-local-muted">(clic o Espacio para voltear)</span>
              </div>

              {/* Card body */}
              <div className={`flex-1 rounded-xl border p-6 flex items-start transition-all ${
                side === 'question'
                  ? 'border-local-border bg-white/3'
                  : 'border-local-accent/30 bg-local-accent/5'
              }`}>
                <div className="w-full">
                  <MarkdownViewer content={side === 'question' ? current.question : current.answer} />
                </div>
              </div>

              {/* Action buttons — only shown on answer side */}
              {side === 'answer' && (
                <div className="flex gap-3 mt-4" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => handleResult('incorrect')}
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all flex items-center justify-center gap-2"
                  >
                    <span>✗</span> No lo sabía
                  </button>
                  <button
                    onClick={() => handleResult('correct')}
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm border border-local-accent/30 bg-local-accent/10 hover:bg-local-accent/20 text-local-accent transition-all flex items-center justify-center gap-2"
                  >
                    <span>✓</span> Lo sabía
                  </button>
                </div>
              )}

              {/* Flip hint — only on question side */}
              {side === 'question' && (
                <div className="mt-4 text-center">
                  <span className="text-local-muted text-xs italic">Piensa en la respuesta antes de voltear...</span>
                </div>
              )}
            </div>
          )}

          {/* Results screen */}
          {!isLoading && isFinished && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <div className="text-6xl">{correct === total ? '🎉' : correct >= total / 2 ? '💪' : '📚'}</div>
              <h3 className="text-2xl font-bold text-white">
                {correct === total ? '¡Perfecto!' : correct >= total / 2 ? '¡Buen trabajo!' : 'Sigue practicando'}
              </h3>
              <p className="text-local-muted text-lg">
                Respondiste correctamente <span className="text-local-accent font-bold">{correct}</span> de <span className="font-bold text-white">{total}</span> tarjetas
              </p>
              {/* Dots */}
              <div className="flex gap-2 mt-2">
                {results.map((r, i) => (
                  <span key={i} className={`w-3 h-3 rounded-full ${r === 'correct' ? 'bg-local-accent' : 'bg-red-500'}`} />
                ))}
              </div>
              <div className="flex gap-3 mt-4 w-full max-w-xs">
                <button
                  onClick={() => { setCurrentIndex(0); setSide('question'); setResults([]); setIsFinished(false); }}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-local-border bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  Repetir
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-local-primary hover:bg-local-primary-hover text-white transition-all"
                >
                  ¡A programar!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
