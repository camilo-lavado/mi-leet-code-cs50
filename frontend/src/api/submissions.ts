import { api } from './client';
import type { SubmissionRequest, SubmissionResult } from '@/types';

export function submitCode(body: SubmissionRequest): Promise<SubmissionResult> {
  return api.post('/submissions', body);
}
