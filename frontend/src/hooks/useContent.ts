import { useState, useEffect } from 'react';
import { api } from '@/api/client';

export interface WeekContent {
  week: number;
  lectura: string;
  complemento: string;
  glosario: string;
}

export function useContent(week: number) {
  const [content, setContent] = useState<WeekContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api.get(`/content/${week}`)
      .then((res: any) => {
        setContent(res.data);
      })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [week]);

  return { content, isLoading, error };
}
