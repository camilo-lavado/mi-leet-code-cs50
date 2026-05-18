import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
      <Link
        to="/"
        className="text-green-600 hover:text-green-700 dark:text-green-400 font-medium"
      >
        Back to problems
      </Link>
    </div>
  );
}
