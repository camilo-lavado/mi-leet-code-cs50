interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function SubmitButton({ onClick, isLoading }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? 'Running...' : 'Run Code'}
    </button>
  );
}
