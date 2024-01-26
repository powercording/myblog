'use client';

import React from 'react';
import Editor from '@/components/markdown/Editor'; 
import Preview from '@/components/markdown/Preview'; 
import { UpdateMarkdown, deletePost, updatePost } from '@/service/postService';
import { useToast } from '@/context/useToast';

type PostUpdaterProps = { 
  post: UpdateMarkdown;
}

export default function PostUpdater({ post } : PostUpdaterProps) {
  const {content, title, ...rest} = post;
  const [doc, setDoc] = React.useState<string>(content);
  const toast = useToast();

  const handleChange = React.useCallback((doc: string) => {
    setDoc(doc);
  }, []);

   const handleMarkdownUpdate = async () => {
    const updateResult = await updatePost({ ...post, content, title });

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
  }


  return (
    <main className="h-screen pt-16">
      <div className="max-w-screen flex h-full">
        <Editor onChange={handleChange} initialDoc={doc} />
        <Preview doc={doc} />
      </div>
    </main>
  );
}
