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
    <div className="border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
      <Editor
        height="400px"
        language={languageMap[language] || language}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
