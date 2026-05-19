export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
  week?: number;
}

export interface TestCase {
  id: string;
  input_data: string | null;
  expected_output?: string;
  is_hidden: boolean;
}

export interface ProblemDetail extends Problem {
  description: string;
  test_cases: TestCase[];
}

export interface SubmissionRequest {
  problem_id: string;
  language: string;
  code: string;
}

export interface SubmissionResult {
  submissionId: string;
  status: string;
  passed: number;
  total: number;
  timeMs: number;
  memoryKb: number;
}
