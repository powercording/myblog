'use client';

import { useState } from 'react';
import MarkdownViewer from './markdownViewer';
import MarkdownEditor from './markdownEditor';
import { InferModel } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';
import postService from '@/app/service/PostService';
import { getSession } from 'next-auth/react';
import { BsPencil } from 'react-icons/bs';
import { insertPost } from '@/service/postService';

type MarkdownSet = {
  renderType: 'edit' | 'create';
  markdown?: InferModel<typeof post>;
};

// const emptyMarkdown: InferModel<typeof post> = {
const emptyMarkdown: any = {
  id: 0,
  content: '',
  title: '',
  userName: '',
  createdAt: '',
  categories: '',
};

const categoriesList = ['-', 'javascript', 'typescript', 'react', 'nextjs', 'spring', 'kotlin'];

export default function MarkdownSet({ markdown = emptyMarkdown, renderType }: MarkdownSet) {
  const [markdownContent, setMarkdownContent] = useState(markdown?.content ?? '');
  const [markdonwTitle, setMarkdownTitle] = useState(markdown?.title ?? '');
  const [categories, setCategory] = useState<string>(markdown?.categories ?? '');
  const {} = getSession();

  const handleMarkdownRegister = async () => {
    if (!markdownContent || !markdonwTitle) {
      return alert('제목과 내용을 입력해주세요');
    }

    const postInsertConfirm = confirm('작성하시겠습니까?');
    if (!postInsertConfirm) {
      return null;
    }

    await insertPost({
      content: markdownContent,
      title: markdonwTitle,
      categories: categories === '' ? null : categories,
    });
  };

  const handleMarkdownUpdate = async () => {
    await postService.updateMarkdown({
      ...markdown,
      content: markdownContent,
      title: markdonwTitle,
      categories: categories === '' ? null : categories,
    });
  };

  const hnadleMarkdownDelete = async () => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) return;
    await postService.deleteMarkdown(markdown.id);
  };

  const handleMarkdownAutosave = () => {};

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
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
            value={markdonwTitle ?? ''}
            onChange={e => setMarkdownTitle(e.target.value)}
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
              value={categories ?? ''}
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
            {categories && (
              <span
                className="h-fit w-fit px-2 text-white font-semibold cursor-pointer"
                key={categories}
                onClick={() => setCategory('')}
              >
                {`#${categories}`}
              </span>
            )}
          </div>
        </section>
      </section>
      <section className="grid lg:grid-cols-2 min-h-screen h-auto w-full 2xl:w-3/4 mx-auto mt-4 mb-8 relative border">
        <MarkdownEditor markdown={markdownContent} setMarkdown={setMarkdownContent} />
        <MarkdownViewer markdown={markdownContent} />
      </section>
    </main>
  );
}
