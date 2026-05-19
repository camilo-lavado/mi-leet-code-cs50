import { useState, useEffect, useCallback } from 'react';
import type { Hint } from '@/hooks/useHints';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hints: Hint[];
  isLoading: boolean;
}

export function HintModal({ isOpen, onClose, hints, isLoading }: HintModalProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  // Reset when modal re-opens
  useEffect(() => {
    if (isOpen) setRevealedCount(0);
  }, [isOpen]);

  const handleRevealNext = useCallback(() => {
    const nextIdx = revealedCount;
    setAnimatingIndex(nextIdx);
    setRevealedCount((c) => c + 1);
    setTimeout(() => setAnimatingIndex(null), 600);
  }, [revealedCount]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allRevealed = revealedCount >= hints.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div
        className="relative w-full max-w-lg glass-panel p-0 overflow-hidden"
        style={{ animation: 'slideUp 0.25s ease' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-local-border bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg">Pistas Socráticas</h2>
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

        {/* Progress */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-local-muted">
              {revealedCount === 0
                ? 'Antes de ver una pista, intenta pensar en el problema 5 minutos más.'
                : `${revealedCount} de ${hints.length} pistas reveladas`}
            </p>
            {revealedCount > 0 && (
              <span className="text-xs text-yellow-500 font-semibold">
                {allRevealed ? '¡Todas reveladas!' : `Quedan ${hints.length - revealedCount}`}
              </span>
            )}
          </div>
          <div className="w-full bg-white/5 rounded-full h-1">
            <div
              className="h-1 rounded-full bg-yellow-500 transition-all duration-500"
              style={{ width: hints.length > 0 ? `${(revealedCount / hints.length) * 100}%` : '0%' }}
            />
          </div>
        </div>

        {/* Hints List */}
        <div className="px-6 pb-4 space-y-3 max-h-80 overflow-y-auto">
          {isLoading && (
            <div className="py-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && hints.slice(0, revealedCount).map((hint, idx) => (
            <div
              key={hint.id}
              className={`rounded-xl border p-4 transition-all ${
                animatingIndex === idx
                  ? 'border-yellow-500/50 bg-yellow-500/10'
                  : 'border-local-border bg-white/3'
              }`}
              style={animatingIndex === idx ? { animation: 'fadeIn 0.5s ease' } : {}}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-local-text text-sm leading-relaxed">{hint.question}</p>
              </div>
            </div>
          ))}

          {!isLoading && revealedCount === 0 && (
            <div className="py-4 text-center">
              <div className="text-4xl mb-3">🤔</div>
              <p className="text-local-muted text-sm">
                Las pistas están diseñadas como preguntas guía,<br />
                no como respuestas directas.
              </p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-local-border bg-black/20">
          {!isLoading && !allRevealed ? (
            <button
              onClick={handleRevealNext}
              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all
                         bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 
                         border border-yellow-500/30 hover:border-yellow-500/60
                         flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {revealedCount === 0 ? 'Necesito una pista' : 'Ver siguiente pista'}
            </button>
          ) : !isLoading && allRevealed ? (
            <div className="text-center text-sm text-local-muted py-1">
              Ya viste todas las pistas. ¡Ahora a programar! 💪
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
