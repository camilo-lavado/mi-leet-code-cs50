import { useState, useEffect } from 'react';
import { fetchHints } from '@/api/submissions';

export interface Hint {
  id: string;
  problem_id: string;
  order_index: number;
  question: string;
}

export function useHints(problemId: string) {
  const [hints, setHints] = useState<Hint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!problemId) return;
    setIsLoading(true);
    fetchHints(problemId)
      .then((res) => setHints(res.data ?? []))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [problemId]);

  return { hints, isLoading, error };
}
