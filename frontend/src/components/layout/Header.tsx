import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="glass-header z-50 sticky top-0">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-local-primary to-local-accent flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:scale-105 transition-transform">
            LC
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            LocalCode
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-local-border text-sm text-local-muted">
            <span className="w-2 h-2 rounded-full bg-local-accent animate-pulse"></span>
            CS50 Edition
          </div>
        </div>
      </div>
    </header>
  );
}
