import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  return (
    <div className={`prose prose-invert prose-p:text-local-text prose-headings:text-white prose-a:text-local-primary hover:prose-a:text-local-primary-hover prose-code:text-local-accent prose-code:bg-local-panel prose-code:px-1 prose-code:rounded prose-pre:bg-local-panel prose-pre:border prose-pre:border-local-border max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
