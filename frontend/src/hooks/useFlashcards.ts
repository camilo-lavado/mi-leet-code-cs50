import { useState, useEffect } from 'react';
import type { Flashcard } from '@/components/ui/FlashcardModal';
import { api } from '@/api/client';

export function useFlashcards(week: number | null) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (week === null) return;
    setIsLoading(true);
    setFlashcards([]);
    setError(null);
    api.get(`/weeks/${week}/flashcards`)
      .then((res: any) => setFlashcards(res.data ?? []))
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  }, [week]);

  return { flashcards, isLoading, error };
}
