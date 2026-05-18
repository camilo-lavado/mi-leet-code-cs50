import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProblem } from '@/hooks/useProblems';
import { useSubmitCode } from '@/hooks/useSubmission';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { LanguageSelector } from '@/components/editor/LanguageSelector';
import { SubmitButton } from '@/components/submission/SubmitButton';
import { SubmissionResults } from '@/components/submission/SubmissionResults';
import { Spinner } from '@/components/ui/Spinner';
import { DifficultyBadge } from '@/components/problems/DifficultyBadge';
import type { SubmissionResult } from '@/types';

export function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const { data: problem, isLoading, error } = useProblem(id!);
  const submitMutation = useSubmitCode();

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c');
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (problem) {
      setLanguage(problem.language);
    }
  }, [problem]);

  if (isLoading) return <Spinner />;
  if (error || !problem) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-red-600 dark:text-red-400">
        Problem not found
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{problem.title}</h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {problem.description}
        </p>
        {problem.test_cases.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Test Cases (visible)
            </h2>
            <div className="space-y-2">
              {problem.test_cases
                .filter((tc) => !tc.is_hidden)
                .map((tc) => (
                  <div
                    key={tc.id}
                    className="p-2 bg-gray-100 rounded text-sm font-mono dark:bg-gray-800 dark:text-gray-200"
                  >
                    {tc.input_data ? (
                      <>
                        <span className="text-gray-500 dark:text-gray-400">Input: </span>
                        {tc.input_data}
                      </>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">No input</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <LanguageSelector value={language} onChange={setLanguage} />
        <SubmitButton onClick={handleSubmit} isLoading={submitMutation.isPending} />
      </div>

      <CodeEditor code={code} language={language} onChange={(v) => setCode(v ?? '')} />

      {submitMutation.error && (
        <div className="mt-4 p-4 rounded-lg border border-red-300 bg-red-50 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300">
          {submitMutation.error.message}
        </div>
      )}

      {result && <SubmissionResults result={result} />}
    </div>
  );
}
