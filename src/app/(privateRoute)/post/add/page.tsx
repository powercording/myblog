'use client';

import React from 'react';
import Editor from '@/components/markdown/Editor';
import Preview from '@/components/markdown/Preview';
import { insertPost } from '@/service/postService';
import categoriesList from '@/lib/asset/category';
import { useToast } from '@/context/useToast';

export default function AddPost() {
  const [doc, setDoc] = React.useState<string>('write something here');
  const toast = useToast();

  const handleChange = React.useCallback((doc: string) => {
    setDoc(doc);
  }, []);

  // all of api should move to service
  const onInsert = async () => {
    const postInsertResult = await insertPost({
      title: document.querySelector('[data-id="code-submit-title"]').innerHTML,
      content: doc,
      categories: categoriesList[2],
    });
    if (!postInsertResult.ok || postInsertResult.status !== 200) {
      return toast.addToast(postInsertResult.error?.message || '다시 시도해 주세요.');
    }
    if (postInsertResult.ok === true) {
      window.location.href = `/post/${postInsertResult.data}`;
    }
  };

  const autoSave = () => {};

  return (
    <main className="h-auto w-full px-4 pt-16">
      <h1
        id="code-submit-title"
        data-id="code-submit-title"
        autoFocus
        contentEditable
        data-placeholder="Please enter a title"
        className="h-auto max-w-full cursor-text px-4 text-3xl before:empty:text-3xl before:empty:text-gray-500 before:empty:content-[attr(data-placeholder)] focus:outline-none"
      />
      <div className="max-w-screen flex min-h-screen">
        <Editor onChange={handleChange} initialDoc={doc} />
        <Preview doc={doc} editable />
      </div>
      <section className="flex justify-end">
        <button
          onClick={onInsert}
          className="m-3 ml-auto rounded-sm border border-green-300 border-opacity-50 px-3 py-2 text-sm text-gray-500 hover:border-opacity-100 hover:text-white"
        >
          게시글 작성하기
        </button>
      </section>
    </main>
  );
}
