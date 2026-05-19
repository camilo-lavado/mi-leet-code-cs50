import { useStats } from '@/hooks/useStats';

export function GamificationStats() {
  const { stats, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className="glass-panel p-6 flex items-center justify-between animate-pulse">
        <div className="h-6 w-32 bg-white/10 rounded" />
        <div className="h-6 w-48 bg-white/10 rounded" />
      </div>
    );
  }

  if (error || !stats) return null;

  const sortedBadges = [...stats.badges].sort((a, b) => a.week - b.week);

  return (
    <div className="glass-panel p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-local-panel/80 via-local-panel/90 to-local-primary/5 border border-white/5 hover:border-local-primary/20 transition-all duration-300">
      {/* Left: Streak & Submissions Stats */}
      <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
        {/* Streak */}
        <div className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl px-4 py-3 min-w-[140px] hover:bg-white/5 transition-all">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400">
            <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>🔥</span>
            {stats.streak > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="text-xs text-local-muted font-medium">Racha Diaria</div>
            <div className="text-xl font-bold text-white flex items-baseline gap-1">
              {stats.streak} <span className="text-xs text-local-muted font-normal">{stats.streak === 1 ? 'día' : 'días'}</span>
            </div>
          </div>
        </div>

        {/* Submissions Stats */}
        <div className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl px-4 py-3 min-w-[180px] hover:bg-white/5 transition-all">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-local-accent/10 text-local-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <div className="text-xs text-local-muted font-medium">Retos Completados</div>
            <div className="text-xl font-bold text-white">
              {stats.accepted_submissions}{' '}
              <span className="text-xs text-local-muted font-normal">de {stats.total_submissions} envíos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Badges Shelf */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2">
        <span className="text-xs font-semibold text-local-muted uppercase tracking-wider">Tus Medallas</span>
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          {sortedBadges.map((badge) => (
            <div
              key={badge.week}
              className={`relative flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 group cursor-help ${
                badge.completed
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:scale-105'
                  : 'bg-white/3 border-white/5 text-local-muted/40 filter grayscale'
              }`}
              title={
                badge.completed
                  ? `¡Completaste todos los problemas de la Semana ${badge.week}! Medalla desbloqueada.`
                  : `Completa todos los problemas de la Semana ${badge.week} para ganar esta medalla.`
              }
            >
              {/* Badge Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={badge.completed ? 'animate-pulse' : ''} style={{ animationDuration: '3s' }}>
                <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block z-20 w-48 p-2 text-xs font-normal text-white bg-slate-900 border border-local-border rounded-lg shadow-xl text-center pointer-events-none">
                <p className="font-bold text-yellow-400">{badge.title}</p>
                <p className="text-[10px] text-local-muted mt-0.5">
                  {badge.completed ? '🏆 Desbloqueado' : '🔒 Pendiente'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
