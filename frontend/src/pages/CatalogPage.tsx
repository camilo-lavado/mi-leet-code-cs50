import { useProblems } from '@/hooks/useProblems';
import { ProblemList } from '@/components/problems/ProblemList';

export function CatalogPage() {
  const { data, isLoading, error } = useProblems();
  const problems = data?.data ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Problems</h1>
      <ProblemList problems={problems} isLoading={isLoading} error={error as Error | null} />
    </div>
  );
}
