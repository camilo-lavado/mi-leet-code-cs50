import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '@/hooks/useContent';
import { MarkdownViewer } from '@/components/ui/MarkdownViewer';
import { Spinner } from '@/components/ui/Spinner';

type TabType = 'lectura' | 'complemento' | 'glosario';

export function TheoryPage() {
  const { weekStr } = useParams<{ weekStr: string }>();
  const week = Number(weekStr ?? '1');
  const { content, isLoading, error } = useContent(week);
  const [activeTab, setActiveTab] = useState<TabType>('lectura');

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-local-bg">
        <Spinner />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-local-bg text-center px-4">
        <div className="text-red-400 text-lg font-semibold mb-4">No se pudo cargar la teoría para la Semana {week}</div>
        <Link to="/" className="btn-secondary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'lectura', label: 'Clase Magistral', icon: '📖' },
    { id: 'complemento', label: 'Material Complementario', icon: '💡' },
    { id: 'glosario', label: 'Glosario de Términos', icon: '📚' }
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'lectura':
        return content.lectura || 'No hay contenido disponible para la clase magistral.';
      case 'complemento':
        return content.complemento || 'No hay material complementario disponible para esta semana.';
      case 'glosario':
        return content.glosario || 'No hay glosario disponible para esta semana.';
      default:
        return '';
    }
  };

  return (
    <div className="relative h-full bg-local-bg pb-20 overflow-y-auto">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-local-primary/10 to-transparent pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-local-muted hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a Problemas
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-local-primary/20 text-local-primary text-sm font-bold">
              {week}
            </span>
            <span className="text-xs uppercase font-semibold text-local-muted tracking-wider">Teoría en Español</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Semana {week}: Fundamentos e Introducción
          </h1>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-local-border gap-2 mb-8 overflow-x-auto pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-local-primary text-white bg-local-primary/5'
                  : 'border-transparent text-local-muted hover:text-white hover:bg-white/3'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Markdown Content Area */}
        <div className="glass-panel p-8 bg-local-panel/40 border border-white/5 shadow-2xl animate-fadeIn">
          <MarkdownViewer content={getActiveContent()} />
        </div>
      </div>
    </div>
  );
}
