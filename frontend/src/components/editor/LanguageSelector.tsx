interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
  availableLanguages?: string[];
}

const LANGUAGES = ['c', 'python'];

export function LanguageSelector({
  value,
  onChange,
  availableLanguages,
}: LanguageSelectorProps) {
  const languages = availableLanguages ?? LANGUAGES;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 bg-black/40 border border-local-border rounded-lg text-sm text-white focus:outline-none focus:border-local-primary transition-colors appearance-none outline-none cursor-pointer pr-8"
      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
    >
      {languages.map((lang) => (
        <option key={lang} value={lang} className="bg-local-panel text-white">
          {lang === 'c' ? 'C' : 'Python 3'}
        </option>
      ))}
    </select>
  );
}
