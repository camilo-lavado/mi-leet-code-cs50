import { useState, useEffect } from 'react';
import { fetchSubmissions, fetchSubmissionsByProblem } from '@/api/submissions';

export function useSubmissions(problemId?: string) {
  const [data, setData] = useState<{ data: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetcher = problemId ? fetchSubmissionsByProblem(problemId) : fetchSubmissions();
    fetcher
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [problemId]);

  return { data, isLoading, error };
}
