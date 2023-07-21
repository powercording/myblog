import { Dispatch, SetStateAction } from 'react';

type HeightControlTextArea = {
  setContent: Dispatch<SetStateAction<string>>;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function HeightControlTextArea({ setContent, name }: HeightControlTextArea) {
  const handleContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as HTMLTextAreaElement;
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;

    setContent(e.target.value);
  };

  return (
    <textarea
      className="w-full text-gray-100 py-3 px-5 focus:outline-none border bg-zinc-600 resize-none h-auto "
      onChange={handleContentInput}
      placeholder="댓글"
      rows={1}
      name={name ?? 'comment'}
    />
  );
}
