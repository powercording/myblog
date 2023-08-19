'use client';

import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function MarkdownHighlighter({ children, lang, ...props }: CodeProps) {
  return (
    <SyntaxHighlighter
      {...props}
      style={vscDarkPlus}
      language={lang}
      PreTag="pre"
      customStyle={{ margin: 0 }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}
