export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: string;
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
  submission_id: string;
  status: 'Accepted' | 'Wrong Answer' | 'Error';
  passed_tests: number;
  total_tests: number;
  metrics: {
    time_ms: number;
    memory_kb: number;
  };
}
