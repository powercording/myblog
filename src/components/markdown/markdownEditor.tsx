'use client';

import { imageUploader } from '@/lib/client/S3/imageHandler';
import { Markdown } from '@/service/postService';
import { Dispatch, SetStateAction } from 'react';
import { BiImageAdd } from 'react-icons/bi';

type MarkdownEditor = {
  setMarkdown: Dispatch<SetStateAction<Markdown>>;
  markdown: string;
};

export default function MarkdownEditor({ setMarkdown, markdown }: MarkdownEditor) {
  console.log(process.env.NEXT_PUBLIC_S3_ENDPOINT);
  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageKey = await imageUploader(e);

    if (!imageKey) {
      return;
    }

    // const insertedImage = `![image](${process.env.NEXT_PUBLIC_S3_ENDPOINT}/${imageKey})`;
    const insertedImage = ` <img src="${process.env.NEXT_PUBLIC_S3_ENDPOINT}/${imageKey}">`;
    const textArea = e.target.previousElementSibling?.previousElementSibling as HTMLTextAreaElement;
    const cursorPosition = textArea.selectionStart;

    setMarkdown(prev => {
      return {
        ...prev,
        content:
          prev.content.slice(0, cursorPosition) +
          insertedImage +
          prev.content.slice(cursorPosition + 1),
      };
    });
  };

  return (
    <>
      <textarea
        className="w-full border bg-zinc-600 px-5 py-6 text-gray-100 focus:outline-none"
        onChange={e => setMarkdown(prev => ({ ...prev, content: e.target.value }))}
        value={markdown ?? null}
        placeholder="Write your markdown here..."
      />
      <label htmlFor="imageHandler" className="absolute -top-8 right-5 cursor-pointer text-2xl">
        <BiImageAdd />
      </label>
      <input
        type="file"
        className="hidden"
        id="imageHandler"
        onChange={async e => imageHandler(e)}
      />
    </>
  );
}
