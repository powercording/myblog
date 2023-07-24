'use client';

import { useState } from 'react';
import MarkdownViewer from './markdownViewer';
import MarkdownEditor from './markdownEditor';
import { InferModel } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import { BsPencil } from 'react-icons/bs';
import { insertPost, deletePost, updatePost, Markdown } from '@/service/postService';

type MarkdownSet = {
  renderType: 'edit' | 'create';
  markdown?: InferModel<typeof post>;
};

// const emptyMarkdown: InferModel<typeof post> = {

const categoriesList = ['-', 'javascript', 'typescript', 'react', 'nextjs', 'spring', 'kotlin'];

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

    if (!deleteResult.ok || deleteResult.status !== 200) {
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
        <div className="px-5 w-full 2xl:w-3/4 mx-auto flex items-center">
          <input
            className="block p-3 text-2xl text-gray-200 focus:outline-none bg-transparent w-full"
            placeholder="제목"
            type="text"
            value={markdownPost.title ?? ''}
            onChange={e => setMarkdownPost({ ...markdownPost, title: e.target.value })}
          />
          <div className="absolute right-5 top-16 flex items-center gap-2">
            <button
              className="p-2 rounded-md hover:bg-blue-100 bg-white text-blue-700 w-fit h-9"
              onClick={buttonOneCallback}
            >
              <BsPencil />
            </button>
            <button
              className="p-2 rounded-md hover:bg-blue-100 bg-white text-blue-700 w-fit h-9"
              onClick={buttonTwoCallback}
            >
              {buttonTwoText}
            </button>
          </div>
        </div>
        <section className="w-full 2xl:w-3/4 mx-auto py-2 flex text-gray-400 px-5">
          <div className="relative">
            <select
              className="rounded-md pl-6 pr-16 border border-slate-300 bg-slate-300 focus:outline-none cursor-pointer text-black"
              onChange={handleCategoryChange}
              value={markdownPost.categories ?? ''}
            >
              {categoriesList.sort().map(category => (
                <option key={category} value={category === '-' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="absolute w-8 h-full bg-gray-500 right-0 rounded-r-md border-none pointer-events-none dropdown-span"></span>
          </div>
          <div className="px-2 flex gap-2 items-center top-36 md:static">
            {markdownPost.categories && (
              <span
                className="h-fit w-fit px-2 text-white font-semibold cursor-pointer"
                key={markdownPost.categories}
                onClick={() => setMarkdownPost({ ...markdownPost, categories: '' })}
              >
                {markdownPost.categories}
              </span>
            )}
          </div>
        </section>
      </section>
      <section className="grid lg:grid-cols-2 min-h-screen h-auto w-full 2xl:w-3/4 mx-auto mt-4 mb-8 relative border">
        <MarkdownEditor markdown={markdownPost.content} setMarkdown={setMarkdownPost} />
        <MarkdownViewer markdown={markdownPost.content} />
      </section>
    </main>
  );
}
