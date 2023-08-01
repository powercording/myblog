'use client';

import { useState } from 'react';
import HeightControlTextArea from '../textArea/heightControlTextArea';
import MarkdownViewer from '../markdown/markdownViewer';

interface CommentBox {
  curretnUser: string;
}

export default function CommentBox({ curretnUser }: CommentBox) {
  const [content, setContent] = useState<string>('');

  const isLogedin = curretnUser !== '' && curretnUser !== null && curretnUser !== undefined;

  return (
    <section className="relative w-full">
      <div>
        <HeightControlTextArea setContent={setContent} writeAble={isLogedin} />
      </div>
      <details className="cursor-pointer" open>
        <summary> 댓글 미리보기 </summary>
        <MarkdownViewer markdown={content} />
      </details>
    </section>
  );
}
