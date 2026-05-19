import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Problem } from '@/types';
import { ProblemCard } from './ProblemCard';
import { Spinner } from '@/components/ui/Spinner';
import { FlashcardModal } from '@/components/ui/FlashcardModal';
import { useFlashcards } from '@/hooks/useFlashcards';

interface ProblemListProps {
  problems: Problem[];
  submissions?: any[];
  isLoading: boolean;
  error: Error | null;
}

export function ProblemList({ problems, submissions = [], isLoading, error }: ProblemListProps) {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const { flashcards, isLoading: fcLoading } = useFlashcards(activeWeek);

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-12">
        Failed to load problems
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No problems available yet
      </div>
    );
  }

  const groupedProblems = problems.reduce((acc, problem) => {
    const week = problem.week ?? 0;
    if (!acc[week]) acc[week] = [];
    acc[week].push(problem);
    return acc;
  }, {} as Record<number, Problem[]>);

  const sortedWeeks = Object.keys(groupedProblems).map(Number).sort((a, b) => a - b);

  const getProblemStatus = (problemId: string) => {
    const problemSubmissions = submissions.filter(s => s.problem_id === problemId);
    if (problemSubmissions.length === 0) return 'unattempted';
    const hasAccepted = problemSubmissions.some(s => s.status === 'Accepted');
    return hasAccepted ? 'solved' : 'attempted';
  };

  return (
    <>
      <FlashcardModal
        isOpen={activeWeek !== null}
        onClose={() => setActiveWeek(null)}
        flashcards={flashcards}
        isLoading={fcLoading}
        week={activeWeek ?? 0}
      />

      <div className="space-y-12">
        {sortedWeeks.map(week => (
          <section key={week} className="space-y-6">
            <div className="flex items-center justify-between border-b border-local-border pb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-local-primary/20 text-local-primary text-sm">
                    {week}
                  </span>
                  Semana {week}
                </h2>
                <span className="text-sm text-local-muted bg-white/5 px-3 py-1 rounded-full">
                  {groupedProblems[week].length} {groupedProblems[week].length === 1 ? 'Reto' : 'Retos'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/weeks/${week}`}
                  className="text-sm bg-local-primary/10 text-local-primary hover:bg-local-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all font-medium border border-local-primary/20 hover:border-local-primary/50 cursor-pointer"
                  title="Estudiar la teoría y clase magistral de esta semana"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  Estudiar Clase
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveWeek(week)}
                  className="text-sm bg-local-accent/10 text-local-accent hover:bg-local-accent/20 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all font-medium border border-local-accent/20 hover:border-local-accent/50 cursor-pointer"
                  title="Repasar la teoría de esta semana con flashcards"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  Repaso Rápido
                </button>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {groupedProblems[week].map((p) => (
                <ProblemCard key={p.id} problem={p} status={getProblemStatus(p.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}



