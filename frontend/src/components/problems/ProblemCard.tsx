import { Link } from 'react-router-dom';
import type { Problem } from '@/types';
import { DifficultyBadge } from './DifficultyBadge';

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      to={`/problems/${problem.id}`}
      className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 dark:text-white">{problem.title}</h3>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      <p className="text-sm text-gray-500 mt-1">{problem.language}</p>
    </Link>
  );
}
