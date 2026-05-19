import { useState } from 'react';
import { useProblems } from '@/hooks/useProblems';
import { useSubmissions } from '@/hooks/useSubmissions';
import { ProblemList } from '@/components/problems/ProblemList';
import { GamificationStats } from '@/components/dashboard/GamificationStats';
import { useProgress } from '@/hooks/useProgress';

export function CatalogPage() {
  const [weekFilter, setWeekFilter] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const { data: problemsData, isLoading: problemsLoading, error: problemsError } = useProblems(weekFilter, difficultyFilter);
  const { data: submissionsData, isLoading: submissionsLoading, error: submissionsError } = useSubmissions();
  const { data: progressData } = useProgress();
  
  const problems = problemsData?.data ?? [];
  const submissions = submissionsData?.data ?? [];

  const isLoading = problemsLoading || submissionsLoading;
  const error = problemsError || submissionsError;

  return (
    <div className="relative min-h-full overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-local-primary/20 to-transparent pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">
            Explora los Problemas
          </h1>
          <p className="text-lg text-local-muted max-w-2xl mx-auto">
            Domina la programación resolviendo los retos oficiales de CS50. Desde C hasta Python, todo evaluado en tiempo real de forma segura.
          </p>
        </div>

        <div className="glass-panel p-4 mb-8 flex flex-wrap items-center gap-4 bg-local-panel/40 border border-white/5">
          <div className="flex items-center gap-3">
            <label htmlFor="week-filter" className="text-sm font-medium text-local-muted">Semana</label>
            <select
              id="week-filter"
              value={weekFilter}
              onChange={(e) => setWeekFilter(Number(e.target.value))}
              className="bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-local-text focus:outline-none focus:border-local-primary cursor-pointer"
            >
              <option value={0}>Todas las semanas</option>
              <option value={1}>Semana 1</option>
              <option value={2}>Semana 2</option>
              <option value={3}>Semana 3</option>
              <option value={4}>Semana 4</option>
              <option value={5}>Semana 5</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="difficulty-filter" className="text-sm font-medium text-local-muted">Dificultad</label>
            <select
              id="difficulty-filter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-black/30 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-local-text focus:outline-none focus:border-local-primary cursor-pointer"
            >
              <option value="all">Todas las dificultades</option>
              <option value="Easy">Fácil</option>
              <option value="Medium">Media</option>
              <option value="Hard">Difícil</option>
            </select>
          </div>
        </div>

        <GamificationStats />

        {progressData && (
          <div className="glass-panel p-4 mb-8 bg-local-panel/40 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-local-muted uppercase tracking-wider">
                Progreso General
              </span>
              <span className="text-sm text-local-muted">
                {progressData.summary.solved} / {progressData.summary.total} resueltos
              </span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-local-primary to-local-accent rounded-full transition-all duration-500"
                style={{ width: `${progressData.summary.total > 0 ? (progressData.summary.solved / progressData.summary.total) * 100 : 0}%` }}
              />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-local-muted">
              <span>✅ {progressData.summary.solved} resueltos</span>
              <span>🔄 {progressData.summary.in_progress} en progreso</span>
              <span>⬜ {progressData.summary.not_attempted} sin intentar</span>
            </div>
          </div>
        )}
        
        <ProblemList problems={problems} submissions={submissions} isLoading={isLoading} error={error as Error | null} />
      </div>
    </div>
  );
}
