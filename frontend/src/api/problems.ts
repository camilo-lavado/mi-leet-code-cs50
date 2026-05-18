import { api } from './client';
import type { Problem, ProblemDetail } from '@/types';

export function fetchProblems(): Promise<{ data: Problem[] }> {
  return api.get('/problems');
}

export function fetchProblem(id: string): Promise<ProblemDetail> {
  return api.get(`/problems/${id}`);
}
