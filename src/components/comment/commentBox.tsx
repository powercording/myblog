'use client';

import { useState } from 'react';
import HeightControlTextArea from '../textArea/heightControlTextArea';
import MarkdownViewer from '../markdown/markdownViewer';

export default function CommentBox() {
  const [content, setContent] = useState<string>('');

  return (
    <section className="relative w-full">
      <div>
        <HeightControlTextArea setContent={setContent} />
      </div>
      <details className="cursor-pointer" open>
        <summary> 댓글 미리보기 </summary>
        <MarkdownViewer markdown={content} />
      </details>
    </section>
  );
}
