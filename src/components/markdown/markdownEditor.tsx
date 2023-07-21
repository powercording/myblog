'use client';

import { imageHandler } from '@/lib/client/S3/imageHandler';
import { Dispatch, SetStateAction } from 'react';
import { BiImageAdd } from 'react-icons/bi';

type MarkdownEditor = {
  setMarkdown: Dispatch<SetStateAction<string>>;
  markdown: string;
};

export default function MarkdownEditor({ setMarkdown, markdown }: MarkdownEditor) {
  return (
    <>
      <textarea
        className="w-full text-gray-100 px-5 py-6 focus:outline-none border bg-zinc-600"
        onChange={e => setMarkdown(e.target.value)}
        value={markdown ?? null}
        placeholder="Write your markdown here..."
      />
      <label htmlFor="imageHandler" className="absolute cursor-pointer text-2xl right-5 -top-8">
        <BiImageAdd />
      </label>
      <input
        type="file"
        className="hidden"
        id="imageHandler"
        onChange={async e => imageHandler(e, setMarkdown)}
      />
    </>
  );
}
