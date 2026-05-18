import type { SubmissionResult } from '@/types';

export function SubmissionResults({ result }: { result: SubmissionResult }) {
  const isAccepted = result.status === 'Accepted';

  return (
    <div className="flex flex-col h-full justify-center">
      <div className={`p-4 rounded-lg border flex flex-col gap-3 ${
        isAccepted
          ? 'border-green-500/30 bg-green-500/10'
          : 'border-red-500/30 bg-red-500/10'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-xl font-bold ${isAccepted ? 'text-green-400' : 'text-red-400'}`}>
            {result.status}
          </h3>
          <span className="text-2xl font-mono text-white/80">
            {result.passed}/{result.total}
          </span>
        </div>
        
        <div className="flex gap-4 text-sm font-mono text-local-muted mt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-white/50">⏱ Tiempo:</span>
            <span className="text-white">{result.timeMs} ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/50">💾 Memoria:</span>
            <span className="text-white">{result.memoryKb} KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
