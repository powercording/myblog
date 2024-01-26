'use client';

import React from 'react';
import Editor from '@/components/markdown/Editor';
import Preview from '@/components/markdown/Preview';
import { insertPost, deletePost, updatePost, Markdown } from '@/service/postService';
import categoriesList from '@/lib/asset/category';
import { useToast } from '@/context/useToast';

export default function AddPost() {
  const [doc, setDoc] = React.useState<string>('write something here');
  const [title, setTitle] = React.useState<string>('');
  const toast = useToast();

  const handleChange = React.useCallback((doc: string) => {
    setDoc(doc);
  }, []);

  // all of api should move to service
   const onInsert = async () => {
    const postInsertResult = await insertPost({ title, content: doc, categories: categoriesList[2]});
    if (!postInsertResult.ok || postInsertResult.status !== 200) {
      return toast.addToast(postInsertResult.error?.message || '다시 시도해 주세요.');
    }
    if (postInsertResult.ok === true) {
      window.location.href = `/post/${postInsertResult.data}`;
    }
  };

  const autoSave = () => {};

  return (
    <main className="h-auto pt-16">
      <input type="text" placeholder="제목을 입력하세요" onChange={(e) => setTitle(e.target.value)} value={title}/>
      <div className="max-w-screen flex min-h-screen">
        <Editor onChange={handleChange} initialDoc={doc} />
        <Preview doc={doc} />
      </div>
      <button onClick={onInsert}>게시글 작성하기</button>
    </main>
  );
}
