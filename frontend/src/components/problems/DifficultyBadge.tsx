const colors: Record<string, string> = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors[difficulty] || 'bg-gray-100 text-gray-800'}`}
    >
      {difficulty}
    </span>
  );
}
