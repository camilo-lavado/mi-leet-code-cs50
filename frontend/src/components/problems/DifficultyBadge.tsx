const colors: Record<string, string> = {
  Fácil: 'border-green-500/30 text-green-400 bg-green-500/10',
  Medio: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
  Difícil: 'border-red-500/30 text-red-400 bg-red-500/10',
  Easy: 'border-green-500/30 text-green-400 bg-green-500/10',
  Medium: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
  Hard: 'border-red-500/30 text-red-400 bg-red-500/10',
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${colors[difficulty] || 'border-gray-500/30 text-gray-400 bg-gray-500/10'}`}
    >
      {difficulty}
    </span>
  );
}
