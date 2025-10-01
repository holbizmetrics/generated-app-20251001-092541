import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
interface CodeBlockProps {
  language: string;
  value: string;
}
export const CodeBlock: React.FC<CodeBlockProps> = React.memo(({ language, value }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    });
  };
  return (
    <div className="relative my-2 rounded-lg bg-[#1e1e1e] font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/10">
        <span className="text-xs text-gray-400">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-400 hover:bg-white/10 hover:text-white"
          onClick={copyToClipboard}
        >
          {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
      >
        {String(value).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
});