'use client';

import React, { useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkReact from 'remark-react';
import RemarkCode from './remark-code';
import RemarkLink from './remark-link';
import { defaultSchema } from 'hast-util-sanitize';
import 'github-markdown-css/github-markdown.css';
import { twMerge } from 'tailwind-merge';
import { initHighlighting } from '@/lib/util/pre-highlighter';

type Props = {
  doc: string;
  editable?: boolean;
};

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
  },
};

export default function Preview(props: Props) {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact as any, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: { code: RemarkCode, a: RemarkLink },
    })
    .processSync(props.doc).result as string; // type unknown. why?

  useEffect(() => {
    initHighlighting();
  }, [props.doc]);

  return (
    <>
      <div
        className={twMerge(
          'prose w-full prose-headings:pb-4 prose-h1:border-b prose-h1:text-[#abb2bf] prose-h2:border-b',
          'prose-h2:text-[#abb2bf] prose-h3:text-[#abb2bf] prose-blockquote:text-center prose-blockquote:text-white',
          'prose-a:text-sky-500 prose-strong:text-white prose-th:text-green-500',
          'max-w-[100%] overflow-auto break-words bg-transparent p-3 text-[#abb2bf]',
          props.editable ? 'max-h-[100dvh]' : '',
        )}
      >
        {md}
      </div>
    </>
  );
}
