import { useState, useEffect } from 'react';
import { fetchSubmissions } from '@/api/submissions';

export function useSubmissions() {
  const [data, setData] = useState<{ data: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchSubmissions()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
