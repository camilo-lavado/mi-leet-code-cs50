import { useQuery } from '@tanstack/react-query';
import { fetchProblems, fetchProblem } from '@/api/problems';

export function useProblems() {
  return useQuery({
    queryKey: ['problems'],
    queryFn: fetchProblems,
  });
}

export function useProblem(id: string) {
  return useQuery({
    queryKey: ['problem', id],
    queryFn: () => fetchProblem(id),
    enabled: !!id,
  });
}
