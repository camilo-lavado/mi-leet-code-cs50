import type { Problem } from '@/types';
import { ProblemCard } from './ProblemCard';
import { Spinner } from '@/components/ui/Spinner';

interface ProblemListProps {
  problems: Problem[];
  isLoading: boolean;
  error: Error | null;
}

export function ProblemList({ problems, isLoading, error }: ProblemListProps) {
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

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((p) => (
        <ProblemCard key={p.id} problem={p} />
      ))}
    </div>
  );
}
