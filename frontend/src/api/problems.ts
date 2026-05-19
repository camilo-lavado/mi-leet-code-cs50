import { api } from './client';
import type { Problem, ProblemDetail } from '@/types';

export function fetchProblems(week?: number, difficulty?: string): Promise<{ data: Problem[] }> {
  let endpoint = '/problems';
  const params = new URLSearchParams();
  if (week !== undefined && week > 0) params.set('week', String(week));
  if (difficulty && difficulty !== 'all') params.set('difficulty', difficulty);
  const qs = params.toString();
  if (qs) endpoint += '?' + qs;
  return api.get(endpoint);
}

export function fetchProblem(id: string): Promise<ProblemDetail> {
  return api.get(`/problems/${id}`);
}
