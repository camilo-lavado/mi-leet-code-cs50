import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProblem } from '@/hooks/useProblems';
import { useSubmitCode } from '@/hooks/useSubmission';
import { useHints } from '@/hooks/useHints';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { LanguageSelector } from '@/components/editor/LanguageSelector';
import { SubmitButton } from '@/components/submission/SubmitButton';
import { SubmissionResults } from '@/components/submission/SubmissionResults';
import { Spinner } from '@/components/ui/Spinner';
import { DifficultyBadge } from '@/components/problems/DifficultyBadge';
import { MarkdownViewer } from '@/components/ui/MarkdownViewer';
import { HintModal } from '@/components/ui/HintModal';
import type { SubmissionResult } from '@/types';

export function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const { data: problem, isLoading, error } = useProblem(id!);
  const submitMutation = useSubmitCode();
  const { hints, isLoading: hintsLoading } = useHints(id!);

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c');
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (problem) {
      setLanguage(problem.language);
    }
  }, [problem]);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Spinner /></div>;
  if (error || !problem) {
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        Problema no encontrado
      </div>
    );
  }

  const handleSubmit = () => {
    if (!id) return;
    setResult(null);
    submitMutation.mutate(
      { problem_id: id, language, code },
      { onSuccess: (data) => setResult(data) },
    );
  };

  return (
    <>
      <HintModal
        isOpen={showHints}
        onClose={() => setShowHints(false)}
        hints={hints}
        isLoading={hintsLoading}
      />

      <div className="h-full flex flex-col md:flex-row p-2 gap-2 bg-local-bg">
        {/* Panel Izquierdo: Descripción */}
        <div className="w-full md:w-[40%] flex flex-col gap-4 p-6 glass-panel overflow-y-auto">
          <div className="flex items-center justify-between border-b border-local-border pb-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
            {/* Hint Button */}
            <button
              id="hint-trigger-btn"
              type="button"
              onClick={() => setShowHints(true)}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold relative z-10
                         bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400
                         border border-yellow-500/30 hover:border-yellow-500/60
                         transition-all group cursor-pointer"
              title="Ver pistas socráticas"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {hints.length > 0 ? (
                <span>{hints.length} Pistas</span>
              ) : (
                <span>Pistas</span>
              )}
            </button>
          </div>

          <div className="mt-2">
            <MarkdownViewer content={problem.description} />
          </div>
          
          {problem.test_cases && problem.test_cases.length > 0 && (
            <div className="mt-8 border-t border-local-border pt-6">
              <h2 className="text-sm font-semibold text-local-muted uppercase tracking-wider mb-4">
                Casos de Prueba Visibles
              </h2>
              <div className="space-y-3">
                {problem.test_cases
                  .filter((tc) => !tc.is_hidden)
                  .map((tc, index) => (
                    <div key={tc.id} className="bg-black/30 rounded-lg border border-local-border p-4">
                      <div className="text-xs text-local-muted mb-2 font-semibold">Caso {index + 1}</div>
                      <div className="font-mono text-sm text-green-400 bg-black/50 p-3 rounded">
                        {tc.input_data ? tc.input_data : <span className="italic text-gray-600">Sin input</span>}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Panel Derecho: Editor y Consola */}
        <div className="w-full md:w-[60%] flex flex-col gap-2">
          {/* Editor */}
          <div className="flex-1 glass-panel flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-local-border bg-black/30">
              <h3 className="text-sm font-semibold text-local-muted flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Técnica Feynman: ¿Cómo lo vas a resolver?
              </h3>
              <textarea
                className="w-full bg-black/40 border border-local-border rounded-lg p-2 text-sm text-local-text placeholder-local-muted focus:outline-none focus:border-local-primary resize-none h-16"
                placeholder="Explica tu lógica aquí antes de escribir código. Ejemplo: Primero voy a iterar sobre el arreglo..."
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-b border-local-border bg-black/20">
              <LanguageSelector value={language} onChange={setLanguage} />
              <SubmitButton onClick={handleSubmit} isLoading={submitMutation.isPending} />
            </div>
            <div className="flex-1 overflow-hidden relative">
              <CodeEditor code={code} language={language} onChange={(v) => setCode(v ?? '')} />
            </div>
          </div>

          {/* Consola / Resultados */}
          <div className="h-[30%] min-h-[250px] glass-panel p-4 overflow-y-auto flex flex-col">
            <h3 className="text-sm font-semibold text-local-muted uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-local-accent"></span> Consola de Ejecución
            </h3>
            
            <div className="flex-1 bg-black/40 rounded-lg border border-local-border p-4">
              {submitMutation.error ? (
                <div className="text-red-400 font-mono text-sm">{submitMutation.error.message}</div>
              ) : result ? (
                <SubmissionResults result={result} />
              ) : (
                <div className="h-full flex items-center justify-center text-local-muted italic text-sm">
                  Envía tu código para ver los resultados de la evaluación.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


