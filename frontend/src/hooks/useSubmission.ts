import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitCode } from '@/api/submissions';
import type { SubmissionRequest, SubmissionResult } from '@/types';

export function useSubmitCode() {
  const queryClient = useQueryClient();

  return useMutation<SubmissionResult, Error, SubmissionRequest>({
    mutationFn: submitCode,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['submissions', variables.problem_id],
      });
    },
  });
}
