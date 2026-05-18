import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
}

const languageMap: Record<string, string> = {
  c: 'c',
  python: 'python',
};

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Editor
        height="100%"
        width="100%"
        language={languageMap[language] || language}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          roundedSelection: false,
        }}
      />
    </div>
  );
}
