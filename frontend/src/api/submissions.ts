import { api } from './client';
import type { SubmissionRequest, SubmissionResult } from '@/types';

export function submitCode(body: SubmissionRequest): Promise<SubmissionResult> {
  return api.post('/submissions', body);
}

export function fetchSubmissions(): Promise<{ data: any[] }> {
  return api.get('/submissions');
}

export function fetchSubmissionsByProblem(problemId: string): Promise<{ data: any[] }> {
  return api.get(`/submissions?problem_id=${problemId}`);
}

export function fetchHints(problemId: string): Promise<{ data: any[] }> {
  return api.get(`/problems/${problemId}/hints`);
}
