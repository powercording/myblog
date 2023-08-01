'use client';

import { useState } from 'react';
import MarkdownViewer from './markdownViewer';
import MarkdownEditor from './markdownEditor';
import { InferModel } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import { BsPencil } from 'react-icons/bs';
import { insertPost, deletePost, updatePost, Markdown } from '@/service/postService';
import categoriesList from '@/lib/asset/category';

type MarkdownSet = {
  renderType: 'edit' | 'create';
  markdown?: InferModel<typeof post>;
};

// const emptyMarkdown: InferModel<typeof post> = {

export default function MarkdownSet({ markdown, renderType }: MarkdownSet) {
  const [markdownPost, setMarkdownPost] = useState<Markdown>({
    title: markdown?.title ?? '',
    content: markdown?.content ?? '',
    categories: markdown?.categories ?? '',
  });

  const handleMarkdownRegister = async () => {
    if (!markdownPost.content.trim() || !markdownPost.title.trim()) {
      return alert('제목과 내용을 입력해주세요');
    }

    const postInsertConfirm = confirm('작성하시겠습니까?');
    if (!postInsertConfirm) {
      return null;
    }

    const postInsertResult = await insertPost(markdownPost);
    if (!postInsertResult.ok || postInsertResult.status !== 200) {
      return alert(postInsertResult.error?.message);
    }
    if (postInsertResult.ok === true) {
      window.location.href = `/post/${postInsertResult.data}`;
    }
  };

  const handleMarkdownUpdate = async () => {
    if (!markdownPost.content.trim() || !markdownPost.title.trim()) {
      return alert('제목과 내용을 입력해주세요');
    }

    const postUpdataConfirm = confirm('작성하시겠습니까?');
    if (!postUpdataConfirm) {
      return null;
    }

    const updateResult = await updatePost({ ...markdown!, ...markdownPost });

    if (!updateResult.ok || updateResult.status !== 200) {
      return alert(updateResult.error?.message);
    }

    if (updateResult.ok) {
      window.location.href = `/post/${updateResult.data}`;
    }
  };

  const hnadleMarkdownDelete = async () => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) return;

    const deleteResult = await deletePost(markdown?.id as number);

    if (!deleteResult.ok) {
      return alert(deleteResult.error.message);
    }

    if (deleteResult.ok) {
      window.location.href = '/';
    }
  };

  const handleMarkdownAutosave = () => {};

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setMarkdownPost({ ...markdownPost, categories: selectedCategory });
  };

  const buttonOneCallback = renderType === 'create' ? handleMarkdownRegister : handleMarkdownUpdate;
  const buttonTwoText = renderType === 'create' ? '임시' : '삭제';
  const buttonTwoCallback = renderType === 'create' ? handleMarkdownAutosave : hnadleMarkdownDelete;

  return (
    <main>
      <section className="mt-24 min-h-fit w-full">
        <div className="mx-auto flex w-full items-center px-5 2xl:w-3/4">
          <input
            className="block w-full bg-transparent p-3 text-2xl text-gray-200 focus:outline-none"
            placeholder="제목"
            type="text"
            value={markdownPost.title ?? ''}
            onChange={e => setMarkdownPost({ ...markdownPost, title: e.target.value })}
          />
          <div className="absolute right-5 top-16 flex items-center gap-2">
            <button
              className="h-9 w-fit rounded-md bg-white p-2 text-blue-700 hover:bg-blue-100"
              onClick={buttonOneCallback}
            >
              <BsPencil />
            </button>
            <button
              className="h-9 w-fit rounded-md bg-white p-2 text-blue-700 hover:bg-blue-100"
              onClick={buttonTwoCallback}
            >
              {buttonTwoText}
            </button>
          </div>
        </div>
        <section className="mx-auto flex w-full px-5 py-2 text-gray-400 2xl:w-3/4">
          <div className="relative">
            <select
              className="cursor-pointer rounded-md border border-slate-300 bg-slate-300 pl-6 pr-16 text-black focus:outline-none"
              onChange={handleCategoryChange}
              value={markdownPost.categories ?? ''}
            >
              {categoriesList.sort().map(category => (
                <option key={category} value={category === '-' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="dropdown-span pointer-events-none absolute right-0 h-full w-8 rounded-r-md border-none bg-gray-500"></span>
          </div>
          <div className="top-36 flex items-center gap-2 px-2 md:static">
            {markdownPost.categories && (
              <span
                className="h-fit w-fit cursor-pointer px-2 font-semibold text-white"
                key={markdownPost.categories}
                onClick={() => setMarkdownPost({ ...markdownPost, categories: '' })}
              >
                {markdownPost.categories}
              </span>
            )}
          </div>
        </section>
      </section>
      <section className="relative mx-auto mb-8 mt-4 grid h-auto min-h-screen w-full border lg:grid-cols-2 2xl:w-3/4">
        <MarkdownEditor markdown={markdownPost.content} setMarkdown={setMarkdownPost} />
        <MarkdownViewer markdown={markdownPost.content} />
      </section>
    </main>
  );
}
