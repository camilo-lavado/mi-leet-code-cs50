import { Link } from 'react-router-dom';
import type { Problem } from '@/types';
import { DifficultyBadge } from './DifficultyBadge';

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      to={`/problems/${problem.id}`}
      className="block p-6 glass-panel group hover:border-local-primary/50 transition-all hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-local-primary/0 to-local-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-local-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-local-accent"></span>
            Semana {problem.week}
          </span>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-local-primary transition-colors">
          {problem.title}
        </h3>
        <p className="text-sm text-local-muted mt-auto">
          Lenguaje: <span className="text-gray-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">{problem.language}</span>
        </p>
      </div>
    </Link>
  );
}
