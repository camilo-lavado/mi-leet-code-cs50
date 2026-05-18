import type { SubmissionResult } from '@/types';

export function SubmissionResults({ result }: { result: SubmissionResult }) {
  const isAccepted = result.status === 'Accepted';

  return (
    <div
      className={`mt-4 p-4 rounded-lg border ${
        isAccepted
          ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700'
          : 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700'
      }`}
    >
      <h3
        className={`text-lg font-semibold ${
          isAccepted
            ? 'text-green-700 dark:text-green-300'
            : 'text-red-700 dark:text-red-300'
        }`}
      >
        {result.status}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Passed {result.passed_tests} / {result.total_tests} test cases
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Time: {result.metrics.time_ms}ms | Memory: {result.metrics.memory_kb}KB
      </p>
    </div>
  );
}
