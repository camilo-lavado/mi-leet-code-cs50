import { useQuery } from '@tanstack/react-query';
import { fetchProblems, fetchProblem } from '@/api/problems';

export function useProblems(week?: number, difficulty?: string) {
  return useQuery({
    queryKey: ['problems', { week, difficulty }],
    queryFn: () => fetchProblems(week, difficulty),
  });
}

export function useProblem(id: string) {
  return useQuery({
    queryKey: ['problem', id],
    queryFn: () => fetchProblem(id),
    enabled: !!id,
  });
}
