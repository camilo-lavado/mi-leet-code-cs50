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
      className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang === 'c' ? 'C' : 'Python'}
        </option>
      ))}
    </select>
  );
}
