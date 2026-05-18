import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
        <Link to="/" className="text-lg font-semibold text-gray-900 dark:text-white">
          mi-leet-code
        </Link>
      </div>
    </header>
  );
}
