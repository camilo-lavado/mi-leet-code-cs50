import type { Problem } from '@/types';
import { ProblemCard } from './ProblemCard';
import { Spinner } from '@/components/ui/Spinner';

interface ProblemListProps {
  problems: Problem[];
  submissions?: any[];
  isLoading: boolean;
  error: Error | null;
}

export function ProblemList({ problems, submissions = [], isLoading, error }: ProblemListProps) {
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
    if (!acc[week]) {
      acc[week] = [];
    }
    acc[week].push(problem);
    return acc;
  }, {} as Record<number, Problem[]>);

  const sortedWeeks = Object.keys(groupedProblems)
    .map(Number)
    .sort((a, b) => a - b);

  const getProblemStatus = (problemId: string) => {
    const problemSubmissions = submissions.filter(s => s.problem_id === problemId);
    if (problemSubmissions.length === 0) return 'unattempted';
    const hasAccepted = problemSubmissions.some(s => s.status === 'Accepted');
    return hasAccepted ? 'solved' : 'attempted';
  };

  return (
    <div className="space-y-12">
      {sortedWeeks.map(week => (
        <section key={week} className="space-y-6">
          <div className="flex items-center gap-4 border-b border-local-border pb-4">
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
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {groupedProblems[week].map((p) => (
              <ProblemCard key={p.id} problem={p} status={getProblemStatus(p.id)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
