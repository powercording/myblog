'use client';

import { useState } from 'react';
import HeightControlTextArea from '../textArea/heightControlTextArea';
import Preview from '../markdown/Preview';

interface CommentBox {
  currentUser: string;
}

export default function CommentBox({ currentUser }: CommentBox) {
  const [content, setContent] = useState<string>('');

  const isLoggedIn = currentUser !== '' && currentUser !== null && currentUser !== undefined;

  return (
    <section className="relative w-full">
      <div>
        <HeightControlTextArea setContent={setContent} writeAble={isLoggedIn} />
      </div>
      <details className="cursor-pointer" open>
        <summary> 댓글 미리보기 </summary>
        <Preview doc={content} />
      </details>
    </section>
  );
}
