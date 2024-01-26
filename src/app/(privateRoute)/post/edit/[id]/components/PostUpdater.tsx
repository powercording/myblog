'use client';

import React from 'react';
import Editor from '@/components/markdown/Editor';
import Preview from '@/components/markdown/Preview';
import { UpdateMarkdown, deletePost, updatePost } from '@/service/postService';
import { useToast } from '@/context/useToast';

type PostUpdaterProps = {
  post: UpdateMarkdown;
};

export default function PostUpdater({ post }: PostUpdaterProps) {
  const { content, title, ...rest } = post;
  const [doc, setDoc] = React.useState<string>(content);
  const toast = useToast();

  const handleChange = React.useCallback((doc: string) => {
    setDoc(doc);
  }, []);

  const handleMarkdownUpdate = async () => {
    const newTitle = document.querySelector('[data-id="code-submit-title"]').innerHTML;
    const updateResult = await updatePost({ ...post, content: doc, title: newTitle });

    if (!updateResult.ok || updateResult.status !== 200) {
      return toast.addToast(updateResult.error?.message || '다시 시도해 주세요.');
    }

    if (updateResult.ok) {
      window.location.href = `/post/${updateResult.data}`;
    }
  };

  const handleMarkdownDelete = async () => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) return;

    const deleteResult = await deletePost(rest.id as number);
    if (!deleteResult.ok) {
      return toast.addToast(deleteResult.error.message || '다시 시도해 주세요.');
    }

    if (deleteResult.ok) {
      window.location.href = '/';
    }
  };

  return (
    <main className="h-auto pt-16">
      <h1
        id="code-submit-title"
        data-id="code-submit-title"
        autoFocus
        contentEditable
        data-placeholder="Please enter a title"
        className="h-auto max-w-full cursor-text px-4 text-3xl before:empty:text-3xl before:empty:text-gray-500 before:empty:content-[attr(data-placeholder)] focus:outline-none"
      >
        {title}
      </h1>
      <div className="max-w-screen flex min-h-screen">
        <Editor onChange={handleChange} initialDoc={doc} />
        <Preview doc={doc} editable/>
      </div>
      <section className="flex justify-end">
        <button
          onClick={handleMarkdownUpdate}
          className="m-3 rounded-sm border border-green-300 border-opacity-50 px-3 py-2 text-gray-500 hover:border-opacity-100 hover:text-white"
        >
          수정 하기
        </button>
        <button
          onClick={handleMarkdownDelete}
          className="m-3 rounded-sm border border-green-300 border-opacity-50 px-3 py-2 text-gray-500 hover:border-opacity-100 hover:text-white"
        >
          삭제 하기
        </button>
      </section>
    </main>
  );
}
