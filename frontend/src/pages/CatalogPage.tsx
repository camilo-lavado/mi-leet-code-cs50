import { useProblems } from '@/hooks/useProblems';
import { ProblemList } from '@/components/problems/ProblemList';

export function CatalogPage() {
  const { data, isLoading, error } = useProblems();
  const problems = data?.data ?? [];

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
        
        <ProblemList problems={problems} isLoading={isLoading} error={error as Error | null} />
      </div>
    </div>
  );
}
