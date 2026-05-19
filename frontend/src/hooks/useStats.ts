import { useState, useEffect, useCallback } from 'react';
import { api } from '@/api/client';

export interface Badge {
  week: number;
  title: string;
  completed: boolean;
}

export interface UserStats {
  streak: number;
  total_submissions: number;
  accepted_submissions: number;
  badges: Badge[];
}

export function useStats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshStats = useCallback(() => {
    setIsLoading(true);
    setError(null);
    return api.get('/stats')
      .then((res: any) => {
        setStats(res.data);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, isLoading, error, refreshStats };
}
