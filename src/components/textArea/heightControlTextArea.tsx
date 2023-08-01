import { Dispatch, SetStateAction } from 'react';

type HeightControlTextArea = {
  setContent: Dispatch<SetStateAction<string>>;
  writeAble?: boolean;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function HeightControlTextArea({
  setContent,
  name,
  writeAble,
}: HeightControlTextArea) {
  const handleContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as HTMLTextAreaElement;
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;

    setContent(e.target.value);
  };

  if (writeAble === undefined) writeAble = true;

  return (
    <textarea
      className="h-auto w-full resize-none border bg-zinc-600 px-5 py-3 text-gray-100 focus:outline-none "
      onChange={handleContentInput}
      placeholder={writeAble ? '댓글을 입력해주세요.' : '로그인 후 댓글을 작성할 수 있습니다.'}
      rows={1}
      name={name ?? 'comment'}
      disabled={!writeAble}
    />
  );
}
