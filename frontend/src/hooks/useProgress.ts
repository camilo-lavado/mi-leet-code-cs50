import { useState, useEffect } from 'react';
import { api } from '@/api/client';

export interface ProgressSummary {
  progress: Array<{
    problem_id: string;
    status: string;
    last_attempt_at: string | null;
  }>;
  summary: {
    total: number;
    solved: number;
    in_progress: number;
    not_attempted: number;
  };
}

export function useProgress() {
  const [data, setData] = useState<ProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api.get('/progress')
      .then((res: any) => setData(res.data))
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}
