'use client';

import { imageUploader } from '@/lib/client/S3/imageHandler';

interface FileInputProps {
  onUpdate: (profilePath: string) => Promise<void>;
}

export default function FileInput({ onUpdate }: FileInputProps) {
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await imageUploader(e, 'customProfile');
    if (!result) {
      return alert('이미지 업로드를 취소 했어요');
    }
    await onUpdate(`${process.env.NEXT_PUBLIC_S3_ENDPOINT}/${result}`);
  };

  return (
    <input
      type="file"
      className="file:text-none w-full rounded-sm bg-gray-200 text-black file:mr-4 file:rounded-md file:border-0
              file:bg-violet-50 file:px-4 file:py-2 file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
      onChange={onImageChange}
    />
  );
}
